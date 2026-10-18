import * as THREE from 'three';
import { ScreenTextureManager } from './screenTextures';

export interface BoothController {
  group: THREE.Group;
  podiumWedgeGroup: THREE.Group;
  screen70Mesh: THREE.Mesh;
  screen50LeftMesh: THREE.Mesh;
  screen50RightMesh: THREE.Mesh;
  underglowMesh: THREE.Mesh;
  spotlight1Fixture: THREE.Group;
  spotlight2Fixture: THREE.Group;
  gridHelper: THREE.GridHelper;
  dimensionGroup: THREE.Group;
  setUnderglowColor: (color: string) => void;
  setDimensionsVisible: (visible: boolean) => void;
  dispose: () => void;
}

/**
 * Creates the 45.5 sq m (7.0m x 6.5m) modular auto expo pavilion
 * Corner configuration: Wall 1 (Back) & Wall 2 (Side), open aisles on front and right.
 * - ALL LED screens are HORIZONTAL (16:9): 70" on Wall 1, dual 50" horizontal on Wall 2.
 * - Static 5° inclined presentation deck (car does not rotate).
 * - Indian Auto Expo Reception / Inquiry Counter with illuminated logo.
 * - Branded Company Board / Entrance Totem Standee.
 * - VIP Consultation Lounge Suite (sofa, stools, discussion table).
 */
