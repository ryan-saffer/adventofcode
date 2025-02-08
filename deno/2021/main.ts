function isLowPoint(data: string[], x: number, y: number) {
	const height = parseInt(data[x][y])
	const rowCount = data.length
	const colCount = data[0].length

	let isLowPoint = true

	// left edge
	if (y !== 0) isLowPoint &&= parseInt(data[x][y - 1]) > height
	// right edge
	if (y !== rowCount - 1) isLowPoint &&= parseInt(data[x][y + 1]) > height
	// top edge
	if (x !== 0) isLowPoint &&= parseInt(data[x - 1][y]) > height
	// bottom edge
	if (x !== colCount - 1) isLowPoint &&= parseInt(data[x + 1][y]) > height

	return isLowPoint
}

function findBasin(
	data: string[],
	travelled: number[][],
	x: number,
	y: number,
	basinSize = 0
) {
	const rowCount = data.length
	const colCount = data[0].length

	if (travelled[x][y] !== 0 || data[x][y] === '9') {
		travelled[x][y] = 1
		return { travelled, basinSize }
	}

	travelled[x][y] = 1
	basinSize += 1

	let result = { travelled, basinSize }

	// left edge
	if (y !== 0 && result.travelled[x][y - 1] === 0)
		result = findBasin(data, result.travelled, x, y - 1, result.basinSize)

	// right edge
	if (y !== colCount - 1 && result.travelled[x][y + 1] === 0)
		result = findBasin(data, result.travelled, x, y + 1, result.basinSize)

	// top edge
	if (x !== 0 && result.travelled[x - 1][y] === 0)
		result = findBasin(data, result.travelled, x - 1, y, result.basinSize)

	// bottom edge
	if (x !== rowCount - 1 && result.travelled[x + 1][y] === 0)
		result = findBasin(data, result.travelled, x + 1, y, result.basinSize)

	return result
}

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
	const data = await Deno.readTextFile('data.txt')
	const dataArray = data.trim().split('\n')

	let riskLevel = 0
	for (let x = 0; x < dataArray.length; x++) {
		for (let y = 0; y < dataArray[x].length; y++) {
			if (isLowPoint(dataArray, x, y)) riskLevel += parseInt(dataArray[x][y]) + 1
		}
	}

	let _travelled = new Array(dataArray.length)
		.fill(0)
		.map(() => new Array(dataArray[0].length).fill(0))
	const basinSizes = []
	for (let x = 0; x < dataArray.length; x++) {
		for (let y = 0; y < dataArray[x].length; y++) {
			const { travelled, basinSize } = findBasin(dataArray, _travelled, x, y)
			_travelled = travelled

			if (basinSize > 0) {
				basinSizes.push(basinSize)
			}
		}
	}

	const largestThreeMultiplied = basinSizes
		.sort((a, b) => (a < b ? 1 : a > b ? -1 : 0))
		.slice(0, 3)
		.reduce((acc, curr) => acc * curr, 1)

	console.log('- - - - - - - - - - - - - - - - -')
	console.log('Part 1:', riskLevel)
	console.log('Part 2:', largestThreeMultiplied)
	console.log('- - - - - - - - - - - - - - - - -')
}
