import React, { useState } from 'react';
import { X, Copy, Check, Download, Layers, ShieldCheck, Zap } from 'lucide-react';
import { EXPO_BOM_DATA, BOOTH_COST_COMPARISON } from '../data/bomData';

interface BomExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BomExportModal: React.FC<BomExportModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    const textReport = [
      '==============================================================',
      'ISHMIN AUTO EXPO 2026: 45.5 SQ METERS CORNER PAVILION BOM',
      'Area: 7.0m x 6.5m (45.5 m²) | Corner Space Modular Rig with Center Corner VIP Lounge',
      'Vehicle: Ishmin EV Car (3,500mm Length × 1,600mm Width)',
      '==============================================================',
      '',
      `Net Modular Rental Cost: ₹${BOOTH_COST_COMPARISON.modularSetupCost.toLocaleString('en-IN')}`,
      `Traditional Truss Canopy Cost: ₹${BOOTH_COST_COMPARISON.traditionalTotalCost.toLocaleString('en-IN')}`,
      `Net Budget Savings: ₹${BOOTH_COST_COMPARISON.netSavingsRupees.toLocaleString('en-IN')} (74.1% reduction)`,
      `Total Lighting & AV Power: 480 Watts (88% reduction vs 4,000W halogen)`,
      '',
      'ITEMIZED BILL OF MATERIALS (BOM - INR):',
      '--------------------------------------------------------------',
      ...EXPO_BOM_DATA.map(
        (i) =>
          `[${i.category}] ${i.name} - Qty: ${i.quantity} ${i.unit} | Rental: ₹${(i.unitCostRental * i.quantity).toLocaleString('en-IN')} | Power: ${i.powerWatts}W | Notes: ${i.notes}`
      ),
      '==============================================================',
    ].join('\n');

    navigator.clipboard.writeText(textReport);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadCSV = () => {
    const headers = ['Category', 'Item Name', 'Specification', 'Quantity', 'Unit', 'Unit Rental (INR ₹)', 'Total Rental (INR ₹)', 'Power (W)', 'Weight (kg)', 'Notes'];
    const rows = EXPO_BOM_DATA.map((i) => [
      `"${i.category}"`,
      `"${i.name}"`,
      `"${i.spec}"`,
      i.quantity,
      `"${i.unit}"`,
      i.unitCostRental,
      i.unitCostRental * i.quantity,
      i.powerWatts,
      i.weightKg,
      `"${i.notes}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'Ishmin_Auto_Expo_45.5sqm_Modular_BOM_INR.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
      <div className="relative w-full max-w-3xl max-h-[90vh] bg-slate-950 border border-slate-800 rounded-xl shadow-2xl flex flex-col text-slate-200 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/60">
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight">
              Auto Expo Modular Specification & BOM
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              45.5 m² (7.0m × 6.5m) · Corner Space Pavilion · Left Reception Counter · Front Center VIP Lounge
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Executive Cost Advantage Banner */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 rounded-lg bg-slate-900/80 border border-slate-800">
            <div>
              <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span className="font-semibold uppercase tracking-wider">Net Cost Savings</span>
              </div>
              <div className="text-2xl font-extrabold text-emerald-400 font-mono tabular-nums">
                ₹{BOOTH_COST_COMPARISON.netSavingsRupees.toLocaleString('en-IN')}
              </div>
              <p className="text-xs text-slate-400 mt-1">
                74.1% reduction vs ceiling truss rigging and halogen floods.
              </p>
            </div>

            <div>
              <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                <Zap className="w-4 h-4 text-cyan-400" />
                <span className="font-semibold uppercase tracking-wider">Expo Energy Draw</span>
              </div>
              <div className="text-2xl font-extrabold text-cyan-400 font-mono tabular-nums">
                480 Watts
              </div>
              <p className="text-xs text-slate-400 mt-1">
                88% less power than 4kW halogen floodlights. Runs off a single 10A socket.
              </p>
            </div>

            <div>
              <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                <Layers className="w-4 h-4 text-sky-400" />
                <span className="font-semibold uppercase tracking-wider">Fast Turnaround</span>
              </div>
              <div className="text-2xl font-extrabold text-white font-mono tabular-nums">
                4 Hours
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Tool-free modular locking floor and lightweight stanchions.
              </p>
            </div>
          </div>

          {/* Full Table */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-2.5">
              Itemized Component Ledger (Rental vs. Purchase)
            </h3>
            <div className="rounded-lg border border-slate-800 overflow-hidden text-xs">
              <table className="w-full text-left">
                <thead className="bg-slate-900 text-slate-400">
                  <tr>
                    <th className="p-2.5 pl-4">Component</th>
                    <th className="p-2.5">Qty</th>
                    <th className="p-2.5">Category</th>
                    <th className="p-2.5">Power</th>
                    <th className="p-2.5">Rental Total (INR)</th>
                    <th className="p-2.5 pr-4 text-right">Purchase Total (INR)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono tabular-nums text-slate-300">
                  {EXPO_BOM_DATA.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-900/40">
                      <td className="p-2.5 pl-4 font-sans">
                        <span className="font-medium text-slate-200">{item.name}</span>
                        <span className="text-[11px] text-slate-500 block">{item.spec}</span>
                      </td>
                      <td className="p-2.5 text-slate-400">
                        {item.quantity} {item.unit}
                      </td>
                      <td className="p-2.5 text-slate-400 font-sans">{item.category}</td>
                      <td className="p-2.5 text-cyan-400">{item.powerWatts > 0 ? `${item.powerWatts}W` : '0W'}</td>
                      <td className="p-2.5 text-white font-semibold">₹{(item.unitCostRental * item.quantity).toLocaleString('en-IN')}</td>
                      <td className="p-2.5 pr-4 text-right text-slate-400">₹{(item.unitCostPurchase * item.quantity).toLocaleString('en-IN')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-800 bg-slate-900/60">
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-md transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied to Clipboard!' : 'Copy Summary'}</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={handleDownloadCSV}
              className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-md transition-colors cursor-pointer shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download CSV Sheet</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
