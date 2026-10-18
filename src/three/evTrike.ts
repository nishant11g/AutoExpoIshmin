import * as THREE from 'three';
import { PaintColor, PaintOption } from '../types/expo';

export const PAINT_OPTIONS: Record<PaintColor, PaintOption> = {
  racing_red: {
    id: 'racing_red',
    name: 'Ishmin Carmine Red (Video Spec)',
    hex: '#c9182b',
    metalness: 0.88,
    roughness: 0.16,
    clearcoat: 1.0,
  },
  quicksilver: {
    id: 'quicksilver',
    name: 'Liquid Quicksilver',
    hex: '#d1d5db',
    metalness: 0.92,
    roughness: 0.15,
    clearcoat: 1.0,
  },
  obsidian: {
    id: 'obsidian',
    name: 'Midnight Obsidian',
    hex: '#111827',
    metalness: 0.90,
    roughness: 0.12,
    clearcoat: 1.0,
  },
  aurora_gold: {
    id: 'aurora_gold',
    name: 'Solar Aurora Gold',
    hex: '#d97706',
    metalness: 0.92,
    roughness: 0.18,
    clearcoat: 0.95,
  },
  apex_cyan: {
    id: 'apex_cyan',
    name: 'Electric Apex Cyan',
    hex: '#06b6d4',
    metalness: 0.88,
    roughness: 0.14,
    clearcoat: 1.0,
  },
};

export interface EVTrikeController {
  group: THREE.Group;
  setPaintColor: (color: PaintColor) => void;
  setLightsState: (on: boolean) => void;
  update: (delta: number) => void;
  dispose: () => void;
}

/**
 * Creates the exact ISHMIN EV 3-Wheeler Car from the user's 360° video:
 * - Modern 4-door aerodynamic hatchback / coupe cabin
 * - Dual front car wheels with dark graphite multi-spoke alloy rims
 * - Front fascia with full-width horizontal LED light bar & sharp headlights
 * - Gloss black contrast roof, shark fin antenna, and side mirrors
 * - Tailgate with roof spoiler & full-width horizontal LED taillight bar
 * - Rear brand badge "ISHMIN"
 * - Exposed mechanical rear bay with massive single center wheel, dual upright red/orange coilover shocks & aluminum swingarm
 */
