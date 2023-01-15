import Fraction from './fraction'
import Interval from './interval'
import IntervalCollection from './interval_collection'
import { ValueError, ArgumentError } from '../shared/errors'
import { type, checkArrContents } from '../shared/utils'

// in case I ever decide to look into alternating the segments between iterations, I removed most of the utility functions from the class to keep the flexibility that was lost when everything was tied to an instance

// returns an array of IntervalCollections, where each IntervalCollection is one iteration of Cantor
export default class Cantor {
    constructor(numSegments, toRemove, numIter){
        if(
            type(numSegments) !== 'number'
            || !( type(toRemove) === 'Array' && checkArrContents(toRemove, 'number') )
            || type(numIter) !== 'number'
        ){
            throw new ArgumentError(`Invalid arguments passed to new - numSegments: ${numSegments}, toRemove: ${toRemove}, numIter: ${numIter}`)
        } else if(toRemove.includes(1) || toRemove.includes(numSegments)){
            throw new ValueError(`Cannot remove the first or last segment in an interval: you asked to remove ${toRemove}`)
        }

        toRemove = toRemove.sort( (a,b) => a-b )

        this.numSegments = numSegments
        this.toRemove = toRemove
        this.iterations = []

        // calculate the Cantor iterations
        let myCollection = new IntervalCollection([Interval.unit])

        while(numIter > 0){
            this.performOneIteration(myCollection)
            myCollection = this.iterations[this.iterations.length - 1]
            numIter -= 1
        }
    }

    get numIter(){
        return this.iterations.length
    }

    performOneIteration(intCol) {
        if(type(intCol) !== 'IntervalCollection'){
            throw new Error('huh')
        }
        let iterResults = []
        intCol.forEach( interval => {
            let res = removeIntervals(interval, this.numSegments, this.toRemove)
            iterResults = iterResults.concat(res)
        })
        this.iterations.push(new IntervalCollection(iterResults))
    }
}


function removeIntervals(interval, numSegments, toRemove){
    if(toRemove.includes(1) || toRemove.includes(numSegments)){
        throw new ValueError(`Cannot remove the first or last segment in an interval: you asked to remove ${toRemove}`)
    }

    // sort asc
    toRemove.sort( (a,b) => a-b )

    try {
        interval.commonDen()
    } catch(e){
        e.message = `Integer overflow: inside removeIntervals, trying to compute the common den of the interval ${interval}`
        throw e
    }

    let commonInt = interval.commonDen()
    if(commonInt.left.den % numSegments !== 0){

        try {
            commonInt.commonDen(commonInt.left.den * numSegments)
        } catch(e){
            e.message = `Integer overflow: inside removeIntervals, trying to compute the common den of the interval ${commonInt} with ${commonInt.left.den} and ${numSegments}`
            throw e
        }
        commonInt = commonInt.commonDen(commonInt.left.den * numSegments)
    }
    const segmentLength = commonInt.len.equals(Fraction.unit)
        ? new Fraction(1, numSegments)
        : new Fraction(commonInt.len.num, commonInt.len.den * numSegments)

    const toRemoveInt = convertSegmentsToIntervals(commonInt, segmentLength, toRemove)
    let result = [commonInt]

    while(toRemoveInt.length > 0){
        let curr = result.pop()
        let seg = toRemoveInt.shift()
        result = result.concat(curr.subtract(seg))
    }

    return result
}


// Given a list of the 1-based index of the segments to remove and the Interval to remove them from, returns an array of Intervals to remove.
// Will combine sequential segments into one large segment
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
            intervals.push(newInterval)
            curr = []
        } else {
            // current digit is not part of any sequential string
            let newInterval = new Interval(
                interval.left.add(segmentLength.mult(segNum[i]-1)),
                interval.left.add(segmentLength.mult(segNum[i]))
            )
            intervals.push(newInterval)
        }
    }

    return intervals
}

/* istanbul ignore next */
if(process.env['NODE_ENV'] === 'test') {
    exports.removeIntervals = removeIntervals
    exports.convertSegmentsToIntervals = convertSegmentsToIntervals
}
