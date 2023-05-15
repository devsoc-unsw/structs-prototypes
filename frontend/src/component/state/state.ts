export type Variable = {
  name: string;
  addr: Address;
};

export type Address = {
  value: string;
  addr: string;
}


export enum SupportDataType {
  TREE = 'tree',
  ARRAY = 'array',
  LINKED_LIST = 'linked_list',
  STACK = 'stack',
}


export type ArrayNode = {
  addr: Address;
  data: string | ArrayNode;
}

export type ArrayDataStructure = {
  type: SupportDataType.ARRAY,
  data: ArrayNode[]
}

export type DataStructure = ArrayDataStructure;

export type State = {
  variables: Variable[];
  dataStructure: DataStructure;
}