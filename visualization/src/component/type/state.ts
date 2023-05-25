export enum VariableType {
  // SHared between all data structure
  POINTER = 'pointer',
  INT = 'int',
  // Will be only used in graph
  STATE = 'state',
}

export type PointerVariable = {
  type: VariableType.POINTER;
  name: string;
  addr: string;
  value: string;
}

export type IntVariable = {
  type: VariableType.INT;
  name: string;
  value: string;
}

export type Variable = PointerVariable | IntVariable;

export type Address = {
  value: string;
  addr: string;
};

export enum SupportDataType {
  TREE = 'tree',
  ARRAY = 'array',
  LINKED_LIST = 'linked_list',
  STACK = 'stack',
}

export type ArrayNode = {
  addr: string;
  data: string | ArrayNode;
};

export type ArrayDataStructure = {
  type: SupportDataType.ARRAY;
  data: ArrayNode[];
};

export type LinkedListNode = {
  addr: string;
  data: string;
  next: string;
}

export type LinkedListDataStructure = {
  type: SupportDataType.LINKED_LIST;
  data: Set<LinkedListNode>;
}

export type DataStructure = ArrayDataStructure | LinkedListDataStructure;

export type ArrayDataState = {
  variables: Variable[];
  dataStructure: ArrayDataStructure;
}

export type LinkedListDataState = {
  variables: Variable[];
  dataStructure: LinkedListDataStructure;
}

export type State = {
  variables: Variable[];
  dataStructure: DataStructure;
};
