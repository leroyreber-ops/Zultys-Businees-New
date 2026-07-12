import { useState, useEffect, useCallback, useRef } from 'react';
import { toast } from 'sonner';

export interface Competitor {
  domain: string;
  rank: number;
  title: string;
}

export interface KeywordRankData {
  position: number | null;
  lastChecked: string;
  competitors: Competitor[];
  analysis: string;
  googleSearchUsed: boolean;
  history: Array<{ date: string; position: number | null }>;
}

export interface RankNotification {
  id: string;
  type: 'RANK_IMPROVED' | 'RANK_DROPPED';
  keyword: string;
  oldPosition: number | null;
  newPosition: number | null;
  diff: number;
  message: string;
  timestamp: string;
  read: boolean;
}

export interface RankPollingStore {
  lastUpdated: string;
  rankings: Record<string, KeywordRankData>;
  notifications: RankNotification[];
}

// Simple event-emitter style state sync across components using the hook
type Listener = (store: RankPollingStore) => void;
const listeners = new Set<Listener>();
let globalStore: RankPollingStore = {
  lastUpdated: new Date().toISOString(),
  rankings: {},
  notifications: []
};

let globalIsLoading = false;
const loadingListeners = new Set<(loading: boolean) => void>();

function updateGlobalStore(newStore: RankPollingStore) {
  // Check for newly added unread notifications to trigger interactive toast alerts
  const oldUnreads = new Set(globalStore.notifications.filter(n => !n.read).map(n => n.id));
  const newUnreads = newStore.notifications.filter(n => !n.read);
  
  newUnreads.forEach(notif => {
    if (!oldUnreads.has(notif.id)) {
      // Trigger a live toast alert!
      if (notif.type === 'RANK_IMPROVED') {
        toast.success(`📈 Rank Improved: "${notif.keyword}" climbed to #${notif.newPosition}!`, {
          description: notif.message,
          duration: 6000
        });
      } else {
        toast.error(`📉 Rank Slipped: "${notif.keyword}" slipped to #${notif.newPosition}`, {
          description: notif.message,
          duration: 6000
        });
      }
    }
  });

  globalStore = newStore;
  listeners.forEach(l => l(globalStore));
}

function updateGlobalLoading(loading: boolean) {
  globalIsLoading = loading;
  loadingListeners.forEach(l => l(globalIsLoading));
}

/**
 * Custom Hook: useRankPolling
 * Periodically polls the server for verified ranking data & alerts to keep all
 * parts of the app (the Dashboard, the Floating Assistant, etc.) perfectly synced in the background.
 */
export function useRankPolling(pollIntervalMs = 15000) {
  const [store, setStore] = useState<RankPollingStore>(globalStore);
  const [loading, setLoading] = useState<boolean>(globalIsLoading);
  const [verifyingKeyword, setVerifyingKeyword] = useState<string | null>(null);
  const [verifyingAll, setVerifyingAll] = useState<boolean>(false);

  useEffect(() => {
    const handleStoreChange = (newStore: RankPollingStore) => setStore(newStore);
    const handleLoadingChange = (l: boolean) => setLoading(l);

    listeners.add(handleStoreChange);
    loadingListeners.add(handleLoadingChange);

    // Initial fetch if store rankings are empty
    if (Object.keys(globalStore.rankings).length === 0) {
      fetchRankData();
    }

    return () => {
      listeners.delete(handleStoreChange);
      loadingListeners.delete(handleLoadingChange);
    };
  }, []);

  const fetchRankData = useCallback(async (silent = false) => {
    if (!silent) updateGlobalLoading(true);
    try {
      const res = await fetch('/api/seo/verified-ranks');
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      if (data && data.rankings) {
        updateGlobalStore({
          lastUpdated: data.lastUpdated || new Date().toISOString(),
          rankings: data.rankings,
          notifications: data.notifications || []
        });
      }
    } catch (err) {
      if (silent) {
        // Silent background polls can fail during local rebuilds / server restarts.
        // Log as a subtle debug/info warning rather than flooding the console with error stacks.
        console.warn('[Rank Polling Hook] Background sync temporarily unavailable (server is likely restarting/building).');
      } else {
        console.error('[Rank Polling Hook] Active fetch failed:', err);
      }
    } finally {
      if (!silent) updateGlobalLoading(false);
    }
  }, []);

  // Set up periodic background polling
  useEffect(() => {
    const interval = setInterval(() => {
      fetchRankData(true);
    }, pollIntervalMs);

    return () => clearInterval(interval);
  }, [pollIntervalMs, fetchRankData]);

  // Trigger real-time search engine verification for a keyword
  const verifyRank = useCallback(async (keyword: string) => {
    setVerifyingKeyword(keyword);
    const toastId = toast.loading(`Initiating live SERP grounding verification for "${keyword}"...`);
    try {
      const res = await fetch('/api/seo/verify-rank', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ keyword })
      });
      const data = await res.json();
      if (data.success) {
        toast.success(`SERP Grounds Verified: "${keyword}" position is #${data.position || 'Not Found'}!`, { id: toastId });
        // Refresh rankings & alerts
        await fetchRankData();
      } else {
        toast.error(`Verification failed: ${data.error}`, { id: toastId });
      }
      return data;
    } catch (err: any) {
      toast.error(`Verification failed: ${err.message}`, { id: toastId });
      return { success: false, error: err.message };
    } finally {
      setVerifyingKeyword(null);
    }
  }, [fetchRankData]);

  // Trigger real-time search engine verification for ALL monitored keywords
  const verifyAll = useCallback(async () => {
    setVerifyingAll(true);
    const toastId = toast.loading('Executing batch background verified checks on all tracked SERPs...');
    try {
      const res = await fetch('/api/seo/verify-all', { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        toast.success('Successfully grounded and verified all search positions!', { id: toastId });
        await fetchRankData();
      } else {
        toast.error(`Batch check failed: ${data.error}`, { id: toastId });
      }
      return data;
    } catch (err: any) {
      toast.error(`Batch check failed: ${err.message}`, { id: toastId });
      return { success: false, error: err.message };
    } finally {
      setVerifyingAll(false);
    }
  }, [fetchRankData]);

  // Clear or mark all alerts as read
  const clearNotifications = useCallback(async () => {
    try {
      const res = await fetch('/api/seo/clear-notifications', { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        updateGlobalStore({
          ...globalStore,
          notifications: globalStore.notifications.map(n => ({ ...n, read: true }))
        });
        toast.success('All rank alerts cleared.');
      }
    } catch (err) {
      console.error('[Rank Polling Hook] Failed to clear alerts:', err);
    }
  }, []);

  const unreadCount = store.notifications.filter(n => !n.read).length;

  return {
    rankings: store.rankings,
    notifications: store.notifications,
    lastUpdated: store.lastUpdated,
    loading,
    verifyingKeyword,
    verifyingAll,
    unreadCount,
    fetchRankData,
    verifyRank,
    verifyAll,
    clearNotifications
  };
}
