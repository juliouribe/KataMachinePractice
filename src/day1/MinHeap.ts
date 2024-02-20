export default class MinHeap {
    public data: number[];
    public length: number;

    constructor() {
        this.data = [];
        this.length = 0;
    }
    insert(value: number): void {
        this.length++;
        this.data.push(value);
        this.heapifyUp(this.length - 1);
    }
    delete(): number | undefined {
        if (this.length === 0) {
            return;
        }
        const value = this.data[0];
        this.length--;
        if (this.length === 0) {
            this.data = [];
            return value
        }
        // Otherwise move the value from the end and heapifyDown
        this.data[0] = this.data[this.length];
        this.heapifyDown(0);
        return value;
    }
    private heapifyDown(idx: number): void {
        const leftIdx = this.leftChild(idx);
        const rightIdx = this.rightChild(idx);
        if (idx >= this.length || leftIdx >= this.length) {
            return
        }
        const value = this.data[idx];
        const leftVal = this.data[leftIdx];
        const rightVal = this.data[rightIdx];
        // We're larger than the left, we should swap with the left.
        if (rightVal > leftVal && value > leftVal) {
            this.swap(idx, leftIdx);
            this.heapifyDown(leftIdx);
        } else if (leftVal > rightVal && value > rightVal) {
            this.swap(idx, rightIdx);
            this.heapifyDown(rightIdx);
        }
    }
    private heapifyUp(idx: number): void {
        // Compare against parent and swap if we're smaller than the parent.
        // Keep going until we've found our spot.
        if (idx === 0) {
            return;
        }
        const value = this.data[idx];
        const parentIdx = this.parent(idx);
        const parentValue = this.data[parentIdx];
        if (value < parentValue) {
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
        return Math.floor((idx - 1)/ 2);
    }
    private leftChild(idx: number): number {
        // 2i + 1
        return (2*idx + 1);
    }
    private rightChild(idx: number): number {
        // 2i + 2
        return (2*idx + 2);
    }
}
