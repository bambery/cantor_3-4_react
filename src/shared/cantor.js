import Fraction from '../models/fraction'
import Interval from '../models/interval'
import IntervalCollection from '../models/interval_collection'
import { ValueError } from './errors'

// in case I ever decide to look into alternating the segments between iterations, I removed most of the utility functions from the class to keep the flexibility that was lost when everything was tied to an instance

// returns an array of IntervalCollections, where each IntervalCollection is one iteration of Cantor
export default class Cantor {
    constructor( numSegments = 3, toRemove = [2], numIter = 1 ){
        if(toRemove.includes(1) || toRemove.includes(numSegments)){
            throw new ValueError(`Cannot remove the first or last segment in an interval: you asked to remove ${toRemove}`)
        }
        toRemove = toRemove.sort( (a,b) => a-b )

        this.numSegments = numSegments
        this.toRemove = toRemove
        this.iterations = []

        // calculate the Cantor iterations
        let iterResults = []
        let myCollection = new IntervalCollection([Interval.unit])

        while(numIter > 0){
            myCollection.forEach( interval => {
                let res = removeIntervals(interval, numSegments, toRemove)
                iterResults = iterResults.concat(res)
            })
            this.iterations.push(new IntervalCollection(iterResults))
            iterResults = []
            myCollection = this.iterations[this.iterations.length - 1]
            numIter -= 1
        }
    }

    get numIter(){
        return this.iterations.length
    }

}

function removeIntervals(interval, numSegments, toRemove){
    if(toRemove.includes(1) || toRemove.includes(numSegments)){
        throw new ValueError(`Cannot remove the first or last segment in an interval: you asked to remove ${toRemove}`)
    }

    // sort asc
    toRemove.sort( (a,b) => a-b )

    let commonInt = interval.commonDen()
    commonInt = commonInt.commonDen(commonInt.left.den * numSegments)
    let segmentLength = commonInt.len.equals(Fraction.unit)
        ? new Fraction(1, numSegments)
        : new Fraction(commonInt.len.num, commonInt.len.den * numSegments)

    //let toRemoveInt = toRemove.map( seg => new Interval(new Fraction(commonInt.left.num + seg - 1, cDen), new Fraction(commonInt.left.num + seg, cDen)) )
    let toRemoveInt = convertSegmentsToIntervals(commonInt, segmentLength, toRemove)
    let result = [commonInt]

    while(toRemoveInt.length > 0){
        let curr = result.pop()
        if(curr === undefined){
            throw new Error('u messed up')
        }
        let seg = toRemoveInt.shift()
        result = result.concat(curr.subtract(seg))
    }

    return result
}


// returns the array of intervals to remove
function convertSegmentsToIntervals(interval, segmentLength, segNum){
    let curr = []
    let intervals = []

    for(let i = 0; i < segNum.length; i++){
        if(i !== segNum.length - 1 && segNum[i] + 1 === segNum[i + 1]){
            // numbers are sequential
            curr.push(segNum[i])
        } else if ( curr.length > 0 ){
            // the following digit is not sequential, but the current digit is the end of a sequential string of digits
            let newInterval = new Interval(
                interval.left.add(segmentLength.mult(curr.shift() - 1)),
                interval.left.add(segmentLength.mult(segNum[i]))
            )
           // let newInterval = new Interval( new Fraction(interval.left.num + ((curr.shift() - 1) * segmentLength.num), segmentLength.den), new Fraction(interval.left.num + (segNum[i] * segmentLength.num), segmentLength.den) )
            intervals.push(newInterval)
            curr = []
        } else {
            // current digit is not part of any sequential string
           // let newInterval = new Interval( new Fraction(interval.left.num + ((segNum[i] - 1) * segmentLength.num), segmentLength.den), new Fraction(interval.left.num + (segNum[i] * segmentLength.num), segmentLength.den))
            let newInterval = new Interval(
                interval.left.add(segmentLength.mult(segNum[i]-1)),
                interval.left.add(segmentLength.mult(segNum[i]))
            )
            intervals.push(newInterval)
        }
    }

    return intervals
}

if(process.env['NODE_ENV'] === 'test') {
    exports.removeIntervals = removeIntervals
}
