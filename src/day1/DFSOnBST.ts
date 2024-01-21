function walk(node: BinaryNode<number> | null, needle: number): boolean {
  // Base case
  if (!node) {
    return false;
  }

  if (node.value === needle) {
    return true;
  }

  if (node.value < needle) {
    return walk(node.right, needle);
  }
  return walk(node.left, needle);
}

export default function dfs(head: BinaryNode<number>, needle: number): boolean {
  return walk(head, needle);
}
