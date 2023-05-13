#include <stdlib.h>

int main() {
	int a = 3;
	int c = 'h';

	int b[4] = { 9, 6, 3, 2 };
	
	int *foo = malloc(5* sizeof(int));

	foo[0] = 3;
	foo[1] = 2;
	foo[2] = 97;
	foo[3] = 20;
	foo[4] = 19;

	int z = 0; // Good line to break on
}
