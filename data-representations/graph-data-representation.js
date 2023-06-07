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

animate(currGraphState, nextGraphState);