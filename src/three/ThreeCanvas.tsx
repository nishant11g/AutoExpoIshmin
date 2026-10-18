import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { createEVTrike, EVTrikeController } from './evTrike';
import { createBoothStructure, BoothController } from './boothStructure';
import { ScreenTextureManager } from './screenTextures';
import { LightingState, ScreenState, VehicleState, CameraPreset } from '../types/expo';

interface ThreeCanvasProps {
  lightingState: LightingState;
  screenState: ScreenState;
  vehicleState: VehicleState;
  cameraPreset: CameraPreset;
  showCADGrid: boolean;
  onSelectScreen?: (screen: '70' | '50L' | '50R') => void;
}

// Module-scope scratch vectors to avoid per-frame GC
const _vecCameraTarget = new THREE.Vector3();
const _vecLookTarget = new THREE.Vector3();
const _vecTemp = new THREE.Vector3();

// Camera Preset coordinates: [posX, posY, posZ, lookX, lookY, lookZ]
const CAMERA_PRESETS: Record<CameraPreset, [number, number, number, number, number, number]> = {
  hero34: [4.8, 2.6, 4.6, 0.0, 0.8, 0.2],
  deck: [2.1, 1.4, 0.6, 0.1, 0.7, -0.7],
  screens: [1.2, 2.2, 1.2, -1.8, 1.8, -0.8],
  counter: [-1.4, 1.6, 3.6, -2.4, 0.9, 2.2], // Focused on Left Corner Reception Desk
  lounge: [1.6, 1.8, 3.8, 2.2, 0.65, 2.0], // Focused on Right Corner VIP Lounge Suite
  cockpit: [0.6, 1.35, 0.25, 0.1, 0.8, -0.7],
  topdown: [0.01, 10.2, 0.01, 0, 0.2, 0],
};

