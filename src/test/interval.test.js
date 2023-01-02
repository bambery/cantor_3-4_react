import Interval from '../models/interval'
import Fraction from '../models/fraction'
import { IntervalRangeError } from '../shared/errors'

describe('Interval', function() {
    describe('creating intervals', function(){
        describe.each`
            interval_left   | interval_right    | correct_length
            ${[0, 2]}       | ${[1, 1]}         | ${[1, 1]}
            ${[0, 5]}       | ${[3, 5]}         | ${[3, 5]}
            ${[2, 3]}       | ${[18, 21]}       | ${[4, 21]}
        `('when passed two appropriate fractions', (interval_left, interval_right, correct_length) => {
            let left = new Fraction(interval_left[0], interval_left[1])
            let right = new Fraction(interval_right[0], interval_right[1])
            it(`Creates an Interval [${left.str}, ${right.str}] with length ${correct_length.str}`, () => {
                let testLen = new Interval(left, right).len.reduce()
                expect(testLen.equals(correctLen)).toBeTruthy()
            })
        })

        it('fails if the right endpoint is less than the left endpoint', function() {
            expect( () => new Interval(new Fraction(1,2), new Fraction(1,3)) ).toThrow(IntervalRangeError)
        })

        it('fails if the length of the interval would be zero', function() {
            expect( () => new Interval(new Fraction(1,2), new Fraction(1,2)) ).toThrow(IntervalRangeError)
        })

        it('fails if one argument is not Fraction', function() {
            expect( () => { new Interval(new Fraction(0,2), 0) }).toThrow(TypeError)
        })

        it('fails if passed no arguments with new', function(){
            expect( () => new Interval ).toThrow(TypeError)
        })
    })

    it('cannot directly modify endpoints', function() {
        let interval = new Interval( new Fraction(0,2), new Fraction(1,2) )
        expect( () => interval.left = new Fraction(1,3)).toThrow(TypeError)
        expect( () => interval.right = new Fraction(2,3)).toThrow(TypeError)
    })

    describe.each`
        intervalL   | intervalR     | commonLArr    | commonRArr
        ${[1, 5]}   | ${[7, 10]}    | ${[2, 10]}    | ${[7, 10]}
        ${[2, 7]}   | ${[4, 5]}     | ${[10, 35]}   | ${[28, 35]}
        ${[3, 11]}  | ${[34, 90]}   | ${[270, 990]} | ${[374, 990]}
    `('converts the endpoints to a common denominator', function(intervalL, intervalR, commonLArr, commonRArr) {
        let origL = new Fraction(origLArr[0], origLArr[1])
        let origR = new Fraction(origRArr[0], origRArr[1])
        let commonL = new Fraction(commonLArr[0], commonLArr[1])
        let commonR = new Fraction(commonRArr[0], commonRArr[1])
        let originalInterval = new Interval(origL, origR)

        it(`given Interval [${originalInterval.left.str}, ${originalInterval.right.str}], convert to [${commonL}, ${commonR}]`, () => {
            let convertedInterval = originalInterval.commonDen()
            expect(convertedInterval.left.equals(commonL)).toBeTruthy()
            expect(convertedInterval.right.equals(commonR)).toBeTruthy()
        })
    })

        /*
        // need to chang the test cases
    describe.each`
        intervalL   | intervalR     | newDen | specificLArr  | specificRArr
        ${[1, 5]}   | ${[7, 10]}    | ${100} | ${[20, 100]}  | ${[70, 100]}
        ${[2, 7]}   | ${[4, 5]}     | ${105} | ${[30, 105]}  | ${[84, 105]}
        ${[3, 11]}  | ${[34, 90]}   | ${ xx} | ${[270, 990]} | ${[374, 990]}
    `('converts the endpoints to a specified denominator', function(intervalL, intervalR, specificLArr, specificRArr) {
        let origL = new Fraction(origLArr[0], origLArr[1])
        let origR = new Fraction(origRArr[0], origRArr[1])
        let commonL = new Fraction(commonLArr[0], commonLArr[1])
        let commonR = new Fraction(commonRArr[0], commonRArr[1])
        let originalInterval = new Interval(origL, origR)

        it(`given Interval [${originalInterval.left.str}, ${originalInterval.right.str}], convert to [${commonL}, ${commonR}]`, () => {
            let convertedInterval = originalInterval.commonDen()
            expect(convertedInterval.left.equals(commonL)).toBeTruthy()
            expect(convertedInterval.right.equals(commonR)).toBeTruthy()
        })
    })
/*
        it.skip('convert endpoints to specified denominator')
        it.skip('errors if endpoints cannot be converted to given denominator')
        */

    describe.each([
        [ [[0, 5], [5, 5], [1, 5], [2, 5]], [[0, 5], [1, 5],[2, 5], [5, 5]] ],
        [ [[0, 1], [1, 1], [2, 4], [3, 4]], [[0, 4], [2, 4], [3, 4], [4, 4]] ],
        [ [[1, 2], [7, 8], [11, 16], [6, 8]], [[8, 16], [11, 16], [12, 16], [14, 16]] ]
    ])('subtracting a gap from an interval returns two subintervals', function(original, result) {
        let origFracs = original.map(arr => new Fraction(arr[0], arr[1]))
        let resultFracs = result.map(arr => new Fraction(arr[0], arr[1]))
        let originalInterval = new Interval(origFracs[0], origFracs[1])
        let toSubtract = new Interval(origFracs[2], origFracs[3])
        it(`from ${originalInterval.str}, subtract ${toSubtract.str}`, () => {
            let result = originalInterval.subtract(toSubtract)
            expect(result[0].left.equals(resultFracs[0])).toBeTruthy()
            expect(result[0].right.equals(resultFracs[1])).toBeTruthy()
            expect(result[1].left.equals(resultFracs[2])).toBeTruthy()
            expect(result[1].right.equals(resultFracs[3])).toBeTruthy()
        })
    })

    it.skip('fails if trying to subtract intervals which are not contained in the parent interval', function(){
        // another each with various edge cases
    })

})
