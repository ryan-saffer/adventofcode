import { findStart, readInput } from './common'

export default async function () {
    return findStart(await readInput(), 14)
}
