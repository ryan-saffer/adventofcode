import { Position, readInput } from './common'

export default async function () {
    const input = await readInput()

    const knots: Position[] = []
    for (let i = 0; i < 10; i++) {
        knots.push({ row: 0, column: 0 })
    }

    const head = knots[0]

    const positionsVisited: { [key: string]: boolean } = {}

    for (let lineNumber = 0; lineNumber < input.length; lineNumber++) {
        const [direction, amount] = input[lineNumber]

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

            for (let knot = 1; knot < 10; knot++) {
                const knotAhead = knots[knot - 1]
                const currentKnot = knots[knot]

                const diff = {
                    left: 0,
                    right: 0,
                    up: 0,
                    down: 0,
                }

                const distanceLeftRight = knotAhead.column - currentKnot.column
                const distanceUpDown = knotAhead.row - currentKnot.row

                if (distanceLeftRight !== 0) {
                    if (knotAhead.column > currentKnot.column) {
                        diff.left = Math.abs(distanceLeftRight)
                    } else {
                        diff.right = Math.abs(distanceLeftRight)
                    }
                }

                if (distanceUpDown !== 0) {
                    if (knotAhead.row > currentKnot.row) {
                        diff.down = Math.abs(distanceUpDown)
                    } else {
                        diff.up = Math.abs(distanceUpDown)
                    }
                }

                const newPosition: Position = {
                    row: currentKnot.row,
                    column: currentKnot.column,
                }
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

                if (knot === 9) {
                    if (!positionsVisited[`${newPosition.row}.${newPosition.column}`]) {
                        positionsVisited[`${newPosition.row}.${newPosition.column}`] =
                            lineNumber === 0
                    }
                }

                knots[knot] = newPosition
            }
        }
        console.log(`\n== ${direction} ${amount} ==\n`)
        printKnots(knots)
    }

    printTailPositions(positionsVisited)

    return Object.keys(positionsVisited).length
}

function printKnots(positions: Position[]) {
    for (let i = 15; i >= -5; i--) {
        let output = ''
        for (let j = -11; j <= 14; j++) {
            let char = '.'
            positions.forEach((it, idx) => {
                if (it.row === i && it.column === j) {
                    char = `${idx === 0 ? 'H' : idx}`
                    return
                }
            })
            output += char
        }
        console.log(output)
    }
}

function printTailPositions(positions: { [key: string]: boolean }) {
    let lowestRow: number | undefined = undefined
    let highestRow: number | undefined = undefined
    let lowestCol: number | undefined = undefined
    let highestCol: number | undefined = undefined

    const positionsArr: { isStart: boolean; val: number[] }[] = []
    Object.keys(positions).map(position => {
        const [row, col] = position.split('.').map(it => parseInt(it))

        if (!lowestRow || row < lowestRow) {
            lowestRow = row
        }
        if (!highestRow || row > highestRow) {
            highestRow = row
        }
        if (!lowestCol || col < lowestCol) {
            lowestCol = col
        }
        if (!highestCol || col > highestCol) {
            highestCol = col
        }
        positionsArr.push({ isStart: positions[position], val: [row, col] })
    })

    for (let i = highestRow!; i >= lowestRow!; i--) {
        let output = ''
        for (let j = lowestCol!; j <= highestCol!; j++) {
            const position = positionsArr.find(it => it.val[0] === i && it.val[1] === j)
            if (position) {
                output += position.isStart ? 's' : '#'
            } else {
                output += '.'
            }
        }
        console.log(output)
    }
}
