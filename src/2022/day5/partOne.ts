import { readInput } from './common'

export default async function () {
    const { stacks, moves } = await readInput()

    moves.forEach(move => {
        for (let i = 0; i < move.amount; i++) {
            stacks[move.to].push(stacks[move.from].pop()!)
        }
    })

    return stacks.map(stack => stack.pop()).join('')
}
