type Node<T> = {
    value: T,
    prev?: Node<T>,
    next?: Node<T>,
}

export default class DoublyLinkedList<T> {
    public length: number;
    private head?: Node<T>;
    private tail?: Node<T>;


    constructor() {
        this.length = 0;
        this.head = this.tail = undefined;
    }

    prepend(item: T): void {
        const node = { value: item } as Node<T>;
        this.length++;
        // If we don't have a head, then set the new node to the tail and head.
        if (!this.head) {
            this.head = this.tail = node;
            return;
        }

        // If we have existing nodes
        node.next = this.head;  // have the new node point to previous head.
        this.head.prev = node;  // update old head prev to new node.
        this.head = node;       // update this.head to point at the new node.
    }
    insertAt(item: T, idx: number): void {
        if (idx > this.length) {
            throw new Error("Idx larger than length")
        }

        if (idx === this.length) {
            this.append(item);
            return;
        } else if (idx === 0) {
            this.prepend(item);
        }

        const oldNode = this.findNode(idx);
        if (!oldNode) {
            return;
        }
        this.length++;
        const node = { value: item } as Node<T>;

        if (this.length === 1) {
            this.head = this.tail = node;
            return;
        }
        node.next = oldNode;                    // set new node's next to old node
        node.prev = oldNode.prev;               // set new node's prev to old node's prev
        oldNode.prev = node;                    // set old node's prev to new node

        if (node.prev) {
            node.prev.next = node;   // set prev's next to new node
        }
    }
    append(item: T): void {
        const node = { value: item } as Node<T>;
        this.length++;
        // If list is empty set head and tail to the new node.
        if (!this.tail) {
            this.head = this.tail = node;
            return;
        }
        // Otherwise we have a tail so need to just add after that tail node and update the tail.
        this.tail.next = node;      // Make the next node after old tail the new node.
        node.prev = this.tail;      // Make the previous of the new node the old tail.
        this.tail = node;           // Make the tail pointer point at new node.
    }
    remove(item: T): T | undefined {
        let curr = this.head;
        for (let i = 0; i < this.length && curr; i++) {
            if (curr.value === item) {
                break;
            }
            curr = curr.next;
        }
        // No node matches the item. Return undefined.
        if (!curr) {
            return;
        }
        return this.removeNode(curr);
    }
    get(idx: number): T | undefined {
        return this.findNode(idx)?.value;
    }
    removeAt(idx: number): T | undefined {
        const node = this.findNode(idx);
        if (!node) {
            return;
        }
        return this.removeNode(node);
    }
    private findNode(idx: number): Node<T> | undefined {
        if (idx > this.length) {
            throw new Error("Idx larger than length")
        }
        let curr = this.head;
        for (let i = 0; i < idx && curr; i++) {
            curr = curr.next;
        }
        return curr;
    }
    private removeNode(node: Node<T>): T | undefined {
        this.length--;
        if (this.length === 0) {
            const out = this.head?.value;
            this.head = this.tail = undefined;
            return out;
        } 0
        if (node.prev) {
            node.prev.next = node.next;
        }
        if (node.next) {
            node.next.prev = node.prev;
        }
        if (node === this.head) {
            this.head = node.next
        }
        if (node === this.tail) {
            this.tail = node.prev
        }
        // Completely remove this node's reference to the linked list.
        node.next = node.prev = undefined;
        return node.value;
    }
}
