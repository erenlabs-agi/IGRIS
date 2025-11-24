import React, { useState } from 'react';
import IGRISGraph from './components/IGRISGraph';
import TransformerStack from './components/TransformerStack';
import { Network, Layers } from 'lucide-react';

function App() {
  const [view, setView] = useState('igris'); // 'igris' or 'transformer'

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 p-8 font-mono flex flex-col">
      <header className="mb-8 flex justify-between items-end border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Architecture Blueprint</h1>
          <p className="text-slate-400">IGRIS vs. Transformer: Structural Analysis</p>
        </div>

        <div className="flex gap-4">
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

      <main className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Visualization Area */}
        <div className="lg:col-span-2 h-[600px] lg:h-auto">
          {view === 'igris' ? <IGRISGraph /> : <TransformerStack />}
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
