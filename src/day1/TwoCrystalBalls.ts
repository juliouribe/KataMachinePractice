export default function two_crystal_balls(breaks: boolean[]): number {
  /*
    Take the square root of N and do one step at a time. Once you find a break
    then start iterating one index at a time.
  */
  const jumpAmount = Math.sqrt(Math.floor(breaks.length));
  let lastSpot = jumpAmount;

  // Find the first break using steps of sqrt(N)
  while (lastSpot < breaks.length) {
    // Once we find a break, go back to the previous safe spot and exit.
    if (breaks[lastSpot]) {
      lastSpot -= jumpAmount;
      break;
    }
    lastSpot += jumpAmount;
  }
  // Increment one at a time from last safe spot up to
  for (let i = lastSpot + 1; i < (lastSpot + jumpAmount) && i < breaks.length; i++) {
    if (breaks[i]) {
      return i;
    }
  }
  return -1
}
