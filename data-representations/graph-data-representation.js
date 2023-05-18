let currGraphState = [
    {
        nodeId: 'a',
        value: 1,
        edgesTo: [],
        selected: true
    },
]

let nextGraphState = [
    {
        nodeId: 'a',
        value: 1,
        edgesTo: ['b'],
        selected: false
    },
    {
        nodeId: 'b',
        value: 2,
        edgesTo: [],
        selected: true
    },
]

animate(currGraphState, nextGraphState);