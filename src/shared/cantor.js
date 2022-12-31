import Fraction from '../models/fraction'
import Interval from '../models/interval'
import IntervalCollection from '../models/interval_collection'
import { ValueError } from './errors'

// cantor3_4
// 0. given n number of iterations
// 1. create "mycol" IntervalCollection with 1 interval from 0/1 to 1/1
// 2. create empty "results" IntervalCollection
// 3. while iterations > 0
// 4.   "currResults" Array = []
// 5.   for each Interval in mycol
// 6.       call function (remove third) that returns two new Intervals, wwhich get pushed to currResults
// 7.   create "myCol" IntervalCollection passing currResults as argument
// 8.   push myCol to results to save the step for display later
// 9.   bump counter
//
//

// returns an array of IntervalCollections, where each IntervalCollection is one iteration of Cantor
class Cantor {
    #iterCount
    constructor( numSegments = 3, toRemove = [2], numIter = 1 ){
        if(toRemove.includes(1) || toRemove.includes(numSegments)){
            throw new ValueError(`Cannot remove the first or last segment in an interval: you asked to remove ${toRemove}`)
        }
        this.numSegments = numSegments
        this.toRemove = toRemove
        this.#iterCount = numIter
        this.iterations = []
    }

    get numIter(){
        return this.iterations.length
    }

}

function removeIntervals(){

    // sort asc
    toRemove.sort( (a,b) => a-b )

    let commonInt = interval.commonDen()
    commonInt = commonInt.commonDen(commonInt.left.den * numSegments)
    let cDen = commonInt.left.den
    let segmentLength = new Fraction(commonInt.length.num, cDen)

    //let toRemoveInt = toRemove.map( seg => new Interval(new Fraction(commonInt.left.num + seg - 1, cDen), new Fraction(commonInt.left.num + seg, cDen)) )
    let toRemoveInt = convertSegmentsToIntervals(commonInt, segmentLength, toRemove)
    debugger
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
            let newInterval = new Interval( new Fraction(interval.left.num + ((curr.shift() - 1) * segmentLength.num), segmentLength.den), new Fraction(interval.left.num + (segNum[i] * segmentLength.num),segmentLength.den) )
            intervals.push(newInterval)
            curr = []
        } else {
            // current digit is not part of any sequential string
            let newInterval = new Interval( new Fraction(interval.left.num + ((segNum[i] - 1) * segmentLength.num), segmentLength.den), new Fraction(interval.left.num + (segNum[i] * segmentLength.num), segmentLength.den))
            intervals.push(newInterval)
        }
    }

    return intervals
}

function runIterations(){
    let results = []
    let iterResults = []
    let myCollection = new IntervalCollection([Interval.unit])

    while(numIter > 0){
        myCollection.forEach( interval => {
            debugger
            let res = removeIntervals(interval, numSegments, toRemove)
            iterResults = iterResults.concat(res)
        })
        results.push(new IntervalCollection(iterResults))
        iterResults = []
        myCollection = results[results.length - 1]
        numIter = numIter - 1
    }
    return results
}

function removeIntervals(interval, numSegments, toRemove){
    if(toRemove.includes(1) || toRemove.includes(numSegments)){
        throw new ValueError(`Cannot remove the first or last segment in an interval: you asked to remove ${toRemove}`)
    }

    // sort asc
    toRemove.sort( (a,b) => a-b )

    let commonInt = interval.commonDen()
    commonInt = commonInt.commonDen(commonInt.left.den * numSegments)
    let cDen = commonInt.left.den

    //let toRemoveInt = toRemove.map( seg => new Interval(new Fraction(commonInt.left.num + seg - 1, cDen), new Fraction(commonInt.left.num + seg, cDen)) )
    let toRemoveInt = convertSegmentsToIntervals(commonInt, cDen, toRemove)
    debugger
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

if(process.env['NODE_ENV'] === 'test') {
    exports.removeIntervals = removeIntervals
}
