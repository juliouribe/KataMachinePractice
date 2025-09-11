export default function bs_list(haystack: number[], needle: number): boolean {
    let lo = 0;
    let hi = haystack.length;

    /*
    4 element array with needle match at 0th element
    lo = 0, 0, 0,
    hi = 4, 2, 1,
    mid = 2,1, 0
    */

    do {
        const mid = Math.floor(lo + (hi - lo) / 2); // eventually this resolves to lo or left side. Hi is not inclusive.
        const val = haystack[mid];
        if (val === needle) {
            return true;
        } else if (needle < val) {
            hi = mid;
        } else {
            lo = mid + 1;
        }
    } while (lo < hi);

    return false;
}
