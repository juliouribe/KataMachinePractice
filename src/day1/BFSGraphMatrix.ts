export default function bfs(graph: WeightedAdjacencyMatrix, source: number, needle: number): number[] | null {
  // Seen is the length of the graph which is the number of nodes total.
  // While the graph is a 2D array, the second dimension represents connections
  // so we only need a single dimension array to represent seen.
  const seen = new Array(graph.length).fill(false);
  // Still unclear on how prev will work. Feels like it needs another dimension.
  const prev = new Array(graph.length).fill(-1);
  // We start with the source so we'll update our seen and q.
  seen[source] = true;
  const q: number[] = [source];
  do {
    // Pop off the next in queue and compare against needle.
    const curr = q.shift() as number;
    if (curr === needle) {
      break;
    }
    // If we haven't found it we need to look at adjacent nodes.
    const adjs = graph[curr];

    for (let i = 0; i < adjs.length; i++) {
      // We're using an adjancency matrix so 0 represents no connection.
      // Otherwise we find an object that contains connection info, node index and weight.
      if (adjs[i] === 0) {
        continue;
      }
      // Check that seen array so we don't revisit nodes.
      if (seen[i]) {
        continue;
      }
      // Mark node as seen
      seen[i] = true;
      // Mark previous as the value of the parent node. Not sure how you would use
      // this value to go back from a child if you wanted. When we build this backwards,
      // we have a series of indexes that may repeat. Eventually we'll hit -1 for prev.
      prev[i] = curr;
      // We don't push the value of the node but the index of the node.
      q.push(i);
    }
  } while (q.length);

  if (prev[needle] === -1) {
    return null;
  }

  // Build it backwards
  let curr = needle;
  const out: number[] = [];
  while (prev[curr] !== -1) {
    out.push(curr);
    // assign curr to whoever added them. Get the parent and add them
    curr = prev[curr];
  }

  return [source].concat(out.reverse());
}
