#include <stdlib.h>

struct node {
	int data;
	struct node *next;
};

int main() {
	int a = 3;

	struct node *l1 = malloc(sizeof(struct node));
	struct node *l2 = malloc(sizeof(struct node));
	struct node *l3 = malloc(sizeof(struct node));
	struct node *l4 = malloc(sizeof(struct node));
	struct node *l5 = malloc(sizeof(struct node));
	struct node *l6 = malloc(sizeof(struct node));
	struct node *l7 = malloc(sizeof(struct node));



	l1->next = l2;
	l2->next = l3;
	l3->next = l4;
	l4->next = l5;
	l5->next = l6;
	l6->next = l7;
	l7->next = NULL;


	l1->data = 42;
	l2->data = 21;
	l3->data = 201;
	l4->data = 222;
	l5->data = 232;
	l6->data = 277;
	l7->data = 289;

	int z = 0; // Good line to break on
}
