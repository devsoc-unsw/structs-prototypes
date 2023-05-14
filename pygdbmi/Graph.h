typedef struct graph *Graph;

struct edge {
    int v;
    int w;
};

Graph newGraph(int V);
void addEdge(Graph graph, int v1, int v2);
void dfs(Graph graph, int vertex);
