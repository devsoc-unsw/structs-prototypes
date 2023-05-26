import React from "react";
import { DrawableBase, DrawableComponent, DrawableType } from "../drawable";
import { Position } from "../util";


interface DrawableLinkedListNode extends DrawableBase {
  type: DrawableType.Node;
  innerText: string;
  position: Position;
};

export class LinkedListNodeComponent extends DrawableComponent<DrawableLinkedListNode> {
  props: DrawableLinkedListNode;
  constructor(props: DrawableLinkedListNode) {
    super(props);
    this.props = props;
  }

  nextState(props: DrawableLinkedListNode): void {
    throw new Error("Method not implemented.");
  }

  create(props: DrawableLinkedListNode): void {
    throw new Error("Method not implemented.");
  }

  destroy(): void {
    throw new Error("Method not implemented.");
  }

  render() {
    return (
      <div>
        <span>InnerText: {this.props.innerText}</span>
        <span>Position: {this.props.position.x}, {this.props.position.y}</span>
      </div>
    );
  }
}



