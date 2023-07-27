import { calculateDirectorySize, readInput } from './common'

export default async function () {
    const root = await readInput()

    const TOTAL_SPACE = 70_000_000
    const MINIMUM_SPACE = 30_000_000

    const { total, directorySizes } = calculateDirectorySize(root)

    const availableSpace = TOTAL_SPACE - total
    const spaceNeeded = MINIMUM_SPACE - availableSpace

    let smallest: number | undefined = undefined
    for (const size of directorySizes) {
        if (size > spaceNeeded && (smallest === undefined || size < smallest)) {
            smallest = size
        }
    }

    if (!smallest) return 'not possible'
    return smallest
}
