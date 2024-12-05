const fs = require('fs')

const file = fs.readFileSync('inputs/day5.txt', 'utf8')

console.log('valid sum, invalid sum: ', sumOfMiddleNumsOfValidUpdates(file))

function sumOfMiddleNumsOfValidUpdates(raw: string) {
    const [rawOrders, rawUpdates] = raw.split('\n\n')
    const orders = new Map()
    rawOrders.split('\n')
        .map(a => a.split('|'))
        .forEach(([key, value]) => orders.set(key, [...orders.get(key) ?? [], value]))
    const updates = rawUpdates.split('\n').map(a => a.split(','))
    
    let validSum = 0
    let invalidSum = 0

    for (const update of updates) {
        const mid = (update.length - 1) / 2
        if (isValid(update, orders)) {
            validSum += parseInt(update[mid], 10)
        } else {
            const fixed = makeValid(update, orders)
            invalidSum += parseInt(fixed[mid], 10)
        }
    }

    return [validSum, invalidSum]
}

function isValid(update: string[], orders: Map<string, string>) {
    const seen = new Set()
    for (const page of update) {
        for (const predecessor of orders.get(page) ?? []) {
            if (seen.has(predecessor)) return false
        }
        seen.add(page)
    }
    return true
}

function makeValid(update: string[], orders: Map<string, string>) {
    const pageToIndex = new Map()
    for (let i = 0; i < update.length; i++) {
        const page = update[i]
        
        for (const predecessor of orders.get(page) ?? []) {
            if (pageToIndex.has(predecessor)) {
                const tmp = update[i]
                update[i] = predecessor
                update[pageToIndex.get(predecessor)] = tmp
                return makeValid(update, orders)
            }
        }
        pageToIndex.set(page, i)
    }
    return update
}