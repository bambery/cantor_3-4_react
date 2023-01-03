import IntervalCollection from '../models/interval_collection'
import Interval from '../models/interval'
import Fraction from '../models/fraction'
import { IntervalArr } from '../models/interval_collection'
import { type, checkArrContents } from '../shared/utils'
import { IntervalRangeError } from '../shared/errors'

let sampleIntervals = describe.each`
    index   | interval1                | interval2                  | interval1Common                       | interval2Common
    ${0}    | ${[[0, 4],    [1, 8]]}   | ${[[2, 8],     [3, 7]]}    | ${[[0, 56],       [7, 56]]}           | ${[[14, 56],      [24, 56]]}
    ${1}    | ${[[1, 11],   [7, 27]]}  | ${[[2, 7],     [8, 9]]}    | ${[[189, 2079],   [539, 2079]]}       | ${[[594, 2079],   [1848, 2079]]}
    ${2}    | ${[[5, 18],   [1, 3]]}   | ${[[11, 28],   [14, 17]]}  | ${[[1190, 4284],  [1428, 4284]]}      | ${[[1683, 4284],  [3528, 4284]]}
    ${3}    | ${[[0, 9],    [2, 27]]}  | ${[[4, 29],    [11, 19]]}  | ${[[0, 14877],    [1102, 14877]]}     | ${[[2052, 14877], [8613, 14877]]}
`
let interval1 = new Interval([ [0, 4], [1, 8] ])
let interval2 = new Interval([ [2, 8], [3, 7] ])

describe('IntervalArr', function() {

    describe('creating private class IntervalArr', function() {

        it('succeeds when passed an array of intervals', function(){
            let intervalArr = new IntervalArr([interval1, interval2])
            expect( type(intervalArr) ).toEqual('IntervalArr')
            expect(intervalArr.all.length).toEqual(2)
            expect(intervalArr.all[0].len.equals(new Fraction(1,8))).toBeTruthy()
        })

        it('succeeds when passed an empty array', function(){
            let newint = new IntervalArr([])
            expect(type(newint)).toEqual('IntervalArr')
            expect(newint.collection.length).toEqual(0)
        })

        it('fails when passed an array of invalid data types', function(){
            expect( () => new IntervalArr([interval1, 0]) ).toThrow(TypeError)
        })
    })

    describe('modifying IntervalArrs', function(){
        it('push_ allows adding one new interval', function(){
            let newint = new IntervalArr([])
            expect(newint.collection.length).toEqual(0)
            newint.push_(interval1)
            expect(newint.collection.length).toEqual(1)
            expect(newint.collection[0].left.equals(interval1.left)).toBeTruthy()
            expect(newint.collection[0].right.equals(interval1.right)).toBeTruthy()
        })

        it('push_ does not allow adding a new interval which does not appear sequentially after the existing intervals', function(){
            let newint = new IntervalArr([interval2])
            expect( () => newint.push_(interval1) ).toThrow(IntervalRangeError)
        })

        it('concat_ allows adding multiple new intervals', function(){
            let newint = new IntervalArr([])

            newint.concat_([interval1, interval2])

            expect(newint.collection.length).toEqual(2)
            expect(newint.collection[1].left.equals(interval2.left)).toBeTruthy()
            expect(newint.collection[1].right.equals(interval2.right)).toBeTruthy()
        })

        it('concat_ does not allow adding multiple new intervals which do not appear sequentially after the existing intervals', function(){

            let interval0 = new Interval([ [0, 6], [1, 6] ])
            let interval1 = new Interval([ [3, 6], [4, 5] ])
            let interval2 = new Interval([ [4, 6], [5, 6] ])

            let intarr = new IntervalArr([interval2])
            expect( () => intarr.concat_([interval0, interval1])).toThrow(IntervalRangeError)
        })
    })

    sampleIntervals('converting all endpoints to a common denominator', function({ interval1, interval2, interval1Common, interval2Common }){

        it('it converts all endpoints to a common denominator', () => {
            let testArr = new IntervalArr([ new Interval(interval1), new Interval(interval2) ]).commonDen()
            let correctArr = new IntervalArr([ new Interval(interval1Common), new Interval(interval2Common) ])

            expect( testArr[0].left.equals(correctArr.all[0].left) ).toBeTruthy()
            expect( testArr[0].right.equals(correctArr.all[0].right) ).toBeTruthy()
            expect( testArr[1].left.equals(correctArr.all[1].left) ).toBeTruthy()
            expect( testArr[1].right.equals(correctArr.all[1].right) ).toBeTruthy()
        })
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

    describe('creating IntervalCollections', function() {
        it('succeeds when passed an empty array', function(){
            let newint = new IntervalCollection([])
            expect(type(newint)).toEqual('IntervalCollection')
            expect(newint.intervals.all.length).toEqual(0)
        })
    })

    sampleIntervals('line segment and gap intervals', function({ index, interval1, interval2 }){
        let int1 = new Interval(interval1)
        let int2 = new Interval(interval2)

        let newint = new IntervalCollection([int1, int2])

        it('returns the total length of all combined line segment intervals', () => {
            expect( newint.len.equals(sampleIntervalLens[index])).toBeTruthy()
        })

        it('returns the set of line segment intervals', () => {
            expect(checkArrContents(newint.intervals.all, 'Interval' )).toBeTruthy()
            expect(newint.intervals.all.length).toEqual(2)

            let test1Interval = newint.intervals.all[0]
            let test2Interval = newint.intervals.all[1]

            expect(test1Interval.left.equals(int1.left)).toBeTruthy()
            expect(test1Interval.right.equals(int1.right)).toBeTruthy()
            expect(test2Interval.left.equals(int2.left)).toBeTruthy()
            expect(test2Interval.right.equals(int2.right)).toBeTruthy()
        })

        it('returns the total length of all combined gap intervals', () => {
            expect( newint.gapLen.equals(sampleIntervalGaps[index])).toBeTruthy()
        })

        it('returns the set of gap intervals', () => {
            expect(checkArrContents(newint.gaps.all, 'Interval')).toBeTruthy()
            expect(newint.gaps.all.length).toEqual(1)
            let gap = newint.gaps.all[0]

            expect(gap.left.equals(int1.right)).toBeTruthy()
            expect(gap.right.equals(int2.left)).toBeTruthy()
        })
    })
})
