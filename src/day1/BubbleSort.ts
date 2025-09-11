export default function bubble_sort(arr: number[]): void {
    // i determines how much less of the array to look at 0(n) times.
    for (let i = 0; i < arr.length; i++) {
        // j is the actually pointer used for comparison. We look at less with more iterations.
        for (let j = 0; j < arr.length - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                const temp = arr[j + 1];
                arr[j + 1] = arr[j];
                arr[j] = temp;
            }
        }
    }
}
