import React, { useState, useMemo } from 'react';
import IGRISGraph from './components/IGRISGraph';
import TransformerStack from './components/TransformerStack';
import { Network, Layers, Settings } from 'lucide-react';
import { generateIGRISData } from './data/architectureData';

function App() {
  const [view, setView] = useState('igris'); // 'igris' or 'transformer'

  // Simulation Parameters
  const [rewiringProb, setRewiringProb] = useState(0.1);
  const [hubConnectivity, setHubConnectivity] = useState(3);
  const [showControls, setShowControls] = useState(false);

  // Regenerate graph when params change
  const graphData = useMemo(() => {
    return generateIGRISData({ rewiringProb, hubConnectivity });
  }, [rewiringProb, hubConnectivity]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 p-8 font-mono flex flex-col relative">
      <header className="mb-8 flex justify-between items-end border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Architecture Blueprint</h1>
          <p className="text-slate-400">IGRIS vs. Transformer: Structural Analysis</p>
        </div>

        <div className="flex gap-4 items-center">
          {/* Control Panel Toggle */}
          <button
            onClick={() => setShowControls(!showControls)}
            className={`p-2 rounded-md transition-all ${showControls ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white'}`}
            title="Simulation Parameters"
          >
            <Settings size={20} />
          </button>

          <button
            onClick={() => window.dispatchEvent(new Event('simulate-step'))}
            className="flex items-center gap-2 px-4 py-2 rounded-md bg-emerald-600 text-white hover:bg-emerald-500 transition-all shadow-lg shadow-emerald-900/20"
          >
            <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
            Simulate Step
          </button>

          <div className="flex bg-slate-900 p-1 rounded-lg border border-slate-800">
            <button
              onClick={() => setView('igris')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all ${view === 'igris'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
            >
              <Network size={18} />
              IGRIS
            </button>
            <button
              onClick={() => setView('transformer')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all ${view === 'transformer'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
            >
              <Layers size={18} />
              Transformer
            </button>
          </div>
        </div>
      </header>

      {/* Parameters Panel */}
      {showControls && (
        <div className="absolute top-24 right-8 z-50 bg-slate-900/95 border border-slate-700 p-6 rounded-lg shadow-2xl w-80 backdrop-blur-md">
          <h3 className="text-white font-bold mb-4 flex items-center gap-2">
            <Settings size={16} /> Simulation Parameters
          </h3>

          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-xs text-slate-400">Rewiring Probability (p)</label>
                <span className="text-xs text-cyan-400 font-bold">{rewiringProb.toFixed(2)}</span>
              </div>
              <input
                type="range" min="0" max="1" step="0.05"
                value={rewiringProb}
                onChange={(e) => setRewiringProb(parseFloat(e.target.value))}
                className="w-full accent-cyan-500 h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer"
              />
              <p className="text-[10px] text-slate-500 mt-1">
                0 = Ring Lattice (Order)<br />1 = Random Graph (Chaos)
              </p>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <label className="text-xs text-slate-400">Hub Connectivity (k)</label>
                <span className="text-xs text-blue-400 font-bold">{hubConnectivity}</span>
              </div>
              <input
                type="range" min="1" max="10" step="1"
                value={hubConnectivity}
                onChange={(e) => setHubConnectivity(parseInt(e.target.value))}
                className="w-full accent-blue-500 h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer"
              />
              <p className="text-[10px] text-slate-500 mt-1">
                Number of spokes per Hub
              </p>
            </div>
          </div>
        </div>
      )}

      <main className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
        {/* Visualization Area */}
        <div className="lg:col-span-2 h-[600px] lg:h-auto">
          {view === 'igris' ? <IGRISGraph data={graphData} /> : <TransformerStack />}
        </div>

        {/* Info Panel */}
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 h-fit">
          <h2 className="text-xl font-bold text-white mb-4 border-b border-slate-700 pb-2">
            {view === 'igris' ? 'IGRIS Specifications' : 'Transformer Specifications'}
          </h2>

          <div className="space-y-6 text-sm">
            {view === 'igris' ? (
              <>
                <div>
                  <h4 className="text-blue-400 font-bold mb-1">Topology</h4>
                  <p className="text-slate-400">Sparse, small-world graph with specialized Hubs and local Cell clusters.</p>
                </div>
                <div>
                  <h4 className="text-blue-400 font-bold mb-1">Compute Primitive</h4>
                  <p className="text-slate-400">Stateful Micro-Agent (Cell) with local memory and plasticity.</p>
                </div>
                <div>
                  <h4 className="text-blue-400 font-bold mb-1">Signal Flow</h4>
                  <p className="text-slate-400">Asynchronous message passing. Dynamic routing via Hubs.</p>
                </div>
                <div className="p-3 bg-blue-900/20 border border-blue-800 rounded text-blue-200">
                  <strong>Key Advantage:</strong> Robustness & Continual Learning.
                </div>
              </>
            ) : (
              <>
                <div>
                  <h4 className="text-purple-400 font-bold mb-1">Topology</h4>
                  <p className="text-slate-400">Dense, sequential layered stack with global attention.</p>
                </div>
                <div>
                  <h4 className="text-purple-400 font-bold mb-1">Compute Primitive</h4>
                  <p className="text-slate-400">Stateless Layer (Attention + FFN) operating on tokens.</p>
                </div>
                <div>
                  <h4 className="text-purple-400 font-bold mb-1">Signal Flow</h4>
                  <p className="text-slate-400">Synchronous forward pass. Global visibility per layer.</p>
                </div>
                <div className="p-3 bg-purple-900/20 border border-purple-800 rounded text-purple-200">
                  <strong>Key Advantage:</strong> Parallel Training Efficiency.
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
