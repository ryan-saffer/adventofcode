import { readFile } from 'fs/promises'

type Directory = {
    type: 'dir'
    name: string
    parent: Directory | null
    children: (Directory | File)[]
}

type File = { type: 'file'; filename: string; size: number }

export async function readInput() {
    const input = (await readFile('./src/2022/day7/input.txt')).toString().split('\n')

    const root: Directory = { type: 'dir', name: '/', parent: null, children: [] }

    let currentDirectory = root

    for (const line of input) {
        if (line.startsWith('$')) {
            const command = line.split(' ')[1]
            if (command === 'cd') {
                const path = line.split(' ')[2]
                if (path === '/') {
                    continue
                } else if (path === '..') {
                    currentDirectory = currentDirectory.parent!
                    continue
                }

                currentDirectory = currentDirectory.children.find(
                    it => it.type === 'dir' && it.name === path
                ) as Directory
            }
        } else if (line.startsWith('dir')) {
            currentDirectory.children.push({
                type: 'dir',
                parent: currentDirectory,
                name: line.split(' ')[1],
                children: [],
            })
        } else {
            currentDirectory.children.push({
                type: 'file',
                filename: line.split(' ')[1],
                size: parseInt(line.split(' ')[0]),
            })
        }
    }

    return root
}

export function calculateDirectorySize(
    directory: Directory,
    directorySizes: number[] = []
) {
    let total = 0
    directory.children.forEach(child => {
        if (child.type === 'file') {
            total += child.size
        }
        if (child.type === 'dir') {
            const { total: subtotal } = calculateDirectorySize(child, directorySizes)
            directorySizes.push(subtotal)
            total += subtotal
        }
    })
    return { total, directorySizes }
}
