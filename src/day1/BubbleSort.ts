export default function bubble_sort(arr: number[]): void {
  /*
    Each iteration of the bubble sort takes the largest item and puts its at the end.
    Look at the start index, are you larger than the right? If yes, swap. i++
    Keep going until we're only looking at one element.
  */
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
}
