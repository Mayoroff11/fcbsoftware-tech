import React from 'react';
import { FEATURES_DATA } from '../data/websiteData.ts';
import { Cpu, ShieldCheck, Layers, Gauge, Network, Search, Check } from 'lucide-react';

export const Features: React.FC = () => {
  const getFeatureIcon = (id: string) => {
    switch (id) {
      case 'tx-construction':
        return <Cpu className="w-5 h-5 text-amber-400" />;
      case 'key-isolation':
        return <ShieldCheck className="w-5 h-5 text-amber-400" />;
      case 'multi-output':
        return <Layers className="w-5 h-5 text-amber-400" />;
      case 'fee-precision':
        return <Gauge className="w-5 h-5 text-amber-400" />;
      case 'node-connectivity':
        return <Network className="w-5 h-5 text-amber-400" />;
      case 'audit-inspection':
        return <Search className="w-5 h-5 text-amber-400" />;
      default:
        return <Cpu className="w-5 h-5 text-amber-400" />;
    }
  };

  return (
    <section id="features" className="py-20 md:py-28 bg-[#0c0c10] border-b border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-3">
          <div className="text-xs font-semibold uppercase tracking-wider text-amber-400">
            Core Capabilities
          </div>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white">
            Engineered for Precision & Operational Control
          </h2>
          <p className="text-base text-zinc-400 leading-relaxed">
            Every module in FCB is architected to eliminate ambiguity during transaction preparation, execution, and verification.
          </p>
        </div>

        {/* Features 3x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES_DATA.map((feature) => (
            <div
              key={feature.id}
              className="p-6 rounded-xl bg-zinc-900/60 border border-zinc-800/80 hover:border-zinc-700 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-lg bg-zinc-950 border border-zinc-800 flex items-center justify-center group-hover:border-amber-500/30 transition-colors">
                    {getFeatureIcon(feature.id)}
                  </div>
                  <span className="text-[11px] font-medium px-2.5 py-0.5 rounded bg-zinc-800/80 text-zinc-400 border border-zinc-700/50">
                    {feature.category}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-semibold text-zinc-100 group-hover:text-white transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>

              {/* Specs bullet points */}
              <div className="mt-6 pt-4 border-t border-zinc-800/60 space-y-2">
                {feature.specs.map((spec, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-zinc-400">
                    <Check className="w-3.5 h-3.5 text-amber-400/80 shrink-0" />
                    <span>{spec}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
