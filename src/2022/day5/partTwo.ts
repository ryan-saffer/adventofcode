import { readInput } from './common'

export default async function () {
    const { stacks, moves } = await readInput()

    moves.forEach(move => {
        const fromStack = stacks[move.from]
        const itemsToMove = fromStack.slice(
            fromStack.length - move.amount,
            fromStack.length
        )
        for (let i = 0; i < move.amount; i++) {
            fromStack.pop()
            stacks[move.to].push(itemsToMove[i])
        }
    })

    return stacks.map(stack => stack.pop()).join('')
}
