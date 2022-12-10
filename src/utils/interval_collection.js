import Fraction from './fraction'
import Interval from './interval'

class IntervalArr {
    constructor( intervalArrArg ) {
        this.collection = intervalArrArg
    }

    smallestInterval() {
            let smallest = this.intervals.reduce((acc, curr) => acc.len - curr.len < 0 ? acc : curr, new Fraction)
            return smallest.len
        }

}

// input: array of one or more Line Segments
class IntervalCollection {

    // pass the gaps or intervals arr (or any arr of intervals), returns an array of the segments converted to the lowest common denominator
    static commonDen() {
        const interval = 

    }

    constructor( intervalsArrArg ){
        this.intervals = intervalsArrArg
        this.count = this.intervals.length
        this.len = this.intervals.reduce((acc, curr) => acc.add(curr.len), new Fraction(0,1))
    }


    get gapLen() {
        return (new Fraction).subtract(this.len)
    }

    get gaps() {
        const g = []
        for ( let i = 0; i < this.count - 1; i++) {
            g.push(new Interval( this.intervals[i].right, this.intervals[i+1].left))
        }
        return g
    }

    smallestInterval() {
        let smallest = this.intervals.reduce((acc, curr) => acc.len - curr.len < 0 ? acc : curr, new Fraction)
        return smallest.len
    }

    concat_(intervalArr) {
        this.intervals.concat(intervalArr)
        return this
    }


}
export default IntervalCollection
