function hasUnvisited(seen: boolean[], dists: number[]): boolean {
    // Does the seen array have at least one true value and a dists value that is less than Infinity (also unvisited).
    // Infinity also represents a lack of connection between a node. When there are edges we overwrite this distance.
    return seen.some((seen, idx) => !seen && dists[idx] < Infinity);
}

function getLowestUnvisited(seen: boolean[], dists: number[]): number {
    let idx = -1;
    let lowestDistance = Infinity;

    for (let i = 0; i < seen.length; i++) {
        if (seen[i]) {
            continue;
        }

        if (lowestDistance > dists[i]) {
            lowestDistance = dists[i];
            idx = i;
        }
    }

    return idx;
}

export default function dijkstra_list(
    source: number,
    sink: number,
    arr: WeightedAdjacencyList): number[] {

    const seen = new Array(arr.length).fill(false);
    const prev = new Array(arr.length).fill(-1);
    const dists = new Array(arr.length).fill(Infinity);
    // Set the source node as the "closest" node so the while loop starts with this.
    dists[source] = 0;

    while (hasUnvisited(seen, dists)) {
        // Returns source node the first time and then a connect node afterwards.
        const curr = getLowestUnvisited(seen, dists);
        seen[curr] = true;

        // Grab the edges and go to unvisited nodes.
        const adjs = arr[curr];
        for (let i = 0; i < adjs.length; i++) {
            const edge = adjs[i];
            if (seen[edge.to]) {
                continue;
            }
            // Dists[curr] represents the path so far plus possibly adding this edge.
            const dist = dists[curr] + edge.weight;
            // I believe the first time we do this the dists[edge.to] will be infinity
            // so we will update it with the distance of curr, 0 + weight, so it's something like 4.
            // Then when we go to the next node, we'll have a curr of 4 and add additional weights.
            // This approach feels like BFS since we'll look at all of the edges before visiting another node.
            if (dist < dists[edge.to]) {
                dists[edge.to] = dist;
                prev[edge.to] = curr;
            }
        }
    }

    const out: number[] = [];
    // Sink seems to be some node. By the time we get here, it feels like we've
    // created and explored all paths in the graph. I'm still not sure how the
    // single dimension prev array will track multiple ways to a node. We would
    // have multiple prev's. What if we overwrite the best one with a less optimal one?
    // I guess we have guard rails so that we typically wouldn't unless it's shorter.
    let curr = sink;
    while (prev[curr] !== -1) {
        out.push(curr);
        curr = prev[curr];
    }
    out.push(source);
    return out.reverse();
}

/*
Dijkstra's runtime
    - create seen, prev, and dists array. O(V)
    - while loop plus hasUnvisited and getLowest makes the search O(V^2)
    - the for loop with edges looks like O(E) but it's actually 2E but we only
    check the edges connected so its O(E), O(V^2 + E) so far.
    - If you add a minheap to tracking distances, you can remove items from the heap
    if they are too large. Improves runtime to O(log V (V + E))
    
*/
