#include "Graph.h"

int main(int argc, char *argv[]) {
    Graph graph = newGraph(5);
    // addEdge(graph, 0, 1);
    // addEdge(graph, 0, 2);
    // addEdge(graph, 0, 3);
    // addEdge(graph, 0, 4);
    // dfs(graph, 0);
    // return 0;
    addEdge(graph, 0, 1);
    addEdge(graph, 0, 2);
    addEdge(graph, 1, 2);
    addEdge(graph, 2, 3);

    dfs(graph, 2);
    return 0;
}
