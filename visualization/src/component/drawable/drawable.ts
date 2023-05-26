import React from "react";
import { LinkedListNodeComponent } from "./linkedList/drawable-node";

export enum SupportDataStructure {
  AdjacencyMatrix = 'adjacency-matrix',
  AdjacencyList = 'adjacency-list',
  LinkedList = 'linked-list',
  BinarySearchTree = 'binary-search-tree',
  Array = 'array',
}

export enum DrawableType {
  Node = 'node',
  Edge = 'edge',
  Stub = 'stub',
}

export type DrawableBase = {
  type: DrawableType,
}

export type DrawableElement = DrawableBase;

export abstract class DrawableComponent<T extends DrawableElement> extends React.Component {
  abstract props: T;
  abstract nextState(props: T): void;
  abstract create(props: T): void;
  abstract destroy(): void;
}

export default function drawableFactory(): DrawableComponent<DrawableElement> {
  return new LinkedListNodeComponent(
    {
      type: DrawableType.Node,
      innerText: '',
      position: {
        x: 0,
        y: 0,
      }
    }
  );
}
