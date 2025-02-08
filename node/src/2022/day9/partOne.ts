import { Position, readInput } from './common'

export default async function () {
    const input = await readInput()

    const head: Position = { row: 0, column: 0 }
    let tail: Position = { row: 0, column: 0 }

    const positionsVisited: Position[] = []

    for (const line of input) {
        const [direction, amount] = line

        for (let i = 0; i < amount; i++) {
            switch (direction) {
                case 'D':
                    head.row -= 1
                    break
                case 'U':
                    head.row += 1
                    break
                case 'L':
                    head.column -= 1
                    break
                case 'R':
                    head.column += 1
                    break
            }

            const diff = {
                left: 0,
                right: 0,
                up: 0,
                down: 0,
            }

            const distanceLeftRight = head.column - tail.column
            const distanceUpDown = head.row - tail.row

            if (distanceLeftRight !== 0) {
                if (head.column > tail.column) {
                    diff.left = Math.abs(distanceLeftRight)
                } else {
                    diff.right = Math.abs(distanceLeftRight)
                }
            }

            if (distanceUpDown !== 0) {
                if (head.row > tail.row) {
                    diff.down = Math.abs(distanceUpDown)
                } else {
                    diff.up = Math.abs(distanceUpDown)
                }
            }

            const newPosition: Position = { row: tail.row, column: tail.column }
            switch (true) {
                case diff.down > 1:
                    newPosition.row += diff.down - 1
                    if (diff.left > 0) newPosition.column += diff.left
                    if (diff.right > 0) newPosition.column -= diff.right
                    break
                case diff.up > 1:
                    newPosition.row -= diff.up - 1
                    if (diff.left > 0) newPosition.column += diff.left
                    if (diff.right > 0) newPosition.column -= diff.right
                    break
                case diff.left > 1:
                    newPosition.column += diff.left - 1
                    if (diff.up > 0) newPosition.row -= diff.up
                    if (diff.down > 0) newPosition.row += diff.down
                    break
                case diff.right > 1:
                    newPosition.column -= diff.right - 1
                    if (diff.up > 0) newPosition.row -= diff.up
                    if (diff.down > 0) newPosition.row += diff.down
                    break
            }

            if (
                !positionsVisited.find(
                    it => it.column === newPosition.column && it.row === newPosition.row
                )
            ) {
                positionsVisited.push(newPosition)
            }

            tail = newPosition
        }
    }

    return positionsVisited.length
}
