# Modular Auto Expo 3D Display: EV Trike & Tech Pavilion (45 m²)

An interactive 3D spatial visualizer and engineering planner for an auto expo exhibition space (40–50 sq meters), showcasing a futuristic EV Trike on an angled presentation deck. Built with open-air low-profile modular architectural framing, dual energy-efficient LED focus spotlights, a 70" primary tech screen, and two 50" vertical multimedia display totems—optimizing visual punch while keeping fabrication and transport costs minimal.

---

## User Review & Critical Decisions

> [!IMPORTANT]
> The following parameters were confirmed through the interactive clarification turn and guide the 3D model, physical proportions, and feature architecture:

- **Confirmed Vehicle & Presentation**: High-detail procedural EV Trike (aerodynamic delta-chassis, exposed suspension, carbon accents, dual front steering wheels, wide rear hub motor) situated on a low-profile angled presentation deck (5° presentation tilt with recessed perimeter LED floor trace).
- **Confirmed Framing & Structure**: Open-air layout (no bulky overhead canopy), reducing rigging and venue truss rental costs. Features a modular raised composite floor system (7m × 6.5m = 45.5 m²) with aluminum perimeter edge trims, ADA access ramp, and lightweight rear modular backdrop stanchions.
- **Confirmed Lighting Rig**: Two high-efficiency articulated LED expo spotlights (directional focus spots with warm/cool Kelvin selector and adjustable beam angle) plus ambient floor-wash underdeck LEDs.
- **Confirmed Tech Displays**: 
  - One 70-inch primary horizontal LED video wall (center backdrop) playing technology showcases (powertrain telemetry, battery architecture, fast-charge cycle).
  - Two 50-inch portrait-oriented interactive digital totems (flanking the deck) displaying live EV Trike specifications, lightweight modular framing BOM (Bill of Materials), and brand media.
- **Confirmed Interactive Tools**: Real-time lighting presets (Expo Daylight, Dramatic Unveil, Eco Green, Night Showcase), camera director (Hero 3/4, Pilot View, Screen Close-up, Top-Down CAD Grid), animated interactive screen playback, deck slow-rotation toggle, and a live Budget & Material Cost Estimator panel.

---

## 1. Overview & Core Concept

### What It Does
Provides automotive marketing managers, booth designers, and expo attendees an immersive, real-time 3D walkthrough of a budget-optimized 45.5 m² (7.0m × 6.5m) auto expo stall. Users can inspect the custom-engineered procedural EV Trike, reposition focus spotlights, switch dynamic screen animations, inspect modular framing assembly joints, and review a transparent Bill of Materials (BOM) cost estimator showing rental vs. purchase costs.

### Target Audience & Persona
- **Automotive OEM Exhibitors & Startups**: Evaluating spatial footprint, sightlines, and budget efficiency for regional motor shows.
- **Booth Fabricators & Event Production Crews**: Visualizing lightweight modular deck interlocking, cable routing channels, and screen rigging.
- **Expo Visitors & Press**: Experiencing a virtual preview of the vehicle unveiling with active lighting choreography and tech specs.

### Key Value
- **Maximum Impact, Minimum Expense**: Replaces expensive heavy steel truss canopies (saving $6,000–$12,000 in rigging labor and rigging points) with an ultra-clean open-air platform, modular quick-lock floor tiles, and energy-efficient LED spotlights.
- **Spatial Precision**: Accurate 45.5 m² footprint with standard 1m grid alignment, perimeter barrier rails, spectator clearance zones, and safety clearance envelopes.

---

## 2. User Experience & Visual Design

