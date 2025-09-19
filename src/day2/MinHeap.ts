export default class MinHeap {
    public length: number;
    private data: number[];

    constructor() {
        this.length = 0;
        this.data = [];
    }

    insert(value: number): void {
        this.data[this.length] = value;
        this.heapifyUp(this.length);
        this.length++;
    }
    delete(): number {
        if (this.length === 0) {
            return -1;
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
    private parent(idx: number): number {
        return Math.floor((idx - 1) / 2);
    }
    private leftChild(idx: number): number {
        return 2 * idx + 1;
    }
    private rightChild(idx: number): number {
        return 2 * idx + 2;
    }
    private heapifyUp(idx: number): void {
        if (idx === 0) {
            return;
        }
        const parentIdx = this.parent(idx);
        const parentVal = this.data[parentIdx];
        const currVal = this.data[idx];
        if (parentVal > currVal) {
            // swap and heapify up on parentIdx
            this.data[idx] = parentVal;
            this.data[parentIdx] = currVal;
            this.heapifyUp(parentIdx);
        }
    }
    private heapifyDown(idx: number): void {
        const l = this.leftChild(idx);
        const r = this.rightChild(idx);
        if (idx >= this.length || l >= this.length) {
            return;
        }

        const lVal = this.data[l];
        const rVal = this.data[r];
        const v = this.data[idx];
        if (lVal > rVal && v > rVal) {
            this.data[idx] = rVal;
            this.data[r] = v;
            this.heapifyDown(r);
        } else if (rVal > lVal && v > lVal) {
            this.data[idx] = lVal;
            this.data[l] = v;
            this.heapifyDown(l);
        } else if (lVal === rVal && v > rVal) {
            this.data[idx] = rVal;
            this.data[r] = v;
            this.heapifyDown(r);
        }
    }
}
