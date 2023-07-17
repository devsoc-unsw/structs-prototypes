/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import LinkedList from "./linkedList";
import { DEFAULT_UISTATE, UiState } from "./types/uiState";
import { ControlPanel } from "./controlPanel";
import "./css/drawingMotion.css";
import {
  BackendLinkedList,
  BackendLinkedListNode,
  EdgeEntity,
  EntityConcrete,
  EntityType,
  FrontendLinkedListGraph,
  NodeEntity,
} from "./types/graphState";
import ReactJson from "react-json-view";

export const DrawingMotions: React.FC<BackendLinkedList> = (state) => {
  const [settings, setSettings] = useState<UiState>(DEFAULT_UISTATE);
  /**
   * Parse the background graph state into frontend ones
   */
  const parseState = (state: BackendLinkedList): FrontendLinkedListGraph => {
    const nodeEntities: NodeEntity[] = [];
    const edgeEntities: EdgeEntity[] = [];
    const cacheEntity: {
      [uid: string]: EntityConcrete;
    } = {};

    // Create a mapping for the backend nodes
    const nodeMapping: { [key: string]: BackendLinkedListNode } = {};
    state.nodes.forEach((node) => {
      nodeMapping[node.nodeId] = node;
    });

    // Now we build the NodeEntities and EdgeEntities
    state.nodes.forEach((node, index) => {
      // Convert backend node to frontend node
      const nodeEntity: NodeEntity = {
        uid: node.nodeId,
        type: EntityType.NODE,
        title: node.value ? node.value.toString() : "",
        colorHex: "#FFFFFF",
        size: 50,
        edges: [],
        x: 200 + index * 200,
        y: 100,
      };
      nodeEntities.push(nodeEntity);
    });

    state.nodes.forEach((node) => {
      const nodeEntity: NodeEntity | undefined = nodeEntities.find(
        (n) => n.uid === node.nodeId
      );
      if (!nodeEntity) return;

      // If there's a next node, create an edge between the current node and the next node
      if (node.next) {
        const nextNode = nodeMapping[node.next];
        if (nextNode === undefined) return;
        const toNode = nodeEntities.find((n) => n.uid === nextNode.nodeId);
        if (nextNode && toNode) {
          const edgeEntity: EdgeEntity = {
            uid: `${node.nodeId}-${nextNode.nodeId}`,
            type: EntityType.EDGE,
            from: nodeEntity.uid,
            to: toNode.uid, // It's sure to find because we've already created all the nodes
            label: "", // you might need a better way to label the edge
            colorHex: "#FFFFFF", // default color
          };
          edgeEntities.push(edgeEntity);

          // Attach this edge to the node
          nodeEntity.edges.push(edgeEntity.uid);
        }
      }
    });

    [...nodeEntities, ...edgeEntities].forEach((entity) => {
      cacheEntity[entity.uid] = entity;
    });

    const frontendState: FrontendLinkedListGraph = {
      nodes: nodeEntities,
      edges: edgeEntities,
      cacheEntity,
      head: nodeEntities[0],
    };

    console.log("This should only load once", frontendState);
    return frontendState;
  };

  const initialFrontendState = parseState(state);
  const [currGraphState, setCurrGraphState] =
    useState<FrontendLinkedListGraph>(initialFrontendState);
  const [historyGraphState, setHistoryGraphState] = useState<
    FrontendLinkedListGraph[]
  >([initialFrontendState]);

  const onJsonChange = (edit: any) => {
    const newFrontendState = parseState(edit.updated_src);

    setCurrGraphState(newFrontendState);
    setHistoryGraphState([...historyGraphState, newFrontendState]);
  };

  useEffect(() => {
    const newFrontendState = parseState(state);

    console.log("This should load WHEN BACKEND CHANGE", newFrontendState);
    setCurrGraphState(newFrontendState);
    setHistoryGraphState([...historyGraphState, newFrontendState]);
  }, [state]);

  useEffect(() => {
    console.log("This should load WHEN SETTINGS CHANGE", settings);
  }, [settings]);

  /**
   * Hard code for now yea yea
   */
  return (
    <div>
      <div className="container">
        <div className="control-panel">
          <ControlPanel settings={settings} setSettings={setSettings} />
        </div>
        <div className="linked-list">
          <LinkedList settings={settings} linkedListState={currGraphState} setSettings={setSettings}/>
        </div>
        {settings.debug && (
        <div className="DEBUG">
          <pre>
            <ReactJson
              src={currGraphState}
              onEdit={onJsonChange}
              onDelete={onJsonChange}
              onAdd={onJsonChange}
              name={null} // Removes the root node
            />
          </pre>
        </div>
      )}
      </div>
    </div>
  );
};
