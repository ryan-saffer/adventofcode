import { readFile } from 'fs/promises'
export async function readInput() {
    const input = await readFile('./src/2022/day6/input.txt')
    return input.toString()
}

export function findStart(input: string, uniqueLength: number) {
    let lastFour = input.slice(0, uniqueLength)
    for (let i = 0; i < input.length; i++) {
        lastFour = input.slice(i, i + uniqueLength)
        if (isUnique(lastFour)) return i + uniqueLength
    }
    return 'not found'
}

function isUnique(input: string) {
    for (let i = 0; i < input.length; i++) {
        if (input.slice(i + 1, input.length).includes(input.charAt(i))) {
            return false
        }
    }
    return true
}
