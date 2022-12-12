import Fraction from './fraction'
import Interval from './interval'
import {lcm, type, checkArrContents} from '../shared/utils'

class IntervalArr {

    constructor( intervalArrArg ) {
        if(!Array.isArray(intervalArrArg)){
            throw new TypeError("must pass an array of line segments to new IntervalArr")
            return null
        }

        this.collection = intervalArrArg
    }

    get all() {
        return this.collection
    }

    push_(interval){
        if(!type(interval) === "Interval"){
            throw new TypeError(`Can only add Intervals, you passed a ${type(interval)}.`)
        }
        this.collection.push(interval)
    }

    concat(intervalArr) {
        checkArrContents(intervalArr, "Interval")
        this.collection.concat(intervalArr)
    }

    // the smallest division of a line segment required to represent all of the intervals in the collection
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
        // smallest den = the denominator for the smallest interval
        let smallestDen = this.smallestInterval().den
        let common = this.collection.map( interval => {
            const Lmultiple     = smallestDen / interval.left.den;
            const Rmultiple     = smallestDen / interval.right.den;
            const newLeft       = new Fraction(interval.left.num * Lmultiple, interval.left.den * Lmultiple);
            const newRight      = new Fraction(interval.right.num * Rmultiple, interval.right.den * Rmultiple);

            const tempSeg = new Interval(newLeft, newRight);
            return tempSeg
        })
        return common
    }
}

// input: array of one or more Line Segments
class IntervalCollection {

    // pass the gaps or intervals arr (or any arr of intervals), returns an array of the segments converted to the lowest common denominator
    #myIntervals

    constructor( intervalsArrArg ){
        checkArrContents(intervalsArrArg, "Interval")

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
        return (new Fraction).subtract(this.len)
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

    concat(intervalArr) {
        this.#myIntervals.all.concat(intervalArr)
    }
}
export default IntervalCollection