export function createBoothStructure(screenMgr: ScreenTextureManager): BoothController {
  const group = new THREE.Group();
  group.name = 'Expo_Booth_Corner_45_5_sqm';

  // 1. PROCEDURAL SLATE TILE TEXTURE
  const tileCanvas = document.createElement('canvas');
  tileCanvas.width = 128;
  tileCanvas.height = 128;
  const tctx = tileCanvas.getContext('2d')!;
  tctx.fillStyle = '#121622';
  tctx.fillRect(0, 0, 128, 128);
  tctx.fillStyle = '#171d2b';
  tctx.fillRect(2, 2, 124, 124);
  tctx.strokeStyle = '#222a3d';
  tctx.lineWidth = 1;
  tctx.strokeRect(2, 2, 124, 124);

  const tileTexture = new THREE.CanvasTexture(tileCanvas);
  tileTexture.wrapS = THREE.RepeatWrapping;
  tileTexture.wrapT = THREE.RepeatWrapping;
  tileTexture.repeat.set(7, 6.5);

  // Materials
  const floorMaterial = new THREE.MeshStandardMaterial({
    map: tileTexture,
    roughness: 0.55,
    metalness: 0.15,
  });

  const aluminumTrimMaterial = new THREE.MeshStandardMaterial({
    color: 0x94a3b8,
    metalness: 0.85,
    roughness: 0.2,
  });

  const matteBlackFraming = new THREE.MeshStandardMaterial({
    color: 0x141820,
    metalness: 0.6,
    roughness: 0.35,
  });

  const wallPanelMaterial = new THREE.MeshStandardMaterial({
    color: 0x1b202c,
    roughness: 0.7,
    metalness: 0.15,
  });

  const carbonDeckMaterial = new THREE.MeshStandardMaterial({
    color: 0x1e2430,
    roughness: 0.4,
    metalness: 0.25,
  });

  const underglowMaterial = new THREE.MeshBasicMaterial({
    color: 0x06b6d4,
    transparent: true,
    opacity: 0.85,
  });

  const sofaFabric = new THREE.MeshStandardMaterial({
    color: 0x242a38,
    roughness: 0.85,
    metalness: 0.05,
  });

  const sofaCushionAccent = new THREE.MeshStandardMaterial({
    color: 0xef4444,
    roughness: 0.8,
    metalness: 0.1,
  });

  const stoolSeatFabric = new THREE.MeshStandardMaterial({
    color: 0x2a3346,
    roughness: 0.7,
    metalness: 0.1,
  });

  const chromeMaterial = new THREE.MeshStandardMaterial({
    color: 0xe2e8f0,
    metalness: 0.95,
    roughness: 0.1,
  });

  const tableTopMaterial = new THREE.MeshStandardMaterial({
    color: 0x111622,
    metalness: 0.7,
    roughness: 0.2,
  });

  const backlitLogoMat = new THREE.MeshBasicMaterial({
    color: 0x06b6d4,
  });

  // 2. MODULAR INTERLOCKING RAISED FLOOR (7.0m Wide x 6.5m Deep x 0.06m Height)
  const floorWidth = 7.0;
  const floorDepth = 6.5;
  const floorHeight = 0.06;

  const floorGeo = new THREE.BoxGeometry(floorWidth, floorHeight, floorDepth);
  const floorMesh = new THREE.Mesh(floorGeo, floorMaterial);
  floorMesh.position.set(0, floorHeight / 2, 0);
  floorMesh.receiveShadow = true;
  group.add(floorMesh);

  // Perimeter Beveled Transition Trims (ADA ramp on the open aisle sides)
  const trimThickness = 0.12;
  const trimGeoX = new THREE.BoxGeometry(floorWidth + trimThickness * 2, floorHeight * 0.8, trimThickness);
  const trimGeoZ = new THREE.BoxGeometry(trimThickness, floorHeight * 0.8, floorDepth);

  const trimSouth = new THREE.Mesh(trimGeoX, aluminumTrimMaterial);
  trimSouth.position.set(0, floorHeight / 2, floorDepth / 2 + trimThickness / 2);
  const trimEast = new THREE.Mesh(trimGeoZ, aluminumTrimMaterial);
  trimEast.position.set(floorWidth / 2 + trimThickness / 2, floorHeight / 2, 0);
  group.add(trimSouth, trimEast);

  // 3. CORNER WALL ARCHITECTURE (WALL 1: REAR & WALL 2: SIDE)
  const wallHeight = 3.2;
  const wallThickness = 0.12;
  const rearZ = -floorDepth / 2 + wallThickness / 2;
  const sideX = -floorWidth / 2 + wallThickness / 2;

  const wallsGroup = new THREE.Group();
  wallsGroup.name = 'Corner_Walls';

  // --- WALL 1 (Back Wall, along X-axis at Z = rearZ) ---
  const wall1Geo = new THREE.BoxGeometry(floorWidth, wallHeight, wallThickness);
  const wall1Mesh = new THREE.Mesh(wall1Geo, wallPanelMaterial);
  wall1Mesh.position.set(0, wallHeight / 2 + floorHeight, rearZ);
  wall1Mesh.receiveShadow = true;
  wall1Mesh.castShadow = true;
  wallsGroup.add(wall1Mesh);

  // Modular vertical joint reveals on Wall 1 (every 1 meter)
  for (let x = -3.0; x <= 3.0; x += 1.0) {
    const revealGeo = new THREE.BoxGeometry(0.015, wallHeight, 0.02);
    const reveal = new THREE.Mesh(revealGeo, matteBlackFraming);
    reveal.position.set(x, wallHeight / 2 + floorHeight, rearZ + wallThickness / 2 + 0.01);
    wallsGroup.add(reveal);
  }

  // --- WALL 2 (Side Wall, along Z-axis at X = sideX) ---
  const wall2Geo = new THREE.BoxGeometry(wallThickness, wallHeight, floorDepth);
  const wall2Mesh = new THREE.Mesh(wall2Geo, wallPanelMaterial);
  wall2Mesh.position.set(sideX, wallHeight / 2 + floorHeight, 0);
  wall2Mesh.receiveShadow = true;
  wall2Mesh.castShadow = true;
  wallsGroup.add(wall2Mesh);

  // Modular vertical joint reveals on Wall 2 (every 1 meter)
  for (let z = -2.5; z <= 2.5; z += 1.0) {
    const revealGeo = new THREE.BoxGeometry(0.02, wallHeight, 0.015);
    const reveal = new THREE.Mesh(revealGeo, matteBlackFraming);
    reveal.position.set(sideX + wallThickness / 2 + 0.01, wallHeight / 2 + floorHeight, z);
    wallsGroup.add(reveal);
  }

  // Top capping cornice along Wall 1 and Wall 2
  const capGeo1 = new THREE.BoxGeometry(floorWidth + 0.04, 0.06, wallThickness + 0.04);
  const cap1 = new THREE.Mesh(capGeo1, aluminumTrimMaterial);
  cap1.position.set(0, wallHeight + floorHeight + 0.03, rearZ);
  const capGeo2 = new THREE.BoxGeometry(wallThickness + 0.04, 0.06, floorDepth + 0.04);
  const cap2 = new THREE.Mesh(capGeo2, aluminumTrimMaterial);
  cap2.position.set(sideX, wallHeight + floorHeight + 0.03, 0);
  wallsGroup.add(cap1, cap2);

  // Wall-wash ambient linear LED light strips on top of both walls
  const wallWashGeo1 = new THREE.BoxGeometry(floorWidth - 0.2, 0.02, 0.04);
  const wallWashMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
  const wallWash1 = new THREE.Mesh(wallWashGeo1, wallWashMat);
  wallWash1.position.set(0, wallHeight + floorHeight + 0.01, rearZ + wallThickness / 2 + 0.03);

  const wallWashGeo2 = new THREE.BoxGeometry(0.04, 0.02, floorDepth - 0.2);
  const wallWash2 = new THREE.Mesh(wallWashGeo2, wallWashMat);
  wallWash2.position.set(sideX + wallThickness / 2 + 0.03, wallHeight + floorHeight + 0.01, 0);
  wallsGroup.add(wallWash1, wallWash2);

  // Company Brand Header on Wall 1 (Back Wall): "ISHMIN MOTORS"
  const brandHeaderGeo = new THREE.BoxGeometry(3.6, 0.35, 0.03);
  const brandHeader = new THREE.Mesh(brandHeaderGeo, matteBlackFraming);
  brandHeader.position.set(0.5, wallHeight - 0.3 + floorHeight, rearZ + wallThickness / 2 + 0.02);

  const brandEmblemGeo = new THREE.BoxGeometry(0.24, 0.24, 0.02);
  const brandEmblem = new THREE.Mesh(brandEmblemGeo, backlitLogoMat);
  brandEmblem.position.set(-1.0, wallHeight - 0.3 + floorHeight, rearZ + wallThickness / 2 + 0.04);
  wallsGroup.add(brandHeader, brandEmblem);

  // 4. SCREEN MOUNTING (ALL HORIZONTAL 16:9 FORMAT)

  // --- 70" HORIZONTAL LED SCREEN ON WALL 1 (Center-Left of Wall 1) ---
  const screen70W = 1.75;
  const screen70H = 0.98;
  const screen70X = 0.5;
  const screen70Y = 1.85 + floorHeight;

  const bezel70Geo = new THREE.BoxGeometry(screen70W + 0.06, screen70H + 0.06, 0.05);
  const bezel70Mesh = new THREE.Mesh(bezel70Geo, matteBlackFraming);
  bezel70Mesh.position.set(screen70X, screen70Y, rearZ + wallThickness / 2 + 0.025);
  bezel70Mesh.castShadow = true;

  const screen70Geo = new THREE.PlaneGeometry(screen70W, screen70H);
  const screen70Mat = new THREE.MeshBasicMaterial({
    map: screenMgr.texture70,
  });
  const screen70Mesh = new THREE.Mesh(screen70Geo, screen70Mat);
  screen70Mesh.position.set(screen70X, screen70Y, rearZ + wallThickness / 2 + 0.055);
  wallsGroup.add(bezel70Mesh, screen70Mesh);

  // --- TWO 50" HORIZONTAL LED SCREENS ON WALL 2 (Side Wall) ---
  // In 16:9 horizontal, 50" is ~1.25m Wide x ~0.72m Height
  const screen50W_Horiz = 1.25;
  const screen50H_Horiz = 0.72;
  const screen50Y_Horiz = 1.85 + floorHeight;

  // 50" Screen 1 Horizontal (Vehicle Specs: 3500mm x 1600mm) at Z = -1.25m
  const screen50LeftZ = -1.25;
  const bezel50LGeo = new THREE.BoxGeometry(0.05, screen50H_Horiz + 0.06, screen50W_Horiz + 0.06);
  const bezel50LMesh = new THREE.Mesh(bezel50LGeo, matteBlackFraming);
  bezel50LMesh.position.set(sideX + wallThickness / 2 + 0.025, screen50Y_Horiz, screen50LeftZ);
  bezel50LMesh.castShadow = true;

  const screen50LGeo = new THREE.PlaneGeometry(screen50W_Horiz, screen50H_Horiz);
  screen50LGeo.rotateY(Math.PI / 2);
  const screen50LMat = new THREE.MeshBasicMaterial({
    map: screenMgr.texture50Left,
  });
  const screen50LeftMesh = new THREE.Mesh(screen50LGeo, screen50LMat);
  screen50LeftMesh.position.set(sideX + wallThickness / 2 + 0.055, screen50Y_Horiz, screen50LeftZ);

  // 50" Screen 2 Horizontal (Modular Architecture & INR Estimates) at Z = +1.15m
  const screen50RightZ = 1.15;
  const bezel50RGeo = new THREE.BoxGeometry(0.05, screen50H_Horiz + 0.06, screen50W_Horiz + 0.06);
  const bezel50RMesh = new THREE.Mesh(bezel50RGeo, matteBlackFraming);
  bezel50RMesh.position.set(sideX + wallThickness / 2 + 0.025, screen50Y_Horiz, screen50RightZ);
  bezel50RMesh.castShadow = true;

  const screen50RGeo = new THREE.PlaneGeometry(screen50W_Horiz, screen50H_Horiz);
  screen50RGeo.rotateY(Math.PI / 2);
  const screen50RMat = new THREE.MeshBasicMaterial({
    map: screenMgr.texture50Right,
  });
  const screen50RightMesh = new THREE.Mesh(screen50RGeo, screen50RMat);
  screen50RightMesh.position.set(sideX + wallThickness / 2 + 0.055, screen50Y_Horiz, screen50RightZ);

  wallsGroup.add(bezel50LMesh, screen50LeftMesh, bezel50RMesh, screen50RightMesh);
  group.add(wallsGroup);

  // 5. LOW-PROFILE STATIC ANGLED PRESENTATION DECK (5° TILT)
  const podiumWedgeGroup = new THREE.Group();
  podiumWedgeGroup.name = 'Angled_Podium_Deck';
  podiumWedgeGroup.position.set(0.1, floorHeight, -0.7);

  // Deck dimensions: Length 4.2m (fits 3500mm car comfortably), Width 2.4m (fits 1600mm car)
  const deckLength = 4.2;
  const deckWidth = 2.4;
  const frontLift = 0.24; // 5-degree angle

  const wedgeShape = new THREE.Shape();
  wedgeShape.moveTo(-deckLength / 2, 0);
  wedgeShape.lineTo(deckLength / 2, 0);
  wedgeShape.lineTo(deckLength / 2, frontLift);
  wedgeShape.lineTo(-deckLength / 2, 0.05);
  wedgeShape.closePath();

  const wedgeGeo = new THREE.ExtrudeGeometry(wedgeShape, {
    depth: deckWidth,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.03,
    bevelSegments: 3,
  });
  wedgeGeo.rotateY(Math.PI / 2);
  wedgeGeo.center();

  const deckMesh = new THREE.Mesh(wedgeGeo, carbonDeckMaterial);
  deckMesh.position.set(0, frontLift / 2 + 0.02, 0);
  deckMesh.receiveShadow = true;
  deckMesh.castShadow = true;
  podiumWedgeGroup.add(deckMesh);

  // Recessed perimeter underglow LED channel
  const underglowGeo = new THREE.BoxGeometry(deckWidth + 0.1, 0.025, deckLength + 0.1);
  const underglowMesh = new THREE.Mesh(underglowGeo, underglowMaterial);
  underglowMesh.position.set(0, 0.02, 0);
  podiumWedgeGroup.add(underglowMesh);

  // Deck aluminum guide borders
  const railGeo = new THREE.BoxGeometry(0.04, 0.04, deckLength * 0.95);
  const leftRail = new THREE.Mesh(railGeo, aluminumTrimMaterial);
  leftRail.position.set(-deckWidth / 2 + 0.06, frontLift / 2 + 0.06, 0);
  leftRail.rotation.x = -Math.atan2(frontLift, deckLength);
  const rightRail = new THREE.Mesh(railGeo, aluminumTrimMaterial);
  rightRail.position.set(deckWidth / 2 - 0.06, frontLift / 2 + 0.06, 0);
  rightRail.rotation.x = -Math.atan2(frontLift, deckLength);
  podiumWedgeGroup.add(leftRail, rightRail);

  group.add(podiumWedgeGroup);

  // 6. INDIAN AUTO EXPO RECEPTION / INQUIRY COUNTER (LEFT CORNER ONLY)
  const counterGroup = new THREE.Group();
  counterGroup.name = 'Reception_Counter';
  counterGroup.position.set(-2.4, floorHeight, 2.2);
  counterGroup.rotation.y = Math.PI / 12; // Angled facing incoming visitors from front-left open aisle

  // Counter main body
  const counterBodyGeo = new THREE.BoxGeometry(1.35, 1.0, 0.52);
  const counterBody = new THREE.Mesh(counterBodyGeo, matteBlackFraming);
  counterBody.position.set(0, 0.5, 0);
  counterBody.castShadow = true;
  counterBody.receiveShadow = true;

  // Counter top slab
  const counterTopGeo = new THREE.BoxGeometry(1.42, 0.04, 0.58);
  const counterTop = new THREE.Mesh(counterTopGeo, tableTopMaterial);
  counterTop.position.set(0, 1.02, 0);
  counterTop.castShadow = true;

  // Aluminum lower kickplate
  const kickGeo = new THREE.BoxGeometry(1.36, 0.08, 0.53);
  const kickplate = new THREE.Mesh(kickGeo, aluminumTrimMaterial);
  kickplate.position.set(0, 0.04, 0);

  // Front Backlit "ISHMIN" Acrylic Logo Panel
  const frontLogoPanelGeo = new THREE.BoxGeometry(0.95, 0.28, 0.03);
  const frontLogoPanel = new THREE.Mesh(frontLogoPanelGeo, matteBlackFraming);
  frontLogoPanel.position.set(0, 0.65, 0.27);

  const frontLogoTextGeo = new THREE.BoxGeometry(0.75, 0.04, 0.015);
  const frontLogoText = new THREE.Mesh(frontLogoTextGeo, backlitLogoMat);
  frontLogoText.position.set(0, 0.65, 0.29);

  // Counter top accessories (Visitor enquiry tablet & brochure stand)
  const tabletGeo = new THREE.BoxGeometry(0.22, 0.015, 0.16);
  const tablet = new THREE.Mesh(tabletGeo, matteBlackFraming);
  tablet.position.set(-0.25, 1.045, 0.05);
  tablet.rotation.y = 0.2;

  const brochureStandGeo = new THREE.BoxGeometry(0.18, 0.18, 0.12);
  const brochureStand = new THREE.Mesh(brochureStandGeo, aluminumTrimMaterial);
  brochureStand.position.set(0.35, 1.11, -0.05);
  brochureStand.rotation.y = -0.3;

  // Ergonomic tall reception stool behind counter
  const stoolBehind = new THREE.Group();
  stoolBehind.position.set(0, 0, -0.42);
  const stoolSeatMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.05, 20), stoolSeatFabric);
  stoolSeatMesh.position.set(0, 0.65, 0);
  stoolSeatMesh.castShadow = true;
  const stoolPoleMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.62, 12), chromeMaterial);
  stoolPoleMesh.position.set(0, 0.31, 0);
  const stoolBaseDisc = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.22, 0.02, 20), chromeMaterial);
  stoolBaseDisc.position.set(0, 0.01, 0);
  stoolBehind.add(stoolSeatMesh, stoolPoleMesh, stoolBaseDisc);

  counterGroup.add(counterBody, counterTop, kickplate, frontLogoPanel, frontLogoText, tablet, brochureStand, stoolBehind);
  group.add(counterGroup);

  // 7. RIGHT CORNER FRONT VIP CONSULTATION LOUNGE SEATING (SOFA, STOOLS, ROUND DISCUSSION TABLE)
  const loungeGroup = new THREE.Group();
  loungeGroup.name = 'VIP_Consultation_Lounge';
  loungeGroup.position.set(2.2, floorHeight, 2.0);

  // Modern 2-Seater Modular Lounge Sofa (Angled facing toward entrance & car display)
  const sofaGroup = new THREE.Group();
  sofaGroup.position.set(0.3, 0, 0.05);
  sofaGroup.rotation.y = -Math.PI / 6;

  const sofaBaseGeo = new THREE.BoxGeometry(1.5, 0.18, 0.75);
  const sofaBase = new THREE.Mesh(sofaBaseGeo, sofaFabric);
  sofaBase.position.set(0, 0.18, 0);
  sofaBase.castShadow = true;
  sofaBase.receiveShadow = true;

  const sofaSeatCushionGeo = new THREE.BoxGeometry(1.42, 0.14, 0.65);
  const sofaSeat = new THREE.Mesh(sofaSeatCushionGeo, sofaFabric);
  sofaSeat.position.set(0, 0.33, 0.03);
  sofaSeat.castShadow = true;

  const sofaBackGeo = new THREE.BoxGeometry(1.5, 0.42, 0.16);
  const sofaBack = new THREE.Mesh(sofaBackGeo, sofaFabric);
  sofaBack.position.set(0, 0.52, -0.32);
  sofaBack.castShadow = true;

  const legGeo = new THREE.CylinderGeometry(0.018, 0.018, 0.14, 12);
  const leg1 = new THREE.Mesh(legGeo, chromeMaterial);
  leg1.position.set(-0.65, 0.07, 0.28);
  const leg2 = new THREE.Mesh(legGeo, chromeMaterial);
  leg2.position.set(0.65, 0.07, 0.28);
  const leg3 = new THREE.Mesh(legGeo, chromeMaterial);
  leg3.position.set(-0.65, 0.07, -0.28);
  const leg4 = new THREE.Mesh(legGeo, chromeMaterial);
  leg4.position.set(0.65, 0.07, -0.28);

  const pillowGeo = new THREE.BoxGeometry(0.32, 0.28, 0.12);
  const pillow = new THREE.Mesh(pillowGeo, sofaCushionAccent);
  pillow.position.set(0.42, 0.48, -0.22);
  pillow.rotation.y = -0.15;
  pillow.castShadow = true;

  sofaGroup.add(sofaBase, sofaSeat, sofaBack, leg1, leg2, leg3, leg4, pillow);
  loungeGroup.add(sofaGroup);

  // Modern Circular Round Discussion Table
  const tableGroup = new THREE.Group();
  tableGroup.position.set(-0.4, 0, 0.05);

  const tableTopGeo = new THREE.CylinderGeometry(0.38, 0.38, 0.024, 32);
  const tableTop = new THREE.Mesh(tableTopGeo, tableTopMaterial);
  tableTop.position.set(0, 0.46, 0);
  tableTop.castShadow = true;

  const tableBezelGeo = new THREE.TorusGeometry(0.38, 0.01, 8, 32);
  tableBezelGeo.rotateX(Math.PI / 2);
  const tableBezel = new THREE.Mesh(tableBezelGeo, aluminumTrimMaterial);
  tableBezel.position.set(0, 0.46, 0);

  const tablePedestalGeo = new THREE.CylinderGeometry(0.028, 0.032, 0.44, 16);
  const tablePedestal = new THREE.Mesh(tablePedestalGeo, chromeMaterial);
  tablePedestal.position.set(0, 0.22, 0);
  tablePedestal.castShadow = true;

  const tableBaseGeo = new THREE.CylinderGeometry(0.24, 0.26, 0.02, 24);
  const tableBase = new THREE.Mesh(tableBaseGeo, chromeMaterial);
  tableBase.position.set(0, 0.01, 0);

  tableGroup.add(tableTop, tableBezel, tablePedestal, tableBase);
  loungeGroup.add(tableGroup);

  // Two Designer Swivel Stools around the round discussion table
  function createDesignerStool(sx: number, sz: number) {
    const stool = new THREE.Group();
    stool.position.set(sx, 0, sz);

    const seatGeo = new THREE.CylinderGeometry(0.2, 0.2, 0.07, 24);
    const seat = new THREE.Mesh(seatGeo, stoolSeatFabric);
    seat.position.set(0, 0.48, 0);
    seat.castShadow = true;

    const stoolStemGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.46, 12);
    const stem = new THREE.Mesh(stoolStemGeo, chromeMaterial);
    stem.position.set(0, 0.23, 0);

    const stoolBaseGeo = new THREE.CylinderGeometry(0.18, 0.2, 0.015, 24);
    const base = new THREE.Mesh(stoolBaseGeo, chromeMaterial);
    base.position.set(0, 0.01, 0);

    stool.add(seat, stem, base);
    return stool;
  }

  const stool1 = createDesignerStool(-0.4, 0.65);
  const stool2 = createDesignerStool(-0.95, 0.05);
  loungeGroup.add(stool1, stool2);

  group.add(loungeGroup);

  // 8. TELESCOPING SPOTLIGHT MASTS & ARTICULATED FIXTURES (Dual 150W Focus Lights)
  function createSpotlightFixture(mastX: number, mastZ: number) {
    const fixtureGroup = new THREE.Group();
    fixtureGroup.position.set(mastX, floorHeight, mastZ);

    const basePlate = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.22, 0.03, 16), matteBlackFraming);
    basePlate.position.set(0, 0.015, 0);

    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.04, 3.2, 16), matteBlackFraming);
    pole.position.set(0, 1.6, 0);
    pole.castShadow = true;

    const gimbalHead = new THREE.Group();
    gimbalHead.position.set(0, 3.2, 0);

    const lampBarrelGeo = new THREE.CylinderGeometry(0.08, 0.11, 0.22, 16);
    lampBarrelGeo.rotateX(Math.PI / 2);
    const lampBarrel = new THREE.Mesh(lampBarrelGeo, matteBlackFraming);
    lampBarrel.castShadow = true;

    const lensGeo = new THREE.CircleGeometry(0.075, 16);
    const lensMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const lens = new THREE.Mesh(lensGeo, lensMat);
    lens.position.set(0, 0, 0.112);

    const flapGeo = new THREE.BoxGeometry(0.12, 0.05, 0.005);
    const topFlap = new THREE.Mesh(flapGeo, matteBlackFraming);
    topFlap.position.set(0, 0.1, 0.14);
    topFlap.rotation.x = 0.4;
    const bottomFlap = new THREE.Mesh(flapGeo, matteBlackFraming);
    bottomFlap.position.set(0, -0.1, 0.14);
    bottomFlap.rotation.x = -0.4;

    lampBarrel.add(lens, topFlap, bottomFlap);
    gimbalHead.add(lampBarrel);
    fixtureGroup.add(basePlate, pole, gimbalHead);

    return { fixtureGroup, gimbalHead };
  }

  const spot1Data = createSpotlightFixture(3.1, -1.8);
  const spot2Data = createSpotlightFixture(3.2, -0.2);
  group.add(spot1Data.fixtureGroup, spot2Data.fixtureGroup);

  // 10. 1-METER EXPO GRID HELPER & DIMENSION MARKERS
  const gridHelper = new THREE.GridHelper(7.0, 7, 0x0284c7, 0x334155);
  gridHelper.position.set(0, floorHeight + 0.005, 0);
  gridHelper.visible = false;
  group.add(gridHelper);

  const dimensionGroup = new THREE.Group();
  dimensionGroup.name = 'Dimension_Callouts';
  dimensionGroup.visible = false;

  const dimLineMat = new THREE.LineBasicMaterial({ color: 0x38bdf8 });
  const pointsW = [
    new THREE.Vector3(-3.5, floorHeight + 0.02, 3.35),
    new THREE.Vector3(3.5, floorHeight + 0.02, 3.35)
  ];
  const geoLineW = new THREE.BufferGeometry().setFromPoints(pointsW);
  const lineW = new THREE.Line(geoLineW, dimLineMat);

  const pointsD = [
    new THREE.Vector3(3.55, floorHeight + 0.02, -3.25),
    new THREE.Vector3(3.55, floorHeight + 0.02, 3.25)
  ];
  const geoLineD = new THREE.BufferGeometry().setFromPoints(pointsD);
  const lineD = new THREE.Line(geoLineD, dimLineMat);

  dimensionGroup.add(lineW, lineD);
  group.add(dimensionGroup);

  return {
    group,
    podiumWedgeGroup,
    screen70Mesh,
    screen50LeftMesh,
    screen50RightMesh,
    underglowMesh,
    spotlight1Fixture: spot1Data.gimbalHead,
    spotlight2Fixture: spot2Data.gimbalHead,
    gridHelper,
    dimensionGroup,
    setUnderglowColor: (colorHex: string) => {
      underglowMaterial.color.set(colorHex);
    },
    setDimensionsVisible: (visible: boolean) => {
      gridHelper.visible = visible;
      dimensionGroup.visible = visible;
    },
    dispose: () => {
      tileTexture.dispose();
      floorMaterial.dispose();
      aluminumTrimMaterial.dispose();
      matteBlackFraming.dispose();
      wallPanelMaterial.dispose();
      carbonDeckMaterial.dispose();
      underglowMaterial.dispose();
      sofaFabric.dispose();
      sofaCushionAccent.dispose();
      stoolSeatFabric.dispose();
      chromeMaterial.dispose();
      tableTopMaterial.dispose();
      screen70Mat.dispose();
      screen50LMat.dispose();
      screen50RMat.dispose();
    },
  };
}
