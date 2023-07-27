import { readInput } from './common'

export default async function () {
    const input = await readInput()

    let bestScenicScore = 0

    input.forEach((row, rowIdx) => {
        row.forEach((column, columnIdx) => {
            const scenicScore = calculateScenicScore(input, column, rowIdx, columnIdx)
            if (scenicScore > bestScenicScore) {
                bestScenicScore = scenicScore
            }
        })
    })

    return bestScenicScore
}

function calculateScenicScore(
    input: number[][],
    treeHeight: number,
    rowIdx: number,
    columnIdx: number
) {
    // up
    let upScore = 0
    for (let i = rowIdx - 1; i >= 0; i--) {
        upScore++
        if (input[i][columnIdx] >= treeHeight) break
    }

    // down
    let downScore = 0
    for (let i = rowIdx + 1; i < input.length; i++) {
        downScore++
        if (input[i][columnIdx] >= treeHeight) break
    }

    // left
    let leftScore = 0
    for (let i = columnIdx - 1; i >= 0; i--) {
        leftScore++
        if (input[rowIdx][i] >= treeHeight) break
    }

    // right
    let rightScore = 0
    for (let i = columnIdx + 1; i < input.length; i++) {
        rightScore++
        if (input[rowIdx][i] >= treeHeight) break
    }

    return upScore * downScore * rightScore * leftScore
}
