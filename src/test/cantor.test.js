import { removeIntervals } from '../shared/cantor'
import Cantor from '../shared/cantor'
import { ValueError } from '../shared/errors'
import Interval from '../models/interval'
import Fraction from '../models/fraction'

describe('Cantor Library', function() {
    describe('removeIntervals', function() {

        it('allows removal of one segment from the unit interval and returns two intervals', function() {
            // needs more cases
            let res = removeIntervals(Interval.unit, 5, [2])

            expect(res.length).toEqual(2)
            expect(res[0].left.equals(new Fraction(0, 5))).toBeTruthy()
            expect(res[0].right.equals(new Fraction(1, 5))).toBeTruthy()
            expect(res[1].left.equals(new Fraction(2, 5))).toBeTruthy()
            expect(res[1].right.equals(new Fraction(5, 5))).toBeTruthy()
        })

        it('allows removal of two segments from the unit interval and returns the remaining three intervals', function() {
            let res = removeIntervals(Interval.unit, 5, [2, 4])
            expect(res.length).toEqual(3)
            expect(res[0].left.equals(new Fraction(0, 5))).toBeTruthy()
            expect(res[0].right.equals(new Fraction(1, 5))).toBeTruthy()
            expect(res[1].left.equals(new Fraction(2, 5))).toBeTruthy()
            expect(res[1].right.equals(new Fraction(3, 5))).toBeTruthy()
            expect(res[2].left.equals(new Fraction(4, 5))).toBeTruthy()
            expect(res[2].right.equals(new Fraction(5, 5))).toBeTruthy()
        })

        it('allows removal of two segments from any given interval and returns the remaining three intervals', function() {
            let hh = new Interval(new Fraction(2, 5), new Fraction(3, 5))
            let res = removeIntervals(hh, 5, [2, 4])

            expect(res.length).toEqual(3)
            expect(res[0].left.equals(new Fraction(10, 25))).toBeTruthy()
            expect(res[0].right.equals(new Fraction(11, 25))).toBeTruthy()
            expect(res[1].left.equals(new Fraction(12, 25))).toBeTruthy()
            expect(res[1].right.equals(new Fraction(13, 25))).toBeTruthy()
            expect(res[2].left.equals(new Fraction(14, 25))).toBeTruthy()
            expect(res[2].right.equals(new Fraction(15, 25))).toBeTruthy()
        })

        it('fails when attempting to remove the first interval', function(){
            expect(() => removeIntervals(Interval.unit, 5, [1, 3])).toThrow(ValueError)
        })

        it('fails when attempting to remove the last interval', function(){
            expect(() => removeIntervals(Interval.unit, 5, [3, 5])).toThrow(ValueError)
        })
    })

    describe('Cantor iterations', function(){
        describe('Standard Cantor: split into 3, remove middle', function(){
            it('Performs 1 iteration of standard Cantor', function() {
                let res = new Cantor(3, [2], 1)
                expect(res.numIter).toEqual(1)
                expect(res.iterations[0].count).toEqual(2)

                let first = res.iterations[0].intervals.all[0]
                expect(first.left.equals(new Fraction(0,3))).toBeTruthy()
                expect(first.right.equals(new Fraction(1,3))).toBeTruthy()

                let second = res.iterations[0].intervals.all[1]
                expect(second.left.equals(new Fraction(2,3))).toBeTruthy()
                expect(second.right.equals(new Fraction(3,3))).toBeTruthy()
            })

            it('Performs 2 iterations of standard Cantor', function() {
                let res = new Cantor(3, [2], 2)
                expect(res.numIter).toEqual(2)
                expect(res.iterations[0].count).toEqual(2)

                let first = res.iterations[0].intervals.all[0]
                expect(first.left.equals(new Fraction(0,3))).toBeTruthy()
                expect(first.right.equals(new Fraction(1,3))).toBeTruthy()
                let second = res.iterations[0].intervals.all[1]
                expect(second.left.equals(new Fraction(2,3))).toBeTruthy()
                expect(second.right.equals(new Fraction(3,3))).toBeTruthy()

                expect(res.iterations[1].count).toEqual(4)
                first = res.iterations[1].intervals.all[0]
                expect(first.left.equals(new Fraction(0,9))).toBeTruthy()
                expect(first.right.equals(new Fraction(1,9))).toBeTruthy()
                second = res.iterations[1].intervals.all[1]
                expect(second.left.equals(new Fraction(2,9))).toBeTruthy()
                expect(second.right.equals(new Fraction(3,9))).toBeTruthy()
                let third = res.iterations[1].intervals.all[2]
                expect(third.left.equals(new Fraction(6,9))).toBeTruthy()
                expect(third.right.equals(new Fraction(7,9))).toBeTruthy()
                let fourth = res.iterations[1].intervals.all[3]
                expect(fourth.left.equals(new Fraction(8,9))).toBeTruthy()
                expect(fourth.right.equals(new Fraction(9,9))).toBeTruthy()
            })
        })

        describe('Non-standard Cantor', function() {
            it('Performs 1 iteration removing the 2nd and 4th segments of a unit interval divided into 5 segments', function(){
                let res = new Cantor(5, [2, 4], 1)
                expect(res.numIter).toEqual(1)

                expect(res.iterations[0].count).toEqual(3)

                let first = res.iterations[0].intervals.all[0]
                expect(first.left.equals(new Fraction(0,5))).toBeTruthy()
                expect(first.right.equals(new Fraction(1,5))).toBeTruthy()
                let second = res.iterations[0].intervals.all[1]
                expect(second.left.equals(new Fraction(2,5))).toBeTruthy()
                expect(second.right.equals(new Fraction(3,5))).toBeTruthy()
                let third = res.iterations[0].intervals.all[2]
                expect(third.left.equals(new Fraction(4,5))).toBeTruthy()
                expect(third.right.equals(new Fraction(5,5))).toBeTruthy()

            })

            it('Performs 1 iteration removing the 2nd and 3rd segments of a unit interval divided into 5 segments', function() {
                let res = new Cantor(5, [2, 3], 1)
                expect(res.numIter).toEqual(1)
                expect(res.iterations[0].count).toEqual(2)
                let first = res.iterations[0].intervals.all[0]
                expect(first.left.equals(new Fraction(0,5))).toBeTruthy()
                expect(first.right.equals(new Fraction(1,5))).toBeTruthy()
                let second = res.iterations[0].intervals.all[1]
                expect(second.left.equals(new Fraction(3,5))).toBeTruthy()
                expect(second.right.equals(new Fraction(5,5))).toBeTruthy()

            })

            it('Performs 2 iterations removing the 2nd and 3rd segments of a unit interval dividided into 5', function(){
                let res = new Cantor(5, [2, 3], 2)

                expect(res.numIter).toEqual(2)
                expect(res.iterations[0].count).toEqual(2)
                let first = res.iterations[0].intervals.all[0]
                expect(first.left.equals(new Fraction(0,5))).toBeTruthy()
                expect(first.right.equals(new Fraction(1,5))).toBeTruthy()
                let second = res.iterations[0].intervals.all[1]
                expect(second.left.equals(new Fraction(3,5))).toBeTruthy()
                expect(second.right.equals(new Fraction(5,5))).toBeTruthy()

                expect(res.iterations[1].count).toEqual(4)
                first = res.iterations[1].intervals.all[0]
                expect(first.left.equals(new Fraction(0,25))).toBeTruthy()
                expect(first.right.equals(new Fraction(1,25))).toBeTruthy()
                second = res.iterations[1].intervals.all[1]
                expect(second.left.equals(new Fraction(3,25))).toBeTruthy()
                expect(second.right.equals(new Fraction(5, 25))).toBeTruthy()
                let third = res.iterations[1].intervals.all[2]
                expect(third.left.equals(new Fraction(15,25))).toBeTruthy()
                expect(third.right.equals(new Fraction(17,25))).toBeTruthy()
                let fourth = res.iterations[1].intervals.all[3]
                expect(fourth.left.equals(new Fraction(21,25))).toBeTruthy()
                expect(fourth.right.equals(new Fraction(25,25))).toBeTruthy()
            })
        })
    })
})
