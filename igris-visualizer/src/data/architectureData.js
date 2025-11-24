// IGRIS Graph Data
// A small-world network with Hubs and Cells

export const generateIGRISData = ({ rewiringProb = 0.1, hubConnectivity = 3 } = {}) => {
    const HUB_NODES = [
        { id: 'MemoryHub', group: 'hub', label: 'Memory Hub', desc: 'Long-term storage (Vector DB)' },
        { id: 'PlanningHub', group: 'hub', label: 'Planning Hub', desc: 'Hierarchical Task Network' },
        { id: 'PredictHub', group: 'hub', label: 'Prediction Hub', desc: 'World Model Simulation' },
        { id: 'LearningHub', group: 'hub', label: 'Learning Hub', desc: 'Global Gradient Updates' },
    ];

    const CELL_NODES = Array.from({ length: 20 }, (_, i) => ({
        id: `cell_${i}`,
        group: 'cell',
        label: `Cell ${i}`,
        desc: 'Local compute unit'
    }));

    const NODES = [...HUB_NODES, ...CELL_NODES];
    const LINKS = [];

    // Watts-Strogatz like generation
    // 1. Regular Ring Lattice
    for (let i = 0; i < CELL_NODES.length; i++) {
        // Connect to nearest neighbors (k=2)
        const targetIndex1 = (i + 1) % CELL_NODES.length;
        const targetIndex2 = (i + 2) % CELL_NODES.length;

        // Rewire edge 1?
        if (Math.random() < rewiringProb) {
            const randomTarget = Math.floor(Math.random() * CELL_NODES.length);
            if (randomTarget !== i) {
                LINKS.push({ source: CELL_NODES[i].id, target: CELL_NODES[randomTarget].id, type: 'shortcut' });
            }
        } else {
            LINKS.push({ source: CELL_NODES[i].id, target: CELL_NODES[targetIndex1].id, type: 'local' });
        }

        // Rewire edge 2?
        if (Math.random() < rewiringProb) {
            const randomTarget = Math.floor(Math.random() * CELL_NODES.length);
            if (randomTarget !== i) {
                LINKS.push({ source: CELL_NODES[i].id, target: CELL_NODES[randomTarget].id, type: 'shortcut' });
            }
        } else {
            LINKS.push({ source: CELL_NODES[i].id, target: CELL_NODES[targetIndex2].id, type: 'local' });
        }
    }

    // 2. Hub Connections (Hub-and-Spoke overlay)
    HUB_NODES.forEach(hub => {
        // Connect to 'hubConnectivity' random cells
        const targets = new Set();
        while (targets.size < hubConnectivity) {
            targets.add(Math.floor(Math.random() * CELL_NODES.length));
        }
        targets.forEach(targetIdx => {
            LINKS.push({ source: hub.id, target: CELL_NODES[targetIdx].id, type: 'hub-connection' });
        });
    });

    return { nodes: NODES, links: LINKS };
};

export const IGRIS_DATA = generateIGRISData(); // Default static fallback

// Transformer Data
// Sequential layers

export const TRANSFORMER_LAYERS = [
    { id: 'input', label: 'Input Embeddings', type: 'input' },
    { id: 'L1', label: 'Layer 1: Attn + FFN', type: 'layer' },
    { id: 'L2', label: 'Layer 2: Attn + FFN', type: 'layer' },
    { id: 'L3', label: 'Layer 3: Attn + FFN', type: 'layer' },
    { id: 'L4', label: 'Layer 4: Attn + FFN', type: 'layer' },
    { id: 'output', label: 'Output Probabilities', type: 'output' },
];
