import { count } from './common'

export default function () {
    return count(
        (firstStart, firstEnd, secondStart, secondEnd) =>
            (firstStart <= secondStart && firstEnd >= secondStart) ||
            (secondStart <= firstStart && secondEnd >= firstStart)
    )
}
