import Node from './node.js'

function Tree(arr) {
    let root = buildTree(arr)

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

    function buildTree(arr) {
        const processed = processArray(arr)
        const root = createBST(processed, 0, processed.length - 1)
        return root
    }

    function createBST(arr, start, end) {
        if (start > end) return null

        const mid = Math.floor((start + end) / 2)
        const root = Node(arr[mid])

        root.left = createBST(arr, start, mid - 1)
        root.right = createBST(arr, mid + 1, end)

        return root
    }

    function prettyPrint(node, prefix = '', isLeft = true) {
        if (node === null) {
            return
        }
        if (node.right !== null) {
            prettyPrint(
                node.right,
                `${prefix}${isLeft ? '│   ' : '    '}`,
                false,
            )
        }
        console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`)
        if (node.left !== null) {
            prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true)
        }
    }

    return { prettyPrint, root }
}
