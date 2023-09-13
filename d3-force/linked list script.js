var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var baseNodes = [];
var baseLinks = [];
for (var _i = 0, baseLinks_1 = baseLinks; _i < baseLinks_1.length; _i++) {
    var item = baseLinks_1[_i];
    item.strength = 2.1;
}
setTimeout(function () {
    for (var _i = 0, baseLinks_2 = baseLinks; _i < baseLinks_2.length; _i++) {
        var item = baseLinks_2[_i];
        item.strength = 0.1;
    }
    updateSimulation();
}, 100);
var nodes = __spreadArray([], baseNodes, true);
var links = __spreadArray([], baseLinks, true);
// TODO: Replace with isHighlighted boolean in a LinkedListNode
var highlightedNodes = [];
var width = window.innerWidth;
var height = window.innerHeight;
var svg = d3.select("svg");
svg.attr("width", width).attr("height", height);
var linkElements, nodeElements, textElements;
// we use svg groups to logically group the elements together
var linkGroup = svg.append("g").attr("class", "links");
var nodeGroup = svg.append("g").attr("class", "nodes");
var textGroup = svg.append("g").attr("class", "texts");
// we use this reference to select/deselect
// after clicking the same element twice
var selectedId;
// simulation setup with all forces
var linkForce = d3
    .forceLink()
    .id(function (link) {
    return link.id;
})
    .strength(function (link) {
    return link.strength;
});
var simulation = d3
    .forceSimulation()
    .force("link", linkForce)
    .force("charge", d3.forceManyBody().strength(-200))
    // .force('center', d3.forceCenter(width / 2, height / 2))
    // moves everything towards centre -> helps prevent nodes from going out of canvas, but causes everything
    // to be closer together
    // TODO: mebe find better way
    .force("x", d3.forceX(width / 2).strength(0.005)) // Add force to keep nodes in horizontal bounds
    .force("y", d3.forceY(height / 2).strength(0.005)) // Add force to keep nodes in vertical bounds
    .force("collision", d3.forceCollide().radius(42)); // Add force to prevent node overlap
