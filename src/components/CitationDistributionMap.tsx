import React, { useEffect, useRef, useState, useMemo } from 'react';
import * as d3 from 'd3';
import { Target, MapPin, CheckCircle, AlertTriangle, HelpCircle, ShieldAlert, AlertCircle, Compass, ArrowRight, Activity, Award } from 'lucide-react';

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

interface CitationDistributionMapProps {
  directories: DirectoryOpportunity[];
  onSelectDirectory?: (dirKey: string) => void;
  onFixDirectory?: (dirKey: string) => void;
}

interface SectorData {
  id: string;
  name: string;
  description: string;
  color: string;
  startAngle: number; // in radians
  endAngle: number;   // in radians
}

interface ChartNode extends d3.SimulationNodeDatum {
  id: string;
  key: string;
  name: string;
  authority: number;
  status: 'consistent' | 'mismatch' | 'missing' | 'duplicate_conflict';
  category: string;
  relevance: number;
  integrationType: string;
  mismatchFields: string[];
  initialX: number;
  initialY: number;
}

export default function CitationDistributionMap({ 
  directories, 
  onSelectDirectory,
  onFixDirectory 
}: CitationDistributionMapProps) {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [hoveredNode, setHoveredNode] = useState<ChartNode | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(null);

  // Classify directories into 3 standard sectors
  const mappedDirectories = useMemo(() => {
    return directories.map(d => {
      let category = 'Local Search';
      if (['gmb', 'bing', 'foursquare'].includes(d.key)) {
        category = 'Maps & GPS';
      } else if (['clutch', 'tripadvisor'].includes(d.key)) {
        category = 'Industry Specific';
      }
      return {
        ...d,
        category
      };
    });
  }, [directories]);

  // Sector Definitions
  const sectors: SectorData[] = useMemo(() => [
    {
      id: 'maps',
      name: 'Maps & GPS Nav',
      description: 'Crucial for mobile and in-car search routing.',
      color: '#3b82f6', // blue
      startAngle: -Math.PI / 6, // -30deg
      endAngle: Math.PI / 2,    // 90deg
    },
    {
      id: 'local',
      name: 'Local Search Directories',
      description: 'General citations that power Google crawler trust.',
      color: '#10b981', // emerald
      startAngle: Math.PI / 2,     // 90deg
      endAngle: 7 * Math.PI / 6,  // 210deg
    },
    {
      id: 'industry',
      name: 'Industry & Niche Platforms',
      description: 'Sector-relevant authority matching core services.',
      color: '#f59e0b', // amber
      startAngle: 7 * Math.PI / 6, // 210deg
      endAngle: 11 * Math.PI / 6, // 330deg
    }
  ], []);

  // Compute sector scores
  const sectorDiagnostics = useMemo(() => {
    const diagnostics = sectors.map(sec => {
      const secDirs = mappedDirectories.filter(d => {
        if (sec.id === 'maps') return d.category === 'Maps & GPS';
        if (sec.id === 'local') return d.category === 'Local Search';
        return d.category === 'Industry Specific';
      });

      const totalDirsCount = secDirs.length;
      if (totalDirsCount === 0) {
        return {
          ...sec,
          score: 100,
          consistentCount: 0,
          mismatchCount: 0,
          missingCount: 0,
          severity: 'healthy' as 'healthy' | 'warning' | 'critical',
          rec: 'No directory listings found.'
        };
      }

      const consistentCount = secDirs.filter(d => d.audit.status === 'consistent').length;
      const mismatchCount = secDirs.filter(d => d.audit.status === 'mismatch' || d.audit.status === 'duplicate_conflict').length;
      const missingCount = secDirs.filter(d => d.audit.status === 'missing').length;

      // Score weighted by authority of consistent directories vs total authority potential
      const totalAuthority = d3.sum(secDirs, (d: any) => d.authority);
      const consistentAuthority = d3.sum(secDirs.filter(d => d.audit.status === 'consistent'), (d: any) => d.authority);
      const score = Math.round((consistentAuthority / (totalAuthority || 1)) * 100);

      let severity: 'healthy' | 'warning' | 'critical' = 'healthy';
      let rec = 'This sector is fully optimized and consistent!';

      if (score < 50) {
        severity = 'critical';
        rec = `Critically low reach. Add missing listings like ${secDirs.find(d => d.audit.status === 'missing')?.name || 'key platforms'} to unlock authority.`;
      } else if (score < 90) {
        severity = 'warning';
        rec = mismatchCount > 0 
          ? `NAP discrepancies detected. Run Auto-Fix to sync details across active platforms.`
          : `Secure missing citations to reach 100% authority presence.`;
      }

      return {
        ...sec,
        score,
        consistentCount,
        mismatchCount,
        missingCount,
        severity,
        rec,
        totalDirsCount
      };
    });

    return diagnostics;
  }, [mappedDirectories, sectors]);

  // Overall recommendation based on diagnostics
  const overallDiagnostic = useMemo(() => {
    const criticals = sectorDiagnostics.filter(s => s.severity === 'critical');
    const warnings = sectorDiagnostics.filter(s => s.severity === 'warning');

    if (criticals.length > 0) {
      return {
        title: `${criticals[0].name} Needs Immediate Focus`,
        desc: criticals[0].rec,
        type: 'critical' as const,
        sectorId: criticals[0].id
      };
    } else if (warnings.length > 0) {
      return {
        title: `NAP Realignment Recommended for ${warnings[0].name}`,
        desc: warnings[0].rec,
        type: 'warning' as const,
        sectorId: warnings[0].id
      };
    }
    return {
      title: 'Local Citation Presence is 100% Consistent',
      desc: 'All target search rings and directories are fully synchronized. Your local SEO is optimal!',
      type: 'healthy' as const,
      sectorId: null
    };
  }, [sectorDiagnostics]);

  // Render the D3 Radar/Spider Target Map
  useEffect(() => {
    if (!svgRef.current || mappedDirectories.length === 0) return;

    // Clear previous drawing
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const width = 450;
    const height = 450;
    const center = { x: width / 2, y: height / 2 };
    const maxRadius = Math.min(width, height) / 2 - 35;

    svg
      .attr('viewBox', `0 0 ${width} ${height}`)
      .attr('width', '100%')
      .attr('height', '100%')
      .style('overflow', 'visible');

    // Glow filter for consistent/glowing nodes
    const defs = svg.append('defs');
    
    // Emerald green glow
    const greenGlow = defs.append('filter')
      .attr('id', 'green-glow')
      .attr('x', '-30%')
      .attr('y', '-30%')
      .attr('width', '160%')
      .attr('height', '160%');
    greenGlow.append('feGaussianBlur')
      .attr('stdDeviation', '4')
      .attr('result', 'blur');
    greenGlow.append('feComposite')
      .attr('in', 'SourceGraphic')
      .attr('in2', 'blur')
      .attr('operator', 'over');

    // Crimson red glow for discrepancies
    const redGlow = defs.append('filter')
      .attr('id', 'red-glow')
      .attr('x', '-30%')
      .attr('y', '-30%')
      .attr('width', '160%')
      .attr('height', '160%');
    redGlow.append('feGaussianBlur')
      .attr('stdDeviation', '5')
      .attr('result', 'blur');
    redGlow.append('feComposite')
      .attr('in', 'SourceGraphic')
      .attr('in2', 'blur')
      .attr('operator', 'over');

    // Create the main drawing group
    const mainG = svg.append('g');

    // --- DRAW CONCENTRIC TARGET RINGS ---
    // rings represent authority tiers: 100, 80, 60, 40, 20
    const rings = [100, 80, 60, 40, 20];
    
    // Function to map Authority to circular radius
    // We want 100 to be near the center (bullseye) and 0 near the outer rim
    const getRadiusForAuthority = (auth: number) => {
      // Scale from 100 (inner ring) to 10 (outer edge)
      // Radius ranges from 30px (inner-most) to maxRadius (outer-most)
      const minRad = 40;
      const t = (100 - auth) / 90; // 0 for 100, 1 for 10
      return minRad + t * (maxRadius - minRad);
    };

    // Draw concentric grids
    rings.forEach((ringAuth) => {
      const r = getRadiusForAuthority(ringAuth);
      
      // Ring circle
      mainG.append('circle')
        .attr('cx', center.x)
        .attr('cy', center.y)
        .attr('r', r)
        .attr('fill', 'none')
        .attr('stroke', ringAuth === 100 ? '#334155' : '#cbd5e1')
        .attr('stroke-width', ringAuth === 100 ? 1.5 : 0.8)
        .attr('stroke-dasharray', ringAuth === 100 ? 'none' : '3,4')
        .attr('opacity', 0.65);

      // Ring Text Label
      mainG.append('text')
        .attr('x', center.x)
        .attr('y', center.y - r - 4)
        .attr('text-anchor', 'middle')
        .attr('class', 'font-mono text-[7.5px] font-black fill-slate-400')
        .text(`Auth ${ringAuth}`);
    });

    // --- DRAW SECTOR DIVIDERS AND LABELS ---
    sectors.forEach((sec) => {
      // Radial divider lines (drawn from center to maxRadius)
      const x1 = center.x + Math.cos(sec.startAngle) * maxRadius;
      const y1 = center.y + Math.sin(sec.startAngle) * maxRadius;
      
      mainG.append('line')
        .attr('x1', center.x)
        .attr('y1', center.y)
        .attr('x2', x1)
        .attr('y2', y1)
        .attr('stroke', '#94a3b8')
        .attr('stroke-width', 1.2)
        .attr('stroke-dasharray', '5,5')
        .attr('opacity', 0.5);

      // Draw sectoral background wedge subtly on hover or static
      const arcGenerator = d3.arc()
        .innerRadius(30)
        .outerRadius(maxRadius + 15)
        .startAngle(sec.startAngle + Math.PI / 2) // D3 arcs start from top (y-axis)
        .endAngle(sec.endAngle + Math.PI / 2);

      mainG.append('path')
        .attr('d', arcGenerator as any)
        .attr('transform', `translate(${center.x},${center.y})`)
        .attr('fill', sec.color)
        .attr('opacity', 0.02)
        .attr('class', 'transition-all duration-300 pointer-events-none');

      // Add category sector titles curved or aligned near the edge
      const labelAngle = (sec.startAngle + sec.endAngle) / 2;
      const labelR = maxRadius + 22;
      const labelX = center.x + Math.cos(labelAngle) * labelR;
      const labelY = center.y + Math.sin(labelAngle) * labelR;

      // Group for sector tags
      const tagG = mainG.append('g')
        .attr('transform', `translate(${labelX},${labelY})`);

      tagG.append('text')
        .attr('text-anchor', 'middle')
        .attr('class', 'font-sans text-[10px] font-black tracking-tight')
        .attr('fill', d3.color(sec.color)?.darker(0.5)?.toString() || '#334155')
        .text(sec.name);
    });

    // Draw Central Bullseye Core
    const coreG = mainG.append('g')
      .attr('transform', `translate(${center.x},${center.y})`);

    coreG.append('circle')
      .attr('r', 16)
      .attr('fill', '#0f172a')
      .attr('stroke', '#38bdf8')
      .attr('stroke-width', 1.5)
      .attr('filter', 'url(#green-glow)')
      .attr('opacity', 0.85);

    coreG.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '3.5')
      .attr('class', 'font-sans text-[8px] font-extrabold fill-sky-300 tracking-tighter')
      .text('CORE');

    // --- PREPARE NODES AND FORCE SIMULATION ---
    // Map directories to simulation nodes with initial angular layout
    const nodes: ChartNode[] = mappedDirectories.map((d) => {
      // Find sector
      const sec = sectors.find(s => {
        if (s.id === 'maps') return d.category === 'Maps & GPS';
        if (s.id === 'local') return d.category === 'Local Search';
        return d.category === 'Industry Specific';
      }) || sectors[1];

      // Distribute nodes angularly within their sector width
      const indexInSector = mappedDirectories.filter(x => x.category === d.category).findIndex(x => x.key === d.key);
      const countInSector = mappedDirectories.filter(x => x.category === d.category).length;
      
      const angleFraction = countInSector > 1 
        ? (indexInSector + 0.5) / countInSector 
        : 0.5;
      
      const sectorAngleWidth = sec.endAngle - sec.startAngle;
      // Buffer of 15% on each side of sector to prevent boundaries bleed
      const angle = sec.startAngle + 0.15 * sectorAngleWidth + angleFraction * (sectorAngleWidth * 0.7);
      const radius = getRadiusForAuthority(d.authority);

      const x = center.x + Math.cos(angle) * radius;
      const y = center.y + Math.sin(angle) * radius;

      return {
        id: d.key,
        key: d.key,
        name: d.name,
        authority: d.authority,
        status: d.audit.status,
        category: d.category,
        relevance: d.relevance,
        integrationType: d.integrationType,
        mismatchFields: d.audit.mismatchFields,
        initialX: x,
        initialY: y,
        x: x,
        y: y
      };
    });

    // Run a D3 force simulation to resolve overlapping nodes
    const simulation = d3.forceSimulation<ChartNode>(nodes)
      .force('cx', d3.forceX<ChartNode>(d => d.initialX).strength(1.2))
      .force('cy', d3.forceY<ChartNode>(d => d.initialY).strength(1.2))
      .force('collide', d3.forceCollide<ChartNode>(20).strength(0.8))
      .stop();

    // Run simulation tick steps synchronously to find stable coordinates immediately
    for (let i = 0; i < 80; ++i) simulation.tick();

    // --- DRAW DIRECTORY NODES ---
    const nodesG = mainG.selectAll('.directory-node')
      .data(nodes)
      .enter()
      .append('g')
      .attr('class', 'directory-node cursor-pointer')
      .attr('transform', d => `translate(${d.x},${d.y})`)
      .on('mouseenter', (event, d) => {
        setHoveredNode(d);
        // Calculate tooltip coordinates relative to SVG container bounding box
        const bounds = event.currentTarget.getBoundingClientRect();
        const containerBounds = containerRef.current?.getBoundingClientRect();
        if (containerBounds) {
          setTooltipPos({
            x: bounds.left - containerBounds.left + bounds.width / 2,
            y: bounds.top - containerBounds.top - 8
          });
        }
      })
      .on('mouseleave', () => {
        setHoveredNode(null);
        setTooltipPos(null);
      })
      .on('click', (event, d) => {
        if (onSelectDirectory) {
          onSelectDirectory(d.key);
        }
      });

    // 1. Draw glowing background/rings based on status
    nodesG.append('circle')
      .attr('r', 16)
      .attr('fill', d => {
        if (d.status === 'consistent') return 'rgba(16, 185, 129, 0.15)'; // Emerald soft
        if (d.status === 'mismatch' || d.status === 'duplicate_conflict') return 'rgba(239, 68, 68, 0.15)'; // Red soft
        return 'rgba(148, 163, 184, 0.05)'; // Gray soft
      })
      .attr('stroke', d => {
        if (d.status === 'consistent') return '#10b981';
        if (d.status === 'mismatch' || d.status === 'duplicate_conflict') return '#ef4444';
        return '#cbd5e1';
      })
      .attr('stroke-width', d => d.status === 'missing' ? 1.5 : 2)
      .attr('stroke-dasharray', d => d.status === 'missing' ? '3,3' : 'none')
      .attr('filter', d => {
        if (d.status === 'consistent') return 'url(#green-glow)';
        if (d.status === 'mismatch' || d.status === 'duplicate_conflict') return 'url(#red-glow)';
        return 'none';
      })
      .attr('class', 'transition-all duration-300')
      // Pulse animation for issues
      .each(function(d) {
        if (d.status === 'mismatch' || d.status === 'duplicate_conflict') {
          d3.select(this)
            .append('animate')
            .attr('attributeName', 'r')
            .attr('values', '14;18;14')
            .attr('dur', '2s')
            .attr('repeatCount', 'indefinite');
        }
      });

    // 2. Draw solid inner core circle
    nodesG.append('circle')
      .attr('r', 11)
      .attr('fill', d => {
        if (d.status === 'consistent') return '#10b981';
        if (d.status === 'mismatch' || d.status === 'duplicate_conflict') return '#ef4444';
        return '#f1f5f9';
      })
      .attr('stroke', '#ffffff')
      .attr('stroke-width', 1.5);

    // 3. Draw text initials/icons inside the node
    nodesG.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '3.5')
      .attr('class', 'font-sans text-[9px] font-black uppercase tracking-tight')
      .attr('fill', d => d.status === 'missing' ? '#64748b' : '#ffffff')
      .text(d => {
        // Initials (e.g., G, Y, B, C, F, T)
        if (d.key === 'gmb') return 'G';
        if (d.key === 'yelp') return 'Y';
        if (d.key === 'bing') return 'B';
        if (d.key === 'yellowpages') return 'YP';
        if (d.key === 'foursquare') return 'F';
        if (d.key === 'clutch') return 'C';
        if (d.key === 'tripadvisor') return 'TA';
        return d.name[0];
      });

    // Subtle entry transitions
    nodesG
      .attr('opacity', 0)
      .attr('scale', 0)
      .transition()
      .duration(800)
      .delay((d, i) => i * 80)
      .attr('opacity', 1);

  }, [mappedDirectories, sectors]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-white border border-slate-200 rounded-2xl p-6 shadow-xs relative overflow-hidden" id="citation-distribution-map-widget">
      {/* Visual background details to give custom mood */}
      <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-br from-blue-50/40 to-indigo-50/20 rounded-full blur-2xl -z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-emerald-50/40 to-teal-50/20 rounded-full blur-xl -z-10 pointer-events-none" />

      {/* Title & Diagnostic Summary column (5 cols) */}
      <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
        <div className="space-y-2">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-slate-100 text-slate-700 text-[10px] font-black uppercase tracking-wider rounded-md border border-slate-200">
            <Activity className="h-3 w-3 text-blue-600 animate-pulse" />
            Authority Mapping Engine
          </span>
          <h3 className="text-base font-black text-slate-900 tracking-tight">
            Local Citation Distribution Map
          </h3>
          <p className="text-slate-500 text-xs leading-relaxed">
            D3-powered polar target rings. Directories closer to the dark <strong>Core (Bullseye)</strong> possess higher authority weight. Missing or mismatched listings act as vacant slots pulling your reach outwards.
          </p>
        </div>

        {/* Dynamic Sector Diagnostic Summary Indicators */}
        <div className="space-y-3.5 pt-2">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block border-b border-slate-100 pb-1">
            Sector Reach Diagnostics
          </span>
          
          <div className="space-y-3">
            {sectorDiagnostics.map((sec) => (
              <div 
                key={sec.id} 
                className="group border border-slate-100 rounded-xl p-3 bg-slate-50/40 hover:bg-slate-50 hover:border-slate-200 transition-all duration-200"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span 
                      className="w-2.5 h-2.5 rounded-full shrink-0" 
                      style={{ backgroundColor: sec.color }} 
                    />
                    <span className="text-xs font-bold text-slate-800">{sec.name}</span>
                  </div>
                  <span className={`text-xs font-mono font-black ${
                    sec.score >= 90 ? 'text-emerald-600' :
                    sec.score >= 50 ? 'text-amber-600' :
                    'text-rose-600'
                  }`}>
                    {sec.score}% Reach
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mb-2">
                  <div 
                    className="h-full transition-all duration-500 rounded-full"
                    style={{ 
                      width: `${sec.score}%`,
                      backgroundColor: sec.color
                    }}
                  />
                </div>

                {/* Quick breakdown metrics */}
                <div className="flex items-center justify-between text-[10px]">
                  <div className="flex items-center gap-2 text-slate-500 font-medium">
                    <span className="text-emerald-600 font-bold">{sec.consistentCount} Consistent</span>
                    {sec.mismatchCount > 0 && <span className="text-rose-600 font-bold">{sec.mismatchCount} NAP Error</span>}
                    {sec.missingCount > 0 && <span className="text-slate-400 font-bold">{sec.missingCount} Missing</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Actionable recommendation block */}
        <div className={`p-3.5 border rounded-xl flex items-start gap-2.5 transition-all duration-300 ${
          overallDiagnostic.type === 'critical' ? 'bg-rose-50 border-rose-100 text-rose-800' :
          overallDiagnostic.type === 'warning' ? 'bg-amber-50 border-amber-100 text-amber-800' :
          'bg-emerald-50 border-emerald-100 text-emerald-800'
        }`}>
          <div className="shrink-0 mt-0.5">
            {overallDiagnostic.type === 'critical' ? <ShieldAlert className="h-4.5 w-4.5 text-rose-600" /> :
             overallDiagnostic.type === 'warning' ? <AlertTriangle className="h-4.5 w-4.5 text-amber-600" /> :
             <CheckCircle className="h-4.5 w-4.5 text-emerald-600" />}
          </div>
          <div className="space-y-0.5">
            <h4 className="text-xs font-extrabold tracking-tight">
              {overallDiagnostic.title}
            </h4>
            <p className={`text-[10px] leading-relaxed ${
              overallDiagnostic.type === 'critical' ? 'text-rose-600' :
              overallDiagnostic.type === 'warning' ? 'text-amber-700' :
              'text-emerald-700'
            }`}>
              {overallDiagnostic.desc}
            </p>
          </div>
        </div>
      </div>

      {/* Interative D3 Canvas workspace column (7 cols) */}
      <div 
        ref={containerRef} 
        className="lg:col-span-7 border border-slate-100 rounded-2xl bg-slate-50/50 p-4 flex flex-col items-center justify-center relative min-h-[400px]"
      >
        <svg ref={svgRef} className="w-full max-w-[420px] h-auto drop-shadow-xs" />

        {/* Legend in margins */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[9px] font-bold text-slate-500 uppercase tracking-wider font-mono border-t border-slate-200/50 pt-2 px-1 bg-white/40 rounded p-1 backdrop-blur-3xs">
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span>Consistent Reach</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
            <span>NAP Error / Issue</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full border border-slate-300 border-dashed bg-slate-100" />
            <span>Missing citation</span>
          </div>
        </div>

        {/* Dynamic D3 Hover Tooltip */}
        {hoveredNode && tooltipPos && (
          <div 
            className="absolute z-30 bg-slate-900 text-white rounded-xl p-3 text-[10px] space-y-2 shadow-xl border border-slate-800 pointer-events-none w-[220px] transform -translate-x-1/2 -translate-y-full backdrop-blur-md"
            style={{ 
              left: `${tooltipPos.x}px`, 
              top: `${tooltipPos.y - 10}px` 
            }}
          >
            <div className="border-b border-slate-800 pb-1.5 flex items-center justify-between font-mono font-bold text-[9px] text-slate-400">
              <span className="truncate">{hoveredNode.category}</span>
              <span className="flex items-center gap-1 text-sky-400">
                <Award className="h-3 w-3 shrink-0" /> Auth {hoveredNode.authority}
              </span>
            </div>

            <div className="space-y-1">
              <h5 className="font-extrabold text-xs text-white truncate flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-blue-400 shrink-0" />
                {hoveredNode.name}
              </h5>
              
              <div className="flex items-center gap-2 pt-0.5">
                <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-wider border ${
                  hoveredNode.status === 'consistent' ? 'bg-emerald-950/80 border-emerald-800 text-emerald-400' :
                  hoveredNode.status === 'mismatch' || hoveredNode.status === 'duplicate_conflict' ? 'bg-rose-950/80 border-rose-800 text-rose-400 animate-pulse' :
                  'bg-slate-950/80 border-slate-800 text-slate-400'
                }`}>
                  {hoveredNode.status === 'consistent' ? 'Verified Consistent' :
                   hoveredNode.status === 'mismatch' ? 'NAP Discrepancy' :
                   hoveredNode.status === 'duplicate_conflict' ? 'Duplicate Conflict' :
                   'Listing Missing'}
                </span>
                <span className="font-mono text-slate-400 text-[8px]">Via {hoveredNode.integrationType}</span>
              </div>

              {hoveredNode.mismatchFields.length > 0 && (
                <div className="pt-1 space-y-0.5">
                  <span className="text-[8px] font-extrabold text-rose-400 block uppercase">NAP Discrepancies:</span>
                  <div className="flex flex-wrap gap-1">
                    {hoveredNode.mismatchFields.map((f, idx) => (
                      <span key={idx} className="bg-rose-950/40 border border-rose-900/50 text-rose-400 px-1 rounded-[3px] text-[8px] font-mono capitalize">
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="border-t border-slate-800/80 pt-1.5 flex items-center justify-between text-[8px] font-bold">
              <span className="text-slate-400">Click to locate details</span>
              <span className="text-sky-400 flex items-center gap-0.5">
                Inspect <ArrowRight className="h-2 w-2" />
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
