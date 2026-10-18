import * as THREE from 'three';
import { ScreenMode70, ScreenMode50Left, ScreenMode50Right } from '../types/expo';

export class ScreenTextureManager {
  // All three screens are now HORIZONTAL (16:9 aspect ratio)
  private canvas70: HTMLCanvasElement;
  private ctx70: CanvasRenderingContext2D;
  public texture70: THREE.CanvasTexture;

  private canvas50Left: HTMLCanvasElement;
  private ctx50Left: CanvasRenderingContext2D;
  public texture50Left: THREE.CanvasTexture;

  private canvas50Right: HTMLCanvasElement;
  private ctx50Right: CanvasRenderingContext2D;
  public texture50Right: THREE.CanvasTexture;

  private animTimer = 0;

  constructor() {
    // 70" Main Horizontal Screen on Wall 1 (16:9 ratio)
    this.canvas70 = document.createElement('canvas');
    this.canvas70.width = 1024;
    this.canvas70.height = 576;
    this.ctx70 = this.canvas70.getContext('2d')!;
    this.texture70 = new THREE.CanvasTexture(this.canvas70);
    this.texture70.colorSpace = THREE.SRGBColorSpace;
    this.texture70.minFilter = THREE.LinearFilter;
    this.texture70.magFilter = THREE.LinearFilter;

    // 50" Screen 1 Horizontal on Wall 2 (16:9 ratio)
    this.canvas50Left = document.createElement('canvas');
    this.canvas50Left.width = 1024;
    this.canvas50Left.height = 576;
    this.ctx50Left = this.canvas50Left.getContext('2d')!;
    this.texture50Left = new THREE.CanvasTexture(this.canvas50Left);
    this.texture50Left.colorSpace = THREE.SRGBColorSpace;
    this.texture50Left.minFilter = THREE.LinearFilter;
    this.texture50Left.magFilter = THREE.LinearFilter;

    // 50" Screen 2 Horizontal on Wall 2 (16:9 ratio)
    this.canvas50Right = document.createElement('canvas');
    this.canvas50Right.width = 1024;
    this.canvas50Right.height = 576;
    this.ctx50Right = this.canvas50Right.getContext('2d')!;
    this.texture50Right = new THREE.CanvasTexture(this.canvas50Right);
    this.texture50Right.colorSpace = THREE.SRGBColorSpace;
    this.texture50Right.minFilter = THREE.LinearFilter;
    this.texture50Right.magFilter = THREE.LinearFilter;

    // Initial render
    this.renderAll('powertrain', 'specs', 'modular_bom', 1.0, 0);
  }

  public update(
    delta: number,
    mode70: ScreenMode70,
    mode50L: ScreenMode50Left,
    mode50R: ScreenMode50Right,
    brightness: number,
    isPlaying: boolean
  ) {
    if (isPlaying) {
      this.animTimer += delta;
    }
    this.renderAll(mode70, mode50L, mode50R, brightness, this.animTimer);
  }

  private renderAll(
    mode70: ScreenMode70,
    mode50L: ScreenMode50Left,
    mode50R: ScreenMode50Right,
    brightness: number,
    t: number
  ) {
    this.render70(mode70, brightness, t);
    this.render50Left(mode50L, brightness, t);
    this.render50Right(mode50R, brightness, t);

    this.texture70.needsUpdate = true;
    this.texture50Left.needsUpdate = true;
    this.texture50Right.needsUpdate = true;
  }

