type Node<T> = {
    val: T;
    next?: Node<T>;
};

export default class Stack<T> {
    public length: number;
    private head?: Node<T>;

    constructor() {
        this.length = 0;
        this.head = undefined;
    }

    push(item: T): void {
        this.length++;
        const node = { val: item } as Node<T>;
        if (!this.head) {
            this.head = node;
            return;
        }
        node.next = this.head;
        this.head = node;
    }

    pop(): T | undefined {
        if (!this.head) {
            return;
        }

        this.length--;
        const node = this.head;
        this.head = node.next;
        return node.val;
    }

    peek(): T | undefined {
        return this.head?.val;
    }
}
