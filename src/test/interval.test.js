import Interval from '../models/interval'
import Fraction from '../models/fraction'
import { ArgumentError, ValueError, IntervalRangeError } from '../shared/errors'

describe('Interval', function() {
    describe('creating intervals', function(){
        describe.each`
            intervalLeft    | intervalRight     | correctLength
            ${[0, 2]}       | ${[1, 1]}         | ${[1, 1]}
            ${[0, 5]}       | ${[3, 5]}         | ${[3, 5]}
            ${[2, 3]}       | ${[18, 21]}       | ${[4, 21]}
        `('Creates an Interval [$left.str, $right.str] with length $correctLen.str', ({ intervalLeft, intervalRight, correctLength }) => {
            let left = new Fraction(intervalLeft)
            let right = new Fraction(intervalRight)
            let correctLen = new Fraction(correctLength)
            it('when passed two appropriate fractions', () => {
                let testLen = new Interval(left, right).len.reduce()
                expect(testLen.equals(correctLen)).toBeTruthy()
            })

            it('when passed an array containing two sub-arrays representing the endpoints', () => {
                let testInt = new Interval([intervalLeft, intervalRight])
                let testLen = testInt.len.reduce()
                expect(testLen.equals(correctLen)).toBeTruthy()

                expect(testInt.left.num).toEqual(intervalLeft[0])
                expect(testInt.left.den).toEqual(intervalLeft[1])
                expect(testInt.right.num).toEqual(intervalRight[0])
                expect(testInt.right.den).toEqual(intervalRight[1])
            })
        })

        it('fails if the right endpoint is less than the left endpoint', function() {
            expect( () => new Interval(new Fraction(1,2), new Fraction(1,3)) ).toThrow(IntervalRangeError)
        })

        it('fails if the length of the interval would be zero', function() {
            expect( () => new Interval(new Fraction(1,2), new Fraction(1,2)) ).toThrow(IntervalRangeError)
        })

        it('fails if one argument is not Fraction', function() {
            expect( () => { new Interval(new Fraction(0,2), 0) }).toThrow(ArgumentError)
        })

        it('fails if passed no arguments with new', function(){
            expect( () => new Interval ).toThrow(ArgumentError)
        })
    })

    it('cannot directly modify endpoints', function() {
        let interval = new Interval( new Fraction(0,2), new Fraction(1,2) )
        expect( () => interval.left = new Fraction(1,3) ).toThrow(TypeError)
        expect( () => interval.right = new Fraction(2,3) ).toThrow(TypeError)
    })

    describe.each`
        interval1           | interval2         | equal
        ${[[0,2],[2,2]]}    | ${[[0,7],[7,7]]}  | ${true}
        ${[[1,3],[2,3]]}    | ${[[3,9],[6,9]]}  | ${true}
        ${[[1,3],[2,3]]}    | ${[[4,12],[7,9]]} | ${false}
    `('Interval equality', ({ interval1, interval2, equal }) => {
        expect(new Interval(interval1).equals(new Interval(interval2))).toBe(equal)
    })

    describe('Converting endpoints to a common denominator', function() {
        describe.each`
            intervalL   | intervalR     | commonL       | commonR
            ${[1, 5]}   | ${[7, 10]}    | ${[2, 10]}    | ${[7, 10]}
            ${[2, 7]}   | ${[4, 5]}     | ${[10, 35]}   | ${[28, 35]}
            ${[3, 11]}  | ${[34, 90]}   | ${[270, 990]} | ${[374, 990]}
        `('converts the endpoints to a common denominator', function({ intervalL, intervalR, commonL, commonR }) {
            let originalInterval = new Interval(new Fraction(intervalL), new Fraction(intervalR))
            let convertedCorrect = new Interval(new Fraction(commonL), new Fraction(commonR))

            it(`given Interval ${originalInterval.strMinimal}, convert to ${convertedCorrect.strMinimal}`, () => {
                let convertedTest = originalInterval.commonDen()
                expect(convertedTest.left.equals(convertedCorrect.left)).toBeTruthy()
                expect(convertedTest.right.equals(convertedCorrect.right)).toBeTruthy()
                expect(convertedTest.left.den).toEqual(convertedCorrect.left.den)
                expect(convertedTest.right.den).toEqual(convertedCorrect.right.den)
            })
        })

        describe.each`
            interval                | newDen | specificLArr  | specificRArr
            ${[[1, 5], [7, 10]]}    | ${100} | ${[20, 100]}  | ${[70, 100]}
            ${[[2, 7], [4, 5]]}     | ${105} | ${[30, 105]}  | ${[84, 105]}
            ${[[1, 4], [1, 3]]}     | ${12}  | ${[3, 12]}    | ${[4, 12]}
        `('converts the endpoints to a specified denominator', function({ interval, newDen, specificLArr, specificRArr }) {
            let originalInterval = new Interval(interval)
            let commonL = new Fraction(specificLArr)
            let commonR = new Fraction(specificRArr)

            it(`given Interval ${originalInterval.strMinimal}, convert to [${commonL}, ${commonR}]`, () => {
                let convertedInterval = originalInterval.commonDen(newDen)
                expect(convertedInterval.left.equals(commonL)).toBeTruthy()
                expect(convertedInterval.right.equals(commonR)).toBeTruthy()
            })
        })

        describe.each`
            interval                | newDen
            ${[[1, 5], [7, 10]]}    | ${15}
            ${[[2, 7], [4, 5]]}     | ${28}
            ${[[1, 4], [1, 3]]}     | ${16}
        `('errors if endpoints cannot be converted to the given denominator', function({ interval, newDen }) {
            it(`Interval ${interval} can't convert to denominator ${newDen}`, () => {
                expect( () => new Interval(interval).commonDen(newDen) ).toThrow(ValueError)
            })

        })
    })

    describe('subtracting a sub-interval from an interval', function(){
        describe.each`
            interval            | toSubtract            | resultL               | resultR
            ${[[0, 5], [5, 5]]} | ${[[1, 5], [2, 5]]}   | ${[[0, 5],[1, 5]]}    | ${[[2, 5], [5, 5]]}
            ${[[0, 1], [1, 1]]} | ${[[2, 4], [3, 4]]}   | ${[[0, 4], [2, 4]]}   | ${[[3, 4], [4, 4]]}
            ${[[1, 2], [7, 8]]} | ${[[11, 16], [6, 8]]} | ${[[8, 16], [11, 16]]}| ${[[12, 16], [14, 16]]}
        `('subtracting a gap from an interval returns two subintervals', function({ interval, toSubtract, resultL, resultR }) {
            interval = new Interval(interval)
            toSubtract = new Interval(toSubtract)
            resultL = new Interval(resultL)
            resultR = new Interval(resultR)
            it(`from ${interval.strMinimal}, subtract ${toSubtract.strMinimal}`, () => {
                let result = interval.subtract(toSubtract)
                expect(result[0].left.equals(resultL.left)).toBeTruthy()
                expect(result[0].right.equals(resultL.right)).toBeTruthy()

                expect(result[1].left.equals(resultR.left)).toBeTruthy()
                expect(result[1].right.equals(resultR.right)).toBeTruthy()
            })
        })

        describe.each`
            interval                | toSubtract
            ${[[1, 3], [2, 3]]}     | ${[[2, 7], [4, 9]]}
            ${[[1, 3], [190, 200]]} | ${[[16, 49], [191, 200]]}
            ${[[1, 2], [2, 3]]}     | ${[[1, 2], [7, 8]]}
        `('fails if trying to subtract intervals which are not contained in the parent interval', function({ interval, toSubtract }) {
            interval = new Interval(interval)
            toSubtract = new Interval(toSubtract)
            it(`from ${interval.strMinimal}, fail to subtract ${toSubtract.strMinimal}`, () => {
                expect( () => interval.subtract(toSubtract)).toThrow(IntervalRangeError)
            })
        })
    })
})
