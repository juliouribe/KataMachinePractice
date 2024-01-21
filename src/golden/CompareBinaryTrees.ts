export default function compare(a: BinaryNode<number> | null, b: BinaryNode<number> | null): boolean {
  // If both are empty return
  if (a === null && b === null) {
    return true;
  }

  // A exists or B don't exist.
  if (a === null || b === null) {
    return false;
  }

  if (a.value !== b.value) {
    return false;
  }

  return compare(a.left, b.left) && compare(a.right, b.right);
}
