import Fraction from './fraction'
import Interval from './interval'
import { IntervalSequenceError } from '../shared/errors'
import { lcm, checkArrContents } from '../shared/utils'

function checkSequence(intervalsArr){
    intervalsArr.forEach((interval, idx, arr) => {
        if( (idx !== arr.length - 1) && !(interval.lessThan(arr[idx + 1])) ){
            throw new IntervalSequenceError(`When building an IntervalCollection, the interval ${interval.str} cannot be followed by ${arr[idx+1].str}`)
        }
    })
}

// input: array of one or more Line Segments
class IntervalCollection {
    #myIntervals = []

    // pass the gaps or intervals arr (or any arr of intervals)
    constructor( intervalsArr ){
        if(intervalsArr !== undefined){
            checkArrContents(intervalsArr, Interval)
            checkSequence(intervalsArr)
            this.#myIntervals = intervalsArr
        }

        this.count = this.#myIntervals.length
        this.str = `{IntervalCollection - count: ${this.count}, tot len: ${this.len.str} collection: ${this.#myIntervals.map(interval => interval.str)}}`
    }

    get intervals() {
        return [...this.#myIntervals]
    }

    // total length of all intervals in collection
    get len() {
        return this.intervals.reduce((acc, curr) => acc.add(curr.len), new Fraction(0,1))
    }

    // total length of all gaps in this collection
    get gapLen() {
        return (Fraction.unit).subtract(this.len)
    }

    get gaps() {
        const g = []
        for ( let i = 0; i < this.count - 1; i++) {
            g.push(new Interval( this.intervals[i].right, this.intervals[i+1].left))
        }
        return g
    }

    forEach(cb) {
        for(let i = 0; i < this.count; i+=1){
            cb(this.#myIntervals[i], i, this)
        }
    }

    // convert all endpoints in the interval to a common denominator - used for display
    commonDen() {
        let denominators = []

        this.intervals.forEach( interval => {
            denominators.push(interval.left.den)
            denominators.push(interval.right.den)
        })

        let smallestDen = lcm(denominators)

        let common = this.intervals.map( interval => {
            const Lmultiple     = smallestDen / interval.left.den
            const Rmultiple     = smallestDen / interval.right.den
            const tempSeg = new Interval(
                new Fraction(interval.left.num * Lmultiple, interval.left.den * Lmultiple),
                new Fraction(interval.right.num * Rmultiple, interval.right.den * Rmultiple)
            )
            return tempSeg
        })
        return common
    }
}

IntervalCollection.prototype.toString = function icToString() { return this.str }

export default IntervalCollection

/* istanbul ignore next */
if(process.env['NODE_ENV'] === 'test') {
    exports.checkSequence = checkSequence
}
