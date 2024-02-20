/*
For a minheap, its a binary tree where the top value must be the smallest and
everything below it is larger for every node. We only care about comparison in
size between levels of the tree. We don't enforce left and right comparison's
like we would with a binary search tree.

Minheap's always add left to right. It is always complete. To add a node, we go
to the final spot and add a node. Then we bubble up.

When removing a node, I think we only remove from the top. When we remove the
root node, we'll take the last inserted item and bubble it down. While bubbling
down, we look at the children, take the smallest of the two and compare against
that.

We'll use an arraylist for storing the minheap so we can index elements. To find
the child of a parent,
    2i + 1
    2i + 2

To find the inverse, child to parent use integer division or Math.floor()
    Math.floor((childIdx - 1) / 2)

To find the last node inserted, use the length of the array.
*/

export default class MinHeap {
    public length: number;
    private data: number[];

    constructor() {
        this.length = 0;
        this.data = [];
    }
    insert(value: number): void {
        /*
        Insert the new value at the end of the array list using length. Then heapifyUp.
        Increment count.
        */
        this.length++;
        this.data.push(value);
        this.heapifyUp(this.length - 1);
    }
    delete(): number | undefined {
        // Also known as poll, pop, or whatever. Remove the smallest value which is the head.
        if (this.length === 0) {
            throw undefined;
        }
        const out = this.data[0];
        this.length--;
        if (this.length === 0) {
            this.data = [];
            return out;
        }
        this.data[0] = this.data[this.length];
        this.heapifyDown(0);
        return out;

    }
    private heapifyDown(idx: number): void {
        // Look at current node, get children idxs, check if we're larger than any child
        // swap if larger and heapifyDown using the child idx as the new starting point.
        // If we're at the end of our heap data, then return.
        const leftIdx = this.leftChild(idx);
        const rightIdx = this.rightChild(idx);
        if (idx >= this.length || leftIdx >= this.length) {
            return
        }
        const value = this.data[idx];
        const leftValue = this.data[leftIdx];
        const rightValue = this.data[rightIdx];
        if (rightValue > leftValue && value > leftValue) {
            this.swap(idx, leftIdx);
            this.heapifyDown(leftIdx);
        } else if (leftValue > rightValue && value > rightValue) {
            this.swap(idx, rightIdx);
            this.heapifyDown(rightIdx);
        }
    }
    private heapifyUp(idx: number): void {
        // If we're at the root we're done.
        if (idx === 0) {
            return;
        }
        // Otherwise parent idx must exist and we can check if we need to swap.
        const parentIdx = this.parent(idx);
        if (this.data[idx] < this.data[parentIdx]) {
            this.swap(idx, parentIdx);
            this.heapifyUp(parentIdx);
        }
    }
    private swap(a: number, b: number): void {
        const temp = this.data[a];
        this.data[a] = this.data[b];
        this.data[b] = temp;
    }
    private parent(idx: number): number {
        return Math.floor((idx - 1) / 2);
    }
    private leftChild(idx: number): number {
        // 2i + 1.
        return (2 * idx + 1);
    }
    private rightChild(idx: number): number {
        // 2i + 2.
        return (2 * idx + 2);
    }
}
