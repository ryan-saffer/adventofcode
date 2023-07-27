import { readInput } from './common'

export default async function () {
    const input = await readInput()

    let totalVisible = 0

    input.forEach((row, rowIdx) => {
        row.forEach((column, columnIdx) => {
            if (isVisible(input, column, rowIdx, columnIdx)) {
                totalVisible++
            }
        })
    })

    return totalVisible
}

function isVisible(
    input: number[][],
    treeHeight: number,
    rowIdx: number,
    columnIdx: number
) {
    if (
        rowIdx === 0 ||
        rowIdx === input.length - 1 ||
        columnIdx === 0 ||
        columnIdx === input.length - 1
    ) {
        // on the edge
        return true
    }

    const output = {
        up: true,
        left: true,
        down: true,
        right: true,
    }

    // up
    for (let i = rowIdx - 1; i >= 0; i--) {
        if (input[i][columnIdx] >= treeHeight) output.up = false
    }

    // down
    for (let i = rowIdx + 1; i < input.length; i++) {
        if (input[i][columnIdx] >= treeHeight) output.down = false
    }

    // left
    for (let i = columnIdx - 1; i >= 0; i--) {
        if (input[rowIdx][i] >= treeHeight) output.left = false
    }

    // right
    for (let i = columnIdx + 1; i < input.length; i++) {
        if (input[rowIdx][i] >= treeHeight) output.right = false
    }

    return output.up || output.left || output.down || output.right
}
