import { BomItem } from '../types/expo';

export const EXPO_BOM_DATA: BomItem[] = [
  // Modular Flooring (45.5 sq m = 7.0m x 6.5m Corner Space)
  {
    id: 'fl-1',
    category: 'Flooring',
    name: 'Modular Interlocking Floor Tile (1m x 1m)',
    spec: 'Lightweight composite honeycomb core, anti-slip slate vinyl surface, integrated underfloor cable channels',
    quantity: 46,
    unit: 'sq m',
    unitCostRental: 950, // ₹950 per sq m
    unitCostPurchase: 3200,
    powerWatts: 0,
    weightKg: 8.5,
    notes: 'Tool-free quick-lock system, rapid 45-minute assembly',
  },
  {
    id: 'fl-2',
    category: 'Flooring',
    name: 'Aluminum Beveled Perimeter Transition Edge',
    spec: '6061-T6 anodized extruded aluminum, ADA compliant 1:12 ramp gradient along open aisle perimeters',
    quantity: 14,
    unit: 'linear meters',
    unitCostRental: 450, // ₹450 per meter
    unitCostPurchase: 1600,
    powerWatts: 0,
    weightKg: 2.1,
    notes: 'Open corner access for seamless barrier-free visitor walkthrough',
  },
  {
    id: 'fl-3',
    category: 'Flooring',
    name: 'Low-Profile Angled Presentation Deck (5° Tilt)',
    spec: '4.2m x 2.4m engineered aluminum skeletal wedge, carbon-composite tread, recessed perimeter underglow raceway',
    quantity: 1,
    unit: 'deck unit',
    unitCostRental: 38000,
    unitCostPurchase: 145000,
    powerWatts: 45, // Underglow LED strip
    weightKg: 95,
    notes: 'Static inclined deck highlights front suspension and car silhouette without elevation hazards',
  },

  // Lightweight Modular Corner Walls & Framing
  {
    id: 'fr-1',
    category: 'Framing',
    name: 'Corner Modular Wall System (Wall 1 & Wall 2)',
    spec: '3.2m H modular aluminum frame with matte-slate cladding panels and vertical shadow reveals (7.0m W1 + 6.5m W2)',
    quantity: 1,
    unit: 'L-corner system',
    unitCostRental: 48000,
    unitCostPurchase: 165000,
    powerWatts: 0,
    weightKg: 88,
    notes: 'Self-supporting corner architecture; eliminates ₹4.9 Lakh ceiling rigging hoist fees',
  },
  {
    id: 'fr-2',
    category: 'Framing',
    name: 'Flush VESA Commercial Wall Mount Brackets',
    spec: 'Heavy-duty low-profile steel wall brackets with security lock (1x for 70" on Wall 1, 2x for 50" on Wall 2)',
    quantity: 3,
    unit: 'brackets',
    unitCostRental: 1500,
    unitCostPurchase: 4500,
    powerWatts: 0,
    weightKg: 4.5,
    notes: 'All 3 screens mounted horizontally (landscape 16:9) flush with walls',
  },
  {
    id: 'fr-3',
    category: 'Framing',
    name: 'Left Corner Reception / Inquiry Counter with Backlit LED Logo',
    spec: 'Modular curved reception desk placed exclusively on the left entrance corner with illuminated ISHMIN acrylic fascia, brochure shelf, visitor tablet, lockable storage & high stool',
    quantity: 1,
    unit: 'counter',
    unitCostRental: 26000,
    unitCostPurchase: 85000,
    powerWatts: 30,
    weightKg: 34,
    notes: 'Left corner entrance reception for visitor registration, brochures, and lead capture',
  },
  {
    id: 'fr-5',
    category: 'Framing',
    name: 'Right Corner VIP Consultation Lounge Suite (Sofa, Stools, Round Table)',
    spec: 'Commercial modular charcoal lounge sofa, 2 chrome designer swivel stools, and round discussion table positioned on the right corner front',
    quantity: 1,
    unit: 'suite',
    unitCostRental: 28000,
    unitCostPurchase: 95000,
    powerWatts: 0,
    weightKg: 45,
    notes: 'Executive VIP consultation and hospitality lounge situated on the right corner front offering prime sightlines of the EV car display',
  },
  {
    id: 'fr-6',
    category: 'Framing',
    name: 'Telescoping Focus Light Masts (3.2m)',
    spec: 'Lightweight aluminum pneumatic locking poles with 2-axis gimbal mounts on aisle corners',
    quantity: 2,
    unit: 'masts',
    unitCostRental: 4500,
    unitCostPurchase: 16000,
    powerWatts: 0,
    weightKg: 9,
    notes: 'Aisle-perimeter positioned to illuminate vehicle and corner displays',
  },

  // Energy-Efficient LED Lighting (Total < 480W)
  {
    id: 'lt-1',
    category: 'Lighting',
    name: 'High-CRI LED Expo Focus Spotlight (150W COB)',
    spec: 'Variable beam angle 15°-45°, CRI > 96, adjustable CCT 3000K–6000K, rotating barn doors',
    quantity: 2,
    unit: 'fixtures',
    unitCostRental: 8500,
    unitCostPurchase: 28000,
    powerWatts: 150,
    weightKg: 5.2,
    notes: 'Precision automotive beam sculpting on vehicle and wall displays',
  },
  {
    id: 'lt-2',
    category: 'Lighting',
    name: 'Perimeter Underdeck & Wall-Wash Linear LED Glow',
    spec: 'High-density 24V COB silicone encapsulated LED strip, continuous phosphor line, IP65',
    quantity: 14,
    unit: 'meters',
    unitCostRental: 450,
    unitCostPurchase: 1200,
    powerWatts: 10,
    weightKg: 0.35,
    notes: 'Underdeck floating podium glow and architectural top wall-wash linear strip',
  },

  // Multimedia Display & AV (All Horizontal Screens)
  {
    id: 'av-1',
    category: 'Screens & AV',
    name: '70-Inch Horizontal Commercial 4K Display (Wall 1)',
    spec: '70" UHD ultra-slim bezel 700-nit high-ambient commercial display mounted horizontally on Wall 1',
    quantity: 1,
    unit: 'screen',
    unitCostRental: 45000,
    unitCostPurchase: 145000,
    powerWatts: 140,
    weightKg: 28,
    notes: 'Central video wall on Wall 1 for powertrain telemetry & tech animations',
  },
  {
    id: 'av-2',
    category: 'Screens & AV',
    name: '50-Inch Horizontal Commercial 4K Displays (Wall 2)',
    spec: 'Dual 50" horizontal (16:9) commercial LED panels mounted flush on Wall 2',
    quantity: 2,
    unit: 'screens',
    unitCostRental: 24000,
    unitCostPurchase: 68000,
    powerWatts: 95,
    weightKg: 14.5,
    notes: 'Mounted horizontally on Wall 2 for vehicle specs, dimensions, and eco modular data',
  },

  // Electrical & Distribution
  {
    id: 'el-1',
    category: 'Electrical',
    name: 'Compact 16A Expo Distribution Hub & Cabling',
    spec: 'Integrated surge protection, RCD breaker, modular floor raceway drops',
    quantity: 1,
    unit: 'kit',
    unitCostRental: 6500,
    unitCostPurchase: 22000,
    powerWatts: 5,
    weightKg: 7,
    notes: 'Entire booth operates safely off a single standard 10A / 230V outlet!',
  },
];

