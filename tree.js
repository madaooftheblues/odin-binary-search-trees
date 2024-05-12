import Node from './node.js'

function removeDuplicates(arr) {
    return [...new Set(arr)]
}

function sortElements(arr) {
    arr.sort((a, b) => a - b)
}

function processArray(arr) {
    const processed = removeDuplicates(arr)
    sortElements(processed)
    return processed
}

function createBST(arr, start, end) {
    if (start > end) return null

    const mid = Math.floor((start + end) / 2)
    const root = Node(arr[mid])

    root.left = createBST(arr, start, mid - 1)
    root.right = createBST(arr, mid + 1, end)

    return root
}

function buildTree(arr) {
    const processed = processArray(arr)
    const root = createBST(processed, 0, processed.length - 1)
    return root
}

function prettyPrint(node, prefix = '', isLeft = true) {
    if (node === null) {
        return
    }
    if (node.right !== null) {
        prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false)
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`)
    if (node.left !== null) {
        prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true)
    }
}

function insert(root, data) {
    if (root === null) return

    if (data < root.data) {
        if (root.left !== null) return insert(root.left, data)

        const node = Node(data)
        root.left = node
        return
    }
    if (data > root.data) {
        if (root.right !== null) return insert(root.right, data)

        const node = Node(data)
        root.right = node
        return
    }
}

function min(root) {
    if (root.left === null) return root.data

    return min(root.left)
}

function deleteItem(root, data) {
    if (root === null) return root

    if (data < root.data) {
        root.left = deleteItem(root.left, data)
    } else if (data > root.data) {
        root.right = deleteItem(root.right, data)
    } else {
        if (root.left === null) return root.right

        if (root.right === null) return root.left

        const nextLargest = min(root.right)
        root.data = nextLargest
        root.right = deleteItem(root.right, root.data)
    }

    return root
}

function find(root, data) {
    if (root === null) return root
    if (root.data === data) return root
    if (data < root.data) return find(root.left, data)
    if (data > root.data) return find(root.right, data)
}

function levelOrderIter(root, callback) {
    if (root === null) return

    const frontier = [root]
    const values = []

    while (frontier.length !== 0) {
        const node = frontier.shift()

        if (callback) callback(node)
        else values.push(node.data)

        if (node.left) frontier.push(node.left)
        if (node.right) frontier.push(node.right)
    }

    if (!callback) return values
}

function levelOrderRec(root, callback) {
    const values = []

    function bfs(node, frontier, values, callback) {
        if (node === null) return
        if (node.left) frontier.push(node.left)
        if (node.right) frontier.push(node.right)

        if (callback) callback(root)
        else values.push(node.data)

        if (frontier.length === 0) return

        return bfs(frontier.shift(), frontier, values, callback)
    }

    bfs(root, [], values, callback)

    if (!callback) return values
}

function Tree(arr) {
    let root = buildTree(arr)

    return { prettyPrint, root, insert, deleteItem, min, find }
}

const arr = [1, 2, 3, 4, 12, 14, 5, 20, 22]

const t = Tree(arr)

prettyPrint(t.root)
deleteItem(t.root, 5)
prettyPrint(t.root)
console.log(levelOrderRec(t.root))
