import Fraction from './fraction'
import Interval from './interval'
import { IntervalRangeError, ValueError } from '../shared/errors'
import { lcm, type, checkArrContents } from '../shared/utils'

class IntervalArr {

    constructor( intervalArrArg ) {
        try {
            checkArrContents(intervalArrArg, 'Interval')
        } catch (e) {
            throw e
        }

        this.collection = intervalArrArg
    }

    get all() {
        return this.collection
    }

    push_(interval){
        if(type(interval) !== 'Interval'){
            debugger
            throw new ValueError(`Can only add Intervals, you passed a ${type(interval)}.`)
        } else if ( this.collection.length > 0 && interval.left.lessThan(this.collection[this.collection.length - 1].right) ) {
            throw new IntervalRangeError(`intervals must appear in order from left to right, starting at a minimum 0/1 and ending at a maximum of 1/1. The last endpoint of the interval collection is ${this.collection[this.collection.length - 1].right.str} and you attempted to append an interval starting at ${interval.left.str}, which is not allowed.`)
        }
        this.collection.push(interval)
    }

    concat_(intervalArr) {
        checkArrContents(intervalArr, 'Interval')
        try {
            intervalArr.forEach( inter => this.push_(inter) )
        } catch(e) {
            throw e
        }
    }

    // convert all fractions to use a common denominator - used for display purposes
    commonDen() {
        let denominators = []

        this.collection.forEach( interval => {
            denominators.push(interval.left.den)
            denominators.push(interval.right.den)
        })

        let smallestDen = lcm(denominators)

        let common = this.collection.map( interval => {
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

// input: array of one or more Line Segments
class IntervalCollection {
    #myIntervals

    // pass the gaps or intervals arr (or any arr of intervals)
    constructor( intervalsArrArg ){
        checkArrContents(intervalsArrArg, 'Interval')

        this.#myIntervals = new IntervalArr(intervalsArrArg)
        // count of intervals in the collection
        this.count = this.#myIntervals.collection.length
        this.str = `{IntervalCollection - count: ${this.count}, collection: ${this.intervals.all.map(interval => interval.str)}}`
    }

    get intervals() {
        return this.#myIntervals
    }

    // total length of all intervals in collection
    get len() {
        return this.intervals.all.reduce((acc, curr) => acc.add(curr.len), new Fraction(0,1))
    }

    // total length of all gaps in this collection
    get gapLen() {
        return (Fraction.unit).subtract(this.len)
    }

    get gaps() {
        const g = new IntervalArr([])
        for ( let i = 0; i < this.count - 1; i++) {
            g.push_(new Interval( this.intervals.all[i].right, this.intervals.all[i+1].left))
        }
        return g
    }

    concat_(intervalArr) {
        this.#myIntervals.all.concat_(intervalArr)
    }

    forEach(cb) {
        for(let i = 0; i < this.count; i+=1){
            cb(this.#myIntervals.all[i], i, this)
        }
    }
}

export default IntervalCollection

/* istanbul ignore if */
if(process.env['NODE_ENV'] === 'test') {
    exports.IntervalArr = IntervalArr
}
