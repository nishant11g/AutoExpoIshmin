/**
 * Types and interfaces for the Auto Expo 3D Space
 */

export type PaintColor = 'quicksilver' | 'obsidian' | 'aurora_gold' | 'apex_cyan' | 'racing_red';

export interface PaintOption {
  id: PaintColor;
  name: string;
  hex: string;
  metalness: number;
  roughness: number;
  clearcoat: number;
}

export type LightingPreset = 'daylight' | 'dramatic_unveil' | 'cyber_electric' | 'eco_minimal';

export interface LightingState {
  preset: LightingPreset;
  spot1Intensity: number;
  spot1Color: string;
  spot1Angle: number;
  spot2Intensity: number;
  spot2Color: string;
  spot2Angle: number;
  ambientFloorIntensity: number;
  floorUnderglowColor: string;
  trikeLightsOn: boolean;
}

export type ScreenMode70 = 'powertrain' | 'battery' | 'aerodynamics' | 'brand';
export type ScreenMode50Left = 'specs' | 'chassis' | 'safety';
export type ScreenMode50Right = 'modular_bom' | 'sustainability' | 'logistics';

export interface ScreenState {
  main70Mode: ScreenMode70;
  left50Mode: ScreenMode50Left;
  right50Mode: ScreenMode50Right;
  brightness: number;
  isPlaying: boolean;
}

export interface VehicleState {
  paintColor: PaintColor;
  deckRotationSpeed: number; // 0 to 1
  isRotating: boolean;
  deckAngle: number; // default 5 degrees
}

export type CameraPreset = 'hero34' | 'deck' | 'screens' | 'counter' | 'lounge' | 'topdown' | 'cockpit';

export interface BomItem {
  id: string;
  category: 'Framing' | 'Lighting' | 'Screens & AV' | 'Flooring' | 'Electrical';
  name: string;
  spec: string;
  quantity: number;
  unit: string;
  unitCostRental: number;
  unitCostPurchase: number;
  powerWatts: number;
  weightKg: number;
  notes: string;
}
