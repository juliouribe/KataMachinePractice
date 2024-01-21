export default function bfs(head: BinaryNode<number>, needle: number): boolean {
  // Not a real queue but let's pretend it is. We want FIFO constant time for this problem.
  const queue = [head];
  while (queue.length > 0) {
    const curr = queue.shift() as BinaryNode<number>; // Take the first node from the top.
    // See if we have found out node. Return if we have.
    if (curr.value === needle) {
      return true;
    }
    // Add child nodes checking for null before adding so we only have real nodes in the queue.
    if (curr.left) {
      queue.push(curr.left);
    }
    if (curr.right) {
      queue.push(curr.right);
    }
  }
  return false;
}
