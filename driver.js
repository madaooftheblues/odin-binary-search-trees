import Tree from './tree.js'
import {
    isBalanced,
    prettyPrint,
    levelOrder,
    inOrder,
    preOrder,
    postOrder,
    insert,
} from './tree.js'

const values = [12, 2, 44, 90, 23, 55, 32, 42, 3, 88]

const bst = Tree(values)

prettyPrint(bst.root)
console.log('Is balanced?: ' + isBalanced(bst.root))
console.log('Level order: ' + levelOrder(bst.root))
console.log('In order: ' + inOrder(bst.root))
console.log('Pre order: ' + preOrder(bst.root))
console.log('Post order: ' + postOrder(bst.root))

insert(bst.root, 420)
insert(bst.root, 120)
insert(bst.root, 950)

prettyPrint(bst.root)
console.log('Is balanced?: ' + isBalanced(bst.root))

bst.rebalance()

prettyPrint(bst.root)
console.log('Is balanced?: ' + isBalanced(bst.root))
console.log('Level order: ' + levelOrder(bst.root))
console.log('In order: ' + inOrder(bst.root))
console.log('Pre order: ' + preOrder(bst.root))
console.log('Post order: ' + postOrder(bst.root))
