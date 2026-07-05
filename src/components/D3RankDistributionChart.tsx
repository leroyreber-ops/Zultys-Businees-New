import React, { useEffect, useRef, useState, useMemo } from 'react';
import * as d3 from 'd3';
import { HelpCircle, Layers, LineChart, CheckSquare, Square } from 'lucide-react';

interface RankPoint {
  date: string;
  position: number;
  clicks: number;
  impressions: number;
  ctr: number;
}

interface D3RankDistributionChartProps {
  rankTrackerData: {
    terms: Record<string, RankPoint[]>;
    summary: Record<string, { avgPosition: number; totalClicks: number; totalImpressions: number; ctr: number }>;
  } | null;
}

export default function D3RankDistributionChart({ rankTrackerData }: D3RankDistributionChartProps) {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Available keywords in the dataset
  const availableTerms = useMemo(() => {
    if (!rankTrackerData?.terms) return [];
    return Object.keys(rankTrackerData.terms);
  }, [rankTrackerData]);

  // Selected keywords to plot
  const [selectedTerms, setSelectedTerms] = useState<string[]>([]);
  // Chart type: 'trend' (multi-line) or 'distribution' (stacked rank tiers)
  const [chartType, setChartType] = useState<'trend' | 'distribution'>('trend');
  // Hovered data for live tooltip
  const [tooltipContent, setTooltipContent] = useState<{
    date: string;
    items: Array<{ term: string; position: number }>;
  } | null>(null);

  // Initialize selected terms once data is loaded
  useEffect(() => {
    if (availableTerms.length > 0 && selectedTerms.length === 0) {
      setSelectedTerms(availableTerms);
    }
  }, [availableTerms, selectedTerms]);

  const toggleTerm = (term: string) => {
    setSelectedTerms(prev => {
      if (prev.includes(term)) {
        // Prevent deselecting all terms
        if (prev.length <= 1) return prev;
        return prev.filter(t => t !== term);
      } else {
        return [...prev, term];
      }
    });
  };

  // Process data for the D3 renderer
  const processedData = useMemo(() => {
    if (!rankTrackerData?.terms || selectedTerms.length === 0) return [];

    // Get all unique dates
    const allDates = new Set<string>();
    selectedTerms.forEach(term => {
      const series = rankTrackerData.terms[term] || [];
      series.forEach(pt => allDates.add(pt.date));
    });

    const sortedDates = Array.from(allDates).sort();

    // Map each date to keywords details
    return sortedDates.map(date => {
      const items: Record<string, number> = {};
      selectedTerms.forEach(term => {
        const series = rankTrackerData.terms[term] || [];
        const found = series.find(pt => pt.date === date);
        if (found) {
          items[term] = found.position;
        }
      });

      // Calculate distributions
      // Tier 1: Top 3 (Positions 1.0 - 3.0)
      // Tier 2: Rank 4 - 10
      // Tier 3: Page 2 (Rank 11 - 20)
      // Tier 4: Page 3+ (Rank 21+)
      let tier1Count = 0;
      let tier2Count = 0;
      let tier3Count = 0;
      let tier4Count = 0;

      Object.values(items).forEach(pos => {
        if (pos <= 3) tier1Count++;
        else if (pos <= 10) tier2Count++;
        else if (pos <= 20) tier3Count++;
        else tier4Count++;
      });

      const totalSelected = Object.keys(items).length || 1;

      return {
        date,
        items,
        distribution: {
          t1: tier1Count,
          t2: tier2Count,
          t3: tier3Count,
          t4: tier4Count,
          t1Pct: (tier1Count / totalSelected) * 100,
          t2Pct: (tier2Count / totalSelected) * 100,
          t3Pct: (tier3Count / totalSelected) * 100,
          t4Pct: (tier4Count / totalSelected) * 100,
        }
      };
    });
  }, [rankTrackerData, selectedTerms]);

  // Color mapping helper for keyword trend lines
  const getLineColor = (term: string) => {
    if (term.includes('Dallas')) return '#2563eb'; // Royal Blue
    if (term.includes('DFW')) return '#ea580c';    // Deep Orange
    return '#16a34a';                              // Forest Green
  };

  // Render loop using D3
  useEffect(() => {
    if (!svgRef.current || processedData.length === 0) return;

    // Clear SVG elements before drawing
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    // Determine dimensions dynamically from parent container or presets
    const margin = { top: 25, right: 120, bottom: 40, left: 45 };
    const width = 680;
    const height = 280;

    svg
      .attr('viewBox', `0 0 ${width} ${height}`)
      .attr('width', '100%')
      .attr('height', '100%')
      .style('overflow', 'visible');

    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    // Create main drawing group
    const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

    // X scale
    const xScale = d3.scalePoint()
      .domain(processedData.map(d => d.date))
      .range([0, chartWidth]);

    // X Axis
    const xAxis = d3.axisBottom(xScale)
      .tickFormat((d) => {
        try {
          const parts = d.split('-');
          return `${parts[1]}/${parts[2]}`;
        } catch {
          return d;
        }
      })
      .tickSizeOuter(0)
      .tickPadding(10);

    const xAxisG = g.append('g')
      .attr('transform', `translate(0,${chartHeight})`)
      .call(xAxis);

    xAxisG.selectAll('text')
      .attr('class', 'font-mono text-[9px] font-bold fill-slate-500');

    xAxisG.select('.domain')
      .attr('stroke', '#cbd5e1')
      .attr('stroke-width', 1.5);

    xAxisG.selectAll('.tick line')
      .attr('stroke', '#e2e8f0');

    if (chartType === 'trend') {
      // Draw Rank Trend (Inverted scale where Rank #1 is at the top)
      const positions = processedData.flatMap(d => Object.values(d.items)) as number[];
      const minPos = 1;
      const maxPos = Math.max(15, d3.max(positions) ?? 15);

      const yScale = d3.scaleLinear()
        .domain([minPos, maxPos])
        .range([0, chartHeight]); // 1 (Top) maps to 0 height, higher position numbers map further down

      // Y Axis
      const yAxis = d3.axisLeft(yScale)
        .ticks(5)
        .tickFormat(d => `#${d}`)
        .tickSizeOuter(0)
        .tickPadding(8);

      const yAxisG = g.append('g').call(yAxis);

      yAxisG.selectAll('text')
        .attr('class', 'font-mono text-[9px] font-bold fill-slate-500');

      yAxisG.select('.domain')
        .attr('stroke', '#cbd5e1')
        .attr('stroke-width', 1.5);

      yAxisG.selectAll('.tick line')
        .attr('stroke', '#e2e8f0');

      // Gridlines
      g.append('g')
        .attr('class', 'grid')
        .attr('stroke', '#f1f5f9')
        .attr('stroke-width', 1)
        .attr('stroke-dasharray', '3,3')
        .call(
          d3.axisLeft(yScale)
            .ticks(5)
            .tickSize(-chartWidth)
            .tickFormat(() => '')
        )
        .select('.domain').remove();

      // Draw series lines
      selectedTerms.forEach((term) => {
        const lineData = processedData
          .map(d => ({ date: d.date, position: d.items[term] }))
          .filter(d => d.position !== undefined);

        const lineGenerator = d3.line<any>()
          .x(d => xScale(d.date) || 0)
          .y(d => yScale(d.position))
          .curve(d3.curveMonotoneX);

        // Path drawing with stroke transition
        const path = g.append('path')
          .datum(lineData)
          .attr('fill', 'none')
          .attr('stroke', getLineColor(term))
          .attr('stroke-width', 2.5)
          .attr('stroke-linecap', 'round')
          .attr('d', lineGenerator);

        // Animation transition
        const totalLength = (path.node() as SVGPathElement).getTotalLength();
        path
          .attr('stroke-dasharray', `${totalLength} ${totalLength}`)
          .attr('stroke-dashoffset', totalLength)
          .transition()
          .duration(1000)
          .attr('stroke-dashoffset', 0);

        // Label on the right end of the line
        if (lineData.length > 0) {
          const lastPt = lineData[lineData.length - 1];
          g.append('text')
            .attr('x', (xScale(lastPt.date) || 0) + 8)
            .attr('y', yScale(lastPt.position) + 3)
            .attr('class', 'font-sans text-[10px] font-bold')
            .attr('fill', getLineColor(term))
            .text(term.replace(' Zultys', ''));
        }

        // Data points (dots)
        g.selectAll(`.dot-${term.replace(/\s+/g, '-')}`)
          .data(lineData)
          .enter()
          .append('circle')
          .attr('cx', (d: any) => xScale(d.date) || 0)
          .attr('cy', (d: any) => yScale(d.position))
          .attr('r', 0)
          .attr('fill', '#ffffff')
          .attr('stroke', getLineColor(term))
          .attr('stroke-width', 2)
          .transition()
          .delay(400)
          .duration(600)
          .attr('r', 3.5);
      });

      // Interactive Hover Vertical Guideline & Tooltip Trigger
      const hoverLine = g.append('line')
        .attr('stroke', '#64748b')
        .attr('stroke-width', 1)
        .attr('stroke-dasharray', '4,4')
        .attr('y1', 0)
        .attr('y2', chartHeight)
        .style('opacity', 0);

      // Create an overlay to capture hover events
      g.append('rect')
        .attr('width', chartWidth)
        .attr('height', chartHeight)
        .attr('fill', 'transparent')
        .attr('class', 'cursor-pointer')
        .on('mousemove', (event) => {
          const [mouseX] = d3.pointer(event);
          
          // Find closest date point
          const domain = xScale.domain();
          const range = xScale.range();
          const step = xScale.step();
          
          // Calculate index closest to mouse pointer
          const index = Math.max(0, Math.min(domain.length - 1, Math.round(mouseX / step)));
          const closestDate = domain[index];
          const dataForDate = processedData.find(d => d.date === closestDate);

          if (dataForDate) {
            const xPos = xScale(closestDate) || 0;
            hoverLine.attr('x1', xPos).attr('x2', xPos).style('opacity', 1);

            // Set tooltip state
            const items = Object.entries(dataForDate.items).map(([term, position]) => ({
              term,
              position
            }));
            setTooltipContent({
              date: closestDate,
              items
            });
          }
        })
        .on('mouseleave', () => {
          hoverLine.style('opacity', 0);
          setTooltipContent(null);
        });

    } else {
      // Draw Stacked Rank Tiers Distribution
      // Stack keys represent tiers: 't1' (Top 3), 't2' (Rank 4-10), 't3' (Page 2), 't4' (Page 3+)
      const keys = ['t1', 't2', 't3', 't4'];
      const tierColors = ['#22c55e', '#3b82f6', '#f59e0b', '#ef4444']; // Green, Blue, Amber, Red

      const stack = d3.stack<any>()
        .keys(keys)
        .value((d, key) => d.distribution[key]);

      const stackedSeries = stack(processedData);

      // Y Scale for absolute counts
      const maxCount = selectedTerms.length;
      const yScale = d3.scaleLinear()
        .domain([0, maxCount])
        .range([chartHeight, 0]);

      // Y Axis
      const yAxis = d3.axisLeft(yScale)
        .ticks(Math.min(5, maxCount))
        .tickFormat(d3.format('d'))
        .tickSizeOuter(0)
        .tickPadding(8);

      const yAxisG = g.append('g').call(yAxis);

      yAxisG.selectAll('text')
        .attr('class', 'font-mono text-[9px] font-bold fill-slate-500');

      yAxisG.select('.domain')
        .attr('stroke', '#cbd5e1')
        .attr('stroke-width', 1.5);

      // Gridlines
      g.append('g')
        .attr('class', 'grid')
        .attr('stroke', '#f1f5f9')
        .attr('stroke-width', 1)
        .call(
          d3.axisLeft(yScale)
            .ticks(Math.min(5, maxCount))
            .tickSize(-chartWidth)
            .tickFormat(() => '')
        )
        .select('.domain').remove();

      // Render Stacked Bars
      const group = g.selectAll('.layer')
        .data(stackedSeries)
        .enter()
        .append('g')
        .attr('class', 'layer')
        .attr('fill', (d, i) => tierColors[i]);

      const barWidth = Math.max(10, chartWidth / processedData.length * 0.6);

      group.selectAll('rect')
        .data(d => d)
        .enter()
        .append('rect')
        .attr('x', d => (xScale(d.data.date) || 0) - barWidth / 2)
        .attr('y', chartHeight)
        .attr('width', barWidth)
        .attr('height', 0)
        .attr('rx', 2)
        .transition()
        .duration(800)
        .attr('y', d => yScale(d[1]))
        .attr('height', d => yScale(d[0]) - yScale(d[1]));

      // Legend inside the D3 canvas area (on the right)
      const legendLabels = ['Top 3 (Rank 1-3)', 'Page 1 B (Rank 4-10)', 'Page 2 (Rank 11-20)', 'Page 3+ (Rank 21+)'];
      const legendG = g.append('g')
        .attr('transform', `translate(${chartWidth + 12}, 10)`);

      legendLabels.forEach((label, i) => {
        const legRow = legendG.append('g')
          .attr('transform', `translate(0, ${i * 18})`);

        legRow.append('rect')
          .attr('width', 10)
          .attr('height', 10)
          .attr('fill', tierColors[i])
          .attr('rx', 2);

        legRow.append('text')
          .attr('x', 16)
          .attr('y', 9)
          .attr('class', 'font-sans text-[10px] font-semibold fill-slate-600')
          .text(label);
      });

      // Hover overlay for stacked distribution
      g.append('rect')
        .attr('width', chartWidth)
        .attr('height', chartHeight)
        .attr('fill', 'transparent')
        .attr('class', 'cursor-pointer')
        .on('mousemove', (event) => {
          const [mouseX] = d3.pointer(event);
          const domain = xScale.domain();
          const step = xScale.step();
          const index = Math.max(0, Math.min(domain.length - 1, Math.round(mouseX / step)));
          const closestDate = domain[index];
          const dataForDate = processedData.find(d => d.date === closestDate);

          if (dataForDate) {
            const items = Object.entries(dataForDate.items).map(([term, position]) => ({
              term,
              position
            }));
            setTooltipContent({
              date: closestDate,
              items
            });
          }
        })
        .on('mouseleave', () => {
          setTooltipContent(null);
        });
    }

  }, [processedData, chartType, selectedTerms]);

  return (
    <div className="bg-slate-50 border border-slate-150/80 rounded-2xl p-5 shadow-inner space-y-4">
      {/* Chart Headers & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/60 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-blue-50 text-blue-600 rounded-lg">
            {chartType === 'trend' ? <LineChart className="h-4 w-4" /> : <Layers className="h-4 w-4" />}
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider font-mono">
              D3.js Rank Distribution & Comparisons
            </h4>
            <p className="text-[10px] text-slate-500">
              Interactive timeline analysis showing SEO visibility tiers.
            </p>
          </div>
        </div>

        {/* Chart View Toggle Switch */}
        <div className="flex bg-slate-200/70 p-0.5 rounded-lg border border-slate-300/40">
          <button
            onClick={() => { setChartType('trend'); setTooltipContent(null); }}
            className={`px-3 py-1 rounded-md text-[10px] font-bold transition flex items-center gap-1.5 cursor-pointer ${
              chartType === 'trend'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <LineChart className="h-3 w-3" />
            Position Trends
          </button>
          <button
            onClick={() => { setChartType('distribution'); setTooltipContent(null); }}
            className={`px-3 py-1 rounded-md text-[10px] font-bold transition flex items-center gap-1.5 cursor-pointer ${
              chartType === 'distribution'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Layers className="h-3 w-3" />
            Tier Distribution
          </button>
        </div>
      </div>

      {/* Keywords Selector Checklist */}
      <div className="bg-white/80 p-3 rounded-xl border border-slate-200/50 flex flex-wrap items-center gap-4">
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mr-1">Include Terms:</span>
        <div className="flex flex-wrap gap-2.5">
          {availableTerms.map(term => {
            const isChecked = selectedTerms.includes(term);
            return (
              <button
                key={term}
                onClick={() => toggleTerm(term)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-[10px] font-semibold transition cursor-pointer ${
                  isChecked
                    ? 'bg-slate-50 border-slate-300 text-slate-800'
                    : 'bg-slate-100/50 border-slate-100 text-slate-400 hover:border-slate-200 hover:bg-slate-100'
                }`}
              >
                {isChecked ? (
                  <span className="text-blue-600 font-bold">✔</span>
                ) : (
                  <span className="text-slate-300">☐</span>
                )}
                <span className="font-mono">{term}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Primary SVG Chart Workspace */}
      <div ref={containerRef} className="relative min-h-[280px] bg-white border border-slate-150/50 rounded-2xl p-4 overflow-hidden shadow-inner flex items-center justify-center">
        {processedData.length === 0 ? (
          <div className="text-center text-slate-400 py-10 space-y-2">
            <HelpCircle className="h-8 w-8 text-slate-300 mx-auto" />
            <p className="text-xs font-bold text-slate-600">No Keywords Selected</p>
            <p className="text-3xs text-slate-400 max-w-xs">Please toggle at least one search query to visualize active rank position metrics.</p>
          </div>
        ) : (
          <svg ref={svgRef} className="w-full h-auto" />
        )}

        {/* Live Interactive D3 Tooltip Overlay */}
        {tooltipContent && (
          <div className="absolute top-4 left-4 bg-slate-900/95 text-white rounded-xl p-3 text-3xs space-y-2 shadow-xl border border-slate-800 pointer-events-none max-w-[200px] backdrop-blur-xs">
            <div className="border-b border-slate-800 pb-1 flex justify-between gap-4 font-mono font-bold text-[9px] text-slate-400">
              <span>Date:</span>
              <span>{tooltipContent.date}</span>
            </div>
            <div className="space-y-1.5">
              {tooltipContent.items.map(item => (
                <div key={item.term} className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-1.5 truncate">
                    <span 
                      className="w-1.5 h-1.5 rounded-full shrink-0" 
                      style={{ backgroundColor: getLineColor(item.term) }} 
                    />
                    <span className="font-mono truncate max-w-[100px] text-slate-200" title={item.term}>
                      {item.term.replace(' Zultys', '')}
                    </span>
                  </div>
                  <span className="font-mono font-bold text-amber-400">
                    #{item.position.toFixed(1)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center gap-1.5 text-slate-400 text-3xs font-mono justify-end">
        <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <span>D3.js canvas fully bound to active rank indices</span>
      </div>
    </div>
  );
}
