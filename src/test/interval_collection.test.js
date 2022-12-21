import IntervalCollection from '../models/interval_collection'
import Interval from '../models/interval'
import Fraction from '../models/fraction'
import { IntervalArr } from '../models/interval_collection'
import { type, checkArrContents } from '../shared/utils'
import { IntervalRangeError } from '../shared/errors'

let sampleIntervals = [
    [ [0, 4], [1, 8], [2, 8], [3, 7], 0 ],
    [ [1, 11], [7, 27], [2, 7], [8, 9], 1 ],
    [ [5, 18], [1, 3], [11, 28], [14, 17], 2 ],
    [ [0, 9], [2, 27], [4, 29], [11, 19], 3 ]
]

let sampleIntervalCommonDen = [
    [ [0, 56], [7, 56], [14, 56], [24, 56] ],
    [ [189, 2079], [539, 2079], [594, 2079], [1848, 2079] ],
    [ [1190, 4284], [1428, 4284], [1683, 4284], [3528, 4284] ],
    [ [ 0, 14877], [1102, 14877], [2052, 14877], [8613, 14877] ]
]


let interval1 = new Interval(new Fraction (...sampleIntervals[0][0]), new Fraction(...sampleIntervals[0][1]))
let interval2 = new Interval(new Fraction(...sampleIntervals[0][2]), new Fraction(...sampleIntervals[0][3]))

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

        it('concat_ does not allow adding multiple new intervals which do not appear sequentially after the existing intervals', function(){})
        let ep0 = new Fraction(0, 6)
        let ep1 = new Fraction(1, 6)
        //let ep2 = new Fraction(2, 6)
        let ep3 = new Fraction(3, 6)
        let ep4 = new Fraction(4, 6)
        let ep5 = new Fraction(5, 6)
        //let ep6 = new Fraction(6, 6)

        let interval0 = new Interval(ep0, ep1)
        let interval1 = new Interval(ep3, ep4)
        let interval2 = new Interval(ep4, ep5)
        //let interval3 = new Interval(ep5, ep6)

        let intarr = new IntervalArr([interval2])
        expect( () => intarr.concat_([interval0, interval1])).toThrow(IntervalRangeError)
    })

    describe.each(sampleIntervals)('smallestInterval', function(endpointLL, endpointLR, endpointRL, endpointRR, idx_){
        let ll = new Fraction(endpointLL[0], endpointLL[1])
        let lr = new Fraction(endpointLR[0], endpointLR[1])
        let rl = new Fraction(endpointRL[0], endpointRL[1])
        let rr = new Fraction(endpointRR[0], endpointRR[1])
        let idx = idx_

        let int1 = new Interval(ll, lr)
        let int2 = new Interval(rl, rr)

        let intarr = new IntervalArr([int1, int2])

        it('it returns the smallest fractional unit among all endpoints', () => {
            let comden = sampleIntervalCommonDen[idx][0][1]
            expect(intarr.smallestInterval().equals(new Fraction(1, comden))).toBeTruthy()
        })

        it('it converts all endpoints to a common denominator, equal to the smallest fractional unit', () => {
            let [commonDenL, commonDenR] = intarr.commonDen()

            let correctLL = sampleIntervalCommonDen[idx][0]
            let correctLLFrac = new Fraction(correctLL[0], correctLL[1])
            let correctLR = sampleIntervalCommonDen[idx][1]
            let correctLRFrac = new Fraction(correctLR[0], correctLR[1])
            let correctRL = sampleIntervalCommonDen[idx][2]
            let correctRLFrac = new Fraction(correctRL[0], correctRL[1])
            let correctRR = sampleIntervalCommonDen[idx][3]
            let correctRRFrac = new Fraction(correctRR[0], correctRR[1])

            expect( commonDenL.left.equals(correctLLFrac) ).toBeTruthy()
            expect( commonDenL.right.equals(correctLRFrac) ).toBeTruthy()
            expect( commonDenR.left.equals(correctRLFrac) ).toBeTruthy()
            expect( commonDenR.right.equals(correctRRFrac) ).toBeTruthy()
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

    describe.each(sampleIntervals)('line segment and gap intervals', function(endpointLL, endpointLR, endpointRL, endpointRR, idx_){
        let ll = new Fraction(endpointLL[0], endpointLL[1])
        let lr = new Fraction(endpointLR[0], endpointLR[1])
        let rl = new Fraction(endpointRL[0], endpointRL[1])
        let rr = new Fraction(endpointRR[0], endpointRR[1])
        let idx = idx_

        let int1 = new Interval(ll, lr)
        let int2 = new Interval(rl, rr)

        let newint = new IntervalCollection([int1, int2])

        it('returns the total length of all combined line segment intervals', () => {
            expect( newint.len.equals(sampleIntervalLens[idx])).toBeTruthy()
        })

        it('returns the set of line segment intervals', () => {
            expect(checkArrContents(newint.intervals.all, 'Interval' )).toBeTruthy()
            expect(newint.intervals.all.length).toEqual(2)

            let interL = newint.intervals.all[0]
            let interR = newint.intervals.all[1]

            let interLL = sampleIntervals[idx][0]
            let interLR = sampleIntervals[idx][1]
            let interRL = sampleIntervals[idx][2]
            let interRR = sampleIntervals[idx][3]

            expect(interL.left.equals( new Fraction(interLL[0], interLL[1]) )).toBeTruthy()
            expect(interL.right.equals( new Fraction(interLR[0], interLR[1]) )).toBeTruthy()
            expect(interR.left.equals( new Fraction(interRL[0], interRL[1]) )).toBeTruthy()
            expect(interR.right.equals( new Fraction(interRR[0], interRR[1]) )).toBeTruthy()
        })

        it('returns the total length of all combined gap intervals', () => {
            expect( newint.gapLen.equals(sampleIntervalGaps[idx])).toBeTruthy()
        })

        it('returns the set of gap intervals', () => {
            expect(checkArrContents(newint.gaps.all, 'Interval')).toBeTruthy()
            expect(newint.gaps.all.length).toEqual(1)
            let gap = newint.gaps.all[0]

            let gapL = sampleIntervals[idx][1]
            let gapR = sampleIntervals[idx][2]

            expect(gap.left.equals( new Fraction(gapL[0], gapL[1]) )).toBeTruthy()
            expect(gap.right.equals( new Fraction(gapR[0], gapR[1]) )).toBeTruthy()
        })
    })
})
