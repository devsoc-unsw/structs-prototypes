#include <stdio.h>
#include <stdlib.h>

struct node {
    int data;
    struct node *next; 
};

struct list_2 {
    struct node *head;
};

struct node *new_node(int data) {
    struct node *new = malloc(sizeof(struct node));
    new->data = data;
    new->next = NULL;
    return new;
}

void appendList(int value, struct list_2 *list) {
    struct node *new_tail = new_node(value);
    if (list->head == NULL) {
        list->head = new_tail;
        return;
    }

    struct node *curr = list->head;
    while (curr->next != NULL) {
        curr = curr->next;
    }

    curr->next = new_tail;
};

void print_list(struct list_2 *list) {
    struct node *curr = list->head;
    while (curr != NULL) {
        printf("%d -> ", curr->data);
        curr = curr->next;
    }
    printf("X\n");
}

int main(int argc, char *argv[]) {
    struct list_2 *list2 = malloc(sizeof(struct list_2));
    list2->head = NULL;
    appendList(5, list2);
    appendList(10, list2);
    appendList(21, list2);
    appendList(234, list2);
    appendList(67, list2);


    
    print_list(list2);
}
