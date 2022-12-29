import { removeIntervals as cantor } from '../shared/cantor'
import { ValueError } from '../shared/errors'
import Interval from '../models/interval'
import Fraction from '../models/fraction'

describe('Cantor Library', function() {
    describe('removeIntervals', function() {
        let unit = new Interval(new Fraction(0, 1), new Fraction(1, 1))

        it('allows removal of one segment from the unit interval and returns two intervals', function() {
            // needs more cases
            let res = cantor(unit, 5, [2])

            expect(res.length).toEqual(2)
            expect(res[0].left.equals(new Fraction(0, 5))).toBeTruthy()
            expect(res[0].right.equals(new Fraction(1, 5))).toBeTruthy()
            expect(res[1].left.equals(new Fraction(2, 5))).toBeTruthy()
            expect(res[1].right.equals(new Fraction(5, 5))).toBeTruthy()
        })

        it('allows removal of two segments from the unit interval and returns the remaining three intervals', function() {
            let res = cantor(unit, 5, [2, 4])
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
            let res = cantor(hh, 5, [2, 4])

            expect(res.length).toEqual(3)
            expect(res[0].left.equals(new Fraction(10, 25))).toBeTruthy()
            expect(res[0].right.equals(new Fraction(11, 25))).toBeTruthy()
            expect(res[1].left.equals(new Fraction(12, 25))).toBeTruthy()
            expect(res[1].right.equals(new Fraction(13, 25))).toBeTruthy()
            expect(res[2].left.equals(new Fraction(14, 25))).toBeTruthy()
            expect(res[2].right.equals(new Fraction(15, 25))).toBeTruthy()
        })

        it('fails when attempting to remove the first interval', function(){
            expect(() => cantor(unit, 5, [1, 3])).toThrow(ValueError)
        })

        it('fails when attempting to remove the last interval', function(){
            expect(() => cantor(unit, 5, [3, 5])).toThrow(ValueError)
        })
    })
})