  // --- 70" Main Horizontal Screen (Wall 1 - Back Wall) ---
  private render70(mode: ScreenMode70, brightness: number, t: number) {
    const ctx = this.ctx70;
    const w = 1024;
    const h = 576;

    ctx.fillStyle = '#05070e';
    ctx.fillRect(0, 0, w, h);

    // Subtle background grid
    ctx.strokeStyle = 'rgba(6, 182, 212, 0.08)';
    ctx.lineWidth = 1;
    for (let x = 0; x < w; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let y = 0; y < h; y += 40) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    // Top Header Banner
    ctx.fillStyle = '#0a101d';
    ctx.fillRect(0, 0, w, 76);
    ctx.strokeStyle = 'rgba(6, 182, 212, 0.3)';
    ctx.beginPath();
    ctx.moveTo(0, 76);
    ctx.lineTo(w, 76);
    ctx.stroke();

    // Brand Logo & Model
    ctx.fillStyle = '#ef4444';
    ctx.fillRect(36, 26, 10, 24);

    ctx.font = '700 24px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText('ISHMIN EV DYNAMICS', 58, 46);

    ctx.font = '500 14px "JetBrains Mono", monospace';
    ctx.fillStyle = '#94a3b8';
    ctx.fillText('INDIAN AUTO EXPO 2026 // 3-WHEELER EV CROSSOVER', 350, 44);

    // Active mode indicator
    ctx.font = '600 13px "JetBrains Mono", monospace';
    ctx.fillStyle = '#38bdf8';
    ctx.fillText(`CHANNEL: [ ${mode.toUpperCase()} ]`, w - 240, 44);

    if (mode === 'powertrain') {
      this.drawPowertrain70(ctx, w, h, t);
    } else if (mode === 'battery') {
      this.drawBattery70(ctx, w, h, t);
    } else if (mode === 'aerodynamics') {
      this.drawAero70(ctx, w, h, t);
    } else {
      this.drawBrand70(ctx, w, h, t);
    }

    // Footer telemetry bar
    ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
    ctx.fillRect(0, h - 36, w, 36);
    ctx.fillStyle = '#64748b';
    ctx.font = '12px "JetBrains Mono", monospace';
    ctx.fillText(
      `DIMENSIONS: 3500mm (L) × 1600mm (W)  |  VOLTAGE: 785V  |  MOTOR: ${(52 + Math.sin(t) * 2).toFixed(1)}°C  |  EFFICIENCY: 98.4%`,
      36,
      h - 14
    );

    if (brightness < 1.0) {
      ctx.fillStyle = `rgba(0,0,0,${(1 - brightness) * 0.8})`;
      ctx.fillRect(0, 0, w, h);
    }
  }

  private drawPowertrain70(ctx: CanvasRenderingContext2D, w: number, h: number, t: number) {
    ctx.fillStyle = '#ffffff';
    ctx.font = '700 22px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('Tri-Vector All-Electric Architecture (3500mm × 1600mm)', 36, 120);

    ctx.font = '14px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#94a3b8';
    ctx.fillText('Synchronized Dual-Front Hub Motors + Central High-Torque Rear Traction Module', 36, 144);

    // Animated power wave
    const startY = 320;
    ctx.strokeStyle = '#0284c7';
    ctx.lineWidth = 3;
    ctx.beginPath();
    for (let x = 36; x < 540; x += 4) {
      const y = startY + Math.sin((x * 0.02) + (t * 4)) * 35;
      if (x === 36) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let x = 36; x < 540; x += 4) {
      const y = startY + Math.cos((x * 0.025) - (t * 3)) * 24;
      if (x === 36) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    const metrics = [
      { label: 'FRONT AXLE TORQUE', val: `${Math.round(210 + Math.sin(t * 2) * 15)} Nm`, sub: 'Dual In-Wheel Vectoring' },
      { label: 'REAR MOTOR TRACTION', val: `${Math.round(230 + Math.cos(t * 1.5) * 12)} Nm`, sub: 'Permanent Magnet Synchronous' },
      { label: 'PEAK COMBINED POWER', val: '120 kW / 163 HP', sub: 'Instant Zero-Lag Acceleration' },
      { label: 'ACTIVE REGEN BRAKING', val: '65 kW Harvest', sub: 'One-Pedal Carving Control' }
    ];

    metrics.forEach((m, idx) => {
      const bx = 580;
      const by = 110 + idx * 95;
      ctx.fillStyle = 'rgba(15, 23, 42, 0.7)';
      ctx.fillRect(bx, by, 400, 80);
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.25)';
      ctx.strokeRect(bx, by, 400, 80);

      ctx.fillStyle = '#38bdf8';
      ctx.font = '600 12px "JetBrains Mono", monospace';
      ctx.fillText(m.label, bx + 18, by + 26);

      ctx.fillStyle = '#ffffff';
      ctx.font = '700 24px "Plus Jakarta Sans", sans-serif';
      ctx.fillText(m.val, bx + 18, by + 56);

      ctx.fillStyle = '#64748b';
      ctx.font = '12px "Plus Jakarta Sans", sans-serif';
      ctx.fillText(m.sub, bx + 210, by + 54);
    });
  }

