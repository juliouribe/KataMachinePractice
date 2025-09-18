function traverse(node: BinaryNode<number> | null, path: number[]): void {
    if (!node) {
        return;
    }

    traverse(node.left, path);
    traverse(node.right, path);
    path.push(node.value);

    return;
}

export default function post_order_search(head: BinaryNode<number>): number[] {
    const path: number[] = [];
    traverse(head, path);
    return path;
}
