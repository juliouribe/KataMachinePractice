export default function dfs(node: BinaryNode<number> | null, needle: number): boolean {
  // Base case
  if (!node) {
    return false;
  }

  if (node.value === needle) {
    return true;
  } else if (node.value < needle) {
    return dfs(node.right, needle);
  } else {
    return dfs(node.left, needle)
  }
}
