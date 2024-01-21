/*
Also known as retrieval trees. They're good for searches since we get constant
time for searching one letter at a time. The root is usually empty. Existence in
the try is established by having the incremental letters as children.

head - c - a - t - s
                 \ t - t - l - e
             \ r - d
     \ m - a - r - k

When someone starts typing, check if we have the letter they are typing, like c,
and show the children as autocomplete options.
*/

type TrieNode = {
    children: TrieNode[],
    isValue: boolean,
    value?: string
}

// Create trie node with empty defaults.
function createTrieNode() {
    return {
        children: [],
        isValue: false,
    }
}

// Char code for 'a'.
const start = 'a'.charCodeAt(0);

// Gets char code for an index in a word.
function getIdx(word: string, idx: number): number {
    return word.toLowerCase().charCodeAt(idx) - start;
}

export default class Trie {
    private head: TrieNode;

    constructor() {
        this.head = createTrieNode();
    }

    insert(item: string): void {
        let current: TrieNode = this.head;
        // This for loop establishes the word in an array of objects and sets the
        // final character as the end of the word using the isValue property.
        for (let i = 0; i < item.length; i++) {
            const letter = getIdx(item, i);
            // Check the array of children starting from the head node. Once
            // the child exists, we'll get another object back.
            if (!current.children[letter]) {
                current.children[letter] = createTrieNode();
            }
            // We'll always have an object at this point but it may be empty.
            // If it was filled previously then we're just indexing in.
            current = current.children[letter];
        }
        current.isValue = true;
        current.value = item;
    }
    delete(item: string): void {
        let current: TrieNode = this.head;
        // Traverse the "trie tree" until we find the word or we don't find a
        // letter from the given word. At that point current would be undefined.
        for (let i = 0; current && i < item.length; i++) {
            current = current.children[getIdx(item, i)];
        }
        if (!current) {
            return
        }
        // If we find it we simply disable it. We don't remove the "nodes" leading up to it.
        current.value = undefined;
        current.isValue = false;
    }
    find(partial: string): string[] {
        let current = this.head;
        for (let i = 0; i < partial.length; i++) {
            current = current.children[getIdx(partial, i)];
        }

        return this.findRecursively(current, []);
    }
    private findRecursively(node: TrieNode | undefined, out: string[]): string[]  {
        if (!node) {
            return out;
        }
        // If this node with a letter is also the end of a word, then we add the
        // full word to our 'out' array.
        if (node.isValue) {
            out.push(node.value as string);
        }
        // Dive deeper to see if more words fit this partial word text thus far.
        // We're only grabbing the words if they are ends of words. We skip letter
        // nodes where they're just a char leading up to a word. When we reach the las
        // "node"/letter of a word, this should unwind the stack.
        for (let i = 0; i < node.children.length; i++) {
            this.findRecursively(node.children[i], out);
        }

        return out;
    }
}
