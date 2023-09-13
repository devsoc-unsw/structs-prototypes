let currGraphState = [
    {
        nodeId: 'a',
        value: 1,
        edgesTo: [],
        highlighted: true
    },
]

let nextGraphState = [
    {
        nodeId: 'a',
        value: 1,
        edgesTo: ['b'],
        highlighted: false
    },
    {
        nodeId: 'b',
        value: 2,
        edgesTo: [],
        highlighted: true
    },
]

/**
 * This graph representation improves on the one used in /d3-force/graph\ d3.html
 * Expanded to include a data and address field for each node, and a weight field for each edge.
 */
let adjList = [
    { id: "0", address: "0x1380", data: 4, highlighted: false, neighbours: [{ id: "0x1380", weight: 30 }] },
    { id: "1", address: "0x1384", data: 3, neighbours: [{ id: "0x1380", weight: 60 }] },
    { id: "2", address: "0x1388", data: 7, neighbours: [] },
    { id: "3", address: "0x138c", data: 4, neighbours: [{ id: "0x1380", weight: 45 }] },
    { id: "4", address: "0x1390", data: 3, neighbours: [{ id: "0x1380", weight: 45 }, { id: "0x1380", weight: 20 }] },
    { id: "5", address: "0x1394", data: 8, neighbours: [] },
    { id: "6", address: "0x1398", data: 2, neighbours: [] },
    { id: "7", address: "0x139c", data: 9, neighbours: [{ id: "0x1380", weight: 75 }] },
    { id: "8", address: "0x1400", data: 1, neighbours: [{ id: "0x1380", weight: 85 }, { id: "0x1380", weight: 50 }] },
    { id: "9", address: "0x1404", data: 6, neighbours: [{ id: "0x1380", weight: 90 }] },
];

animate(currGraphState, nextGraphState);