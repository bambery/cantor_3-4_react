import Fraction from '../models/fraction'
import Interval from '../models/interval'
import IntervalCollection from '../models/interval_collection'

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
// remove_interval
// ***** will not handle removal of adjacent intervals at the moment
// given:   an interval - myint,
//          array of integers representing the numbered segments to remove - toRem
//              (each integer must be greater than 1 and less than the common denominator [exclude end segments])
//
//  1. result = []
//  2. let fooL = myint.left
//  3. while toRem is not empty
//  4.      pop p off of toRem
//  5.      let fooR = Frac(p-1, den)
//  6.      let bar = Interval(fooL, fooR)
//  7       result.push(bar)
//  8.      let fooL = Frac(p, den)
//  9. when toRem is empty
//  10. let fooR = Frac(fooL, myint.right)
//

function removeInterval(interval, toRemove){
    let result = []
    let pointL = interval.left
    let commonInt = interval.commonDen()
    let commonDen = commonInt.left.den
    //
    // at this point, need to check that the numbers in the array are valid
    // need to check if any numbers are sequential. If so, combine the segments into one gap
    while(toRemove.length > 0){
        let segNum = toRemove.shift()

        let pointR = new Fraction(segNum - 1, commonDen)
        let newInt = new Interval(pointL, pointR)
        results.push(newInt)
        let pointL = new Fraction(segNum, commonDen)
    }

    return result
}
