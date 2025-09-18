type Node<T> = {
    val: T;
    next?: Node<T>;
    prev?: Node<T>;
};

export default class DoublyLinkedList<T> {
    public length: number;
    private head?: Node<T>;
    private tail?: Node<T>;

    constructor() {
        this.length = 0;
        this.head = this.tail = undefined;
    }
    prepend(item: T): void {
        this.length++;
        const node = { val: item } as Node<T>;
        if (!this.head) {
            this.head = node;
            return;
        }
        node.next = this.head;
        this.head.prev = node;
        this.head = node;
    }
    insertAt(item: T, idx: number): void {
        if (idx > this.length) {
            return;
        } else if (idx === this.length) {
            this.append(item);
            return;
        } else if (idx === 0) {
            this.prepend(item);
            return;
        }

        this.length++;
        let curr = this.getAt(idx) as Node<T>;
        const node = { val: item } as Node<T>;

        node.next = curr; // point new node to respective nodes
        node.prev = curr.prev;
        curr.prev = node; // point 'next' node to new node
        if (node.prev) curr.prev.next = node; // point previous node to new node if it exists
    }
    append(item: T): void {
        const node = { val: item } as Node<T>;
        this.length++;

        if (!this.tail) {
            this.head = this.tail = node;
            return;
        }

        node.prev = this.tail;
        this.tail.next = node;
        this.tail = node;
    }
    remove(item: T): T | undefined {
        let curr = this.head;
        for (let i = 0; curr && i < this.length; i++) {
            if (curr.val === item) {
                break;
            }
            curr = curr.next;
        }
        if (!curr) return;

        return this.removeNode(curr);
    }
    get(idx: number): T | undefined {
        return this.getAt(idx)?.val;
    }
    removeAt(idx: number): T | undefined {
        if (idx > this.length) {
            return;
        }
        let node = this.getAt(idx);
        if (!node) return;

        return this.removeNode(node);
    }

    private removeNode(node: Node<T>): T | undefined {
        this.length--;
        const out = node.val;
        if (this.length === 0) {
            this.head = this.tail = undefined;
            return out;
        }
        if (node.prev) node.prev.next = node.next;
        if (node.next) node.next.prev = node.prev;
        if (this.head === node) this.head = node.next;
        if (this.tail === node) this.tail = node.prev;

        node.next = node.prev = undefined;

        return out;
    }

    private getAt(idx: number): Node<T> | undefined {
        let curr = this.head;
        for (let i = 0; curr && i < idx; i++) {
            curr = curr.next;
        }
        return curr;
    }
}
