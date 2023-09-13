import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

export interface Node {
  id: string;
  label: string;
  x: number;
  y: number;
}

export interface Link {
  source: string;
  target: string;
  strength: number;
}

interface ForceDirectedGraphProps {
  nodes: Node[];
  links: Link[];
  width: number;
  height: number;
}

export const ForceDirectedGraph: React.FC<ForceDirectedGraphProps> = ({
  nodes,
  links,
  width,
  height,
}) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!svgRef.current) return;
    const svg = d3.select(svgRef.current);

    // Simulation setup
    const linkForce = d3
      .forceLink()
      .id((link: Link) => link.id)
      .strength((link: Link) => link.strength);

    const simulation = d3
      .forceSimulation(nodes)
      .force("link", linkForce)
      .force("charge", d3.forceManyBody().strength(-200))
      .force("x", d3.forceX(width / 2).strength(0.005))
      .force("y", d3.forceY(height / 2).strength(0.005))
      .force("collision", d3.forceCollide().radius(42));

    const dragDrop = d3
      .drag()
      .on("start", (node: Node) => {
        node.fx = node.x;
        node.fy = node.y;
      })
      .on("drag", (node: Node) => {
        simulation.alphaTarget(0.2).restart();
        node.fx = d3.event.x;
        node.fy = d3.event.y;
      })
      .on("end", (node: Node) => {
        if (!d3.event.active) simulation.alphaTarget(0);
        node.fx = null;
        node.fy = null;
      });

    // Update simulation function
    const updateSimulation = () => {
      const updateGraph = () => {
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
        
        const textEnter = textElements
          .enter()
          .append("text")
          .text(function (node) {
            return node.label;
          })
          .attr("id", (node) => "text" + node.id)
          .attr("opacity", 0)
          .attr("font-size", 20)
          .attr("dx", 0)
          .attr("dy", 5)
          .attr("x", (node) => node.x)
          .attr("y", (node) => node.y)
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
        linkElements = linkGroup.selectAll("line").data(links, function (link) {
          return link.target.id + link.source.id;
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

        const linkEnter = linkElements
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
        const nodeEnter = nodeElements
          .enter()
          .append("circle")
          .attr("opacity", 0)
          .attr("r", 13)
          .attr("id", (node) => "circle" + node.id)
          .attr("stroke", "black") // Add a black border
          .attr("stroke-width", 2) // Set the border width to 2 pixels
          .attr("cx", (node) => node.x)
          .attr("cy", (node) => node.y)
          .attr("fill", (node) =>
            highlightedNodes.includes(node.id) ? "#cc1076" : "#AA96DA"
          )
          .call(dragDrop);

        nodeElements = nodeEnter.merge(nodeElements);
      }
      updateGraph();

      simulation.nodes(nodes).on("tick", () => {
        nodeElements
          .transition() // Apply transition
          .duration(50) // Set duration in milliseconds
          .attr("cx", function (node) {
            return Math.min(node.x, width);
          })
          .attr("cy", function (node) {
            return Math.min(node.y, height * 0.9);
          });

        textElements
          .transition()
          .duration(50)
          .attr("x", function (node) {
            return Math.min(node.x, width);
          })
          .attr("y", function (node) {
            return Math.min(node.y, height * 0.9);
          });

        linkElements
          .transition()
          .duration(50)
          .attr("x1", function (link) {
            return Math.min(link.source.x, width);
          })
          .attr("y1", function (link) {
            return Math.min(link.source.y, height * 0.9);
          })
          .attr("x2", function (link) {
            return Math.min(link.target.x, width);
          })
          .attr("y2", function (link) {
            return Math.min(link.target.y, height * 0.9);
          });
      });

      simulation.force("link").links(links);
      simulation.alphaTarget(0.1).restart();
  };

    // Call updateSimulation to trigger initial render
    updateSimulation();

    // Cleanup on unmount
    return () => simulation.stop();
  }, [nodes, links, width, height]);

  return <svg ref={svgRef} style={{ width: "100%", height: "200%" }} />;
};

export default ForceDirectedGraph;