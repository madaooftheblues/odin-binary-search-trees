function Tree(arr) {
    let root = buildTree(arr)

    function removeDuplicates(arr) {
        return [...set(arr)]
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
}
