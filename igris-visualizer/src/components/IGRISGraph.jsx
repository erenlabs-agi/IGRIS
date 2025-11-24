
import React, { useRef, useEffect, useState } from 'react';
import ForceGraph2D from 'react-force-graph-2d';

const IGRISGraph = ({ data }) => {
    const fgRef = useRef();
    const [highlightNodes, setHighlightNodes] = useState(new Set());
    const [highlightLinks, setHighlightLinks] = useState(new Set());
    const [hoverNode, setHoverNode] = useState(null);
    const [isSimulating, setIsSimulating] = useState(false);

    useEffect(() => {
        const handleSimulate = () => {
            setIsSimulating(true);
            // Randomly highlight some links to simulate activity
            const activeLinks = new Set();
            const activeNodes = new Set();

            // Pick 5 random links
            for (let i = 0; i < 5; i++) {
                const link = data.links[Math.floor(Math.random() * data.links.length)];
                activeLinks.add(link);
                activeNodes.add(link.source.id);
                activeNodes.add(link.target.id);
            }

            setHighlightLinks(activeLinks);
            setHighlightNodes(activeNodes);

            setTimeout(() => {
                setIsSimulating(false);
                if (!hoverNode) {
                    setHighlightLinks(new Set());
                    setHighlightNodes(new Set());
                }
            }, 2000);
        };

        window.addEventListener('simulate-step', handleSimulate);
        return () => window.removeEventListener('simulate-step', handleSimulate);
    }, [hoverNode]);

    const handleNodeHover = (node) => {
        setHighlightNodes(new Set());
        setHighlightLinks(new Set());

        if (node) {
            setHoverNode(node);
            const neighbors = new Set();
            const links = new Set();

            data.links.forEach(link => {
                if (link.source.id === node.id || link.target.id === node.id) {
                    links.add(link);
                    neighbors.add(link.source.id);
                    neighbors.add(link.target.id);
                }
            });

            setHighlightNodes(neighbors);
            setHighlightLinks(links);
        } else {
            setHoverNode(null);
        }
    };

    const handleNodeClick = (node) => {
        // Aim at node from outside it
        const distance = 40;
        const distRatio = 1 + distance / Math.hypot(node.x, node.y, node.z);

        fgRef.current.cameraPosition(
            { x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio }, // new position
            node, // lookAt ({ x, y, z })
            3000  // ms transition duration
        );
    };

    return (
        <div className="relative w-full h-full bg-slate-900 border border-slate-700 rounded-lg overflow-hidden shadow-2xl">
            <div className="absolute top-4 left-4 z-10 bg-slate-800/80 p-4 rounded backdrop-blur-sm border border-slate-600 pointer-events-none select-none">
                <h3 className="text-cyan-400 font-bold text-lg mb-1">IGRIS Topology</h3>
                <p className="text-xs text-slate-300 mb-2">Small-World Cell Network</p>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                    <span className="w-3 h-3 rounded-full bg-blue-500"></span> Hub
                    <span className="w-3 h-3 rounded-full bg-orange-500"></span> Cell
                </div>
                {hoverNode && (
                    <div className="mt-4 border-t border-slate-600 pt-2">
                        <p className="text-white font-mono font-bold">{hoverNode.label}</p>
                        <p className="text-xs text-slate-400">{hoverNode.desc}</p>
                    </div>
                )}
            </div>

            <div className="absolute bottom-4 right-4 z-10 text-xs text-slate-500 pointer-events-none">
                * Scroll to Zoom, Drag to Pan, Click to Focus
            </div>

            <ForceGraph2D
                ref={fgRef}
                graphData={data}
                nodeLabel="label"
                nodeColor={node => node.group === 'hub' ? '#3b82f6' : '#f97316'}
                nodeVal={node => node.group === 'hub' ? 10 : 3}
                // Dynamic styling
                linkColor={link => highlightLinks.has(link) ? '#ffffff' : '#475569'}
                linkWidth={link => highlightLinks.has(link) ? 2 : 1}
                // Signal flow particles
                linkDirectionalParticles={link => highlightLinks.has(link) ? 4 : 1} // Always show 1 particle, 4 on hover
                linkDirectionalParticleWidth={link => highlightLinks.has(link) ? 2 : 1.5}
                linkDirectionalParticleSpeed={link => highlightLinks.has(link) ? 0.005 : 0.002}

                onNodeHover={handleNodeHover}
                onNodeClick={handleNodeClick}
                backgroundColor="#0f172a"
            />
        </div>
    );
};

export default IGRISGraph;
