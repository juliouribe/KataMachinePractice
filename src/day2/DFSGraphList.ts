function walk(
    graph: WeightedAdjacencyList,
    curr: number,
    needle: number,
    seen: boolean[],
    path: number[],
): boolean {
    if (seen[curr]) {
        return false;
    }
    seen[curr] = true;

    path.push(curr);
    if (curr === needle) {
        return true;
    }

    const edges = graph[curr];
    for (let i = 0; i < edges.length; i++) {
        const edge = edges[i];
        if (walk(graph, edge.to, needle, seen, path)) {
            return true;
        }
    }

    path.pop();
    return false;
}

export default function dfs(
    graph: WeightedAdjacencyList,
    source: number,
    needle: number,
): number[] | null {
    const seen: boolean[] = new Array(graph.length).fill(false);
    const path: number[] = [];

    walk(graph, source, needle, seen, path);
    if (path.length) {
        return path;
    }
    return null;
}
