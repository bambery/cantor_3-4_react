import Fraction from './fraction'
import Interval from './interval'
import { IntervalRangeError } from '../shared/errors'
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
        if(!type(interval) === 'Interval'){
            throw new TypeError(`Can only add Intervals, you passed a ${type(interval)}.`)
        } else if ( this.collection.length > 0 && interval.left.lessThan(this.collection[this.collection.length - 1].right) ) {
            throw new IntervalRangeError(`intervals must appear in order from left to right, starting at a minimum 0/1 and ending at a maximum of 1/1. The last endpoint of the interval collection is ${this.collection[this.collection.length - 1].right.str} and you attempted to append an interval starting at ${interval.left.str}, which is not allowed.`)
        }

    //needs check to make sure the new interval's LHS endpoint is greater than the last item in the array's RHS endpoint
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

    // the smallest division of a line segment required to represent all of the intervals in the collection, ie 1 over the lcm of the denominators of the endpoints
    // eg: given [ 1/2, 3/5, 9/20 ], the smallest fractional unit is 1/20
    // eg: given [ 1/5, 3/9, 4/7], the smallest fractional unit is 1/315
    smallestInterval() {

        let denominators = []

        this.collection.forEach( interval => {
            denominators.push(interval.left.den)
            denominators.push(interval.right.den)
        })

        return new Fraction(1, lcm(denominators))
    }

    // convert all fractions to use a common denominator - used for display purposes
    commonDen() {
        // this function assumes that the smallest interval will have a 1 in the numerator - always true for 3/4, unusre if true for others
        let smallestDen = this.smallestInterval().den
        let common = this.collection.map( interval => {
            const Lmultiple     = smallestDen / interval.left.den
            const Rmultiple     = smallestDen / interval.right.den
            const newLeft       = new Fraction(interval.left.num * Lmultiple, interval.left.den * Lmultiple)
            const newRight      = new Fraction(interval.right.num * Rmultiple, interval.right.den * Rmultiple)

            const tempSeg = new Interval(newLeft, newRight)
            return tempSeg
        })
        return common
    }
}

// input: array of one or more Line Segments
class IntervalCollection {
    #myIntervals

    // pass the gaps or intervals arr (or any arr of intervals), returns an array of the segments converted to the lowest common denominator
    constructor( intervalsArrArg ){
        try {
            checkArrContents(intervalsArrArg, 'Interval')
        } catch(e) {
            throw e
        }

        this.#myIntervals = new IntervalArr(intervalsArrArg)
        // count of intervals in the collection
        this.count = this.#myIntervals.collection.length
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

    smallestInterval() {
        return this.#myIntervals.smallestInterval()
    }

    concat_(intervalArr) {
        this.#myIntervals.all.concat_(intervalArr)
    }
}
export default IntervalCollection

if(process.env['NODE_ENV'] === 'test') {
    exports.IntervalArr = IntervalArr
}
