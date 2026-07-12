import React, { useState, useMemo } from 'react';
import { 
  Search, ArrowUpDown, CheckCircle, AlertTriangle, ShieldAlert, PlusCircle, 
  ExternalLink, Wrench, Check, SlidersHorizontal, Info, RefreshCw
} from 'lucide-react';

interface DirectoryOpportunity {
  key: string;
  name: string;
  domain: string;
  authority: number;
  relevance: number;
  likelihood: number;
  integrationType: 'API' | 'Form Automation' | 'Manual Task';
  listingUrl: string | null;
  audit: {
    status: 'consistent' | 'mismatch' | 'missing' | 'duplicate_conflict';
    foundName: string | null;
    foundAddress: string | null;
    foundPhone: string | null;
    foundWebsite: string | null;
    mismatchFields: string[];
    consistencyScore: number;
  };
}

interface CitationsTableProps {
  directories: DirectoryOpportunity[];
  onAutoFix: (key: string) => void;
  onTriggerSubmission: (key: string) => void;
  fixingKey: string | null;
  submittingKey: string | null;
}

type SortField = 'name' | 'authority' | 'consistencyScore' | 'status';
type SortOrder = 'asc' | 'desc';

export function CitationsTable({
  directories,
  onAutoFix,
  onTriggerSubmission,
  fixingKey,
  submittingKey
}: CitationsTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'consistent' | 'mismatch' | 'duplicate_conflict' | 'missing'>('all');
  const [integrationFilter, setIntegrationFilter] = useState<'all' | 'API' | 'Form Automation' | 'Manual Task'>('all');
  const [sortField, setSortField] = useState<SortField>('authority');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

  // Handle Sort Change
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  // Filter and Sort Directories
  const processedDirectories = useMemo(() => {
    let result = [...directories];

    // Filter by search term
    if (searchTerm.trim() !== '') {
      const lower = searchTerm.toLowerCase();
      result = result.filter(d => 
        d.name.toLowerCase().includes(lower) || 
        d.domain.toLowerCase().includes(lower) ||
        (d.audit.foundName && d.audit.foundName.toLowerCase().includes(lower)) ||
        (d.audit.foundAddress && d.audit.foundAddress.toLowerCase().includes(lower))
      );
    }

    // Filter by status
    if (statusFilter !== 'all') {
      result = result.filter(d => d.audit.status === statusFilter);
    }

    // Filter by integration channel
    if (integrationFilter !== 'all') {
      result = result.filter(d => d.integrationType === integrationFilter);
    }

    // Sort result
    result.sort((a, b) => {
      let valA: any;
      let valB: any;

      if (sortField === 'name') {
        valA = a.name.toLowerCase();
        valB = b.name.toLowerCase();
      } else if (sortField === 'authority') {
        valA = a.authority;
        valB = b.authority;
      } else if (sortField === 'consistencyScore') {
        valA = a.audit.consistencyScore || 0;
        valB = b.audit.consistencyScore || 0;
      } else if (sortField === 'status') {
        valA = a.audit.status;
        valB = b.audit.status;
      }

      if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
      if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    return result;
  }, [directories, searchTerm, statusFilter, integrationFilter, sortField, sortOrder]);

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden" id="citations-master-table">
      {/* Table Header Section */}
      <div className="p-5 border-b border-slate-100 bg-slate-50/50 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4 text-blue-600" />
              Citations Master Directory Table
            </h3>
            <p className="text-xs text-slate-500">
              Search, filter, and sort localized business citations across primary map data aggregators and business portals.
            </p>
          </div>
          
          <div className="flex items-center gap-2 text-slate-500 text-xs font-semibold bg-white border border-slate-200 px-3 py-1.5 rounded-lg shadow-2xs">
            <span>Showing:</span>
            <strong className="text-slate-800 font-bold">{processedDirectories.length}</strong>
            <span>of</span>
            <strong className="text-slate-800 font-bold">{directories.length}</strong>
            <span>directories</span>
          </div>
        </div>

        {/* Filters Controls Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
          {/* Search Box */}
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
              <Search className="h-4 w-4" />
            </span>
            <input
              type="text"
              placeholder="Search directory, domain..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-xl text-xs placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all text-slate-800"
            />
          </div>

          {/* Status Filter */}
          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all font-medium"
            >
              <option value="all">All Statuses</option>
              <option value="consistent">Active & Consistent</option>
              <option value="mismatch">Needs Update (NAP Mismatch)</option>
              <option value="duplicate_conflict">Needs Update (Duplicate Conflict)</option>
              <option value="missing">Not Found (Missing)</option>
            </select>
          </div>

          {/* Integration Channel Filter */}
          <div>
            <select
              value={integrationFilter}
              onChange={(e) => setIntegrationFilter(e.target.value as any)}
              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all font-medium"
            >
              <option value="all">All Sync Channels</option>
              <option value="API">API Direct Sync</option>
              <option value="Form Automation">Form Automation</option>
              <option value="Manual Task">Manual Fallback Task</option>
            </select>
          </div>

          {/* Reset Filters Buttons */}
          <button
            onClick={() => {
              setSearchTerm('');
              setStatusFilter('all');
              setIntegrationFilter('all');
              setSortField('authority');
              setSortOrder('desc');
            }}
            className="px-4 py-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition rounded-xl text-xs font-bold border border-slate-200 bg-white flex items-center justify-center gap-1.5 cursor-pointer"
          >
            Clear All Filters
          </button>
        </div>
      </div>

      {/* Table Element Wrapper */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[900px]">
          <thead>
            <tr className="border-b border-slate-150 bg-slate-100/40 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              <th className="py-3.5 px-5">
                <button 
                  onClick={() => handleSort('name')}
                  className="flex items-center gap-1 hover:text-slate-700 transition font-bold"
                >
                  Directory Name {sortField === 'name' && <ArrowUpDown className="h-3 w-3 text-blue-500" />}
                </button>
              </th>
              <th className="py-3.5 px-4">
                <button 
                  onClick={() => handleSort('authority')}
                  className="flex items-center gap-1 hover:text-slate-700 transition font-bold"
                >
                  Domain Authority {sortField === 'authority' && <ArrowUpDown className="h-3 w-3 text-blue-500" />}
                </button>
              </th>
              <th className="py-3.5 px-4 font-bold">Sync Channel</th>
              <th className="py-3.5 px-4 font-bold">Online Data (NAP Summary)</th>
              <th className="py-3.5 px-4">
                <button 
                  onClick={() => handleSort('consistencyScore')}
                  className="flex items-center gap-1 hover:text-slate-700 transition font-bold"
                >
                  NAP Match Score {sortField === 'consistencyScore' && <ArrowUpDown className="h-3 w-3 text-blue-500" />}
                </button>
              </th>
              <th className="py-3.5 px-4">
                <button 
                  onClick={() => handleSort('status')}
                  className="flex items-center gap-1 hover:text-slate-700 transition font-bold"
                >
                  Status {sortField === 'status' && <ArrowUpDown className="h-3 w-3 text-blue-500" />}
                </button>
              </th>
              <th className="py-3.5 px-5 text-right font-bold">Resolution Actions</th>
            </tr>
          </thead>
          
          <tbody className="divide-y divide-slate-100 text-slate-700 text-xs font-medium">
            {processedDirectories.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-12 text-center text-slate-400 font-semibold">
                  No matching citations directory listings found. Adjust your search or filters.
                </td>
              </tr>
            ) : (
              processedDirectories.map((dir) => {
                const status = dir.audit.status;
                
                // Status Badge Configurations
                let badgeClass = '';
                let statusLabel = '';
                let statusIcon = null;

                if (status === 'consistent') {
                  badgeClass = 'bg-emerald-50 text-emerald-700 border-emerald-200/60';
                  statusLabel = 'Active & Consistent';
                  statusIcon = <CheckCircle className="h-3 w-3" />;
                } else if (status === 'mismatch') {
                  badgeClass = 'bg-rose-50 text-rose-700 border-rose-200/60';
                  statusLabel = 'Needs Update (NAP Mismatch)';
                  statusIcon = <AlertTriangle className="h-3 w-3 animate-pulse" />;
                } else if (status === 'duplicate_conflict') {
                  badgeClass = 'bg-amber-50 text-amber-700 border-amber-200/60';
                  statusLabel = 'Needs Update (Conflict)';
                  statusIcon = <ShieldAlert className="h-3 w-3" />;
                } else if (status === 'missing') {
                  badgeClass = 'bg-slate-100 text-slate-600 border-slate-200';
                  statusLabel = 'Not Found (Missing)';
                  statusIcon = <PlusCircle className="h-3 w-3" />;
                }

                // Render mismatched fields
                const showMismatches = status === 'mismatch' || status === 'duplicate_conflict';
                
                return (
                  <tr 
                    key={dir.key} 
                    className="hover:bg-slate-50/50 transition-colors"
                  >
                    {/* Directory Name & Domain */}
                    <td className="py-4 px-5">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-1.5">
                          <strong className="text-slate-900 font-bold">{dir.name}</strong>
                          {dir.listingUrl && (
                            <a 
                              href={dir.listingUrl} 
                              target="_blank" 
                              rel="noreferrer" 
                              className="text-slate-400 hover:text-slate-700 transition"
                              title="Go to external citation portal"
                            >
                              <ExternalLink className="h-3 w-3" />
                            </a>
                          )}
                        </div>
                        <span className="text-[10px] text-slate-400 font-mono font-medium block">{dir.domain}</span>
                      </div>
                    </td>

                    {/* Domain Authority */}
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-1 font-mono text-slate-800">
                        <span className="font-bold">{dir.authority}</span>
                        <span className="text-[10px] text-slate-400 font-normal">/100</span>
                      </div>
                    </td>

                    {/* Sync Channel */}
                    <td className="py-4 px-4">
                      <span className="text-[10px] uppercase font-mono font-bold tracking-wider px-2 py-0.5 rounded border bg-slate-50 border-slate-200 text-slate-500">
                        {dir.integrationType}
                      </span>
                    </td>

                    {/* Online Data NAP summary */}
                    <td className="py-4 px-4 max-w-xs">
                      {status === 'missing' ? (
                        <span className="text-slate-400 italic text-[11px]">No profile indexed on portal</span>
                      ) : (
                        <div className="space-y-0.5 text-[11px] text-slate-500">
                          <p className={`truncate ${dir.audit.mismatchFields.includes('name') ? 'line-through text-slate-400' : 'text-slate-800'}`}>
                            <strong className="text-slate-400 font-normal">N:</strong> {dir.audit.foundName || 'Missing'}
                          </p>
                          <p className={`truncate ${dir.audit.mismatchFields.includes('street') ? 'line-through text-slate-400' : 'text-slate-600'}`}>
                            <strong className="text-slate-400 font-normal">A:</strong> {dir.audit.foundAddress || 'Missing'}
                          </p>
                          <p className={`truncate ${dir.audit.mismatchFields.includes('phone') ? 'line-through text-slate-400' : 'text-slate-600'}`}>
                            <strong className="text-slate-400 font-normal">P:</strong> {dir.audit.foundPhone || 'Missing'}
                          </p>
                        </div>
                      )}
                    </td>

                    {/* Consistency Match Rating */}
                    <td className="py-4 px-4">
                      {status === 'missing' ? (
                        <span className="font-mono text-slate-400">0%</span>
                      ) : (
                        <div className="flex items-center gap-1.5">
                          <span className={`font-mono font-bold ${
                            dir.audit.consistencyScore >= 90 ? 'text-emerald-600' : 
                            dir.audit.consistencyScore >= 70 ? 'text-amber-600' : 'text-rose-600'
                          }`}>
                            {dir.audit.consistencyScore}%
                          </span>
                          
                          {/* Mini visual indicator */}
                          <div className="w-10 bg-slate-100 rounded-full h-1 overflow-hidden hidden sm:block">
                            <div 
                              className={`h-full rounded-full ${
                                dir.audit.consistencyScore >= 90 ? 'bg-emerald-500' : 
                                dir.audit.consistencyScore >= 70 ? 'bg-amber-500' : 'bg-rose-500'
                              }`} 
                              style={{ width: `${dir.audit.consistencyScore}%` }}
                            />
                          </div>
                        </div>
                      )}
                    </td>

                    {/* Status Badge */}
                    <td className="py-4 px-4">
                      <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border ${badgeClass}`}>
                        {statusIcon}
                        <span>{statusLabel}</span>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-5 text-right">
                      <div className="flex justify-end gap-1.5">
                        {showMismatches && (
                          <button
                            onClick={() => onAutoFix(dir.key)}
                            disabled={fixingKey === dir.key}
                            className="px-2.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-[10px] font-black uppercase tracking-wider cursor-pointer active:scale-95 transition flex items-center gap-1 disabled:opacity-50"
                            title="Auto-align metadata and push API correction"
                          >
                            <Wrench className={`h-3 w-3 ${fixingKey === dir.key ? 'animate-spin' : ''}`} />
                            {fixingKey === dir.key ? 'Fixing...' : 'Auto-Fix'}
                          </button>
                        )}
                        
                        {status === 'missing' && (
                          <button
                            onClick={() => onTriggerSubmission(dir.key)}
                            disabled={submittingKey === dir.key}
                            className="px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[10px] font-black uppercase tracking-wider cursor-pointer active:scale-95 transition flex items-center gap-1 disabled:opacity-50"
                            title="Build and publish citation on this portal"
                          >
                            <PlusCircle className="h-3 w-3" />
                            {submittingKey === dir.key ? 'Paving...' : 'Submit'}
                          </button>
                        )}

                        {status === 'consistent' && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 px-2 py-1.5 bg-emerald-50 rounded-lg border border-emerald-100">
                            <Check className="h-3 w-3" /> Synced
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Table Footer Helper */}
      <div className="p-4 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[10px] text-slate-400 font-semibold">
        <span className="flex items-center gap-1">
          <Info className="h-3.5 w-3.5 text-slate-400" />
          Note: Local listings take 24-72 hours to reflect on third-party aggregators after successful API submission.
        </span>
        <span className="font-mono">
          Last Crawl: {new Date().toLocaleDateString()} • System Active
        </span>
      </div>
    </div>
  );
}
