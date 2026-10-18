import React, { useState } from 'react';
import {
  Sun,
  Tv,
  Car,
  Calculator,
  ChevronDown,
  ChevronUp,
  RotateCw,
  Eye,
  Grid,
  Zap,
  Play,
  Pause,
  DollarSign,
  Layers,
  Sparkles,
} from 'lucide-react';
import {
  LightingState,
  ScreenState,
  VehicleState,
  CameraPreset,
  PaintColor,
  ScreenMode70,
  ScreenMode50Left,
  ScreenMode50Right,
} from '../types/expo';
import { PAINT_OPTIONS } from '../three/evTrike';
import { EXPO_BOM_DATA, BOOTH_COST_COMPARISON } from '../data/bomData';

interface ControlDockProps {
  lightingState: LightingState;
  setLightingState: React.Dispatch<React.SetStateAction<LightingState>>;
  screenState: ScreenState;
  setScreenState: React.Dispatch<React.SetStateAction<ScreenState>>;
  vehicleState: VehicleState;
  setVehicleState: React.Dispatch<React.SetStateAction<VehicleState>>;
  cameraPreset: CameraPreset;
  setCameraPreset: (preset: CameraPreset) => void;
  showCADGrid: boolean;
  setShowCADGrid: (show: boolean) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const ControlDock: React.FC<ControlDockProps> = ({
  lightingState,
  setLightingState,
  screenState,
  setScreenState,
  vehicleState,
  setVehicleState,
  cameraPreset,
  setCameraPreset,
  showCADGrid,
  setShowCADGrid,
  activeTab,
  setActiveTab,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Lighting Presets Handlers
  const applyLightingPreset = (preset: LightingState['preset']) => {
    if (preset === 'daylight') {
      setLightingState((prev) => ({
        ...prev,
        preset: 'daylight',
        spot1Intensity: 3.8,
        spot1Color: '#ffffff',
        spot1Angle: 0.42,
        spot2Intensity: 3.5,
        spot2Color: '#f8fafc',
        spot2Angle: 0.42,
        ambientFloorIntensity: 0.65,
        floorUnderglowColor: '#ffffff',
        trikeLightsOn: true,
      }));
    } else if (preset === 'dramatic_unveil') {
      setLightingState((prev) => ({
        ...prev,
        preset: 'dramatic_unveil',
        spot1Intensity: 5.5,
        spot1Color: '#e0f2fe',
        spot1Angle: 0.32,
        spot2Intensity: 4.8,
        spot2Color: '#bae6fd',
        spot2Angle: 0.35,
        ambientFloorIntensity: 0.2,
        floorUnderglowColor: '#0284c7',
        trikeLightsOn: true,
      }));
    } else if (preset === 'cyber_electric') {
      setLightingState((prev) => ({
        ...prev,
        preset: 'cyber_electric',
        spot1Intensity: 4.2,
        spot1Color: '#06b6d4',
        spot1Angle: 0.4,
        spot2Intensity: 4.0,
        spot2Color: '#38bdf8',
        spot2Angle: 0.4,
        ambientFloorIntensity: 0.3,
        floorUnderglowColor: '#06b6d4',
        trikeLightsOn: true,
      }));
    } else if (preset === 'eco_minimal') {
      setLightingState((prev) => ({
        ...prev,
        preset: 'eco_minimal',
        spot1Intensity: 2.2,
        spot1Color: '#f1f5f9',
        spot1Angle: 0.45,
        spot2Intensity: 2.0,
        spot2Color: '#e2e8f0',
        spot2Angle: 0.45,
        ambientFloorIntensity: 0.45,
        floorUnderglowColor: '#10b981',
        trikeLightsOn: false,
      }));
    }
  };

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[94vw] max-w-[920px] z-30 transition-all duration-300">
      {/* Collapse / Expand Toggle Bar */}
      <div className="flex items-center justify-between px-3 py-1 bg-slate-950/90 border-t border-x border-slate-800 rounded-t-lg text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-slate-300">EXPO CONTROLS</span>
          <span className="text-slate-600">·</span>
          <span>45.5 m² Modular Platform</span>
        </div>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="flex items-center gap-1 px-2 py-0.5 text-xs text-cyan-400 hover:text-cyan-300 hover:bg-slate-800/80 rounded transition-colors cursor-pointer"
        >
          {isCollapsed ? (
            <>
              <ChevronUp className="w-3.5 h-3.5" />
              <span>Show Controls</span>
            </>
          ) : (
            <>
              <ChevronDown className="w-3.5 h-3.5" />
              <span>Hide Controls</span>
            </>
          )}
        </button>
      </div>

      {!isCollapsed && (
        <div className="bg-slate-950/95 border border-slate-800 rounded-b-lg shadow-2xl p-3.5 text-slate-200">
          {/* Top Row: Camera Presets & CAD Grid */}
          <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-3 border-b border-slate-800/80">
            <div className="flex items-center gap-1.5 overflow-x-auto py-0.5">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mr-1">Camera:</span>
              <button
                onClick={() => setCameraPreset('hero34')}
                className={`px-2.5 py-1 text-xs rounded transition-colors cursor-pointer ${
                  cameraPreset === 'hero34' ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
                }`}
              >
                Hero 3/4
              </button>
              <button
                onClick={() => setCameraPreset('deck')}
                className={`px-2.5 py-1 text-xs rounded transition-colors cursor-pointer ${
                  cameraPreset === 'deck' ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
                }`}
              >
                Angled Deck
              </button>
              <button
                onClick={() => setCameraPreset('screens')}
                className={`px-2.5 py-1 text-xs rounded transition-colors cursor-pointer ${
                  cameraPreset === 'screens' ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
                }`}
              >
                Wall Screens (W1 & W2)
              </button>
              <button
                onClick={() => setCameraPreset('counter')}
                className={`px-2.5 py-1 text-xs rounded transition-colors cursor-pointer ${
                  cameraPreset === 'counter' ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
                }`}
              >
                Left Corner Counter
              </button>
              <button
                onClick={() => setCameraPreset('lounge')}
                className={`px-2.5 py-1 text-xs rounded transition-colors cursor-pointer ${
                  cameraPreset === 'lounge' ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
                }`}
              >
                Right Corner Lounge
              </button>
              <button
                onClick={() => setCameraPreset('cockpit')}
                className={`px-2.5 py-1 text-xs rounded transition-colors cursor-pointer ${
                  cameraPreset === 'cockpit' ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
                }`}
              >
                Cockpit Yoke
              </button>
              <button
                onClick={() => setCameraPreset('topdown')}
                className={`px-2.5 py-1 text-xs rounded transition-colors cursor-pointer ${
                  cameraPreset === 'topdown' ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
                }`}
              >
                Top Floorplan
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowCADGrid(!showCADGrid)}
                className={`flex items-center gap-1.5 px-2.5 py-1 text-xs rounded transition-colors cursor-pointer border ${
                  showCADGrid
                    ? 'bg-cyan-950 border-cyan-500 text-cyan-300'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <Grid className="w-3.5 h-3.5" />
                <span>1m Floor Grid</span>
              </button>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex items-center gap-1 p-1 bg-slate-900 rounded-lg mb-3">
            <button
              onClick={() => setActiveTab('lighting')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                activeTab === 'lighting' ? 'bg-slate-800 text-cyan-300 shadow-sm' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Sun className="w-3.5 h-3.5" />
              <span>Lighting Rig</span>
            </button>
            <button
              onClick={() => setActiveTab('screens')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                activeTab === 'screens' ? 'bg-slate-800 text-cyan-300 shadow-sm' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Tv className="w-3.5 h-3.5" />
              <span>Screens & Media</span>
            </button>
            <button
              onClick={() => setActiveTab('vehicle')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                activeTab === 'vehicle' ? 'bg-slate-800 text-cyan-300 shadow-sm' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Car className="w-3.5 h-3.5" />
              <span>EV Trike & Deck</span>
            </button>
            <button
              onClick={() => setActiveTab('bom')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                activeTab === 'bom' ? 'bg-slate-800 text-cyan-300 shadow-sm' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>BOM & Budget</span>
            </button>
          </div>

          {/* Tab 1: Lighting Rig */}
          {activeTab === 'lighting' && (
            <div className="space-y-3">
              {/* Presets */}
              <div>
                <span className="text-xs text-slate-400 block mb-1.5">Expo Ambience Presets:</span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <button
                    onClick={() => applyLightingPreset('daylight')}
                    className={`px-2.5 py-1.5 text-xs rounded border transition-colors cursor-pointer text-left ${
                      lightingState.preset === 'daylight'
                        ? 'border-cyan-400 bg-cyan-950/40 text-cyan-200 font-semibold'
                        : 'border-slate-800 bg-slate-900 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="font-medium">Showroom Daylight</div>
                    <div className="text-[10px] text-slate-400 font-mono">5600K High-CRI</div>
                  </button>
                  <button
                    onClick={() => applyLightingPreset('dramatic_unveil')}
                    className={`px-2.5 py-1.5 text-xs rounded border transition-colors cursor-pointer text-left ${
                      lightingState.preset === 'dramatic_unveil'
                        ? 'border-cyan-400 bg-cyan-950/40 text-cyan-200 font-semibold'
                        : 'border-slate-800 bg-slate-900 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="font-medium">Dramatic Unveil</div>
                    <div className="text-[10px] text-slate-400 font-mono">Pinpoint Focus</div>
                  </button>
                  <button
                    onClick={() => applyLightingPreset('cyber_electric')}
                    className={`px-2.5 py-1.5 text-xs rounded border transition-colors cursor-pointer text-left ${
                      lightingState.preset === 'cyber_electric'
                        ? 'border-cyan-400 bg-cyan-950/40 text-cyan-200 font-semibold'
                        : 'border-slate-800 bg-slate-900 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="font-medium">Cyber Electric</div>
                    <div className="text-[10px] text-slate-400 font-mono">Neon Cyan Glow</div>
                  </button>
                  <button
                    onClick={() => applyLightingPreset('eco_minimal')}
                    className={`px-2.5 py-1.5 text-xs rounded border transition-colors cursor-pointer text-left ${
                      lightingState.preset === 'eco_minimal'
                        ? 'border-cyan-400 bg-cyan-950/40 text-cyan-200 font-semibold'
                        : 'border-slate-800 bg-slate-900 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="font-medium">Eco Low-Power</div>
                    <div className="text-[10px] text-slate-400 font-mono">220W Total Load</div>
                  </button>
                </div>
              </div>

              {/* Sliders & Spotlight Controls */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-slate-800/60">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-400">Spotlight 1 (Left 150W):</span>
                    <span className="font-mono text-cyan-400">{lightingState.spot1Intensity.toFixed(1)}x</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="8"
                    step="0.2"
                    value={lightingState.spot1Intensity}
                    onChange={(e) =>
                      setLightingState((prev) => ({ ...prev, spot1Intensity: parseFloat(e.target.value) }))
                    }
                    className="w-full accent-cyan-400 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-400">Spotlight 2 (Right 150W):</span>
                    <span className="font-mono text-cyan-400">{lightingState.spot2Intensity.toFixed(1)}x</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="8"
                    step="0.2"
                    value={lightingState.spot2Intensity}
                    onChange={(e) =>
                      setLightingState((prev) => ({ ...prev, spot2Intensity: parseFloat(e.target.value) }))
                    }
                    className="w-full accent-cyan-400 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-400">Beam Focus Angle:</span>
                    <span className="font-mono text-cyan-400">{Math.round((lightingState.spot1Angle * 180) / Math.PI)}°</span>
                  </div>
                  <input
                    type="range"
                    min="0.2"
                    max="0.65"
                    step="0.02"
                    value={lightingState.spot1Angle}
                    onChange={(e) => {
                      const ang = parseFloat(e.target.value);
                      setLightingState((prev) => ({ ...prev, spot1Angle: ang, spot2Angle: ang }));
                    }}
                    className="w-full accent-cyan-400 cursor-pointer"
                  />
                </div>
              </div>

              {/* Underglow & Trike Headlights */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-800/60">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400">Deck Underglow:</span>
                  {['#06b6d4', '#3b82f6', '#10b981', '#f59e0b', '#ffffff'].map((color) => (
                    <button
                      key={color}
                      onClick={() => setLightingState((prev) => ({ ...prev, floorUnderglowColor: color }))}
                      className={`w-5 h-5 rounded-full border transition-transform cursor-pointer ${
                        lightingState.floorUnderglowColor === color ? 'scale-125 border-white ring-2 ring-cyan-500' : 'border-transparent'
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() =>
                      setLightingState((prev) => ({ ...prev, trikeLightsOn: !prev.trikeLightsOn }))
                    }
                    className={`flex items-center gap-1.5 px-3 py-1 text-xs rounded border transition-colors cursor-pointer ${
                      lightingState.trikeLightsOn
                        ? 'bg-cyan-950/60 border-cyan-400 text-cyan-300 font-semibold'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Zap className="w-3.5 h-3.5" />
                    <span>Vehicle LEDs: {lightingState.trikeLightsOn ? 'ACTIVE' : 'OFF'}</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Screens & Media */}
          {activeTab === 'screens' && (
            <div className="space-y-3">
              {/* 70" Main Video Wall Mode */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="font-semibold text-cyan-300">70" Screen (Wall 1 - Back Wall):</span>
                  <span className="text-slate-500 text-[11px] font-mono">16:9 UHD Flush Wall Display</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {(
                    [
                      { id: 'powertrain', label: 'Powertrain Vector', sub: 'Torque & Hub Motors' },
                      { id: 'battery', label: 'Solid-State Battery', sub: '800V Thermal Pack' },
                      { id: 'aerodynamics', label: 'Aero Dynamics', sub: 'Cd 0.28 Airflow' },
                      { id: 'brand', label: 'Brand Manifesto', sub: 'Apex Nexus-3' },
                    ] as const
                  ).map((ch) => (
                    <button
                      key={ch.id}
                      onClick={() => setScreenState((prev) => ({ ...prev, main70Mode: ch.id as ScreenMode70 }))}
                      className={`px-2.5 py-1.5 text-xs rounded border text-left transition-colors cursor-pointer ${
                        screenState.main70Mode === ch.id
                          ? 'border-cyan-400 bg-cyan-950/50 text-cyan-200 font-semibold'
                          : 'border-slate-800 bg-slate-900 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <div className="font-medium">{ch.label}</div>
                      <div className="text-[10px] text-slate-400">{ch.sub}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* 50" Screens on Wall 2 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-800/60">
                <div>
                  <span className="text-xs text-slate-400 block mb-1">50" Screen 1 (Wall 2): Vehicle Specs</span>
                  <div className="flex gap-2">
                    {(['specs', 'chassis', 'safety'] as ScreenMode50Left[]).map((mode) => (
                      <button
                        key={mode}
                        onClick={() => setScreenState((prev) => ({ ...prev, left50Mode: mode }))}
                        className={`flex-1 py-1 text-xs rounded border uppercase font-mono transition-colors cursor-pointer ${
                          screenState.left50Mode === mode
                            ? 'border-cyan-400 bg-cyan-950/40 text-cyan-300'
                            : 'border-slate-800 bg-slate-900 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        {mode}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-xs text-slate-400 block mb-1">50" Screen 2 (Wall 2): Modular Eco Architecture</span>
                  <div className="flex gap-2">
                    {(['modular_bom', 'sustainability', 'logistics'] as ScreenMode50Right[]).map((mode) => (
                      <button
                        key={mode}
                        onClick={() => setScreenState((prev) => ({ ...prev, right50Mode: mode }))}
                        className={`flex-1 py-1 text-xs rounded border uppercase font-mono transition-colors cursor-pointer ${
                          screenState.right50Mode === mode
                            ? 'border-emerald-400 bg-emerald-950/40 text-emerald-300'
                            : 'border-slate-800 bg-slate-900 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        {mode.replace('_', ' ')}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Playback & Brightness */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-800/60">
                <button
                  onClick={() => setScreenState((prev) => ({ ...prev, isPlaying: !prev.isPlaying }))}
                  className={`flex items-center gap-2 px-3 py-1 text-xs rounded border transition-colors cursor-pointer ${
                    screenState.isPlaying
                      ? 'border-cyan-500 bg-cyan-950/60 text-cyan-300'
                      : 'border-slate-700 bg-slate-800 text-slate-300'
                  }`}
                >
                  {screenState.isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  <span>{screenState.isPlaying ? 'Animations Live' : 'Paused'}</span>
                </button>

                <div className="flex items-center gap-2 w-48">
                  <span className="text-xs text-slate-400">Brightness:</span>
                  <input
                    type="range"
                    min="0.4"
                    max="1.0"
                    step="0.05"
                    value={screenState.brightness}
                    onChange={(e) => setScreenState((prev) => ({ ...prev, brightness: parseFloat(e.target.value) }))}
                    className="w-full accent-cyan-400 cursor-pointer"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: EV Trike & Deck */}
          {activeTab === 'vehicle' && (
            <div className="space-y-3">
              {/* Paint Swatches */}
              <div>
                <span className="text-xs text-slate-400 block mb-1.5">EV Trike Automotive Finish:</span>
                <div className="flex flex-wrap items-center gap-2">
                  {(Object.keys(PAINT_OPTIONS) as PaintColor[]).map((pKey) => {
                    const opt = PAINT_OPTIONS[pKey];
                    const isSelected = vehicleState.paintColor === pKey;
                    return (
                      <button
                        key={pKey}
                        onClick={() => setVehicleState((prev) => ({ ...prev, paintColor: pKey }))}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded border text-xs transition-all cursor-pointer ${
                          isSelected
                            ? 'border-cyan-400 bg-slate-900 font-semibold text-white ring-1 ring-cyan-500'
                            : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-white/20 shadow-inner"
                          style={{ backgroundColor: opt.hex }}
                        />
                        <span>{opt.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Angled Presentation Deck Controls */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-800/60">
                <div className="p-2.5 bg-slate-900/80 rounded border border-slate-800">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold text-slate-300">Vehicle Size & Deck:</span>
                    <span className="text-xs font-mono text-cyan-400">3500mm L × 1600mm W</span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Static 5° presentation incline perfectly showcases the 3.5m length and 1.6m width without requiring a high-cost motorized turntable.
                  </p>
                </div>

                <div className="p-2.5 bg-slate-900/80 rounded border border-slate-800 flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold text-slate-300">Presentation Mode:</span>
                    <span className="text-xs font-mono text-emerald-400 font-bold">STATIC DISPLAY</span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Static position welcoming visitors from the open aisle corner with optimal sightlines from both Wall 1 & Wall 2 screens.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Tab 4: BOM & Budget Breakdown */}
          {activeTab === 'bom' && (
            <div className="space-y-3">
              {/* Cost Savings KPI Strip (Indian Rupees) */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <div className="p-2 bg-slate-900/90 rounded border border-slate-800">
                  <div className="text-[10px] text-slate-400 uppercase tracking-wider">Modular Booth Cost</div>
                  <div className="text-base font-bold text-white font-mono tabular-nums">
                    ₹{BOOTH_COST_COMPARISON.modularSetupCost.toLocaleString('en-IN')}
                  </div>
                  <div className="text-[10px] text-emerald-400">Complete 4-day rental package</div>
                </div>

                <div className="p-2 bg-slate-900/90 rounded border border-slate-800">
                  <div className="text-[10px] text-slate-400 uppercase tracking-wider">Traditional Truss Booth</div>
                  <div className="text-base font-bold text-slate-400 font-mono tabular-nums line-through">
                    ₹{BOOTH_COST_COMPARISON.traditionalTotalCost.toLocaleString('en-IN')}
                  </div>
                  <div className="text-[10px] text-rose-400 font-mono">+₹4.9L rigging hoists</div>
                </div>

                <div className="p-2 bg-emerald-950/40 rounded border border-emerald-500/30">
                  <div className="text-[10px] text-emerald-300 uppercase tracking-wider">Net Budget Saved</div>
                  <div className="text-base font-bold text-emerald-400 font-mono tabular-nums">
                    ₹{BOOTH_COST_COMPARISON.netSavingsRupees.toLocaleString('en-IN')}
                  </div>
                  <div className="text-[10px] text-emerald-400 font-semibold">74.1% Budget Reduction</div>
                </div>

                <div className="p-2 bg-cyan-950/40 rounded border border-cyan-500/30">
                  <div className="text-[10px] text-cyan-300 uppercase tracking-wider">Power Consumption</div>
                  <div className="text-base font-bold text-cyan-400 font-mono tabular-nums">480 Watts</div>
                  <div className="text-[10px] text-cyan-300">Runs off 10A socket (88% less)</div>
                </div>
              </div>

              {/* Summary Table of Modular Items */}
              <div className="max-h-36 overflow-y-auto rounded border border-slate-800 text-xs">
                <table className="w-full text-left">
                  <thead className="bg-slate-900 text-slate-400 sticky top-0">
                    <tr>
                      <th className="p-1.5 pl-3">Item / Category</th>
                      <th className="p-1.5">Qty</th>
                      <th className="p-1.5">Watts</th>
                      <th className="p-1.5">Rental (INR)</th>
                      <th className="p-1.5 pr-3 text-right">Advantage</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-mono tabular-nums text-slate-300">
                    {EXPO_BOM_DATA.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-900/50">
                        <td className="p-1.5 pl-3 font-sans">
                          <span className="font-medium text-slate-200">{item.name}</span>
                          <span className="text-[10px] text-slate-500 block truncate max-w-xs">{item.spec}</span>
                        </td>
                        <td className="p-1.5 text-slate-400">
                          {item.quantity} {item.unit}
                        </td>
                        <td className="p-1.5 text-cyan-400">{item.powerWatts > 0 ? `${item.powerWatts}W` : '0W'}</td>
                        <td className="p-1.5 text-white font-semibold">₹{(item.unitCostRental * item.quantity).toLocaleString('en-IN')}</td>
                        <td className="p-1.5 pr-3 text-right font-sans text-[11px] text-slate-400">{item.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
