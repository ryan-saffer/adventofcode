import { readFile } from 'fs/promises'

type Move = { amount: number; from: number; to: number }

export async function readInput() {
    const input = (await readFile('./src/2022/day5/input.txt')).toString().split('\n')

    const stacks: string[][] = [[], [], [], [], [], [], [], [], []]
    const moves: Move[] = []

    input.every(line => {
        if (line === '') {
            return true
        } else if (line.startsWith('move')) {
            addMove(line, moves)
        } else if (line.includes('1')) {
            return true
        } else {
            addToStacks(line, stacks)
        }

        return true
    })

    return { stacks: stacks.map(it => it.reverse()), moves }
}

function addToStacks(line: string, stacks: string[][]) {
    const items: string[] = []
    for (let i = 0; i < line.length; i += 4) {
        items.push(line.slice(i + 1, i + 2))
    }
    items.forEach((item, idx) => {
        if (item !== ' ') stacks[idx].push(item)
    })
}

function addMove(line: string, moves: Move[]) {
    const movesSplit = line.split(' ')
    moves.push({
        amount: parseInt(movesSplit[1]),
        from: parseInt(movesSplit[3]) - 1,
        to: parseInt(movesSplit[5]) - 1,
    })
}
