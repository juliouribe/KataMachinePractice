const dirs = [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1],
];

function walk(
    maze: string[],
    wall: string,
    curr: Point,
    end: Point,
    path: Point[],
    seen: boolean[][],
): boolean {
    // 1. Off map
    if (
        curr.x < 0 ||
        curr.x >= maze[0].length ||
        curr.y < 0 ||
        curr.y >= maze.length
    ) {
        return false;
    }
    // 2. Wall
    if (maze[curr.y][curr.x] === wall) {
        return false;
    }
    // 3. Seen
    if (seen[curr.y][curr.x]) {
        return false;
    }
    // 4. Found the end
    if (curr.x === end.x && curr.y === end.y) {
        path.push(curr);
        return true;
    }

    // pre, recurse, post
    path.push(curr);
    seen[curr.y][curr.x] = true;

    for (let i = 0; i < dirs.length; i++) {
        const [x, y] = dirs[i];
        const next = {
            x: curr.x + x,
            y: curr.y + y,
        } as Point;
        if (walk(maze, wall, next, end, path, seen)) {
            return true;
        }
    }
    path.pop();

    return false;
}

export default function solve(
    maze: string[],
    wall: string,
    start: Point,
    end: Point,
): Point[] {
    const path: Point[] = [];
    const seen: boolean[][] = [];

    for (let i = 0; i < maze.length; i++) {
        seen.push(new Array(maze[0].length).fill(false));
    }

    walk(maze, wall, start, end, path, seen);

    return path;
}
