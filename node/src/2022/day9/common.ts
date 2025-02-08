import { readFile } from 'fs/promises'

type Direction = 'U' | 'D' | 'L' | 'R'

export type Position = { row: number; column: number }

export async function readInput() {
    const input = (await readFile('./src/2022/day9/input_test.txt'))
        .toString()
        .split('\n')
        .map(it => {
            const move = it.split(' ')[0] as Direction
            const amount = parseInt(it.split(' ')[1])
            return [move, amount] as const
        })
    return input
}
