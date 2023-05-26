import React from 'react';
import { LinkedListNodeComponent } from './linkedList/drawable-node';
import { Position } from './util';

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
  type: DrawableType;
  uid: string;
};

export interface DrawableLinkedListNode extends DrawableBase {
  type: DrawableType.Node;
  innerText: string;
  position: Position;
}

export type DrawableElement = DrawableLinkedListNode;

export interface DrawableComponent {
  ownRender(): JSX.Element;
  nextState(props: DrawableElement): void;
  create(props: DrawableElement): void;
  destroy(): void;
}

export default function drawableFactory(
  element: DrawableElement,
): DrawableComponent {
  if (element.type === DrawableType.Node) {
    return new LinkedListNodeComponent(element);
  }
  throw new Error('Invalid DrawableElement type');
}
