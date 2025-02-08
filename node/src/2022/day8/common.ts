import { readFile } from 'fs/promises'

export async function readInput() {
    const input = (await readFile('./src/2022/day8/input.txt'))
        .toString()
        .split('\n')
        .map(it => it.split('').map(it => parseInt(it)))

    return input
}
