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
export default class Cantor {
    #iterCount
    constructor( numSegments, toRemove, numIterations ){
        if(toRemove.includes(1) || toRemove.includes(numSegments)){
            throw new ValueError(`Cannot remove the first or last segment in an interval: you asked to remove ${toRemove}`)
        } else {
            toRemove.sort( (a,b) => a-b )
        }
        this.numSegments = numSegments
        this.toRemove = toRemove
        this.#iterCount = 0
        this.iterations = []
//        this.iterationsGaps = []

        let results = []
        //let resultGaps = []
        let iterResults = []
        //let iterGaps = []
        let myCollection = new IntervalCollection([Interval.unit])

        while(numIterations > 0){
            myCollection.forEach( interval => {
             //   let [res, gaps] = removeIntervalsFrom(interval, this.numSegments, this.toRemove)
                let res = this.removeIntervalsFrom(interval)
                iterResults = iterResults.concat(res)
                //iterGaps = iterGaps.concat(gaps)
            })
            results.push(new IntervalCollection(iterResults))
            //resultGaps.push(new IntervalCollection(iterGaps))
            iterResults = []
            // iterGaps = []
            myCollection = results[results.length - 1]
            numIterations -= 1
            this.#iterCount += 1
        }

        this.iterations = results
    }

    get numIter(){
        return this.iterations.length
    }

    // inputs:
    //  interval: the Interval to remove from
    //  segmentLength: the measure of 1/this.numSegments for this interval
    //  segNum: array containing the 1-index of the segments to remove
    // returns:
    //  An array of Intervals to remove
    convertSegmentsToIntervals(interval, segmentLength, segNum){
        let curr = []
        let intervals = []

        for(let i = 0; i < segNum.length; i++){
            if(i !== segNum.length - 1 && segNum[i] + 1 === segNum[i + 1]){
            // numbers are sequential
                curr.push(segNum[i])
            } else if ( curr.length > 0 ){
            // the following digit is not sequential, but the current digit is the end of a sequential string of digits
                debugger

                let newInterval = new Interval( new Fraction(interval.left.num + ((curr.shift() - 1) * segmentLength.num), segmentLength.den), new Fraction(interval.left.num + (segNum[i] * segmentLength.num),segmentLength.den) )
                intervals.push(newInterval)
                curr = []
            } else {
            // current digit is not part of any sequential string
                debugger
                let newInterval = new Interval( new Fraction(interval.left.num + ((segNum[i] - 1) * segmentLength.num), segmentLength.den), new Fraction(interval.left.num + (segNum[i] * segmentLength.num), segmentLength.den))
                intervals.push(newInterval)
            }
        }

        return intervals
    }

    // arguments:
    //  interval - the interval to have segments removed from
    // returns:
    //  array of Intervals, minus the intervals to be removed
    removeIntervalsFrom(interval){
        let commonInt = interval.commonDen()
        commonInt = commonInt.commonDen(commonInt.left.den * this.numSegments)
        let segmentLength = commonInt.len.equals(Fraction.unit)
            ? new Fraction(1, this.numSegments)
            : new Fraction(commonInt.len.num, commonInt.len.den * this.numSegments)
        debugger

        let toRemoveInt = this.convertSegmentsToIntervals(commonInt, segmentLength, this.toRemove)
        //let gaps = [...toRemoveInt]
        let result = [commonInt]

        while(toRemoveInt.length > 0){
            let curr = result.pop()
            if(curr === undefined){
                throw new Error('u messed up')
            }
            let seg = toRemoveInt.shift()
            result = result.concat(curr.subtract(seg))
        }
        //return [result, gaps]
        return result
    }

    runOneIteration(){
        let iterResults = []
        let intCollection = this.iterations[this.iterations.length - 1]
        intCollection.forEach( interval => {
            let res = this.removeIntervalsFrom(interval, this.numSegments, this.toRemove)
            iterResults = iterResults.concat(res)
        })
        //let [res, gaps] = removeIntervalsFrom(interval, this.numSegments, this.toRemove)
        this.iterations.push(iterResults)
        this.#iterCount += 1

        return iterResults
    }
}
