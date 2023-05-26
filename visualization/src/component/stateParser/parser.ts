import { DrawableElement, DrawableLinkedListNode, DrawableType } from "../drawable/drawable";
import { LinkedListDataState } from "../type/state";

export function parseLinkedListState(state: LinkedListDataState): Set<DrawableElement> | null {
  // Define the initial position and the horizontal distance between nodes
  const startX = 10;
  const startY = 20;
  const nodeDistance = 30;

  // If there's no data in the state, return null
  if (!state.dataStructure.data) {
    return null;
  }

  const drawableElements = new Set<DrawableElement>();
  
  let xPos = startX;
  let yPos = startY;

  // Iterate through each node in the LinkedList
  for (let node of state.dataStructure.data) {
    // Create a DrawableLinkedListNode for each LinkedListNode
    const drawableNode: DrawableLinkedListNode = {
      type: DrawableType.Node,
      innerText: node.data,
      position: { x: xPos, y: yPos },
      uid: node.addr,
    };

    // Add the DrawableLinkedListNode to the set
    drawableElements.add(drawableNode);

    // Move the position to the right for the next node
    xPos += nodeDistance;
  }

  return drawableElements;
}