import { calculateDirectorySize, readInput } from './common'

export default async function () {
    const root = await readInput()

    const { directorySizes } = calculateDirectorySize(root)

    return directorySizes.reduce(
        (total, curr) => (curr <= 100_000 ? total + curr : total),
        0
    )
}