### Key User Flows
1. **Scene Exploration**: User orbits smoothly around the booth in 60fps WebGL with natural momentum damping, zooming in on the EV Trike's steering knuckle, suspension arms, and composite bodywork.
2. **Lighting Director**: Toggle between expo lighting profiles (e.g. *Key Spotlight Unveil*, *Clean High-CRI Daylight*, *Cyber Electric Blue*, *Minimal Eco Mode*) and adjust spotlight spot angles in real time.
3. **Multi-Screen Tech Presentation**: Click or select screens to toggle display modes on the 70" and 50" screens:
   - *Screen 1 (70" Main)*: Powertrain & In-Wheel Hub Motor Architecture animation, Battery Pack Thermal Flow, and Brand Manifesto.
   - *Screen 2 & 3 (50" Vertical)*: Live Specification Index (0-100 km/h, range, weight) and Modular Eco-Framing Breakdown.
4. **Budget & Framing Inspector**: Open the bottom dock tab for "Budget & Framing" to view the lightweight modular component count (aluminum extruded deck edge, raised floor pedestals, tension fabric backdrop frame, LED bars, screen floor stands) with calculated cost savings.
5. **Camera Choreography**: Instant smooth-lerp camera presets (Hero 3/4, Podium Level, Tech Screens, Top-Down Blueprint, Spectator Path).

### Visual Identity & Theme
- **Aesthetic Direction**: High-end industrial minimalism with automotive precision. Sleek dark-slate studio expo hall flooring, brushed aluminum trims, matte black architectural framing, and warm-to-cool LED specular glints.
- **Color Palette**:
  - Neutral Floor & Pavilion Base: Deep Charcoal Canvas (`#0B0F17`), Brushed Slate (`#1E293B`), Matte Aluminum (`#94A3B8`).
  - Active Brand & Lighting Accents: Electric Cyan (`#06B6D4`), Hyper Cobalt (`#2563EB`), and Crisp Daylight White (`#F8FAFC`).
  - Vehicle Finish Swatches: Liquid Silver metallic, Midnight Obsidian, and Solar Pulse Matte Gold.
- **Typography**:
  - Display / Hero: `Plus Jakarta Sans` (bold, geometric, automotive authority).
  - Data / Specifications: `font-mono tabular-nums` (clear tabular alignment for dimensions, lumens, and pricing).
- **Anti-Slop Restraint**: Zero decorative pulsing dots, zero generic pill badges, zero fake AI scoring tickers. Clean unboxed typographic metadata, natural editorial labels, and viewport-first controls.

### Viewport Ergonomics
- **Full Viewport Immersion**: 100vw × 100vh WebGL canvas with no sidebars obstructing 3D visibility.
- **Collapsible Bottom Control Dock**: Pinned horizontally at the bottom center (`max-w-4xl`), featuring quick-access tabs:
  - `Lighting Rig` (Intensity, Color Temp, Focus Beams)
  - `Screens & Media` (70" Main Wall, 50" Left & Right Totems)
  - `Vehicle Finishes` (Trike Body Paint, Deck Angle & Rotation)
  - `BOM & Budget` (Itemized modular components, cost estimation)
- **Top Brand Bar**: Respects the Top Bar Contract (Wordmark Brand, 4 status navigation jumps, 1 primary action: "Export Spec Sheet / BOM").

---

## 3. Key Product Decisions & Trade-Offs

| Decision | Chosen Approach | Rationale | Alternatives Considered |
| :--- | :--- | :--- | :--- |
| **Overhead Structure** | Open-Air Open Format (No Overhead Canopy) | Cuts venue rigging point surcharges ($2,500/point), reduces setup time from 2 days to 4 hours, and keeps booth accessible from 3 sides. | Heavy box truss canopy (expensive, blocks convention center ambient light). |
| **Presentation Deck** | 5° Angled Wedge Platform with Recessed Edge Glow | Dramatic dynamic vehicle stance, allows spectators to see cockpit and chassis without climbing onto the platform. | Flat floor turntable (less dynamic perspective, higher mechanical motor rental cost). |
| **Vehicle Model** | Procedural 12-Part EV Trike Group (`THREE.Group`) | Reverse-trike architecture (2 front wheels, 1 fat rear wheel) optimized for procedural PBR rendering, lightweight urban mobility narrative, and instant load without 404 GLTF assets. | Standard box vehicle or external `.glb` file (vulnerable to external host failure). |
| **Lighting Strategy** | Dual Focused Articulated Spotlights + Floor Wash | Concentrates light on the vehicle body curves and display screens with energy-efficient LED fixtures (total < 600W consumption). | 12× Par-can wash (high energy draw, washed out shadows, visual clutter). |
| **Display Screens** | Procedural Canvas-Rendered Dynamic LED Panels | Simulates real 4K expo video walls with animated vector graphics, telemetry curves, and slide loops rendered directly to `CanvasTexture`. | Static dummy rectangles or external video files (high bandwidth, potential 404s). |

---

## 4. Technical Architecture & Data Strategy

### Component Hierarchy Diagram

```
┌────────────────────────────────────────────────────────────────────────┐
│                               App.tsx                                  │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │                    Header / Top Bar Contract                     │  │
│  │  [Apex EV Expo · 45.5 m²] ── [Deck · Lighting · Screens · BOM] ──│  │
│  └──────────────────────────────────────────────────────────────────┘  │
│                                                                        │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │                     ThreeCanvas.tsx (WebGL)                      │  │
│  │  ┌───────────────────────┐  ┌──────────────────────────────────┐ │  │
│  │  │ Scene & Camera Rig    │  │ Expo Booth Group                 │ │  │
│  │  │ - ACES Filmic Tone    │  │ - 7m×6.5m Modular Composite Deck │ │  │
│  │  │ - RoomEnvironment PBR │  │ - 5° Angled Presentation Wedge   │ │  │
│  │  │ - 2x LED Spotlights   │  │ - 12-Part Procedural EV Trike    │ │  │
│  │  │ - Damped OrbitControl │  │ - 1x 70" LED Video Wall          │ │  │
│  │  │ - Soft Contact Plane  │  │ - 2x 50" Tech Totem Screens      │ │  │
│  │  └───────────────────────┘  └──────────────────────────────────┘ │  │
│  └──────────────────────────────────────────────────────────────────┘  │
│                                                                        │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │               Collapsible Bottom Control Dock                    │  │
│  │  [Tab: Lighting] [Tab: Screens] [Tab: Vehicle] [Tab: BOM/Specs]  │  │
│  │  - Sliders & Toggles | Viewport Damping Camera Preset Buttons    │  │
│  └──────────────────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────────────────┘
```

### Modular Geometry & Asset Architecture
1. **Procedural EV Trike Geometry (`src/three/evTrike.ts`)**:
   - Delta Chassis: Sculpted aerodynamic monocoque hull (`ExtrudeGeometry` with beveled curves).
   - Front Double Wishbone Suspension: Upper/lower A-arms, dampers, and steering tie-rods.
   - Front Wheels: Dual lightweight alloy rims with low-profile performance compound tires and brake calipers.
   - Rear Drive Assembly: Oversized swingarm with enclosed high-torque hub motor and wide slick tire.
   - Cockpit & Glass: Aerodynamic wind deflector with optical glass refraction (`MeshPhysicalMaterial`), minimalist digital instrument yoke, and racing bucket seat.
   - Lighting Accents: Slim continuous daytime-running LED strip (front) and blade taillight (rear).
2. **Modular Booth Architecture (`src/three/boothStructure.ts`)**:
   - 45.5 m² Interlocking Deck: 1m × 1m lightweight composite tiles with non-slip brushed dark finish and perimeter aluminum bevel transitions.
   - 5° Angled Presentation Wedge: Elevated front wheel cradles, brushed carbon deck inlay, and recessed underglow channel.
   - Rear Feature Wall & Totem Mounts: Modular tension-aluminum frame holding the 70" screen and side stanchions holding the dual 50" portrait screens.
   - Focus Spotlight Masts: Two lightweight matte-black vertical telescoping stanchions with dual-axis gimbaled LED spotlight fixtures casting sharp shadows with soft penumbra.
3. **Dynamic Canvas Textures (`src/three/screenTextures.ts`)**:
   - 70" Screen Canvas: Live rendering loop with dynamic animated telemetry, battery charging cycle, 3D wireframe trike schematics, and high-contrast brand typography.
   - 50" Left Screen Canvas: Technical vehicle specs (Weight: 285kg, Power: 120kW, 0-100: 3.2s, Range: 310km, Battery: 24kWh Solid-State).
   - 50" Right Screen Canvas: Modular Expo Cost Calculator & Eco-footprint metrics.

### State Management & Handlers
- `lightingState`: Spotlight 1 & 2 position/intensity/temperature, ambient floor wash intensity, preset selection.
- `screenState`: Active media animation channels, playback pause/play, tech slide rotation.
- `vehicleState`: Paint finish (`silver`, `obsidian`, `gold`, `racing_blue`), deck rotation speed (0 to 1.5 RPM), headlight beam toggle.
- `cameraState`: Active camera angle target (`overview`, `hero34`, `cockpit`, `screens`, `topdown`), interpolated with `THREE.MathUtils.damp`.
- `bomState`: Itemized quantities, unit costs, rental vs. purchase comparison, and total wattage breakdown.

---

## 5. Verification & Implementation Sequence

1. **Phase 3 Packages**: Install `three` and `@types/three`.
2. **Three.js Pipeline Setup**: Implement `ThreeCanvas` with `ACESFilmicToneMapping`, `RoomEnvironment`, `PMREMGenerator`, soft shadow maps, and responsive resize handling.
3. **Procedural 3D Asset Construction**:
   - Build `createEVTrike()` group with detailed 12-part geometry and multi-layered PBR materials.
   - Build `createBoothStructure()` with 45.5 m² modular floor grid, angled wedge deck, screen stanchions, and safety stanchions.
   - Build `createScreenTextures()` with animated HTML5 Canvas 2D renderers.
4. **Lighting & Interaction Rig**:
   - Dual articulated `SpotLight` objects with targets, shadows, and visible light cone frustums.
   - Camera preset interpolation system with exponential damping.
5. **HUD & Control Dock**:
   - Collapsible bottom control dock with tabs for Lighting, Screens, Vehicle Customizer, and BOM Cost Breakdown.
   - Clean top bar following the Top Bar Contract.
6. **Lint & Build Verification**: Run `compile_applet` and test all interactive handlers.
