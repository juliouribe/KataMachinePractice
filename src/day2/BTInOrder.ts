function traverse(node: BinaryNode<number> | null, path: number[]): void {
    if (!node) {
        return;
    }

    traverse(node.left, path);
    path.push(node.value);
    traverse(node.right, path);

    return;
}

export default function in_order_search(head: BinaryNode<number>): number[] {
    const path: number[] = [];
    traverse(head, path);
    return path;
}
