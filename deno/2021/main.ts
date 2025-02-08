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
	basinSize: number,
	prevHeight = 9
) {
	const rowCount = data.length
	const colCount = data[0].length

	console.log('Checking:', x, y)

	travelled[x][y] = 1
	const height = parseInt(data[x][y])

	if (height === 9 || height > prevHeight) {
		console.log("Found a 9 or basin's edge")
		return { travelled, basinSize }
	}

	basinSize += 1
	// left edge
	if (y !== 0 && travelled[x][y - 1] === 0)
		return findBasin(data, travelled, x, y - 1, height, basinSize)
	// right edge
	if (y !== colCount - 1 && travelled[x][y + 1] === 0)
		return findBasin(data, travelled, x, y + 1, height, basinSize)
	// top edge
	if (x !== 0 && travelled[x - 1][y] === 0)
		return findBasin(data, travelled, x - 1, y, height, basinSize)
	// bottom edge
	if (x !== rowCount - 1 && travelled[x + 1][y] === 0)
		return findBasin(data, travelled, x + 1, y, height, basinSize)

	return { travelled, basinSize }
}

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
	// const data = await Deno.readTextFile('data.txt')
	// const dataArray = data.trim().split('\n')
	const dataArray = [
		'2199943210',
		'3987894921',
		'9856789892',
		'8767896789',
		'9899965678',
	]
	let _travelled = new Array(dataArray.length)
		.fill(0)
		.map(() => new Array(dataArray[0].length).fill(0))
	let _basinSize = 0
	let basinCount = 0

	// let riskLevel = 0
	// for (let x = 0; x < dataArray.length; x++) {
	// 	for (let y = 0; y < dataArray[x].length; y++) {
	// 		if (isLowPoint(dataArray, x, y)) riskLevel += parseInt(dataArray[x][y]) + 1
	// 	}
	// }

	for (let x = 0; x < dataArray.length; x++) {
		for (let y = 0; y < dataArray[x].length; y++) {
			const { travelled, basinSize } = findBasin(
				dataArray,
				_travelled,
				x,
				y,
				_basinSize
			)
			_travelled = travelled
			_basinSize = basinSize

			if (_basinSize > 0) {
				console.log('Found Basin:', travelled)
				basinCount++
				_basinSize = 0
			}
		}
	}

	// const basinResult = findBasin(dataArray, _travelled, 0, 0, 0)
	console.log({ result: basinCount })

	console.log('- - - - - - - - - - - - - - - - -')
	// console.log('Total Risk Level: ', riskLevel)
	console.log('- - - - - - - - - - - - - - - - -')
}
