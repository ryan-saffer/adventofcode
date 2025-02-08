import {
    Hand,
    HandScoreMap,
    OpponentHandMap,
    Result,
    ResultScoreMap,
    readStrategy,
    SecondCol,
    HandMap,
} from './common'

const MyHandMap: HandMap<SecondCol> = {
    X: 'ROCK',
    Y: 'PAPER',
    Z: 'SCISSORS',
}

export default async function () {
    const input = await readStrategy()

    let score = 0

    input.forEach(([opponentKey, myKey]) => {
        const opponentHand = OpponentHandMap[opponentKey]
        const myHand = MyHandMap[myKey]

        const result = calculateWinner(opponentHand, myHand)

        score += HandScoreMap[myHand] + ResultScoreMap[result]
    })

    return score
}

export function calculateWinner(opponentHand: Hand, yourHand: Hand): Result {
    if (opponentHand === yourHand) {
        return 'DRAW'
    }
    if (opponentHand === 'ROCK') {
        if (yourHand === 'SCISSORS') return 'LOSE'
        if (yourHand === 'PAPER') return 'WIN'
    }

    if (opponentHand === 'PAPER') {
        if (yourHand === 'ROCK') return 'LOSE'
        if (yourHand === 'SCISSORS') return 'WIN'
    }

    if (opponentHand === 'SCISSORS') {
        if (yourHand === 'PAPER') return 'LOSE'
        if (yourHand === 'ROCK') return 'WIN'
    }

    throw new Error('unreachable')
}
