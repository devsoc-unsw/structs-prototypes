import React from "react";
import { DrawableBase, DrawableComponent, DrawableLinkedListNode, DrawableType } from "../drawable";
import { Position } from "../util";

export class LinkedListNodeComponent extends React.Component implements DrawableComponent  {
  _property: DrawableLinkedListNode;
  
  constructor(props: DrawableLinkedListNode) {
    super({});
    this._property = props;
  }

  // Here, we could update the state of the component based on the new props.
  nextState(props: DrawableLinkedListNode): void {
    this._property = props;
  }

  // In create method, we could initialize some state if needed.
  create(props: DrawableLinkedListNode): void {
    this._property = props;
  }

  // In destroy method, we could clean up any resources if needed.
  destroy(): void {
    
  }

  ownRender(): JSX.Element {
    console.log('This executed', this._property.position.x, this._property.position.y);
    return (
      <g>
        <circle 
          x={this._property.position.x} 
          y={this._property.position.y} 
          width="10"
          fill="white" 
          stroke="black"
        />
        <text 
          x={this._property.position.x + 50} 
          y={this._property.position.y + 25} 
          textAnchor="middle"
          alignmentBaseline="middle"
        >
          {this._property.innerText}
        </text>
      </g>
    );
  }
}