import Interval from '../models/interval'
import Fraction from '../models/fraction'
import { IntervalRangeError } from '../shared/errors'

describe('Interval', function() {
    describe('creating intervals', function(){
        describe.each([
            [ new Fraction(0,2), new Fraction(1,1), new Fraction(1,1) ],
            [ new Fraction(0,5), new Fraction(3, 5), new Fraction(3, 5) ],
            [ new Fraction(2,3), new Fraction(18,21), new Fraction(4, 21) ]
        ])('when passed two appropriate fractions', (left, right, correctLen) => {
            it(`Creates an Interval [${left.str}, ${right.str}] with length ${correctLen.str}`, () => {
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
})
