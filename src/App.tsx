import React, { useState } from 'react';
import { ThreeCanvas } from './three/ThreeCanvas';
import { TopBar } from './components/TopBar';
import { ControlDock } from './components/ControlDock';
import { BomExportModal } from './components/BomExportModal';
import { LightingState, ScreenState, VehicleState, CameraPreset } from './types/expo';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('vehicle');
  const [isExportOpen, setIsExportOpen] = useState<boolean>(false);
  const [cameraPreset, setCameraPreset] = useState<CameraPreset>('hero34');
  const [showCADGrid, setShowCADGrid] = useState<boolean>(false);

  // Lighting State
  const [lightingState, setLightingState] = useState<LightingState>({
    preset: 'daylight',
    spot1Intensity: 3.8,
    spot1Color: '#ffffff',
    spot1Angle: 0.42,
    spot2Intensity: 3.5,
    spot2Color: '#f8fafc',
    spot2Angle: 0.42,
    ambientFloorIntensity: 0.65,
    floorUnderglowColor: '#06b6d4',
    trikeLightsOn: true,
  });

  // Screen Multimedia State
  const [screenState, setScreenState] = useState<ScreenState>({
    main70Mode: 'powertrain',
    left50Mode: 'specs',
    right50Mode: 'modular_bom',
    brightness: 1.0,
    isPlaying: true,
  });

  // Vehicle Presentation State (Static Presentation as requested)
  const [vehicleState, setVehicleState] = useState<VehicleState>({
    paintColor: 'racing_red',
    deckRotationSpeed: 0.5,
    isRotating: false, // Car is static as requested
    deckAngle: 5,
  });

  // Click on screen in 3D viewport
  const handleSelectScreen = (screen: '70' | '50L' | '50R') => {
    setActiveTab('screens');
    setCameraPreset('screens');
    if (screen === '70') {
      // Cycle through 70" modes
      setScreenState((prev) => {
        const modes = ['powertrain', 'battery', 'aerodynamics', 'brand'] as const;
        const nextIdx = (modes.indexOf(prev.main70Mode) + 1) % modes.length;
        return { ...prev, main70Mode: modes[nextIdx] };
      });
    } else if (screen === '50L') {
      setScreenState((prev) => {
        const modes = ['specs', 'chassis', 'safety'] as const;
        const nextIdx = (modes.indexOf(prev.left50Mode) + 1) % modes.length;
        return { ...prev, left50Mode: modes[nextIdx] };
      });
    } else if (screen === '50R') {
      setScreenState((prev) => {
        const modes = ['modular_bom', 'sustainability', 'logistics'] as const;
        const nextIdx = (modes.indexOf(prev.right50Mode) + 1) % modes.length;
        return { ...prev, right50Mode: modes[nextIdx] };
      });
    }
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-slate-950 font-sans select-none">
      {/* Top Bar Navigation */}
      <TopBar
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          if (tab === 'screens') setCameraPreset('screens');
          else if (tab === 'lighting') setCameraPreset('hero34');
          else if (tab === 'vehicle') setCameraPreset('deck');
          else if (tab === 'bom') setCameraPreset('topdown');
        }}
        onExportClick={() => setIsExportOpen(true)}
      />

      {/* 3D WebGL Canvas Viewport */}
      <main className="absolute inset-0 w-full h-full">
        <ThreeCanvas
          lightingState={lightingState}
          screenState={screenState}
          vehicleState={vehicleState}
          cameraPreset={cameraPreset}
          showCADGrid={showCADGrid}
          onSelectScreen={handleSelectScreen}
        />
      </main>

      {/* Floating Spatial Spec Badge (Top-Left under header) */}
      <div className="fixed top-16 left-6 z-20 pointer-events-none hidden sm:block">
        <div className="text-xs space-y-1">
          <div className="font-mono text-cyan-400 font-semibold tracking-wider">
            STAND 4B · AUTO EXPO 2026
          </div>
          <div className="text-slate-300 font-bold text-sm">
            ISHMIN EV 3-WHEELER CROSSOVER
          </div>
          <div className="flex items-center gap-2 text-slate-500 text-[11px] font-mono">
            <span>Area: 45.5 m²</span>
            <span>·</span>
            <span>Car: 3500mm × 1600mm</span>
            <span>·</span>
            <span>Horizontal LEDs</span>
            <span>·</span>
            <span>Counter & Lounge</span>
          </div>
        </div>
      </div>

      {/* Bottom Collapsible Control Dock */}
      <ControlDock
        lightingState={lightingState}
        setLightingState={setLightingState}
        screenState={screenState}
        setScreenState={setScreenState}
        vehicleState={vehicleState}
        setVehicleState={setVehicleState}
        cameraPreset={cameraPreset}
        setCameraPreset={setCameraPreset}
        showCADGrid={showCADGrid}
        setShowCADGrid={setShowCADGrid}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* BOM & Specification Export Modal */}
      <BomExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
      />
    </div>
  );
}
