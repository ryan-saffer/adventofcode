import { createReadStream } from 'fs'
import readline from 'readline'

export type FirstCol = 'A' | 'B' | 'C'
export type SecondCol = 'X' | 'Y' | 'Z'

export type Hand = 'ROCK' | 'PAPER' | 'SCISSORS'
export type Result = 'WIN' | 'LOSE' | 'DRAW'

export type HandMap<Col extends string> = { [Key in Col]: Hand }

export const OpponentHandMap: HandMap<FirstCol> = {
    A: 'ROCK',
    B: 'PAPER',
    C: 'SCISSORS',
}

export const ResultScoreMap: { [Key in Result]: number } = {
    WIN: 6,
    DRAW: 3,
    LOSE: 0,
}

export const HandScoreMap: { [Key in Hand]: number } = {
    ROCK: 1,
    PAPER: 2,
    SCISSORS: 3,
}

export async function readStrategy() {
    const fileStream = createReadStream('./src/2022/day2/input.txt')
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity,
    })

    const output = []
    for await (const line of rl) {
        output.push(line.split(' ') as [FirstCol, SecondCol])
    }
    return output
}
