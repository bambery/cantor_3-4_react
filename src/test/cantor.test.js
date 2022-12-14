import { removeIntervals, convertSegmentsToIntervals } from '../models/cantor'
import Cantor from '../models/cantor'
import { ArgumentError, ValueError } from '../shared/errors'
import Interval from '../models/interval'
import Fraction from '../models/fraction'

describe('Cantor Library', function() {
    describe('Convert segment numbers to intervals', function(){
        // standard Cantor first iter
        it('Given the unit Interval, segment length of 1/3, and segment [2], return the interval [1/3, 2/3]', function(){
            let gaps = convertSegmentsToIntervals(Interval.unit, new Fraction(1, 3), [2])
            let correct = new Interval([[1, 3], [2, 3]])
            expect(gaps[0].equals(correct)).toBeTruthy()
        })

        // Cantor-like with 5 segments, removing center, first iter
        it('given the unit interval, segment length 1/5, and segment [3], return one interval [2/5, 3/5]', function(){
            let gaps = convertSegmentsToIntervals(
                Interval.unit,
                new Fraction(1, 5),
                [3]
            )
            let correct = new Interval([[2,5],[3,5]])

            expect(gaps[0].equals(correct)).toBeTruthy()
        })

        // still symmetrical, starting with Unit, removing 2nd and 4th segments out of 5, first iter
        it('given the unit Interval, segment length of 1/5, and segments [2, 4], return two intervals [1/5, 2/5], [3/5, 4/5]', function() {
            let gaps = convertSegmentsToIntervals(
                Interval.unit,
                new Fraction(1, 5),
                [2, 4])
            let correct = [
                new Interval([[1,5], [2,5]]),
                new Interval([[3,5], [4,5]])
            ]

            gaps.forEach( (gap, idx) => {
                expect(gap.equals(correct[idx])).toBeTruthy()
            })
        })

        // still symmetrical, starting with a first iteration interval, removing 2nd and 4th segments out of 5, second iter
        it('given the Interval [2/5, 3/5], segment length 1/25, and segments [2, 4], return two intervals of [11/25, 12/25], [13/25, 14/25]', function(){
            let gaps = convertSegmentsToIntervals(
                new Interval([[2,5],[3,5]]),
                new Fraction(1, 25),
                [2, 4]
            )
            let correct = [
                new Interval([[11,25], [12,25]]),
                new Interval([[13,25], [14,25]])
            ]

            gaps.forEach( (gap, idx) => {
                expect(gap.equals(correct[idx])).toBeTruthy()
            })
        })

        // asymmetrical with gap of size greater than 1 segment, 5-segmented line removing [2, 3] to produce one interval
        it('given the unit Interval, segment length 1/5, and segments [2, 3], return the interval [1/5, 3/5]', function(){
            let gaps = convertSegmentsToIntervals(
                Interval.unit,
                new Fraction(1, 5),
                [2, 3]
            )
            let correct = [
                new Interval([[1,5], [3,5]])
            ]

            expect(gaps[0].equals(correct[0])).toBeTruthy()
        })

        // asymmetrical removing gaps of different sizes from 7-segment line
        it('given Interval [3/7, 4/7], remove gaps [3, 5, 6] from a 7-segmented interval to return 2 intervals', function(){

            let gaps = convertSegmentsToIntervals(
                new Interval([[3,7],[4,7]]),
                new Fraction(1, 49),
                [3, 5, 6]
            )
            let correct = [
                new Interval([[23,49], [24,49]]),
                new Interval([[25,49], [27,49]])
            ]

            gaps.forEach( (gap, idx) => {
                expect(gap.equals(correct[idx])).toBeTruthy()
            })
        })

    })

    describe('removeIntervals', function() {
        describe('one uncentered gap of size 1/5, taking [2] from a 5-segment line', function() {
            let res = removeIntervals(Interval.unit, 5, [2])

            it('produces 2 intervals', function(){
                expect(res.length).toEqual(2)
            })

            describe.each`
                index | left        |   right
                ${0}  | ${[0, 5]}   | ${[1, 5]}
                ${1}  | ${[2, 5]}   | ${[5, 5]}
            `('removes one gap', ({ index, left, right }) => {
                it(`resulting in intervals [${left[0]}/${left[1]}, ${right[0]}/${right[1]}]`, () => {
                    let interval = res[index]
                    expect(interval.left.equals( new Fraction(left) )).toBeTruthy()
                    expect(interval.right.equals( new Fraction(right) )).toBeTruthy()
                })
            })
        })

        describe('two centered gaps of size 1/5, taking [2, 4] from a 5-segment line', function() {
            let res = removeIntervals(Interval.unit, 5, [2, 4])

            it('produces 3 intervals', function(){
                expect(res.length).toEqual(3)
            })

            describe.each`
                index | left        |   right
                ${0}  | ${[0, 5]}   | ${[1, 5]}
                ${1}  | ${[2, 5]}   | ${[3, 5]}
                ${2}  | ${[4, 5]}   | ${[5, 5]}
            `('removes one gap', ({ index, left, right }) => {
                it(`resulting in intervals [${left[0]}/${left[1]}, ${right[0]}/${right[1]}]`, () => {
                    let interval = res[index]
                    expect(interval.left.equals( new Fraction(left) )).toBeTruthy()
                    expect(interval.right.equals( new Fraction(right) )).toBeTruthy()
                })
            })
        })

        describe('two centered gaps of size 1/25, taking [2, 4] out of 5 sements on the interval [2/5, 3/5]', function(){
            let hh = new Interval(new Fraction(2, 5), new Fraction(3, 5))
            let res = removeIntervals(hh, 5, [2, 4])

            it('produces 3 intervals', function(){
                expect(res.length).toEqual(3)
            })

            describe.each`
                index | left        |   right
                ${0}  | ${[10, 25]}   | ${[11, 25]}
                ${1}  | ${[12, 25]}   | ${[13, 25]}
                ${2}  | ${[14, 25]}   | ${[15, 25]}
            `('removes one gap', ({ index, left, right }) => {
                it(`resulting in intervals [${left[0]}/${left[1]}, ${right[0]}/${right[1]}]`, () => {
                    let interval = res[index]
                    expect(interval.left.equals( new Fraction(left) )).toBeTruthy()
                    expect(interval.right.equals( new Fraction(right) )).toBeTruthy()
                })
            })
        })

        it('fails when attempting to remove the first interval', function(){
            expect(() => removeIntervals(Interval.unit, 5, [1, 3])).toThrow(ValueError)
        })

        it('fails when attempting to remove the last interval', function(){
            expect(() => removeIntervals(Interval.unit, 5, [3, 5])).toThrow(ValueError)
        })
    })


    describe('Cantor iterations', function(){
        it('New fails when asked to remove the first segment in a divided interval', function(){
            expect( () => new Cantor(3, [1, 2], 1) ).toThrow(ValueError)
        })

        it('New fails when asked to remove the last segment in a divided interval', function(){
            expect( () => new Cantor(4, [2, 4], 1) ).toThrow(ValueError)
        })

        it('New fails if passed incorrect parameters', function(){
            expect( () => new Cantor([4], [2], 1) ).toThrow(ArgumentError)
            expect( () => new Cantor(4, 2, 1) ).toThrow(ArgumentError)
            expect( () => new Cantor(4, [2], null) ).toThrow(ArgumentError)

        })

        describe('Standard Cantor: split into 3, remove middle', function(){
            describe('Performs 1 iteration of standard Cantor', function() {
                let res = new Cantor(3, [2], 1)

                it('produces 2 intervals', function(){
                    expect(res.numIter).toEqual(1)
                    expect(res.iterations[0].count).toEqual(2)
                })

                describe.each`
                    iteration   | index | left          |   right
                    ${0}        | ${0}  | ${[0, 3]}     | ${[1, 3]}
                    ${0}        | ${1}  | ${[2, 3]}     | ${[3, 3]}
                `('performs 2 iterations', ({ iteration, index, left, right }) => {
                    it(`iteration ${iteration}[${index}] has interval [${left[0]}/${left[1]}, ${right[0]}/${right[1]}]`, () => {
                        let interval = res.iterations[iteration].intervals[index]
                        expect(interval.left.equals( new Fraction(left) )).toBeTruthy()
                        expect(interval.right.equals( new Fraction(right) )).toBeTruthy()
                    })
                })
            })

            describe('Performs 2 iterations of standard Cantor', function() {
                let res = new Cantor(3, [2], 2)

                it('produces 2 intervals on the first iteration, then 4 intervals for the second', function(){
                    expect(res.numIter).toEqual(2)
                    expect(res.iterations[0].count).toEqual(2)
                    expect(res.iterations[1].count).toEqual(4)
                })

                describe.each`
                    iteration   | index | left          |   right
                    ${0}        | ${0}  | ${[0, 3]}     | ${[1, 3]}
                    ${0}        | ${1}  | ${[2, 3]}     | ${[3, 3]}
                    ${1}        | ${0}  | ${[0, 9]}     | ${[1, 9]}
                    ${1}        | ${1}  | ${[2, 9]}     | ${[3, 9]}
                    ${1}        | ${2}  | ${[6, 9]}     | ${[7, 9]}
                    ${1}        | ${3}  | ${[8, 9]}     | ${[9, 9]}
                `('performs 2 iterations', ({ iteration, index, left, right }) => {
                    it(`iteration ${iteration}[${index}] has interval [${left[0]}/${left[1]}, ${right[0]}/${right[1]}]`, () => {
                        let interval = res.iterations[iteration].intervals[index]
                        expect(interval.left.equals( new Fraction(left) )).toBeTruthy()
                        expect(interval.right.equals( new Fraction(right) )).toBeTruthy()
                    })
                })
            })
        })

        describe('Non-standard Cantor', function() {
            describe('Two iterations removing two [2, 4] gaps of size 1 out of a 5-segmented line', function(){
                let res = new Cantor(5, [2, 4], 2)

                it('produces 3 intervals on the first iteration, 9 on the second', function(){
                    expect(res.numIter).toEqual(2)
                    expect(res.iterations[0].count).toEqual(3)
                    expect(res.iterations[1].count).toEqual(9)
                })

                describe.each`
                    iteration   | index | left          |   right
                    ${0}        | ${0}  | ${[0, 5]}     | ${[1, 5]}
                    ${0}        | ${1}  | ${[2, 5]}     | ${[3, 5]}
                    ${0}        | ${2}  | ${[4, 5]}     | ${[5, 5]}
                    ${1}        | ${0}  | ${[0, 25]}    | ${[1, 25]}
                    ${1}        | ${1}  | ${[2, 25]}    | ${[3, 25]}
                    ${1}        | ${2}  | ${[4, 25]}    | ${[5, 25]}
                    ${1}        | ${3}  | ${[10, 25]}   | ${[11, 25]}
                    ${1}        | ${4}  | ${[12, 25]}   | ${[13, 25]}
                    ${1}        | ${5}  | ${[14, 25]}   | ${[15, 25]}
                    ${1}        | ${6}  | ${[20, 25]}   | ${[21, 25]}
                    ${1}        | ${7}  | ${[22, 25]}   | ${[23, 25]}
                    ${1}        | ${8}  | ${[24, 25]}   | ${[25, 25]}
                `('performs 2 iterations', ({ iteration, index, left, right }) => {
                    it(`iteration ${iteration}[${index}] has interval [${left[0]}/${left[1]}, ${right[0]}/${right[1]}]`, () => {
                        let interval = res.iterations[iteration].intervals[index]
                        expect(interval.left.equals( new Fraction(left) )).toBeTruthy()
                        expect(interval.right.equals( new Fraction(right) )).toBeTruthy()
                    })
                })
            })

            describe('two iterations removing one gap of size 2, taking [2, 3] from a 5-segmented line', function(){
                let res = new Cantor(5, [2, 3], 2)

                it('produces 2 intervals on first iteration, 4 on second', function(){
                    expect(res.numIter).toEqual(2)
                    expect(res.iterations[0].count).toEqual(2)
                    expect(res.iterations[1].count).toEqual(4)
                })

                describe.each`
                    iteration   | index | left          |   right
                    ${0}        | ${0}  | ${[0, 5]}     | ${[1, 5]}
                    ${0}        | ${1}  | ${[3, 5]}     | ${[5, 5]}
                    ${1}        | ${0}  | ${[0, 25]}    | ${[1, 25]}
                    ${1}        | ${1}  | ${[3, 25]}    | ${[5, 25]}
                    ${1}        | ${2}  | ${[15, 25]}   | ${[17, 25]}
                    ${1}        | ${3}  | ${[21, 25]}   | ${[25, 25]}
                `('performs 2 iterations', ({ iteration, index, left, right }) => {
                    it(`iteration ${iteration}[${index}] has interval [${left[0]}/${left[1]}, ${right[0]}/${right[1]}]`, () => {
                        let interval = res.iterations[iteration].intervals[index]
                        expect(interval.left.equals( new Fraction(left) )).toBeTruthy()
                        expect(interval.right.equals( new Fraction(right) )).toBeTruthy()
                    })
                })
            })

            describe('one uncentered gap of size 3, taking [2, 3, 4] from a 6-segment line', function(){
                let res = new Cantor(6, [2, 3, 4], 2)
                describe.each`
                    iteration   | index | left          |   right
                    ${0}        | ${0}  | ${[0, 6]}     | ${[1, 6]}
                    ${0}        | ${1}  | ${[4, 6]}     | ${[6, 6]}
                    ${1}        | ${0}  | ${[0, 36]}    | ${[1, 36]}
                    ${1}        | ${1}  | ${[4, 36]}    | ${[6, 36]}
                    ${1}        | ${2}  | ${[12, 18]}   | ${[13, 18]}
                    ${1}        | ${3}  | ${[16, 18]}   | ${[18, 18]}
                    `('performs 2 iterations', ({ iteration, index, left, right }) => {
                    it(`iteration ${iteration}[${index}] has interval [${left[0]}/${left[1]}, ${right[0]}/${right[1]}]`, () => {
                        let interval = res.iterations[iteration].intervals[index]
                        expect(interval.left.equals( new Fraction(left) )).toBeTruthy()
                        expect(interval.right.equals( new Fraction(right) )).toBeTruthy()
                    })
                })
            })

            describe('performs 2 iterations with one gap of size 2 followed by a gap of size 1, taking [2, 3, 5] from a 7-segment line', function(){
                let res = new Cantor(7, [2, 3, 5], 2)
                describe.each`
                    iteration   | index | left          |   right
                    ${0}        | ${0}  | ${[0, 7]}     | ${[1, 7]}
                    ${0}        | ${1}  | ${[3, 7]}     | ${[4, 7]}
                    ${0}        | ${2}  | ${[5, 7]}     | ${[7, 7]}
                    ${1}        | ${0}  | ${[0, 49]}    | ${[1, 49]}
                    ${1}        | ${1}  | ${[3, 49]}    | ${[4, 49]}
                    ${1}        | ${2}  | ${[5, 49]}    | ${[7, 49]}
                    ${1}        | ${3}  | ${[21, 49]}   | ${[22, 49]}
                    ${1}        | ${4}  | ${[24, 49]}   | ${[25, 49]}
                    ${1}        | ${5}  | ${[26, 49]}   | ${[28, 49]}
                    ${1}        | ${6}  | ${[35, 49]}   | ${[37, 49]}
                    ${1}        | ${7}  | ${[41, 49]}   | ${[43, 49]}
                    ${1}        | ${8}  | ${[45, 49]}   | ${[49, 49]}
                    `('performs 2 iterations', ({ iteration, index, left, right }) => {
                    it(`iteration ${iteration}[${index}] has interval [${left[0]}/${left[1]}, ${right[0]}/${right[1]}]`, () => {
                        let interval = res.iterations[iteration].intervals[index]
                        expect(interval.left.equals( new Fraction(left) )).toBeTruthy()
                        expect(interval.right.equals( new Fraction(right) )).toBeTruthy()
                    })
                })
            })

            describe('performs 2 iterations with one gap of size 1 followed by a gap of size 2, taking [3, 5, 6] from a 7-segment line', function(){
                let res = new Cantor(7, [3, 5, 6], 2)
                describe.each`
                    iteration   | index | left          |   right
                    ${0}        | ${0}  | ${[0, 7]}     | ${[2, 7]}
                    ${0}        | ${1}  | ${[3, 7]}     | ${[4, 7]}
                    ${0}        | ${2}  | ${[6, 7]}     | ${[7, 7]}
                    ${1}        | ${0}  | ${[0, 49]}    | ${[4, 49]}
                    ${1}        | ${1}  | ${[6, 49]}    | ${[8, 49]}
                    ${1}        | ${2}  | ${[12, 49]}   | ${[14, 49]}
                    ${1}        | ${3}  | ${[21, 49]}   | ${[23, 49]}
                    ${1}        | ${4}  | ${[24, 49]}   | ${[25, 49]}
                    ${1}        | ${5}  | ${[27, 49]}   | ${[28, 49]}
                    ${1}        | ${6}  | ${[42, 49]}   | ${[44, 49]}
                    ${1}        | ${7}  | ${[45, 49]}   | ${[46, 49]}
                    ${1}        | ${8}  | ${[48, 49]}   | ${[49, 49]}
                    `('performs 2 iterations', ({ iteration, index, left, right }) => {
                    it(`iteration ${iteration}[${index}] has interval [${left[0]}/${left[1]}, ${right[0]}/${right[1]}]`, () => {
                        let interval = res.iterations[iteration].intervals[index]
                        expect(interval.left.equals( new Fraction(left) )).toBeTruthy()
                        expect(interval.right.equals( new Fraction(right) )).toBeTruthy()
                    })
                })
            })

            describe('performs 2 iterations with two gaps of size 2, taking [3, 4, 6, 7] from an 8-segment line', function(){
                let res = new Cantor(8, [3, 4, 6, 7], 2)
                describe.each`
                    iteration   | index | left          |   right
                    ${0}        | ${0}  | ${[0, 8]}     | ${[2, 8]}
                    ${0}        | ${1}  | ${[4, 8]}     | ${[5, 8]}
                    ${0}        | ${2}  | ${[7, 8]}     | ${[8, 8]}
                    ${1}        | ${0}  | ${[0, 32]}    | ${[2, 32]}
                    ${1}        | ${1}  | ${[4, 32]}    | ${[5, 32]}
                    ${1}        | ${2}  | ${[7, 32]}    | ${[8, 32]}
                    ${1}        | ${3}  | ${[32, 64]}   | ${[34, 64]}
                    ${1}        | ${4}  | ${[36, 64]}   | ${[37, 64]}
                    ${1}        | ${5}  | ${[39, 64]}   | ${[40, 64]}
                    ${1}        | ${6}  | ${[56, 64]}   | ${[58, 64]}
                    ${1}        | ${7}  | ${[60, 64]}   | ${[61, 64]}
                    ${1}        | ${8}  | ${[63, 64]}   | ${[64, 64]}
                    `('performs 2 iterations', ({ iteration, index, left, right }) => {
                    it(`iteration ${iteration}[${index}] has interval [${left[0]}/${left[1]}, ${right[0]}/${right[1]}]`, () => {
                        let interval = res.iterations[iteration].intervals[index]
                        expect(interval.left.equals( new Fraction(left) )).toBeTruthy()
                        expect(interval.right.equals( new Fraction(right) )).toBeTruthy()
                    })
                })
            })
        })
    })
})