export interface TraditionalBoothComparison {
  traditionalTrussCanopyCost: number;
  traditionalRiggingFee: number;
  traditionalHalogenPowerCost: number;
  traditionalLaborDays: number;
  traditionalTotalCost: number;
  modularSetupCost: number;
  modularPowerCost: number;
  modularLaborHours: number;
  netSavingsRupees: number;
  powerSavedPercent: number;
}

export const BOOTH_COST_COMPARISON: TraditionalBoothComparison = {
  traditionalTrussCanopyCost: 380000, // Box truss 7x7m rental & fabrication (₹3.80 Lakhs)
  traditionalRiggingFee: 490000, // 4 ceiling hoist points + union rigging crew (₹4.90 Lakhs)
  traditionalHalogenPowerCost: 95000, // 4000W halogen draw surcharge over 4 expo days
  traditionalLaborDays: 3.0, // Days to build and strike
  traditionalTotalCost: 1205000, // ₹12.05 Lakhs total traditional
  modularSetupCost: 298000, // ₹2.98 Lakhs total modular corner rental package (standee removed)
  modularPowerCost: 8200, // 465W total LED draw over 4 expo days
  modularLaborHours: 4, // 4 hours setup with 2 people
  netSavingsRupees: 907000, // ₹9.07 Lakhs net savings! (75.3% reduction)
  powerSavedPercent: 88, // 480W vs 4000W
};
