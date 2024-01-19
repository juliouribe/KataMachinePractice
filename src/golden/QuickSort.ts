function qs(arr: number[], lo: number, hi: number): void {
  // Base Case
  if (lo >= hi) {
     return;
  }

  const pivotIdx = partition(arr, lo, hi);
  qs(arr, lo, pivotIdx - 1);
  qs(arr, pivotIdx + 1, hi);
}

function partition(arr: number[], lo: number, hi: number): number {
  const pivot = arr[hi];
  let idx = lo - 1;
  // i is the value we are incrementing to compare against pivot.
  // idx is the position to swap to if we find something larger than the pivot.
  for (let i = lo; i < hi; i++) {
    if (arr[i] <= pivot) {
      idx++;
      const tmp = arr[i];
      arr[i] = arr[idx];
      arr[idx] = tmp;
    }
  }
  // Need to swap pivot to end of elements smaller than the pivot using the idx.
  idx++;
  arr[hi] = arr[idx];
  arr[idx] = pivot;
  return idx;
}

export default function quick_sort(arr: number[]): void {
  qs(arr, 0, arr.length - 1);
}
