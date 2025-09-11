type Node<T> = {
    val: T;
    next?: Node<T>;
};

export default class Queue<T> {
    public length: number;
    private head?: Node<T>;
    private tail?: Node<T>;

    constructor() {
        this.head = this.tail = undefined;
        this.length = 0;
    }
    enqueue(item: T): void {
        this.length++;
        const node = { val: item } as Node<T>;

        if (!this.tail) {
            this.head = this.tail = node;
            return;
        }
        this.tail.next = node;
        this.tail = node;
    }
    deque(): T | undefined {
        if (!this.head) {
            return;
        }
        this.length--;
        const node = this.head;
        if (this.length === 0) {
            this.head = this.tail = undefined;
        } else {
            this.head = node.next;
        }

        return node.val;
    }
    peek(): T | undefined {
        return this.head?.val;
    }
}
