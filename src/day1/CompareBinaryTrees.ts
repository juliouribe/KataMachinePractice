export default function compare(a: BinaryNode<number> | null, b: BinaryNode<number> | null): boolean {
  // Base cases
  // If both are null, then we are good.
  if (a === null && b === null) {
    return true;
  }
  // If either is empty then return false. Previous base cases establishes some value in the other.
  if (a === null || b === null) {
    return false;
  }
  // If they are not equal return false.
  if (a.value !== b.value) {
    return false;
  }
  return compare(a.left, b.left) && compare(a.right, b.right);
}