  private drawBattery70(ctx: CanvasRenderingContext2D, w: number, h: number, t: number) {
    ctx.fillStyle = '#ffffff';
    ctx.font = '700 22px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('Solid-State 800V Ultra-Fast Charge Pack', 36, 120);

    ctx.font = '14px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#94a3b8';
    ctx.fillText('Underfloor Integrated Monocoque Structure (Length 3500mm)', 36, 144);

    const cols = 8;
    const rows = 4;
    const startX = 36;
    const startY = 190;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const cx = startX + c * 58;
        const cy = startY + r * 54;
        const cellTemp = 28 + Math.sin(t * 2 + r + c) * 3;
        ctx.fillStyle = cellTemp > 29.5 ? 'rgba(239, 68, 68, 0.4)' : 'rgba(6, 182, 212, 0.3)';
        ctx.fillRect(cx, cy, 50, 44);
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
        ctx.strokeRect(cx, cy, 50, 44);

        ctx.fillStyle = '#ffffff';
        ctx.font = '10px "JetBrains Mono", monospace';
        ctx.fillText(`${cellTemp.toFixed(1)}°`, cx + 10, cy + 28);
      }
    }

    ctx.fillStyle = 'rgba(15, 23, 42, 0.8)';
    ctx.fillRect(540, 110, 440, 380);
    ctx.strokeStyle = 'rgba(6, 182, 212, 0.3)';
    ctx.strokeRect(540, 110, 440, 380);

    ctx.fillStyle = '#38bdf8';
    ctx.font = '700 16px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('FAST-CHARGE PROJECTION (350kW DC)', 565, 145);

    const chargePercent = Math.min(100, Math.floor(65 + ((t * 8) % 35)));
    ctx.fillStyle = '#ffffff';
    ctx.font = '800 48px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(`${chargePercent}%`, 565, 215);

    ctx.fillStyle = '#10b981';
    ctx.font = '600 14px "JetBrains Mono", monospace';
    ctx.fillText('CURRENT RATE: +18 km / MINUTE', 565, 245);

    ctx.fillStyle = '#1e293b';
    ctx.fillRect(565, 270, 390, 16);
    ctx.fillStyle = '#ef4444';
    ctx.fillRect(565, 270, (390 * chargePercent) / 100, 16);

    ctx.fillStyle = '#94a3b8';
    ctx.font = '13px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('• Pack Capacity: 24.0 kWh Solid-State', 565, 330);
    ctx.fillText('• 10% to 80% Fast Charge: 14 Minutes', 565, 360);
    ctx.fillText('• Gravimetric Density: 340 Wh / kg', 565, 390);
    ctx.fillText('• Certified for Extreme Indian Climate (-10°C to +50°C)', 565, 420);
  }

  private drawAero70(ctx: CanvasRenderingContext2D, w: number, h: number, t: number) {
    ctx.fillStyle = '#ffffff';
    ctx.font = '700 22px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('Aero Efficiency & Compact Footprint', 36, 120);

    ctx.font = '14px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#94a3b8';
    ctx.fillText('Frontal Width: 1600mm · Overall Length: 3500mm · Drag Coefficient Cd 0.28', 36, 144);

    for (let i = 0; i < 30; i++) {
      const px = ((i * 35 + t * 200) % 520) + 36;
      const py = 220 + Math.sin(i + t) * 80;
      const len = 40 + (i % 5) * 15;
      const grad = ctx.createLinearGradient(px, py, px + len, py);
      grad.addColorStop(0, 'rgba(239, 68, 68, 0)');
      grad.addColorStop(1, 'rgba(239, 68, 68, 0.85)');
      ctx.strokeStyle = grad;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(px, py);
      ctx.lineTo(px + len, py);
      ctx.stroke();
    }

    const aeroStats = [
      { k: 'OVERALL LENGTH', v: '3,500 mm', sub: 'Easy urban parking & tight turning' },
      { k: 'TOTAL BODY WIDTH', v: '1,600 mm', sub: 'Sub-1.7m agile traffic profile' },
      { k: 'DRAG COEFFICIENT', v: '0.28 Cd', sub: 'Tapered aerodynamic tail hatch' },
      { k: 'FRONT SPLITTER', v: '45 kg Downforce', sub: 'High-speed directional stability' }
    ];

    aeroStats.forEach((s, idx) => {
      const bx = 580;
      const by = 110 + idx * 95;
      ctx.fillStyle = 'rgba(15, 23, 42, 0.7)';
      ctx.fillRect(bx, by, 400, 80);
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.25)';
      ctx.strokeRect(bx, by, 400, 80);

      ctx.fillStyle = '#38bdf8';
      ctx.font = '600 12px "JetBrains Mono", monospace';
      ctx.fillText(s.k, bx + 18, by + 26);

      ctx.fillStyle = '#ffffff';
      ctx.font = '700 24px "Plus Jakarta Sans", sans-serif';
      ctx.fillText(s.v, bx + 18, by + 56);

      ctx.fillStyle = '#64748b';
      ctx.font = '12px "Plus Jakarta Sans", sans-serif';
      ctx.fillText(s.sub, bx + 190, by + 54);
    });
  }

  private drawBrand70(ctx: CanvasRenderingContext2D, w: number, h: number, t: number) {
    ctx.textAlign = 'center';

    ctx.fillStyle = '#ef4444';
    ctx.font = '700 16px "JetBrains Mono", monospace';
    ctx.fillText('I S H M I N   E V   C R O S S O V E R', w / 2, 170);

    ctx.fillStyle = '#ffffff';
    ctx.font = '800 48px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('3500mm × 1600mm. REVOLUTIONARY.', w / 2, 240);

    ctx.fillStyle = '#94a3b8';
    ctx.font = '500 18px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('High-performance 3-wheeler engineered for India & global urban mobility.', w / 2, 288);

    const pulse = (Math.sin(t * 3) + 1) * 0.5;
    ctx.strokeStyle = `rgba(239, 68, 68, ${0.5 + pulse * 0.4})`;
    ctx.lineWidth = 2;
    ctx.strokeRect(w / 2 - 220, 340, 440, 60);

    ctx.fillStyle = '#ffffff';
    ctx.font = '700 16px "JetBrains Mono", monospace';
    ctx.fillText('INQUIRE AT RECEPTION COUNTER // STAND 4B', w / 2, 376);

    ctx.textAlign = 'left';
  }

  // --- 50" Screen 1 HORIZONTAL (Wall 2 - Side Wall): Technical Specs ---
  private render50Left(mode: ScreenMode50Left, brightness: number, _t: number) {
    const ctx = this.ctx50Left;
    const w = 1024;
    const h = 576;

    ctx.fillStyle = '#060a12';
    ctx.fillRect(0, 0, w, h);

    // Header
    ctx.fillStyle = '#0b1322';
    ctx.fillRect(0, 0, w, 76);
    ctx.strokeStyle = 'rgba(6, 182, 212, 0.4)';
    ctx.beginPath();
    ctx.moveTo(0, 76);
    ctx.lineTo(w, 76);
    ctx.stroke();

    ctx.fillStyle = '#ef4444';
    ctx.fillRect(36, 26, 8, 24);

    ctx.fillStyle = '#ffffff';
    ctx.font = '800 22px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('WALL 2 · SCREEN 01 // ISHMIN VEHICLE SPECIFICATIONS', 54, 46);

    ctx.fillStyle = '#38bdf8';
    ctx.font = '600 13px "JetBrains Mono", monospace';
    ctx.fillText('CAR SIZE: 3500mm (L) × 1600mm (W)', w - 340, 46);

    // 2 Rows of 4 Horizontal Spec Cards (8 specs total)
    const specs = [
      { title: 'CAR LENGTH', value: '3,500 mm', detail: '3.5m compact urban length' },
      { title: 'CAR WIDTH', value: '1,600 mm', detail: '1.6m aerodynamic width' },
      { title: 'ACCELERATION 0-100', value: '3.2 sec', detail: 'Dual-front launch vectoring' },
      { title: 'TOP VELOCITY', value: '185 km/h', detail: 'Electronically governed' },
      { title: 'POWERTRAIN PEAK', value: '120 kW', detail: 'Tri-motor synchronized drive' },
      { title: 'DRIVING RANGE', value: '310 km', detail: 'WLTP urban / highway' },
      { title: 'BATTERY PACK', value: '24 kWh', detail: 'Solid-State 800V fast charge' },
      { title: 'REAR SUSPENSION', value: 'Dual Coilovers', detail: 'Exposed racing shocks' }
    ];

    specs.forEach((s, idx) => {
      const col = idx % 4;
      const row = Math.floor(idx / 4);
      const cardW = 222;
      const cardH = 190;
      const cardX = 36 + col * (cardW + 18);
      const cardY = 100 + row * (cardH + 20);

      ctx.fillStyle = 'rgba(15, 23, 42, 0.65)';
      ctx.fillRect(cardX, cardY, cardW, cardH);
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.2)';
      ctx.strokeRect(cardX, cardY, cardW, cardH);

      ctx.fillStyle = '#38bdf8';
      ctx.font = '600 11px "JetBrains Mono", monospace';
      ctx.fillText(s.title, cardX + 16, cardY + 36);

      ctx.fillStyle = '#ffffff';
      ctx.font = '800 26px "Plus Jakarta Sans", sans-serif';
      ctx.fillText(s.value, cardX + 16, cardY + 84);

      ctx.fillStyle = '#94a3b8';
      ctx.font = '500 12px "Plus Jakarta Sans", sans-serif';
      ctx.fillText(s.detail, cardX + 16, cardY + 125);
    });

    // Bottom strip
    ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
    ctx.fillRect(0, h - 36, w, 36);
    ctx.fillStyle = '#64748b';
    ctx.font = '12px "JetBrains Mono", monospace';
    ctx.fillText('ISHMIN MOTORS R&D · CERTIFIED VEHICLE SPECIFICATIONS FOR INDIAN AUTO EXPO', 36, h - 14);

    if (brightness < 1.0) {
      ctx.fillStyle = `rgba(0,0,0,${(1 - brightness) * 0.8})`;
      ctx.fillRect(0, 0, w, h);
    }
  }

  // --- 50" Screen 2 HORIZONTAL (Wall 2 - Side Wall): Modular Eco Booth & INR Estimates ---
  private render50Right(mode: ScreenMode50Right, brightness: number, _t: number) {
    const ctx = this.ctx50Right;
    const w = 1024;
    const h = 576;

    ctx.fillStyle = '#060a12';
    ctx.fillRect(0, 0, w, h);

    // Header
    ctx.fillStyle = '#0b1322';
    ctx.fillRect(0, 0, w, 76);
    ctx.strokeStyle = 'rgba(16, 185, 129, 0.4)';
    ctx.beginPath();
    ctx.moveTo(0, 76);
    ctx.lineTo(w, 76);
    ctx.stroke();

    ctx.fillStyle = '#10b981';
    ctx.fillRect(36, 26, 8, 24);

    ctx.fillStyle = '#ffffff';
    ctx.font = '800 22px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('WALL 2 · SCREEN 02 // MODULAR BOOTH & INR COST ANALYSIS', 54, 46);

    ctx.fillStyle = '#34d399';
    ctx.font = '600 13px "JetBrains Mono", monospace';
    ctx.fillText('ESTIMATES IN INDIAN RUPEES (₹)', w - 300, 46);

    const boothPoints = [
      { title: 'ALLOTTED AREA', value: '45.5 m²', detail: '7.0m × 6.5m Corner Space' },
      { title: 'NET SAVINGS', value: '₹9,07,000', detail: '75.3% reduction vs truss canopy' },
      { title: 'MODULAR RENTAL', value: '₹2,98,000', detail: 'Complete 4-day expo package' },
      { title: 'POWER CONSUMED', value: '465 Watts', detail: 'Runs off single standard 10A socket' },
      { title: 'RECEPTION DESK', value: 'Left Corner', detail: 'Backlit inquiry counter' },
      { title: 'FRONT ENTRANCE', value: 'Open Aisle', detail: 'Spacious barrier-free walkthrough' },
      { title: 'VIP LOUNGE', value: 'Front Center', detail: 'Executive sofa, table & stools' },
      { title: 'SETUP TIME', value: '4 Hours', detail: 'Tool-free quick-lock flooring' }
    ];

    boothPoints.forEach((b, idx) => {
      const col = idx % 4;
      const row = Math.floor(idx / 4);
      const cardW = 222;
      const cardH = 190;
      const cardX = 36 + col * (cardW + 18);
      const cardY = 100 + row * (cardH + 20);

      ctx.fillStyle = 'rgba(15, 23, 42, 0.65)';
      ctx.fillRect(cardX, cardY, cardW, cardH);
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.2)';
      ctx.strokeRect(cardX, cardY, cardW, cardH);

      ctx.fillStyle = '#34d399';
      ctx.font = '600 11px "JetBrains Mono", monospace';
      ctx.fillText(b.title, cardX + 16, cardY + 36);

      ctx.fillStyle = '#ffffff';
      ctx.font = '800 26px "Plus Jakarta Sans", sans-serif';
      ctx.fillText(b.value, cardX + 16, cardY + 84);

      ctx.fillStyle = '#94a3b8';
      ctx.font = '500 12px "Plus Jakarta Sans", sans-serif';
      ctx.fillText(b.detail, cardX + 16, cardY + 125);
    });

    // Bottom strip
    ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
    ctx.fillRect(0, h - 36, w, 36);
    ctx.fillStyle = '#64748b';
    ctx.font = '12px "JetBrains Mono", monospace';
    ctx.fillText('MAKE IN INDIA · SUSTAINABLE & REUSABLE MODULAR EXPO PAVILION', 36, h - 14);

    if (brightness < 1.0) {
      ctx.fillStyle = `rgba(0,0,0,${(1 - brightness) * 0.8})`;
      ctx.fillRect(0, 0, w, h);
    }
  }

  public dispose() {
    this.texture70.dispose();
    this.texture50Left.dispose();
    this.texture50Right.dispose();
  }
}
