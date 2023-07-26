import {
	Hand,
	HandScoreMap,
	OpponentHandMap,
	Result,
	ResultScoreMap,
	SecondCol,
	readStrategy,
} from './common'

const RequiredOutcomeMap: { [Key in SecondCol]: Result } = {
	X: 'LOSE',
	Y: 'DRAW',
	Z: 'WIN',
} as const

export default async function () {
	const input = await readStrategy()

	let score = 0

	input.forEach(([opponentKey, myRequiredMoveKey]) => {
		const opponentHand = OpponentHandMap[opponentKey]
		const requiredResult = RequiredOutcomeMap[myRequiredMoveKey]

		const requiredMove = calculateRequiredMove(opponentHand, requiredResult)

		score += ResultScoreMap[requiredResult] + HandScoreMap[requiredMove]
	})

	return score
}

function calculateRequiredMove(opponentHand: Hand, requiredResult: Result) {
	if (requiredResult === 'DRAW') return opponentHand

	if (requiredResult === 'WIN') {
		switch (opponentHand) {
			case 'ROCK':
				return 'PAPER'
			case 'PAPER':
				return 'SCISSORS'
			case 'SCISSORS':
				return 'ROCK'
		}
	}

	if (requiredResult === 'LOSE') {
		switch (opponentHand) {
			case 'ROCK':
				return 'SCISSORS'
			case 'PAPER':
				return 'ROCK'
			case 'SCISSORS':
				return 'PAPER'
		}
	}

	throw new Error('unreachable')
}