export const ThreeCanvas: React.FC<ThreeCanvasProps> = ({
  lightingState,
  screenState,
  vehicleState,
  cameraPreset,
  showCADGrid,
  onSelectScreen,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);

  // References to keep mutable state for animation loop without remounting
  const refs = useRef<{
    renderer?: THREE.WebGLRenderer;
    scene?: THREE.Scene;
    camera?: THREE.PerspectiveCamera;
    controls?: OrbitControls;
    screenMgr?: ScreenTextureManager;
    trikeCtrl?: EVTrikeController;
    boothCtrl?: BoothController;
    spot1?: THREE.SpotLight;
    spot2?: THREE.SpotLight;
    ambientHemi?: THREE.HemisphereLight;
    currentLookAt: THREE.Vector3;
    cameraPresetTarget: CameraPreset;
    props: ThreeCanvasProps;
    deckAngleRad: number;
  }>({
    currentLookAt: new THREE.Vector3(0, 0.7, 0.2),
    cameraPresetTarget: 'hero34',
    props: { lightingState, screenState, vehicleState, cameraPreset, showCADGrid, onSelectScreen },
    deckAngleRad: 0,
  });

  // Always keep latest props in ref
  refs.current.props = { lightingState, screenState, vehicleState, cameraPreset, showCADGrid, onSelectScreen };
  refs.current.cameraPresetTarget = cameraPreset;

  // Sync Paint Color
  useEffect(() => {
    refs.current.trikeCtrl?.setPaintColor(vehicleState.paintColor);
  }, [vehicleState.paintColor]);

  // Sync Vehicle Lights
  useEffect(() => {
    refs.current.trikeCtrl?.setLightsState(lightingState.trikeLightsOn);
  }, [lightingState.trikeLightsOn]);

  // Sync Spotlights & Underglow
  useEffect(() => {
    if (refs.current.spot1) {
      refs.current.spot1.intensity = lightingState.spot1Intensity;
      refs.current.spot1.color.set(lightingState.spot1Color);
      refs.current.spot1.angle = lightingState.spot1Angle;
    }
    if (refs.current.spot2) {
      refs.current.spot2.intensity = lightingState.spot2Intensity;
      refs.current.spot2.color.set(lightingState.spot2Color);
      refs.current.spot2.angle = lightingState.spot2Angle;
    }
    if (refs.current.ambientHemi) {
      refs.current.ambientHemi.intensity = lightingState.ambientFloorIntensity;
    }
    refs.current.boothCtrl?.setUnderglowColor(lightingState.floorUnderglowColor);
  }, [lightingState]);

  // Sync Dimensions & CAD Grid
  useEffect(() => {
    refs.current.boothCtrl?.setDimensionsVisible(showCADGrid);
  }, [showCADGrid]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Renderer Setup
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance',
      alpha: false,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    // 2. Scene & Fog Setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x070a12);
    scene.fog = new THREE.FogExp2(0x070a12, 0.024);

    // Studio Environment map for realistic metallic reflections
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    // 3. Camera & Damped Controls
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 80);
    const initialCam = CAMERA_PRESETS.hero34;
    camera.position.set(initialCam[0], initialCam[1], initialCam[2]);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.maxPolarAngle = Math.PI / 2 - 0.02; // Don't go below ground
    controls.minDistance = 2.0;
    controls.maxDistance = 22.0;
    controls.target.set(initialCam[3], initialCam[4], initialCam[5]);

    // 4. Lighting Rig
    const ambientHemi = new THREE.HemisphereLight(0xcfd8dc, 0x0f172a, 0.45);
    scene.add(ambientHemi);

    // Spot 1: Open-Right High-Power Focus Light
    const spot1 = new THREE.SpotLight(
      lightingState.spot1Color,
      lightingState.spot1Intensity,
      20,
      lightingState.spot1Angle,
      0.35,
      1.2
    );
    spot1.position.set(3.1, 3.25, -1.8);
    spot1.castShadow = true;
    spot1.shadow.bias = -0.0005;
    spot1.shadow.normalBias = 0.02;
    spot1.shadow.mapSize.width = 2048;
    spot1.shadow.mapSize.height = 2048;
    spot1.shadow.camera.near = 0.5;
    spot1.shadow.camera.far = 18;
    scene.add(spot1);

    // Spot 2: Open-Front High-Power Focus Light
    const spot2 = new THREE.SpotLight(
      lightingState.spot2Color,
      lightingState.spot2Intensity,
      20,
      lightingState.spot2Angle,
      0.35,
      1.2
    );
    spot2.position.set(1.2, 3.25, 2.9);
    spot2.castShadow = true;
    spot2.shadow.bias = -0.0005;
    spot2.shadow.normalBias = 0.02;
    spot2.shadow.mapSize.width = 2048;
    spot2.shadow.mapSize.height = 2048;
    spot2.shadow.camera.near = 0.5;
    spot2.shadow.camera.far = 18;
    scene.add(spot2);

    // Target spot points toward presentation deck center
    const spotTarget = new THREE.Object3D();
    spotTarget.position.set(0.1, 0.7, -0.7);
    scene.add(spotTarget);
    spot1.target = spotTarget;
    spot2.target = spotTarget;

    // 5. Build Procedural Assets
    const screenMgr = new ScreenTextureManager();
    const boothCtrl = createBoothStructure(screenMgr);
    const trikeCtrl = createEVTrike();

    // Mount EV Trike directly onto the 5-degree angled presentation deck
    // Pitch trike slightly to match the deck slope
    trikeCtrl.group.position.set(0, 0.14, 0);
    trikeCtrl.group.rotation.x = -0.087; // approx ~5 degrees forward tilt
    boothCtrl.podiumWedgeGroup.add(trikeCtrl.group);

    scene.add(boothCtrl.group);

    // Store in refs
    refs.current.renderer = renderer;
    scene.environment = scene.environment;
    refs.current.scene = scene;
    refs.current.camera = camera;
    refs.current.controls = controls;
    refs.current.screenMgr = screenMgr;
    refs.current.trikeCtrl = trikeCtrl;
    refs.current.boothCtrl = boothCtrl;
    refs.current.spot1 = spot1;
    refs.current.spot2 = spot2;
    refs.current.ambientHemi = ambientHemi;

    // Raycasting for clicking screens
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handlePointerDown = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects([
        boothCtrl.screen70Mesh,
        boothCtrl.screen50LeftMesh,
        boothCtrl.screen50RightMesh,
      ]);

      if (intersects.length > 0) {
        const hit = intersects[0].object;
        if (hit === boothCtrl.screen70Mesh) {
          refs.current.props.onSelectScreen?.('70');
        } else if (hit === boothCtrl.screen50LeftMesh) {
          refs.current.props.onSelectScreen?.('50L');
        } else if (hit === boothCtrl.screen50RightMesh) {
          refs.current.props.onSelectScreen?.('50R');
        }
      }
    };

    renderer.domElement.addEventListener('pointerdown', handlePointerDown);

    // 6. Responsive Resize Observer
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: newW, height: newH } = entry.contentRect;
        if (newW > 0 && newH > 0) {
          camera.aspect = newW / newH;
          camera.updateProjectionMatrix();
          renderer.setSize(newW, newH);
        }
      }
    });
    resizeObserver.observe(container);

    // 7. Animation Loop
    let animId: number;
    let lastTime = performance.now();

    const animate = (currentTime: number) => {
      animId = requestAnimationFrame(animate);
      const delta = Math.min((currentTime - lastTime) / 1000, 0.1);
      lastTime = currentTime;

      const currentProps = refs.current.props;

      // Update Screen Canvas animations
      screenMgr.update(
        delta,
        currentProps.screenState.main70Mode,
        currentProps.screenState.left50Mode,
        currentProps.screenState.right50Mode,
        currentProps.screenState.brightness,
        currentProps.screenState.isPlaying
      );

      // Deck slow-turntable rotation if enabled
      if (currentProps.vehicleState.isRotating) {
        const rotSpeed = currentProps.vehicleState.deckRotationSpeed * 0.35;
        refs.current.deckAngleRad += rotSpeed * delta;
        boothCtrl.podiumWedgeGroup.rotation.y = refs.current.deckAngleRad;
      }

      // Smooth Camera Preset Interpolation
      const preset = CAMERA_PRESETS[refs.current.cameraPresetTarget];
      if (preset) {
        _vecCameraTarget.set(preset[0], preset[1], preset[2]);
        _vecLookTarget.set(preset[3], preset[4], preset[5]);

        // Exponential smooth damping towards target
        const dampFactor = 1.0 - Math.exp(-4.5 * delta);
        camera.position.lerp(_vecCameraTarget, dampFactor);
        controls.target.lerp(_vecLookTarget, dampFactor);
      }

      // Aim spotlight fixture heads at target
      if (spot1.position && boothCtrl.spotlight1Fixture) {
        boothCtrl.spotlight1Fixture.lookAt(0.1, 0.7, -0.7);
      }
      if (spot2.position && boothCtrl.spotlight2Fixture) {
        boothCtrl.spotlight2Fixture.lookAt(0.1, 0.7, -0.7);
      }

      controls.update();
      renderer.render(scene, camera);
    };

    animId = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      cancelAnimationFrame(animId);
      resizeObserver.disconnect();
      renderer.domElement.removeEventListener('pointerdown', handlePointerDown);
      if (renderer.domElement.parentElement) {
        renderer.domElement.parentElement.removeChild(renderer.domElement);
      }

      controls.dispose();
      trikeCtrl.dispose();
      boothCtrl.dispose();
      screenMgr.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 w-full h-full overflow-hidden cursor-grab active:cursor-grabbing"
      style={{ touchAction: 'none' }}
    />
  );
};
