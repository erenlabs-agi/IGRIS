
import React from 'react';
import { motion } from 'framer-motion';
import { TRANSFORMER_LAYERS } from '../data/architectureData';
import { Layers, ArrowDown } from 'lucide-react';

const TransformerStack = () => {
    const [isSimulating, setIsSimulating] = React.useState(false);

    React.useEffect(() => {
        const handleSimulate = () => {
            setIsSimulating(true);
            setTimeout(() => setIsSimulating(false), 2000);
        };

        window.addEventListener('simulate-step', handleSimulate);

        // Auto-simulate periodically if not manually triggered
        const interval = setInterval(() => {
            // Optional: Auto-run
        }, 5000);

        return () => {
            window.removeEventListener('simulate-step', handleSimulate);
            clearInterval(interval);
        };
    }, []);

    return (
        <div className="relative w-full h-full bg-slate-900 border border-slate-700 rounded-lg overflow-hidden flex flex-col items-center justify-center p-8 shadow-2xl">
            <div className="absolute top-4 left-4 z-10 bg-slate-800/80 p-4 rounded backdrop-blur-sm border border-slate-600">
                <h3 className="text-purple-400 font-bold text-lg mb-1">Transformer</h3>
                <p className="text-xs text-slate-300">Dense Sequential Stack</p>
            </div>

            <div className="flex flex-col items-center gap-2 w-full max-w-md relative">
                {/* Forward Pass Signal */}
                {isSimulating && (
                    <motion.div
                        className="absolute w-full h-8 bg-purple-500/30 blur-md rounded-full z-0"
                        initial={{ bottom: -20, opacity: 0 }}
                        animate={{ bottom: '100%', opacity: [0, 1, 0] }}
                        transition={{ duration: 1.5, ease: "linear" }}
                    />
                )}

                {TRANSFORMER_LAYERS.map((layer, index) => (
                    <React.Fragment key={layer.id}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={`
w - full p - 4 rounded - md border text - center font - mono text - sm z - 10 relative transition - colors duration - 300
                                ${layer.type === 'input' ? 'bg-slate-800 border-slate-600 text-slate-300' : ''}
                                ${layer.type === 'layer' ? 'bg-purple-900/20 border-purple-500/50 text-purple-200' : ''}
                                ${layer.type === 'output' ? 'bg-slate-800 border-slate-600 text-slate-300' : ''}
`}
                            whileHover={{ scale: 1.02, borderColor: '#a855f7' }}
                        >
                            <div className="flex items-center justify-center gap-2">
                                {layer.type === 'layer' && <Layers size={16} />}
                                {layer.label}
                            </div>
                        </motion.div>

                        {index < TRANSFORMER_LAYERS.length - 1 && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: index * 0.1 + 0.05 }}
                            >
                                <ArrowDown size={20} className="text-slate-600" />
                            </motion.div>
                        )}
                    </React.Fragment>
                ))}
            </div>

            {/* Dense connection visualization background effect */}
            <div className="absolute inset-0 pointer-events-none opacity-5">
                <div className="w-full h-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
            </div>
        </div>
    );
};

export default TransformerStack;
