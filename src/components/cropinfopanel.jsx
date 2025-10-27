import React from "react";

function currencyINR(n) {
  try { return n.toLocaleString("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }); }
  catch { return `₹${n}`; }
}

export default function CropInfoPanel({ guide, market }) {
  if (!guide) {
    return (
      <div className="bg-card/50 border border-border rounded-xl p-6">
        <p className="text-muted-foreground">Detailed guide not available for this crop yet.</p>
      </div>
    );
  }

  const totalCost = guide.costPerAcre?.reduce((s, r) => s + (r.amount || 0), 0) || 0;

  return (
    <div className="bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary/20 rounded-xl p-8 space-y-8">
      {/* Overview */}
      <div>
        <h3 className="text-xl font-bold text-foreground mb-2">Overview</h3>
        <p className="text-foreground">{guide.overview}</p>
      </div>

      {/* Water */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="text-sm text-muted-foreground">Water Requirement</div>
          <div className="text-lg font-semibold text-foreground">{guide.water.requirement}</div>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="text-sm text-muted-foreground">Typical Rainfall</div>
          <div className="text-lg font-semibold text-foreground">{guide.water.monthly_mm}</div>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="text-sm text-muted-foreground">Notes</div>
          <div className="text-foreground">{guide.water.notes}</div>
        </div>
      </div>

      {/* Fertilizer schedule */}
      <div>
        <h3 className="text-xl font-bold text-foreground mb-3">Fertilizer Plan</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-muted-foreground border-b border-border">
                <th className="py-2 pr-4">Stage</th>
                <th className="py-2 pr-4">When</th>
                <th className="py-2 pr-4">Dose / NPK</th>
                <th className="py-2 pr-4">Examples</th>
              </tr>
            </thead>
            <tbody>
              {guide.fertilizerSchedule.map((row, i) => (
                <tr key={i} className="border-b border-border/60 last:border-0">
                  <td className="py-3 pr-4 font-medium text-foreground">{row.stage}</td>
                  <td className="py-3 pr-4 text-foreground">{row.when}</td>
                  <td className="py-3 pr-4 text-foreground">{row.npk}</td>
                  <td className="py-3 pr-4 text-foreground">{(row.examples || []).join(", ")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Cost & Market */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-lg p-4">
          <h4 className="font-semibold text-foreground mb-3">Typical Investment per Acre</h4>
          <div className="space-y-2">
            {guide.costPerAcre.map((c, i) => (
              <div key={i} className="flex items-center justify-between text-foreground">
                <span>{c.item}</span>
                <span className="font-semibold">{currencyINR(c.amount)}</span>
              </div>
            ))}
            <div className="mt-3 pt-3 border-t border-border flex items-center justify-between">
              <span className="font-semibold text-foreground">Estimated Total</span>
              <span className="font-bold">{currencyINR(totalCost)}</span>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-4">
          <h4 className="font-semibold text-foreground mb-3">Market Snapshot</h4>
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="bg-muted rounded-lg p-3">
              <div className="text-xs text-muted-foreground">Market Rank</div>
              <div className="text-xl font-bold text-foreground">#{market?.rank ?? "—"}</div>
            </div>
            <div className="bg-muted rounded-lg p-3">
              <div className="text-xs text-muted-foreground">Expected Price</div>
              <div className="text-xl font-bold text-foreground">{market?.expectedPricePerTon ? `${currencyINR(market.expectedPricePerTon)}/ton` : "—"}</div>
            </div>
            <div className="bg-muted rounded-lg p-3">
              <div className="text-xs text-muted-foreground">Active Buyers</div>
              <div className="text-xl font-bold text-foreground">{market?.activeBuyers ?? "—"}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline & Tips */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-lg p-4">
          <h4 className="font-semibold text-foreground mb-3">Season Timeline</h4>
          <ol className="list-decimal ml-5 space-y-1 text-foreground">
            {guide.timeline.map((t, i) => (
              <li key={i}><span className="font-medium">{t.step}:</span> {t.window}</li>
            ))}
          </ol>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <h4 className="font-semibold text-foreground mb-3">Best Practices</h4>
          <ul className="list-disc ml-5 space-y-1 text-foreground">
            {guide.bestPractices.map((b, i) => <li key={i}>{b}</li>)}
          </ul>
        </div>
      </div>
    </div>
  );
}
