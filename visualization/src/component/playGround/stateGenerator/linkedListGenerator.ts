import { VariableType, LinkedListDataState, LinkedListDataStructure, SupportDataType, PointerVariable, LinkedListNode } from '../../type/state';

export function genAddr(): string {
  return `0x${(1000000 + Math.floor(Math.random() * 1000000)).toString(16)}`;
}

function deepCloneState(state: LinkedListDataState): LinkedListDataState {
  let nodes = Array.from(state.dataStructure.data);
  const newState = {
    variables: state.variables.map(v => ({ ...v })),
    dataStructure: {
      type: state.dataStructure.type,
      data: new Set([...nodes].map(node => ({ ...node }))),
    },
  };

  return newState;
}

function generateLinkedList(size: number = 5): LinkedListDataState {
  // Generate data for LinkedList
  let linkedListNodes = new Set<LinkedListNode>();


  // Create LinkedList nodes
  let addrArray: string[] = [];
  for (let i = 0; i < size; i++) {
    addrArray.push(genAddr());
  }
  for (let i = 0; i < size; i++) {
    linkedListNodes.add({
      addr: addrArray[i],
      data: (i + 1).toString(),
      next: (i < (size - 1)) ? addrArray[i + 1] : "NULL",
    });
  }


  // Create LinkedList data structure
  let linkedListDataStructure: LinkedListDataStructure = {
    type: SupportDataType.LINKED_LIST,
    data: linkedListNodes,
  };

  // Create pointer variable
  let pointerVariable: PointerVariable = {
    type: VariableType.POINTER,
    name: "ptr",
    addr: addrArray[0],
    value: "data1"
  };

  // Create LinkedList state
  let linkedListState: LinkedListDataState = {
    variables: [pointerVariable],
    dataStructure: linkedListDataStructure,
  };

  return linkedListState;
}

function appendNode(state: LinkedListDataState): LinkedListDataState {
  // Clone the state to avoid mutating the original state
  let newState = deepCloneState(state);

  // Generate address for the new node
  let newNodeAddr = genAddr();

  // Find the last node in the linked list
  let lastNode = Array.from(newState.dataStructure.data)
    .find(node => node.next === "NULL");

  // Update the `next` field of the last node
  if (lastNode) {
    lastNode.next = newNodeAddr;
  }

  // Create a new node
  let newNode: LinkedListNode = {
    addr: newNodeAddr,
    data: "newData",
    next: "NULL",
  };

  // Add the new node to the data structure
  newState.dataStructure.data.add(newNode);

  // Return the new state
  return newState;
}

function insertNode(state: LinkedListDataState, idx: number): LinkedListDataState {
  // Clone the state to avoid mutating the original state
  let newState = deepCloneState(state);

  // Generate address for the new node
  let newNodeAddr = genAddr();

  // Create a new node
  let newNode: LinkedListNode = {
    addr: newNodeAddr,
    data: "newData",
    next: "NULL",
  };

  // Convert the Set to an array for easier manipulation
  let nodes = Array.from(newState.dataStructure.data);

  // Get the node before and after the insertion point
  let beforeNode = nodes[idx - 1];
  let afterNode = nodes[idx];

  // Update the `next` fields to insert the new node
  if (beforeNode) {
    beforeNode.next = newNodeAddr;
  }
  if (afterNode) {
    newNode.next = afterNode.addr;
  }

  // Add the new node to the data structure
  newState.dataStructure.data.add(newNode);

  // Return the new state
  return newState;
}

function removeNode(state: LinkedListDataState, idx: number): LinkedListDataState {
  // Clone the state to avoid mutating the original state
  let newState = deepCloneState(state);

  // Convert the Set to an array for easier manipulation
  let nodes = Array.from(newState.dataStructure.data);

  // Get the node to be removed
  let removedNode = nodes[idx];

  // Get the node before and after the removal point
  let beforeNode = nodes[idx - 1];
  let afterNode = nodes[idx + 1];

  // Update the `next` field of the `beforeNode` to skip the `removedNode`
  if (beforeNode) {
    beforeNode.next = afterNode ? afterNode.addr : "NULL";
  }

  // Remove the node from the data structure
  newState.dataStructure.data.delete(removedNode);

  // Return the new state
  return newState;
}

export function generateStateHistory(size: number = 5, numOperations: number = 30): LinkedListDataState[] {
  // Generate the initial state
  let state = generateLinkedList(size);
  
  // Store the states in an array
  let states = [state];

  for (let i = 0; i < numOperations; i++) {
    // Decide which operation to apply
    let operation = Math.floor(Math.random() * 3);

    switch (operation) {
      case 0:
        // Append a node
        state = appendNode(state);
        break;
      case 1:
        // Insert a node at a random position
        let insertPos = Math.floor(Math.random() * (Array.from(state.dataStructure.data).length + 1));
        state = insertNode(state, insertPos);
        break;
      case 2:
        // Remove a node from a random position
        let removePos = Math.floor(Math.random() * Array.from(state.dataStructure.data).length);
        state = removeNode(state, removePos);
        break;
    }

    // Add the new state to the history
    states.push(state);
  }

  return states;
}
