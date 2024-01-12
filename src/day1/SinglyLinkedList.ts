type Node<T> = {
    value: T,
    next?: Node<T>,
};

export default class SinglyLinkedList<T> {
    public length: number;
    public head?: Node<T>;
    public tail?: Node<T>;

    constructor() {
        this.length = 0;
        this.head = this.tail = undefined;
    }

    prepend(item: T): void {
        const node = { value: item } as Node<T>;
        this.length++

        if (!this.head) {
            this.head = this.tail = node;
            return
        }
        // If we have a head, then we need to update head as well.
        node.next = this.head;          // assign our new head to point at current head
        this.head = node;               // update class reference of head to new head node.
    }
    insertAt(item: T, idx: number): void {
        if (idx > this.length) {
            throw new Error('Idx out of bounds');
        } else if (idx === this.length) {
            this.append(item);
            return;
        } else if (idx === 0) {
            this.prepend(item);
            return;
        }

        let curr = this.head;
        let prev;

        for (let i = 0; curr && i < idx; i++) {
            prev = curr;
            curr = curr.next;
        }
        const node = { value: item } as Node<T>;
        node.next = curr;
        if (prev) prev.next = node;
        this.length++;
    }
    // Super confident about this one.
    append(item: T): void {
        this.length++;
        const node = { value: item } as Node<T>;
        // Empty tail means the whole thing is empty.
        if (!this.tail) {
            this.head = this.tail = node;
            return;
        }
        this.tail.next = node;
        this.tail = node;
    }

    remove(item: T): T | undefined {
        // For singly linked lists we'll track the previous node as well.
        let curr = this.head
        let prev;
        // Iterate over linked list until we find a node with a value that matches the item
        // Update both prev and curr for every iteration.
        for (let i = 0; curr && i < this.length; i++) {
            if (curr.value === item) {
                break;
            }
            prev = curr;
            curr = curr.next;
        }
        // If we go through all of the nodes then we did not find it.
        if (!curr) {
            return;
        }
        // We're assuming we did find a matching node so we're going to remove.
        this.length--;
        // If we have no remaining nodes, set everything to undefined.
        if (this.length === 0) {
            const out = this.head?.value;
            this.head = this.tail = undefined;
            return out;
        }
        // Update the previous node to point to the node after curr.next.
        // In the situation that curr was the tail, this essentially "deletes"
        // the curr node since we remove the only reference to curr.
        // If prev.next is undefined then we have a new tail.
        if (prev) {
            prev.next = curr.next
            if (prev.next === undefined) {
                this.tail = prev;
            }
        };

        if (curr === this.head) {
            this.head = curr.next;
        }
        // This reassigns the tail but the above does too.
        // if (curr === this.tail) {
        //     this.tail = prev;
        // }
        return curr.value;
    }

    // Should work. Base cases may be useful but confident this is good.
    get(idx: number): T | undefined {
        // if (idx > this.length) {
        //     throw new Error("Idx out of bounds");
        // } else if (idx === 0) {
        //     return this.head?.value
        // } else if (idx === this.length) {
        //     return this.tail?.value;
        // }
        let curr = this.head;
        for (let i = 0; curr && i < idx; i++) {
            curr = curr.next;
        }
        return curr?.value;
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
        // If we have no remaining nodes, set everything to undefined.
        if (this.length === 0) {
            const out = curr.value;
            this.head = this.tail = undefined;
            return out;
        }
        if (prev) {
            prev.next = curr.next
            // if (prev.next === undefined) {
            //     this.tail = prev;
            // }
        };

        if (curr === this.head) {
            this.head = curr.next;
        }
        // This reassigns the tail but the above does too.
        if (curr === this.tail) {
            this.tail = prev;
        }
        return curr.value;
    }
}