export function createEVTrike(): EVTrikeController {
  const group = new THREE.Group();
  group.name = 'Ishmin_EV_Trike_Car';

  // Primary Automotive Paint Material (default Carmine Red as in video)
  const defaultPaint = PAINT_OPTIONS.racing_red;
  const bodyMaterial = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(defaultPaint.hex),
    metalness: defaultPaint.metalness,
    roughness: defaultPaint.roughness,
    clearcoat: defaultPaint.clearcoat,
    clearcoatRoughness: 0.08,
  });

  // Gloss Black contrast surfaces (Roof, aero skirts, mirror caps, front splitter, spoiler)
  const glossBlackMaterial = new THREE.MeshStandardMaterial({
    color: 0x0a0c10,
    metalness: 0.85,
    roughness: 0.18,
  });

  // Matte Black Underbody & Air Intakes
  const matteUnderbody = new THREE.MeshStandardMaterial({
    color: 0x14161b,
    roughness: 0.65,
    metalness: 0.15,
  });

  // Dark Graphite Alloy Wheels
  const darkAlloyMaterial = new THREE.MeshStandardMaterial({
    color: 0x272c36,
    metalness: 0.9,
    roughness: 0.22,
  });

  // Billet Aluminum Swingarm & Suspension Links
  const billetAluminum = new THREE.MeshStandardMaterial({
    color: 0x94a3b8,
    metalness: 0.92,
    roughness: 0.25,
  });

  // Brake Rotors
  const brakeRotorMaterial = new THREE.MeshStandardMaterial({
    color: 0x64748b,
    metalness: 0.95,
    roughness: 0.35,
  });

  // Performance Red Brake Calipers & Rear Shocks Springs
  const shockSpringMaterial = new THREE.MeshStandardMaterial({
    color: 0xef4444, // Vibrant orange-red coilover spring
    metalness: 0.4,
    roughness: 0.25,
  });

  // Performance Tire Rubber
  const tireMaterial = new THREE.MeshStandardMaterial({
    color: 0x131518,
    roughness: 0.85,
    metalness: 0.08,
  });

  // Deep Tinted Automotive Glass
  const glassMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x1e293b,
    transparent: true,
    opacity: 0.45,
    transmission: 0.88,
    roughness: 0.08,
    ior: 1.52,
    thickness: 0.6,
  });

  // Emissive Headlights & Daytime Light Bar (Clean Daylight White)
  const emissiveWhite = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    emissive: 0xf8fafc,
    emissiveIntensity: 3.2,
    roughness: 0.1,
  });

  // Emissive Taillight Blade (Deep Crimson Red)
  const emissiveRed = new THREE.MeshStandardMaterial({
    color: 0xff1e2b,
    emissive: 0xef4444,
    emissiveIntensity: 3.5,
    roughness: 0.1,
  });

  const emissiveMaterials = [emissiveWhite, emissiveRed];

  // ==========================================
  // 1. CAR BODY: LOWER CHASSIS & FLOORPAN
  // ==========================================
  const lowerFloorGeo = new THREE.BoxGeometry(1.68, 0.22, 3.4);
  const lowerFloor = new THREE.Mesh(lowerFloorGeo, matteUnderbody);
  lowerFloor.position.set(0, 0.22, 0.05);
  lowerFloor.castShadow = true;
  lowerFloor.receiveShadow = true;
  group.add(lowerFloor);

  // Aerodynamic gloss-black side rocker blades
  const sideSkirtGeo = new THREE.BoxGeometry(0.08, 0.12, 2.3);
  const leftSkirt = new THREE.Mesh(sideSkirtGeo, glossBlackMaterial);
  leftSkirt.position.set(-0.86, 0.18, 0.15);
  const rightSkirt = new THREE.Mesh(sideSkirtGeo, glossBlackMaterial);
  rightSkirt.position.set(0.86, 0.18, 0.15);
  group.add(leftSkirt, rightSkirt);

  // ==========================================
  // 2. MAIN BODY MONOCOQUE & HOOD (Sculpted)
  // ==========================================
  const mainHullGroup = new THREE.Group();
  mainHullGroup.name = 'Car_Main_Hull';

  // Front Hood & Beltline Body Section
  const hoodShape = new THREE.Shape();
  hoodShape.moveTo(-0.84, -0.2);
  hoodShape.lineTo(-0.85, 1.1); // front fender curve
  hoodShape.quadraticCurveTo(-0.8, 1.75, -0.65, 1.95); // nose taper
  hoodShape.quadraticCurveTo(0, 2.05, 0.65, 1.95);
  hoodShape.quadraticCurveTo(0.8, 1.75, 0.85, 1.1);
  hoodShape.lineTo(0.84, -0.2);
  hoodShape.quadraticCurveTo(0, -0.3, -0.84, -0.2);

  const hoodExtrudeGeo = new THREE.ExtrudeGeometry(hoodShape, {
    depth: 0.48,
    bevelEnabled: true,
    bevelThickness: 0.1,
    bevelSize: 0.08,
    bevelSegments: 5,
  });
  hoodExtrudeGeo.rotateX(-Math.PI / 2);
  hoodExtrudeGeo.center();

  const hoodMesh = new THREE.Mesh(hoodExtrudeGeo, bodyMaterial);
  hoodMesh.position.set(0, 0.56, 0.2);
  hoodMesh.castShadow = true;
  hoodMesh.receiveShadow = true;
  mainHullGroup.add(hoodMesh);

  // Front Bumper Lower Chin & Splitter (Gloss Black)
  const frontSplitterGeo = new THREE.BoxGeometry(1.65, 0.06, 0.55);
  const frontSplitter = new THREE.Mesh(frontSplitterGeo, glossBlackMaterial);
  frontSplitter.position.set(0, 0.16, 1.82);
  frontSplitter.castShadow = true;
  mainHullGroup.add(frontSplitter);

  // Lower Front Air Intake Grille
  const lowerGrilleGeo = new THREE.BoxGeometry(1.0, 0.18, 0.08);
  const lowerGrille = new THREE.Mesh(lowerGrilleGeo, matteUnderbody);
  lowerGrille.position.set(0, 0.28, 1.98);
  mainHullGroup.add(lowerGrille);

  // Front Continuous Daytime LED Light Bar (Spans between headlights)
  const frontLightBarGeo = new THREE.BoxGeometry(1.35, 0.028, 0.05);
  const frontLightBar = new THREE.Mesh(frontLightBarGeo, emissiveWhite);
  frontLightBar.position.set(0, 0.62, 1.94);
  mainHullGroup.add(frontLightBar);

  // Sharp Angular Dual Headlights
  const headlampGeo = new THREE.BoxGeometry(0.24, 0.065, 0.14);
  const leftHeadlamp = new THREE.Mesh(headlampGeo, emissiveWhite);
  leftHeadlamp.position.set(-0.66, 0.62, 1.86);
  leftHeadlamp.rotation.y = 0.25;

  const rightHeadlamp = new THREE.Mesh(headlampGeo, emissiveWhite);
  rightHeadlamp.position.set(0.66, 0.62, 1.86);
  rightHeadlamp.rotation.y = -0.25;
  mainHullGroup.add(leftHeadlamp, rightHeadlamp);

  // Circular Front Brand Emblem
  const emblemGeo = new THREE.CylinderGeometry(0.045, 0.045, 0.015, 24);
  emblemGeo.rotateX(Math.PI / 2);
  const frontEmblem = new THREE.Mesh(emblemGeo, glossBlackMaterial);
  frontEmblem.position.set(0, 0.68, 1.92);

  const emblemInner = new THREE.Mesh(new THREE.CircleGeometry(0.032, 16), emissiveWhite);
  emblemInner.position.set(0, 0, 0.009);
  frontEmblem.add(emblemInner);
  mainHullGroup.add(frontEmblem);

  // ==========================================
  // 3. CABIN GREENHOUSE, ROOF & WINDOWS
  // ==========================================
  const cabinGroup = new THREE.Group();
  cabinGroup.name = 'Cabin_Greenhouse';

  // Cabin Upper Pillars & Roof Shell (Gloss Black contrast)
  const roofShape = new THREE.Shape();
  roofShape.moveTo(-0.7, -0.85); // rear hatch slope
  roofShape.lineTo(-0.72, 0.45); // B-pillar
  roofShape.lineTo(-0.62, 1.15); // A-pillar base
  roofShape.quadraticCurveTo(0, 1.25, 0.62, 1.15);
  roofShape.lineTo(0.72, 0.45);
  roofShape.lineTo(0.7, -0.85);
  roofShape.quadraticCurveTo(0, -0.92, -0.7, -0.85);

  const roofGeo = new THREE.ExtrudeGeometry(roofShape, {
    depth: 0.45,
    bevelEnabled: true,
    bevelThickness: 0.06,
    bevelSize: 0.05,
    bevelSegments: 4,
  });
  roofGeo.rotateX(-Math.PI / 2);
  roofGeo.center();

  const roofMesh = new THREE.Mesh(roofGeo, glossBlackMaterial);
  roofMesh.position.set(0, 1.18, 0.15);
  roofMesh.castShadow = true;
  cabinGroup.add(roofMesh);

  // Aerodynamic Windshield Glass (Front)
  const windshieldGeo = new THREE.PlaneGeometry(1.28, 0.72);
  windshieldGeo.rotateX(-Math.PI / 3.4);
  const windshield = new THREE.Mesh(windshieldGeo, glassMaterial);
  windshield.position.set(0, 0.98, 0.88);
  cabinGroup.add(windshield);

  // Rear Sloping Hatch Glass
  const rearHatchGlassGeo = new THREE.PlaneGeometry(1.18, 0.68);
  rearHatchGlassGeo.rotateX(Math.PI / 3.2);
  const rearHatchGlass = new THREE.Mesh(rearHatchGlassGeo, glassMaterial);
  rearHatchGlass.position.set(0, 1.02, -0.65);
  cabinGroup.add(rearHatchGlass);

  // Left & Right Side Tinted Windows
  const sideWindowGeo = new THREE.PlaneGeometry(1.65, 0.38);
  sideWindowGeo.rotateY(Math.PI / 2);
  const leftSideGlass = new THREE.Mesh(sideWindowGeo, glassMaterial);
  leftSideGlass.position.set(-0.74, 1.05, 0.15);

  const rightSideGlass = new THREE.Mesh(sideWindowGeo, glassMaterial);
  rightSideGlass.position.set(0.74, 1.05, 0.15);
  cabinGroup.add(leftSideGlass, rightSideGlass);

  // Aerodynamic Shark Fin Roof Antenna
  const antennaGeo = new THREE.ConeGeometry(0.035, 0.12, 4);
  antennaGeo.rotateX(0.5);
  const antenna = new THREE.Mesh(antennaGeo, glossBlackMaterial);
  antenna.position.set(0, 1.48, -0.45);
  cabinGroup.add(antenna);

  // Gloss Black Aero Side Mirrors
  function createSideMirror(isLeft: boolean) {
    const mirror = new THREE.Group();
    const sign = isLeft ? -1 : 1;
    mirror.position.set(sign * 0.84, 0.92, 0.72);

    const stemGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.1, 8);
    stemGeo.rotateZ(sign * 0.6);
    const stem = new THREE.Mesh(stemGeo, glossBlackMaterial);

    const housingGeo = new THREE.BoxGeometry(0.18, 0.09, 0.12);
    const housing = new THREE.Mesh(housingGeo, glossBlackMaterial);
    housing.position.set(sign * 0.08, 0.04, 0);
    housing.castShadow = true;

    mirror.add(stem, housing);
    return mirror;
  }
  cabinGroup.add(createSideMirror(true), createSideMirror(false));

  mainHullGroup.add(cabinGroup);

  // ==========================================
  // 4. TAILGATE & REAR AERO SPOILER
  // ==========================================
  const rearAeroGroup = new THREE.Group();
  rearAeroGroup.name = 'Rear_Aero_Tailgate';

  // Roof Spoiler (Gloss Black)
  const spoilerGeo = new THREE.BoxGeometry(1.35, 0.05, 0.32);
  const spoiler = new THREE.Mesh(spoilerGeo, glossBlackMaterial);
  spoiler.position.set(0, 1.35, -0.95);
  spoiler.castShadow = true;
  rearAeroGroup.add(spoiler);

  // Full-Width Continuous Rear Blade LED Taillight Bar
  const tailBladeGeo = new THREE.BoxGeometry(1.42, 0.04, 0.06);
  const tailBlade = new THREE.Mesh(tailBladeGeo, emissiveRed);
  tailBlade.position.set(0, 0.82, -1.25);
  rearAeroGroup.add(tailBlade);

  // Rear "ISHMIN" Brand Lettering Plaque
  const rearPlaqueGeo = new THREE.BoxGeometry(0.52, 0.08, 0.02);
  const rearPlaque = new THREE.Mesh(rearPlaqueGeo, glossBlackMaterial);
  rearPlaque.position.set(0, 0.91, -1.23);

  // Illuminated Lettering Line
  const brandLineGeo = new THREE.BoxGeometry(0.36, 0.02, 0.01);
  const brandLine = new THREE.Mesh(brandLineGeo, emissiveWhite);
  brandLine.position.set(0, 0, 0.012);
  rearPlaque.add(brandLine);
  rearAeroGroup.add(rearPlaque);

  // Rear Quarter Fender Winglets
  const leftWingletGeo = new THREE.BoxGeometry(0.24, 0.35, 0.65);
  const leftWinglet = new THREE.Mesh(leftWingletGeo, bodyMaterial);
  leftWinglet.position.set(-0.72, 0.62, -1.05);
  leftWinglet.castShadow = true;

  const rightWingletGeo = new THREE.BoxGeometry(0.24, 0.35, 0.65);
  const rightWinglet = new THREE.Mesh(rightWingletGeo, bodyMaterial);
  rightWinglet.position.set(0.72, 0.62, -1.05);
  rightWinglet.castShadow = true;
  rearAeroGroup.add(leftWinglet, rightWinglet);

  mainHullGroup.add(rearAeroGroup);
  group.add(mainHullGroup);

  // ==========================================
  // 5. DUAL FRONT CAR WHEELS & SUSPENSION
  // ==========================================
  const frontTrackX = 0.82;
  const frontWheelZ = 1.05;
  const wheelRadius = 0.34;
  const tireWidth = 0.22;

  function createFrontCarWheel(isLeft: boolean) {
    const wheelGroup = new THREE.Group();
    const sign = isLeft ? -1 : 1;
    wheelGroup.position.set(sign * frontTrackX, wheelRadius, frontWheelZ);

    // Treaded Rubber Tire
    const tireGeo = new THREE.CylinderGeometry(wheelRadius, wheelRadius, tireWidth, 32);
    tireGeo.rotateZ(Math.PI / 2);
    const tire = new THREE.Mesh(tireGeo, tireMaterial);
    tire.castShadow = true;
    wheelGroup.add(tire);

    // Dark Graphite Alloy Wheel Rim
    const rimGeo = new THREE.CylinderGeometry(wheelRadius * 0.76, wheelRadius * 0.76, tireWidth * 1.02, 24);
    rimGeo.rotateZ(Math.PI / 2);
    const rim = new THREE.Mesh(rimGeo, darkAlloyMaterial);
    wheelGroup.add(rim);

    // 10-Spoke Sports Rim Design (as in video)
    for (let s = 0; s < 10; s++) {
      const angle = (s / 10) * Math.PI * 2;
      const spokeGeo = new THREE.BoxGeometry(0.024, wheelRadius * 0.72, 0.015);
      const spoke = new THREE.Mesh(spokeGeo, darkAlloyMaterial);
      spoke.position.set(sign * 0.08, 0, 0);
      spoke.rotation.x = angle;
      wheelGroup.add(spoke);
    }

    // Brake Disc Rotor & Caliper
    const rotorGeo = new THREE.CylinderGeometry(wheelRadius * 0.6, wheelRadius * 0.6, 0.015, 24);
    rotorGeo.rotateZ(Math.PI / 2);
    const rotor = new THREE.Mesh(rotorGeo, brakeRotorMaterial);
    rotor.position.set(sign * -0.04, 0, 0);

    const caliperGeo = new THREE.BoxGeometry(0.04, 0.12, 0.07);
    const caliper = new THREE.Mesh(caliperGeo, shockSpringMaterial);
    caliper.position.set(sign * -0.04, wheelRadius * 0.38, 0.06);
    wheelGroup.add(rotor, caliper);

    return wheelGroup;
  }

  group.add(createFrontCarWheel(true), createFrontCarWheel(false));

  // ==========================================
  // 6. EXPOSED MECHANICAL REAR DRIVE BAY & WHEEL
  // ==========================================
  // Exactly matching video frames 00:04 - 00:08:
  // Center single massive tire flanked by dual vertical coilover shocks with red/orange springs
  const rearMechGroup = new THREE.Group();
  rearMechGroup.name = 'Rear_Exposed_Mechanical_Bay';
  const rearZ = -1.45;
  const rearRadius = 0.36;
  const rearTireWidth = 0.34; // Wide performance tire

  // Single Wide Center Rear Wheel
  const rearWheelGroup = new THREE.Group();
  rearWheelGroup.position.set(0, rearRadius, rearZ);

  const rearTireGeo = new THREE.CylinderGeometry(rearRadius, rearRadius, rearTireWidth, 32);
  rearTireGeo.rotateZ(Math.PI / 2);
  const rearTire = new THREE.Mesh(rearTireGeo, tireMaterial);
  rearTire.castShadow = true;
  rearWheelGroup.add(rearTire);

  // Rear Hub Motor Housing
  const rearHubGeo = new THREE.CylinderGeometry(rearRadius * 0.65, rearRadius * 0.65, rearTireWidth * 0.96, 32);
  rearHubGeo.rotateZ(Math.PI / 2);
  const rearHub = new THREE.Mesh(rearHubGeo, darkAlloyMaterial);
  rearWheelGroup.add(rearHub);

  // Cast Aluminum Swingarm Structure
  const armGeo = new THREE.BoxGeometry(0.08, 0.14, 0.85);
  const leftArm = new THREE.Mesh(armGeo, billetAluminum);
  leftArm.position.set(-0.25, 0.05, 0.42);
  leftArm.castShadow = true;

  const rightArm = new THREE.Mesh(armGeo, billetAluminum);
  rightArm.position.set(0.25, 0.05, 0.42);
  rightArm.castShadow = true;
  rearWheelGroup.add(leftArm, rightArm);

  rearMechGroup.add(rearWheelGroup);

  // DUAL VERTICAL HIGH-PERFORMANCE COILOVER SHOCKS (Prominent in video frames 00:05-00:08)
  function createCoiloverShock(isLeft: boolean) {
    const shock = new THREE.Group();
    const sign = isLeft ? -1 : 1;
    shock.position.set(sign * 0.28, rearRadius + 0.12, rearZ + 0.08);

    // Damper Body Cylinder
    const damperBodyGeo = new THREE.CylinderGeometry(0.024, 0.024, 0.46, 16);
    const damperBody = new THREE.Mesh(damperBodyGeo, billetAluminum);
    shock.add(damperBody);

    // High-Tension Red/Orange Coil Spring
    const springGeo = new THREE.CylinderGeometry(0.042, 0.042, 0.32, 16, 1, true);
    const spring = new THREE.Mesh(springGeo, shockSpringMaterial);
    spring.position.set(0, -0.04, 0);
    shock.add(spring);

    // Top & Bottom Mounting Cleats
    const cleatGeo = new THREE.CylinderGeometry(0.032, 0.032, 0.05, 12);
    cleatGeo.rotateZ(Math.PI / 2);
    const topCleat = new THREE.Mesh(cleatGeo, billetAluminum);
    topCleat.position.set(0, 0.23, 0);

    const bottomCleat = new THREE.Mesh(cleatGeo, billetAluminum);
    bottomCleat.position.set(0, -0.23, 0);
    shock.add(topCleat, bottomCleat);

    return shock;
  }

  rearMechGroup.add(createCoiloverShock(true), createCoiloverShock(false));

  // Lower Rear Diffuser Fins flanking the tire
  const diffuserFinGeo = new THREE.BoxGeometry(0.02, 0.14, 0.45);
  const leftDiffuserFin = new THREE.Mesh(diffuserFinGeo, glossBlackMaterial);
  leftDiffuserFin.position.set(-0.48, 0.2, rearZ + 0.25);
  leftDiffuserFin.castShadow = true;

  const rightDiffuserFin = new THREE.Mesh(diffuserFinGeo, glossBlackMaterial);
  rightDiffuserFin.position.set(0.48, 0.2, rearZ + 0.25);
  rightDiffuserFin.castShadow = true;
  rearMechGroup.add(leftDiffuserFin, rightDiffuserFin);

  group.add(rearMechGroup);

  // ==========================================
  // 7. SOFT RADIAL CONTACT SHADOW PLANE
  // ==========================================
  const contactCanvas = document.createElement('canvas');
  contactCanvas.width = 256;
  contactCanvas.height = 256;
  const sctx = contactCanvas.getContext('2d')!;
  const grad = sctx.createRadialGradient(128, 128, 20, 128, 128, 124);
  grad.addColorStop(0, 'rgba(0, 0, 0, 0.75)');
  grad.addColorStop(0.45, 'rgba(0, 0, 0, 0.35)');
  grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
  sctx.fillStyle = grad;
  sctx.fillRect(0, 0, 256, 256);

  const shadowTexture = new THREE.CanvasTexture(contactCanvas);
  const shadowGeo = new THREE.PlaneGeometry(2.6, 4.2);
  shadowGeo.rotateX(-Math.PI / 2);
  const shadowMat = new THREE.MeshBasicMaterial({
    map: shadowTexture,
    transparent: true,
    opacity: 0.85,
    depthWrite: false,
  });
  const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
  shadowMesh.position.set(0, 0.015, 0.1);
  shadowMesh.renderOrder = 1;
  group.add(shadowMesh);

  return {
    group,
    setPaintColor: (color: PaintColor) => {
      const opt = PAINT_OPTIONS[color] || PAINT_OPTIONS.racing_red;
      bodyMaterial.color.set(opt.hex);
      bodyMaterial.metalness = opt.metalness;
      bodyMaterial.roughness = opt.roughness;
      bodyMaterial.clearcoat = opt.clearcoat;
      bodyMaterial.needsUpdate = true;
    },
    setLightsState: (on: boolean) => {
      emissiveMaterials.forEach((mat) => {
        mat.emissiveIntensity = on ? (mat === emissiveRed ? 3.5 : 3.2) : 0.0;
        mat.needsUpdate = true;
      });
    },
    update: (_delta: number) => {
      // Idle micro-animation
    },
    dispose: () => {
      shadowTexture.dispose();
      lowerFloorGeo.dispose();
      sideSkirtGeo.dispose();
      hoodExtrudeGeo.dispose();
      frontSplitterGeo.dispose();
      lowerGrilleGeo.dispose();
      frontLightBarGeo.dispose();
      headlampGeo.dispose();
      emblemGeo.dispose();
      roofGeo.dispose();
      windshieldGeo.dispose();
      rearHatchGlassGeo.dispose();
      sideWindowGeo.dispose();
      antennaGeo.dispose();
      spoilerGeo.dispose();
      tailBladeGeo.dispose();
      rearPlaqueGeo.dispose();
      brandLineGeo.dispose();
      leftWingletGeo.dispose();
      rightWingletGeo.dispose();
      shadowGeo.dispose();

      bodyMaterial.dispose();
      glossBlackMaterial.dispose();
      matteUnderbody.dispose();
      darkAlloyMaterial.dispose();
      billetAluminum.dispose();
      brakeRotorMaterial.dispose();
      shockSpringMaterial.dispose();
      tireMaterial.dispose();
      glassMaterial.dispose();
      emissiveWhite.dispose();
      emissiveRed.dispose();
      shadowMat.dispose();
    },
  };
}
