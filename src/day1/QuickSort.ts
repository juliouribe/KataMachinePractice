function qs(arr: number[], lo: number, hi: number): void {
  // Base case
  if (lo >= hi) {
    return;
  }

  const partitionIdx = partition(arr, lo, hi);
  qs(arr, lo, partitionIdx - 1);
  qs(arr, partitionIdx + 1, hi);
}

function partition(arr: number[], lo: number, hi: number): number {
  // Take a pivot point and put everything smaller than it to the left.
  const pivot = arr[hi];
  let idx = lo - 1;
  for (let i = lo; i < hi; i++) {
    // If an element is smaller than the pivot, move it to the left of the pivot.
    // And by to the left we mean as far left as possible using another pointer
    // to track where the end of the smaller numbers are.
    if (arr[i] < pivot) {
      idx++;
      const tmp = arr[i];
      arr[i] = arr[idx];
      arr[idx] = tmp;
    }
  }
  // Move the pivot element to end of the smaller elements using idx pointer.
  idx++;
  arr[hi] = arr[idx];
  arr[idx] = pivot

  return idx;
}

export default function quick_sort(arr: number[]): void {
  qs(arr, 0, arr.length - 1);
}
