import { readFile } from 'fs/promises'

export async function count(
    predicate: (
        firstStart: number,
        firstEnd: number,
        secondStart: number,
        secondEnd: number
    ) => boolean
) {
    const input = (await readFile('./src/2022/day4/input.txt')).toString().split('\n')

    return input.reduce((count, curr) => {
        const [[firstStart, firstEnd], [secondStart, secondEnd]] = curr
            .split(',')
            .map(it => it.split('-').map(it => parseInt(it)))

        return predicate(firstStart, firstEnd, secondStart, secondEnd) ? ++count : count
    }, 0)
}
