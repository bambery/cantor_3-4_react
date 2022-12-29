import Fraction from '../models/fraction'
import Interval from '../models/interval'
import IntervalCollection from '../models/interval_collection'
import { ValueError } from './errors'
import { lcm } from './utils'

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

export function removeIntervals(interval, numSegments, toRemove){
    if(toRemove.includes(1) || toRemove.includes(numSegments)){
        throw new ValueError(`Cannot remove the first or last segment in an interval: you asked to remove ${toRemove}`)
    }

    // sort desc
    toRemove.sort( (a,b) => b - a )

    // TODO need to add check for adjacent segments, add if found
    let commonInt = interval.commonDen()
    commonInt = commonInt.commonDen(commonInt.left.den * numSegments)
    let cDen = commonInt.left.den
    let toRemoveInt = toRemove.map( seg => new Interval(new Fraction(commonInt.left.num + seg - 1, cDen), new Fraction(commonInt.left.num + seg, cDen)) )
    let result = [commonInt]

    // need to check if any numbers are sequential. If so, combine the segments into one gap
    while(toRemoveInt.length > 0){
        let curr = result.pop()
        if(curr === undefined){
            throw new Error('u messed up')
        }
        let seg = toRemoveInt.pop()
        result = result.concat(curr.subtract(seg))
    }

    return result
}
