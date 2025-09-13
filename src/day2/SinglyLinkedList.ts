type Node<T> = {
    val: T;
    next?: Node<T>;
};

export default class SinglyLinkedList<T> {
    public length: number;
    private head?: Node<T>;
    private tail?: Node<T>;

    constructor() {
        this.length = 0;
        this.head = this.tail = undefined;
    }

    prepend(item: T): void {
        const node = { val: item } as Node<T>;
        if (this.head) {
            node.next = this.head;
        }
        this.head = node;
        this.length++;
    }
    insertAt(item: T, idx: number): void {
        if (idx > this.length) {
            return;
        } else if (idx === this.length) {
            this.append(item);
            return;
        } else if ((idx = 0)) {
            this.prepend(item);
            return;
        }

        let curr = this.head;
        let prev;
        for (let i = 0; curr && i < idx; i++) {
            prev = curr;
            curr = curr.next;
        }
        const node = { val: item } as Node<T>;
        node.next = curr;
        if (prev) prev.next = node;
        this.length++;
    }
    append(item: T): void {
        const node = { val: item } as Node<T>;
        if (!this.tail) {
            this.tail = this.head = node;
            return;
        }
        this.tail.next = node;
        this.tail = node;
        this.length++;
    }
    remove(item: T): T | undefined {
        // iterate through until we find a node with value and remove it
        let prev;
        let curr = this.head;
        for (let i = 0; curr && i < this.length; i++) {
            if (curr.val === item) {
                break;
            }
            prev = curr;
            curr = curr.next;
        }
        if (!curr) return;

        this.length--;
        // Now we can assume curr is what we're looking for and we can remove.
        if (this.length === 0) {
            const out = this.head?.val;
            this.head = this.tail = undefined;
            return out;
        }
        if (prev) {
            prev.next = curr.next;
            if (prev.next === undefined) {
                this.tail = prev;
            }
        }
        if (curr === this.head) this.head = curr.next;

        return curr.val;
    }
    get(idx: number): T | undefined {
        let curr = this.head;
        for (let i = 0; curr && i < idx; i++) {
            curr = curr.next;
        }
        return curr?.val;
    }
    removeAt(idx: number): T | undefined {
        let curr = this.head;
        let prev;
        for (let i = 0; curr && i < idx; i++) {
            prev = curr;
            curr = curr.next;
        }
        if (!curr) return;

        this.length--;
        if (this.length === 0) {
            const out = curr.val;
            this.head = this.tail = undefined;
            return out;
        }
        if (prev) prev.next = curr.next;
        if (curr === this.head) this.head = curr.next;
        if (curr === this.tail) this.tail = prev;

        return curr.val;
    }
}
