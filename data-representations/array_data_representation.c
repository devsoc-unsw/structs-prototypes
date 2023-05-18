#include <stdlib.h>

/**
 * A demo of a possible data representation of a dynamic array,
 * and how it changes when various operations are applied, such as
 * add, remove and mutate elements.
 * The array visualiser needs to be capable of animating
 * these changes.
 *
 */

int main() {

  // ================== Stack array ==================
  int b[4] = {9, 6, 3, 2};
  b[0] = 1;

  // how do we know that this pointer points to the array b?
  int *current = &(b[0]); // 0x4783
  current++;              // 0x4787

  // ================== Heap array ==================
  int *arr;
  arr = malloc(3 * sizeof(int));
  arr[0] = 45;
  arr[1] = 74;
  arr[2] = 18;

  /*
  Data representation of dynamic array (stored on heap)

    currentState = {
      name: "arr",
      type: "int *",
      addr: 0x1234,
      elementSize: 4,
      length: 3,
      data: [45, 74, 18]
    }

    Address of each array element determined by `addr`, `elementSize` and index
    of each element in array.
  */

  // === Operation: Set an array slot to new element
  arr[1] = 99;

  /*
    prevState = {
        name: "arr",
        type: "int *",
        addr: 0x1234,
        elementSize: 4, // bytes
        length: 3,
        data: [45, 74, 18]
    }

    nextState = {
        name: "arr",
        type: "int *",
        addr: 0x1234,
        elementSize: 4,
        length: 3,
        data: [45, 99, 18]      // changed
    }
  */

  // === Operation: Add new element(s) at end

  // The array is expanded with two new slots (3 -> 5).
  arr = realloc(arr, 5 * sizeof(int));

  /*
    prevState = {
        name: "arr",
        type: "int *",
        addr: 0x1234,
        elementSize: 4,
        length: 3,
        data: [45, 99, 18]
    }

    nextState = {
        name: "arr",
        type: "int *",
        addr: 0x1234,
        elementSize: 4,
        length: 5,                  // changed
        data: [45, 99, 18, 0, 0]    // changed
    }
  */

  // Operation: Remove element(s)

  // The array is shrunk with two slots (5 -> 3).
  arr = realloc(arr, 3 * sizeof(int));

  /*
    prevState = {
        name: "arr",
        type: "int *",
        addr: 0x1234,
        elementSize: 4,
        length: 5,
        data: [45, 99, 18, 0, 0]
    }

    nextState = {
        name: "arr",
        type: "int *",
        addr: 0x1234,
        elementSize: 4,
        length: 3,              // changed
        data: [45, 99, 18]      // changed
    }
  */

  // Operation: Swap two elements

  int temp = arr[2];
  arr[2] = arr[1];
  arr[1] = temp;

  /*
    state1 = {
        name: "arr",
        type: "int *",
        addr: 0x1234,
        elementSize: 4,
        length: 3,
        data: [45, 18, 99]     // changed
    }

    state2 = {
        name: "arr",
        type: "int *",
        addr: 0x1234,
        elementSize: 4,
        length: 3,
        data: [45, 99, 99]      // changed
    }

    state3 = {
        name: "arr",
        type: "int *",
        addr: 0x1234,
        elementSize: 4,
        length: 3,
        data: [45, 99, 18]    // changed
    }
  */
}