// IGRIS Graph Data
// A small-world network with Hubs and Cells

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

// Generate links to create a small-world-like structure
// 1. Local clusters (ring lattice)
// 2. Hub connections
// 3. Random shortcuts

const LINKS = [];

// Connect cells in a ring (local clusters)
for (let i = 0; i < CELL_NODES.length; i++) {
    LINKS.push({ source: CELL_NODES[i].id, target: CELL_NODES[(i + 1) % CELL_NODES.length].id, type: 'local' });
    LINKS.push({ source: CELL_NODES[i].id, target: CELL_NODES[(i + 2) % CELL_NODES.length].id, type: 'local' });
}

// Connect Hubs to random cells (Hub-and-Spoke)
HUB_NODES.forEach(hub => {
    // Connect to 3-5 random cells
    const numConnections = 3 + Math.floor(Math.random() * 3);
    for (let k = 0; k < numConnections; k++) {
        const targetCell = CELL_NODES[Math.floor(Math.random() * CELL_NODES.length)];
        LINKS.push({ source: hub.id, target: targetCell.id, type: 'hub-connection' });
    }
});

// Add some random shortcuts between cells (Small World)
for (let i = 0; i < 5; i++) {
    const source = CELL_NODES[Math.floor(Math.random() * CELL_NODES.length)];
    const target = CELL_NODES[Math.floor(Math.random() * CELL_NODES.length)];
    if (source.id !== target.id) {
        LINKS.push({ source: source.id, target: target.id, type: 'shortcut' });
    }
}

export const IGRIS_DATA = {
    nodes: NODES,
    links: LINKS
};

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
