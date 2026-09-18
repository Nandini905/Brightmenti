import React, { useState } from 'react';

interface Node {
  id: string;
  label: string;
  sub: string;
  cx: number;
  cy: number;
  color: string;
  details: string;
}

const NODES: Node[] = [
  {
    id: 'marketing',
    label: 'Growth Engine',
    sub: 'Paid Ads & Technical SEO',
    cx: 200,
    cy: 120,
    color: '#5B7FFF',
    details: 'Full-funnel paid acquisition and programmatic SEO that feeds high-intent pipeline.'
  },
  {
    id: 'web',
    label: 'Commerce Architecture',
    sub: 'Next.js & Shopify Plus',
    cx: 600,
    cy: 120,
    color: '#5B7FFF',
    details: 'Sub-second headless storefronts and modular web applications engineered for CRO.'
  },
  {
    id: 'whatsapp',
    label: 'WhatsApp Automation',
    sub: 'Conversational Commerce',
    cx: 660,
    cy: 360,
    color: '#5B7FFF',
    details: 'Automated retention, instant cart recovery, and CRM data synchronization.'
  },
  {
    id: 'software',
    label: 'Custom Software & APIs',
    sub: 'SaaS, Portals & Microservices',
    cx: 400,
    cy: 480,
    color: '#5B7FFF',
    details: 'Bespoke backend logic, multi-tenant databases, and enterprise role permissions.'
  },
  {
    id: 'cloud',
    label: 'Cloud Infrastructure',
    sub: 'DevOps & 99.99% Reliability',
    cx: 140,
    cy: 360,
    color: '#5B7FFF',
    details: 'Fault-tolerant edge CDN, zero-downtime deployment pipelines, and telemetry.'
  }
];

export default function EcosystemDiagram() {
  const [activeNode, setActiveNode] = useState<Node | null>(NODES[0]);

  return (
    <div className="relative w-full max-w-4xl mx-auto p-4 sm:p-8 rounded-3xl bg-[#121214]/90 border border-white/[0.08] backdrop-blur-xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#5B7FFF]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 text-center mb-6">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-[11px] font-mono uppercase tracking-[0.2em] text-[#5B7FFF]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#5B7FFF] animate-ping" />
          Interactive Architecture Map
        </span>
        <h3 className="font-display text-[22px] sm:text-[28px] font-bold text-[#F5F5F4] mt-2">
          The Connected Digital Ecosystem
        </h3>
        <p className="text-[14px] text-[#9A9A9E] max-w-md mx-auto mt-1">
          Hover or tap any node to inspect system integrations and compounding workflows.
        </p>
      </div>

      {/* SVG Diagram Canvas */}
      <div className="relative w-full aspect-[800/560] max-h-[500px]">
        <svg
          viewBox="0 0 800 560"
          className="w-full h-full select-none"
          role="img"
          aria-label="Brightmenti Connected Digital Ecosystem Diagram"
        >
          <defs>
            <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#5B7FFF" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#5B7FFF" stopOpacity="0" />
            </radialGradient>
          </defs>

          <circle cx="400" cy="270" r="100" fill="url(#centerGlow)" className="animate-pulse" />

          {NODES.map((node) => {
            const isActive = activeNode?.id === node.id;
            return (
              <g key={`line-${node.id}`}>
                <line
                  x1="400"
                  y1="270"
                  x2={node.cx}
                  y2={node.cy}
                  stroke={isActive ? '#5B7FFF' : 'rgba(255, 255, 255, 0.12)'}
                  strokeWidth={isActive ? '2.5' : '1.5'}
                  strokeDasharray={isActive ? '6 4' : undefined}
                  className="transition-all duration-300"
                />
                <line
                  x1={node.cx}
                  y1={node.cy}
                  x2={NODES[(NODES.indexOf(node) + 1) % NODES.length].cx}
                  y2={NODES[(NODES.indexOf(node) + 1) % NODES.length].cy}
                  stroke="rgba(255, 255, 255, 0.05)"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />
              </g>
            );
          })}

          {/* Central Hub */}
          <g className="cursor-default">
            <circle
              cx="400"
              cy="270"
              r="48"
              fill="#17171A"
              stroke="#5B7FFF"
              strokeWidth="2.5"
              className="drop-shadow-[0_0_20px_rgba(91,127,255,0.4)]"
            />
            <circle cx="400" cy="270" r="40" fill="#121214" />
            <text
              x="400"
              y="266"
              textAnchor="middle"
              fill="#FFFFFF"
              fontSize="12"
              fontWeight="bold"
              fontFamily="sans-serif"
            >
              BRIGHTMENTI
            </text>
            <text
              x="400"
              y="282"
              textAnchor="middle"
              fill="#5B7FFF"
              fontSize="9"
              fontFamily="monospace"
              letterSpacing="0.1em"
            >
              CORE ENGINE
            </text>
          </g>

          {/* Peripheral Nodes */}
          {NODES.map((node) => {
            const isActive = activeNode?.id === node.id;
            return (
              <g
                key={node.id}
                onClick={() => setActiveNode(node)}
                onMouseEnter={() => setActiveNode(node)}
                onFocus={() => setActiveNode(node)}
                tabIndex={0}
                role="button"
                aria-label={`${node.label}: ${node.sub}`}
                className="cursor-pointer focus:outline-none"
              >
                <circle
                  cx={node.cx}
                  cy={node.cy}
                  r={isActive ? '34' : '28'}
                  fill="#17171A"
                  stroke={isActive ? '#5B7FFF' : 'rgba(255, 255, 255, 0.16)'}
                  strokeWidth={isActive ? '2.5' : '1.5'}
                  className="transition-all duration-300 shadow-lg"
                />
                <circle
                  cx={node.cx}
                  cy={node.cy}
                  r={isActive ? '26' : '22'}
                  fill={isActive ? 'rgba(91, 127, 255, 0.15)' : '#121214'}
                  className="transition-colors duration-300"
                />
                <circle
                  cx={node.cx}
                  cy={node.cy}
                  r="4"
                  fill="#5B7FFF"
                  className={isActive ? 'animate-ping' : ''}
                />
                <text
                  x={node.cx}
                  y={node.cy + 46}
                  textAnchor="middle"
                  fill={isActive ? '#FFFFFF' : '#F5F5F4'}
                  fontSize="12"
                  fontWeight="600"
                  className="transition-colors"
                >
                  {node.label}
                </text>
                <text
                  x={node.cx}
                  y={node.cy + 60}
                  textAnchor="middle"
                  fill={isActive ? '#5B7FFF' : '#9A9A9E'}
                  fontSize="10"
                  fontFamily="monospace"
                  className="transition-colors"
                >
                  {node.sub}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {activeNode && (
        <div className="mt-4 p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <span className="h-2 w-2 rounded-full bg-[#5B7FFF]" />
              <span className="font-display text-[15px] font-bold text-[#F5F5F4]">
                {activeNode.label}
              </span>
              <span className="text-[12px] font-mono text-[#5B7FFF]">
                [{activeNode.sub}]
              </span>
            </div>
            <p className="text-[13px] text-[#9A9A9E] mt-1">
              {activeNode.details}
            </p>
          </div>
          <div className="flex-shrink-0">
            <span className="text-[11px] font-mono text-white/50 px-3 py-1.5 rounded-lg border border-white/[0.08] bg-black/40">
              Synced with Brightmenti Core
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
