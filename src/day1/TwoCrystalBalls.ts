export default function two_crystal_balls(breaks: boolean[]): number {
    const jump = Math.floor(Math.sqrt(breaks.length));
    let l = 0;
    let r = jump - 1;

    /*
    l = 0, 7
    r = 6, 13
    t = 12
    */
    do {
        if (breaks[r]) {
            for (let i = l; i <= r; i++) {
                if (breaks[i]) return i;
            }
        }
        l += jump;
        r += jump;
    } while (l < breaks.length);

    return -1;
}