var dragDrop = d3
    .drag()
    .on("start", function (node) {
    node.fx = node.x;
    node.fy = node.y;
})
    .on("drag", function (node) {
    simulation.alphaTarget(0.2).restart();
    node.fx = d3.event.x;
    node.fy = d3.event.y;
})
    .on("end", function (node) {
    if (!d3.event.active) {
        simulation.alphaTarget(0);
    }
    node.fx = null;
    node.fy = null;
});
function updateGraph() {
    // texts
    textElements = textGroup
        .selectAll("text")
        .data(nodes, function (node) {
        return node.id;
    })
        .style("font-family", "Helvetica");
    textElements
        .exit()
        .transition()
        .duration(700) // Duration of the transition effect in milliseconds
        .style("opacity", 0) // Fade out the edge gradually
        .remove();
    var textEnter = textElements
        .enter()
        .append("text")
        .text(function (node) {
        return node.label;
    })
        .attr("id", function (node) { return "text" + node.id; })
        .attr("opacity", 0)
        .attr("font-size", 20)
        .attr("dx", 0)
        .attr("dy", 5)
        .attr("x", function (node) { return node.x; })
        .attr("y", function (node) { return node.y; })
        .attr("fill", "black")
        .style("pointer-events", "none")
        .style("font-family", "Helvetica");
    textElements = textEnter.merge(textElements);
    // Update text content based on node labels
    textElements.text(function (node) {
        return node.label;
    });
    // Additional styling for text inside the circles
    textElements
        .attr("text-anchor", "middle") // Center the text horizontally
        .attr("domin6-baseline", "middle"); // Center the text vertically
    // links
    linkElements = linkGroup
        .selectAll("line")
        .data(links, function (link) {
        return (link.target.id + link.source.id);
    });
    linkElements
        .exit()
        .transition()
        .duration(700) // Duration of the transition effect in milliseconds
        .style("opacity", 0) // Fade out the edge gradually
        .remove();
    svg
        .append("defs")
        .append("marker")
        .attr("id", "arrowhead")
        .attr("viewBox", "-0 -5 10 10")
        .attr("refX", 16)
        .attr("refY", 0)
        .attr("orient", "auto")
        .attr("markerWidth", 3) // adjust this value as needed
        .attr("markerHeight", 3) // adjust this value as needed
        .append("svg:path")
        .attr("d", "M 0,-5 L 10 ,0 L 0,5")
        .attr("fill", "black")
        .style("stroke", "none");
    var linkEnter = linkElements
        .enter()
        .append("line")
        .attr("stroke-width", 5)
        .attr("stroke", "black")
        .attr("marker-end", "url(#arrowhead)")
        .attr("x1", function (link) {
        return link.source.x;
    })
        .attr("y1", function (link) {
        return link.source.y;
    })
        .attr("x2", function (link) {
        return link.target.x;
    })
        .attr("y2", function (link) {
        return link.target.y;
    });
    linkElements = linkEnter.merge(linkElements);
    // nodes (circles)
    nodeElements = nodeGroup
        .selectAll("circle")
        .data(nodes, function (node) {
        return node.id;
    });
    nodeElements
        .exit()
        .transition()
        .duration(700) // Duration of the transition effect in milliseconds
        .style("opacity", 0) // Fade out the edge gradually
        .remove();
    var nodeEnter = nodeElements
        .enter()
        .append("circle")
        .attr("opacity", 0)
        .attr("r", 13)
        .attr("id", function (node) { return "circle" + node.id; })
        .attr("stroke", "black") // Add a black border
        .attr("stroke-width", 2) // Set the border width to 2 pixels
        .attr("cx", function (node) { return node.x; })
        .attr("cy", function (node) { return node.y; })
        .attr("fill", function (node) {
        return node.isHighlighted ? "#cc1076" : "#AA96DA";
    })
        .call(dragDrop);
    var existingNodes = nodeElements.filter(function (d) {
        return !nodeEnter.data().includes(d);
    });
    // existingNodes.attr("fill", (node: LinkedListNode) => {
    //   if (node.isHighlighted) {
    //     // getSVGCircleOfNode(node.id).animate(100).attr({ fill: "#cc1076" });
    //     // return "#cc1076";
    //   } else {
    //     // getSVGCircleOfNode(node.id).animate(100).attr({ fill: "#AA96DA" });
    //     // return "#AA96DA";
    //   }
    // });
}
function updateSimulation() {
    updateGraph();
    simulation.nodes(nodes).on("tick", function () {
        nodeElements
            .transition() // Apply transition
            .duration(50) // Set duration in milliseconds
            .attr("cx", function (node) {
            var _a;
            return Math.min((_a = node.x) !== null && _a !== void 0 ? _a : 0, width);
        })
            .attr("cy", function (node) {
            var _a;
            return Math.min((_a = node.y) !== null && _a !== void 0 ? _a : 0, height * 0.9);
        });
        textElements
            .transition()
            .duration(50)
            .attr("x", function (node) {
            var _a;
            return Math.min((_a = node.x) !== null && _a !== void 0 ? _a : 0, width);
        })
            .attr("y", function (node) {
            var _a;
            return Math.min((_a = node.y) !== null && _a !== void 0 ? _a : 0, height * 0.9);
        });
        linkElements
            .transition()
            .duration(50)
            .attr("x1", function (link) {
            var _a;
            return Math.min((_a = link.source.x) !== null && _a !== void 0 ? _a : 0, width);
        })
            .attr("y1", function (link) {
            var _a;
            return Math.min((_a = link.source.y) !== null && _a !== void 0 ? _a : 0, height * 0.9);
        })
            .attr("x2", function (link) {
            var _a;
            return Math.min((_a = link.target.x) !== null && _a !== void 0 ? _a : 0, width);
        })
            .attr("y2", function (link) {
            var _a;
            return Math.min((_a = link.target.y) !== null && _a !== void 0 ? _a : 0, height * 0.9);
        });
    });
    simulation.force("link").links(links);
    simulation.alphaTarget(0.1).restart();
}
// takes in node id text and returns the svg circle for that node
var getSVGCircleOfNode = function (nodeId) {
    return SVG(d3.select("circle[id=\"circle".concat(nodeId, "\"]")).node());
};
// takes in node id text and returns the svg text for that node
var getSVGTextOfNode = function (nodeId) {
    return SVG(d3.select("text[id=\"text".concat(nodeId, "\"]")).node());
};
// last but not least, we call updateSimulation
// to trigger the initial render
updateSimulation();
updateGraph();
var simulateNextState = function (changes) {
    changes.modified.forEach(function (modifiedNodeBackend) {
        var modifiedNode = nodes.find(function (node) { return node.id === modifiedNodeBackend.id; });
        // if the node is not new
        if (modifiedNode) {
            modifiedNode.label = modifiedNodeBackend.data; // update label
            // Update highlighting
            modifiedNode.isHighlighted = modifiedNodeBackend.isHighlighted;
            if (modifiedNodeBackend.isHighlighted) {
                getSVGCircleOfNode(modifiedNodeBackend.id)
                    .animate(700)
                    .attr({ fill: "#cc1076" });
            }
            else {
                getSVGCircleOfNode(modifiedNodeBackend.id)
                    .animate(700)
                    .attr({ fill: "#AA96DA" });
            }
            var modifiedLink = links.findIndex(function (link) { return link.source.id === modifiedNode.id; });
            // if old next was not null
            if (modifiedLink !== -1) {
                // if new next is not null, update link
                if (modifiedNodeBackend.next !== "null") {
                    links[modifiedLink].target = modifiedNodeBackend.next;
                    // if old next was not null and new next is null, delete link
                }
                else {
                    links.splice(modifiedLink, 1);
                }
            }
            // if old next was null and new next is not null, add new link
            else if (modifiedNodeBackend.next != "null") {
                links.push({
                    source: modifiedNode.id,
                    target: modifiedNodeBackend.next,
                    strength: 0.3
                });
            }
        }
        // if the node is new, we create a new node and we create a new link if next is not null
        else {
            nodes.push({
                id: modifiedNodeBackend.id,
                label: modifiedNodeBackend.data,
                x: modifiedNodeBackend.next !== "null"
                    ? nodes.find(function (node) { return node.id === modifiedNodeBackend.next; }).x - 100
                    : nodes.length !== 0
                        ? nodes[nodes.length - 1].x + 100
                        : 100,
                y: width / 4,
                isHighlighted: modifiedNodeBackend.isHighlighted
            });
            updateSimulation();
            getSVGCircleOfNode(modifiedNodeBackend.id)
                .animate(1500)
                .attr({ opacity: 1 });
            getSVGTextOfNode(modifiedNodeBackend.id)
                .animate(1500)
                .attr({ opacity: 1 });
            if (modifiedNodeBackend.next != "null") {
                links.push({
                    source: modifiedNodeBackend.id,
                    target: modifiedNodeBackend.next,
                    strength: 0.1
                });
            }
        }
    });
    // loop through deleted nodes, removing them from nodes array and links array
    changes.deleted.forEach(function (deletedNodeBackend) {
        var deletedNode = nodes.findIndex(function (node) { return node.id === deletedNodeBackend; });
        if (deletedNode !== -1) {
            nodes.splice(deletedNode, 1);
            var deletedLink = links.findIndex(function (link) { return link.source.id === deletedNodeBackend; });
            if (deletedLink !== -1) {
                links.splice(deletedLink, 1);
            }
        }
    });
    updateSimulation();
};
document.body.appendChild(svg.node());
var draw = SVG().addTo("svg").size(3000, 3000);
// add a node with no next
setTimeout(function () {
    simulateNextState({
        modified: [{ id: "0x1000", data: "0", next: "null", isHighlighted: false }],
        deleted: []
    });
}, 1000);
// add a node with no next
setTimeout(function () {
    simulateNextState({
        modified: [
            { id: "0x2000", data: "13", next: "null", isHighlighted: false },
        ],
        deleted: []
    });
}, 2000);
// change a node's next from null i.e. create an edge
setTimeout(function () {
    simulateNextState({
        modified: [
            { id: "0x1000", data: "0", next: "0x2000", isHighlighted: false },
        ],
        deleted: []
    });
    console.log(JSON.parse(JSON.stringify(links)));
}, 3000);
// add a node with a next i.e. create a node and edge
setTimeout(function () {
    console.log(JSON.parse(JSON.stringify(links)));
    simulateNextState({
        modified: [
            { id: "0x3000", data: "5", next: "0x2000", isHighlighted: false },
        ],
        deleted: []
    });
}, 4000);
// change a node's next to null i.e. remove an edge
setTimeout(function () {
    simulateNextState({
        modified: [{ id: "0x3000", data: "5", next: "null", isHighlighted: false }],
        deleted: []
    });
}, 5000);
// change a node's next from some node to another node i.e. modify an existing edge
setTimeout(function () {
    simulateNextState({
        modified: [
            { id: "0x1000", data: "5", next: "0x3000", isHighlighted: false },
        ],
        deleted: []
    });
}, 6000);
// add a node with no next
setTimeout(function () {
    simulateNextState({
        modified: [{ id: "0x4000", data: "6", next: "null", isHighlighted: false }],
        deleted: []
    });
}, 7000);
// delete a node with no next
setTimeout(function () {
    simulateNextState({
        modified: [],
        deleted: ["0x4000"]
    });
}, 8000);
// delete a node with a next
setTimeout(function () {
    simulateNextState({
        modified: [],
        deleted: ["0x1000"]
    });
}, 9000);
// change a node's data
setTimeout(function () {
    simulateNextState({
        modified: [
            { id: "0x3000", data: "93", next: "null", isHighlighted: false },
        ],
        deleted: []
    });
}, 10000);
// more testing below
setTimeout(function () {
    simulateNextState({
        modified: [{ id: "0x1000", data: "1", next: "null", isHighlighted: false }],
        deleted: []
    });
}, 11000);
setTimeout(function () {
    simulateNextState({
        modified: [
            { id: "0x2000", data: "2", next: "0x1000", isHighlighted: false },
        ],
        deleted: []
    });
}, 12000);
setTimeout(function () {
    simulateNextState({
        modified: [{ id: "0x3000", data: "3", next: "null", isHighlighted: false }],
        deleted: []
    });
}, 13000);
// case when deleting a node that another node points to
// rn the arrowhead position remains fixed to where the deleted node was
// but the next can be changed to another node or null after and that will work properly
setTimeout(function () {
    simulateNextState({
        modified: [],
        deleted: ["0x1000"]
    });
}, 14000);
setTimeout(function () {
    simulateNextState({
        modified: [
            { id: "0x2000", data: "2", next: "0x3000", isHighlighted: false },
        ],
        deleted: []
    });
}, 16000);
setTimeout(function () {
    simulateNextState({
        modified: [
            { id: "0x5000", data: "5", next: "0x2000", isHighlighted: false },
        ],
        deleted: []
    });
}, 17000);
// Highlighting
setTimeout(function () {
    simulateNextState({
        modified: [
            { id: "0x5000", data: "5", next: "0x2000", isHighlighted: true },
        ],
        deleted: []
    });
}, 18000);
// Unhighlighting
setTimeout(function () {
    simulateNextState({
        modified: [
            { id: "0x5000", data: "5", next: "0x2000", isHighlighted: false },
        ],
        deleted: []
    });
}, 19000);
// Creating a new node that starts off highlighted
setTimeout(function () {
    simulateNextState({
        modified: [{ id: "0x6000", data: "6", next: "null", isHighlighted: true }],
        deleted: []
    });
}, 20000);
