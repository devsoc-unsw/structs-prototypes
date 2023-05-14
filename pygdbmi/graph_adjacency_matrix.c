
#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>
#include "Graph.h"

struct graph {
    int **edges;
    int nV;
    int nE;
};

Graph newGraph(int V) {
    Graph new = malloc(sizeof(struct graph));
    new->nV = V;
    new->nE = 0;

    new->edges = malloc(V * sizeof(int *));
    for (int i = 0; i < V; i++) {
        new->edges[i] = calloc(V, sizeof(int *));
    }
    return new;
}

void addEdge(Graph graph, int v1, int v2) {
    graph->edges[v1][v2] = 1;
    graph->edges[v2][v1] = 1;
}

bool isAdjacent(Graph graph, int v1, int v2) {
    return graph->edges[v1][v2];
}


void dfsRecursive(Graph graph, int vertex, bool visited[]) {
    visited[vertex] = true;
    printf("Visited vertex %d\n", vertex);

    for (int i = 0; i < graph->nV; i++) {
        if (!visited[i] && isAdjacent(graph, vertex, i)) {
            dfsRecursive(graph, i, visited);
        }
    }
}

void dfs(Graph graph, int vertex) {
    bool *visited = malloc(graph->nV * sizeof(bool));
    dfsRecursive(graph, vertex, visited);
}
