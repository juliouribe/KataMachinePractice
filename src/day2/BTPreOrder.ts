function traverse(node: BinaryNode<number> | null, path: number[]): void {
    if (!node) {
        return;
    }

    path.push(node.value);
    traverse(node.left, path);
    traverse(node.right, path);

    return;
}

export default function pre_order_search(head: BinaryNode<number>): number[] {
    const path: number[] = [];

    traverse(head, path);

    return path;
}
