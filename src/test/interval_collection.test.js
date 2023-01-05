import IntervalCollection from '../models/interval_collection'
import Interval from '../models/interval'
import Fraction from '../models/fraction'
import { checkSequence } from '../models/interval_collection'
import { type, checkArrContents } from '../shared/utils'
import { IntervalRangeError, ValueError, IntervalSequenceError } from '../shared/errors'

window.type = type

let sampleIntervals = describe.each`
    index   | interval1                | interval2                  | interval1Common                       | interval2Common
    ${0}    | ${[[0, 4],    [1, 8]]}   | ${[[2, 8],     [3, 7]]}    | ${[[0, 56],       [7, 56]]}           | ${[[14, 56],      [24, 56]]}
    ${1}    | ${[[1, 11],   [7, 27]]}  | ${[[2, 7],     [8, 9]]}    | ${[[189, 2079],   [539, 2079]]}       | ${[[594, 2079],   [1848, 2079]]}
    ${2}    | ${[[5, 18],   [1, 3]]}   | ${[[11, 28],   [14, 17]]}  | ${[[1190, 4284],  [1428, 4284]]}      | ${[[1683, 4284],  [3528, 4284]]}
    ${3}    | ${[[0, 9],    [2, 27]]}  | ${[[4, 29],    [11, 19]]}  | ${[[0, 14877],    [1102, 14877]]}     | ${[[2052, 14877], [8613, 14877]]}
`
let sampleInterval1 = new Interval([ [0, 4], [1, 8] ])
let sampleInterval2 = new Interval([ [2, 8], [3, 7] ])

describe('Ensure that all intervals to be added to the collection are sequential', function(){
    it('Succeeds when passed an array of Intervals ordered by magnitude ascending', function(){
        let intArr = [sampleInterval1, sampleInterval2]
        expect(checkSequence(intArr)).toBeUndefined()
    })

    it('Fails when passed an array of Intervals which are not in ascending order', function(){
        let intArr = [sampleInterval2, sampleInterval1]
        expect( () => checkSequence(intArr)).toThrow(IntervalSequenceError)
    })


})

describe('IntervalCollection', function() {
    let sampleIntervalLens = [
        new Fraction(17, 56),
        new Fraction(1604, 2079),
        new Fraction(2083, 4284),
        new Fraction(7663, 14877)
    ]

    let sampleIntervalGaps = [
        new Fraction(39, 56),
        new Fraction(475, 2079),
        new Fraction(2201, 4284),
        new Fraction(7214, 14877)
    ]

    describe('Creating IntervalCollections', function() {
        it('Succeeds when passed an empty array', function(){
            let newColl = new IntervalCollection([])
            expect(type(newColl)).toEqual('IntervalCollection')
            expect(newColl.intervals.length).toEqual(0)
            expect(newColl.intervals).toEqual([])
        })

        it('With no args passed to new, it initializes an empty set of Intervals', function(){
            let newColl = new IntervalCollection()
            expect(type(newColl)).toEqual('IntervalCollection')
            expect(newColl.intervals.length).toEqual(0)
            expect(newColl.intervals).toEqual([])
        })
    })

    it('Iterating through an IntervalCollection\'s intervals with forEach', function(){
        let correct = [sampleInterval1, sampleInterval2]
        let intcol = new IntervalCollection([sampleInterval1, sampleInterval2])
        intcol.forEach( (interval, idx) => {
            expect(interval.left.equals(correct[idx].left)).toBeTruthy()
            expect(interval.right.equals(correct[idx].right)).toBeTruthy()
        })
    })

    sampleIntervals('Line segment and gap intervals', function({ index, interval1, interval2 }){
        let int1 = new Interval(interval1)
        let int2 = new Interval(interval2)

        let newint = new IntervalCollection([int1, int2])

        it('returns the total length of all combined line segment intervals', () => {
            expect( newint.len.equals(sampleIntervalLens[index])).toBeTruthy()
        })

        it('returns the set of line segment intervals', () => {
            expect(checkArrContents(newint.intervals, 'Interval' )).toBeTruthy()
            expect(newint.intervals.length).toEqual(2)

            let test1Interval = newint.intervals[0]
            let test2Interval = newint.intervals[1]

            expect(test1Interval.left.equals(int1.left)).toBeTruthy()
            expect(test1Interval.right.equals(int1.right)).toBeTruthy()
            expect(test2Interval.left.equals(int2.left)).toBeTruthy()
            expect(test2Interval.right.equals(int2.right)).toBeTruthy()
        })

        it('returns the total length of all combined gap intervals', () => {
            expect( newint.gapLen.equals(sampleIntervalGaps[index])).toBeTruthy()
        })

        it('returns the set of gap intervals', () => {
            expect(checkArrContents(newint.gaps, 'Interval')).toBeTruthy()
            expect(newint.gaps.length).toEqual(1)
            let gap = newint.gaps[0]

            expect(gap.left.equals(int1.right)).toBeTruthy()
            expect(gap.right.equals(int2.left)).toBeTruthy()
        })
    })

    sampleIntervals('converting all endpoints to a common denominator', function({ interval1, interval2, interval1Common, interval2Common }){

        it('it converts all endpoints to a common denominator', () => {
            let testArr = new IntervalCollection([ new Interval(interval1), new Interval(interval2) ]).commonDen()
            let correctColl = new IntervalCollection([ new Interval(interval1Common), new Interval(interval2Common) ])

            expect( testArr[0].left.equals(correctColl.intervals[0].left) ).toBeTruthy()
            expect( testArr[0].right.equals(correctColl.intervals[0].right) ).toBeTruthy()
            expect( testArr[1].left.equals(correctColl.intervals[1].left) ).toBeTruthy()
            expect( testArr[1].right.equals(correctColl.intervals[1].right) ).toBeTruthy()
        })
    })
})
