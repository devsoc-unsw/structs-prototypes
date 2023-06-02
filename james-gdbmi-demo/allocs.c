#include <stdlib.h>

int main() {
    int * foo = NULL;
    foo = calloc(5,4);

    char *bar = malloc(12);

    bar = realloc(bar, 24);

    long* baz = malloc(24);

    int z = 0;
}