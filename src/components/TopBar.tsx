import React from 'react';
import { Download } from 'lucide-react';

interface TopBarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onExportClick: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ activeTab, onTabChange, onExportClick }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between gap-6 px-6 py-3.5 bg-slate-950/85 border-b border-slate-800/80 backdrop-blur-none text-slate-200">
      {/* Zone 1: Brand Wordmark (Single text element) */}
      <div className="flex items-center gap-3 shrink-0">
        <a href="#deck" className="text-base font-bold tracking-tight text-white whitespace-nowrap">
          ISHMIN EV EXPO STUDIO
        </a>
        <span className="hidden sm:inline-block text-xs font-mono text-slate-400 border border-slate-800 rounded px-1.5 py-0.5">
          45.5 m² Corner Space (7m × 6.5m)
        </span>
      </div>

      {/* Zone 2: Navigation Links (Single-line whitespace-nowrap) */}
      <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
        <button
          onClick={() => onTabChange('lighting')}
          className={`hover:text-white transition-colors whitespace-nowrap shrink-0 ${
            activeTab === 'lighting' ? 'text-cyan-400 font-semibold' : ''
          }`}
        >
          Lighting Rig
        </button>
        <button
          onClick={() => onTabChange('screens')}
          className={`hover:text-white transition-colors whitespace-nowrap shrink-0 ${
            activeTab === 'screens' ? 'text-cyan-400 font-semibold' : ''
          }`}
        >
          Tech Screens
        </button>
        <button
          onClick={() => onTabChange('vehicle')}
          className={`hover:text-white transition-colors whitespace-nowrap shrink-0 ${
            activeTab === 'vehicle' ? 'text-cyan-400 font-semibold' : ''
          }`}
        >
          EV Trike & Deck
        </button>
        <button
          onClick={() => onTabChange('bom')}
          className={`hover:text-white transition-colors whitespace-nowrap shrink-0 ${
            activeTab === 'bom' ? 'text-cyan-400 font-semibold' : ''
          }`}
        >
          BOM & Budget
        </button>
      </nav>

      {/* Zone 3: Primary Action */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={onExportClick}
          className="flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold text-slate-900 bg-cyan-400 hover:bg-cyan-300 rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer shadow-sm"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export Specs & BOM</span>
        </button>
      </div>
    </header>
  );
};
