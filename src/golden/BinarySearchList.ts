// Binary search is great when the dataset is ordered

export default function bs_list(haystack: number[], needle: number): boolean {
  // Binary search using a while loop
  let low = 0;
  let high = haystack.length;

  do {
    /*
      Mid point is defined as the low (relative starting index) plus the offset.
      Low can change through the search. The (high-low)/2 is the offset relative
      to where the current start and ends are.
    */
    const mid = Math.floor(low + (high-low)/2);
    const value = haystack[mid];
    if (value === needle) {
      return true;
    } else if (value > needle) {
      high = mid;
    } else {
      low = mid + 1;
    }
  } while (low < high)

  return false;
}
