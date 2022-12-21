import Fraction from '../models/fraction'
import { FracError } from '../shared/errors'

describe('Fractions', function() {

    describe('creating fractions', function() {
        it('default creates a 1/1 fraction', function() {
            let frac = new Fraction
            expect(frac.num).toEqual(1)
            expect(frac.den).toEqual(1)
            expect( frac.num / frac.den).toEqual(1)
        })
        it('creates a fraction for 1/2', function(){
            let frac = new Fraction(1, 2)
            expect(frac.num).toEqual(1)
            expect(frac.den).toEqual(2)
            expect( frac.num / frac.den).toEqual(0.5)
        })

        it('fails to create a fraction when only one number is passed in', function(){
            expect( () => new Fraction(1) ).toThrow(TypeError)
        })

        it('fails to create a fraction for 2/1', function(){
            expect( () => new Fraction(2,1)).toThrow(FracError.FractionTooLarge)
        })

        it('fails to create a fraction with zero in the denominator', function(){
            expect( () => new Fraction(1,0)).toThrow(FracError.ZeroDenominator)
        })

        it('fails to create a fraction with negative numerator or denominator', function(){
            expect( () => new Fraction(-1,1)).toThrow(FracError.NoNegativeFractions)
            expect( () => new Fraction(1,-1)).toThrow(FracError.NoNegativeFractions)
            expect( () => new Fraction(-1,-1)).toThrow(FracError.NoNegativeFractions)
        })

    })

    it('cannot directly modify numerator or denominator', function() {
        let frac = new Fraction(3, 4)
        expect( () => frac.num = 1).toThrow(TypeError)
        expect( () => frac.den= 1).toThrow(TypeError)
    })

    describe('Fraction comparisons', function() {
        describe.each([
            [ new Fraction(1,2), new Fraction(1,2), false ],
            [ new Fraction(0,2), new Fraction(1,2), true ],
            [ new Fraction(2,2), new Fraction(4,4), false ],
            [ new Fraction(2,3), new Fraction(1,8), false ],
            [ new Fraction(1,3), new Fraction(3,4), true]])('lessThan', (lhs, rhs, answer) => {
            expect(lhs.lessThan(rhs)).toEqual(answer)
        })

        describe.each([
            [ new Fraction(0,2), new Fraction(0,4), true ],
            [ new Fraction(1,2), new Fraction(2,4), true ],
            [ new Fraction(2,2), new Fraction(4,4), true ],
            [ new Fraction(1,2), new Fraction(1,2), true ],
            [ new Fraction(2,3), new Fraction(1,8), false ],
            [ new Fraction(3,4), new Fraction(1,4), false ]
        ])('equals', (lhs, rhs, answer) => {
            expect(lhs.equals(rhs)).toEqual(answer)
        })
    })

    describe('Fraction arithmetic', function() {
        describe('addition', function() {
            let frac_2_5 = new Fraction(2, 5)
            let frac_1_5 = new Fraction(1, 5)
            let frac_1_3 = new Fraction(1, 3)
            let frac_1_6 = new Fraction(1, 6)
            let frac_4_5 = new Fraction(4, 5)

            it('does not modify the original fractions', function() {
                let sum = frac_2_5.add(frac_1_5) // eslint-disable-line
                expect(frac_2_5.num).toEqual(2)
                expect(frac_2_5.den).toEqual(5)

                expect(frac_1_5.num).toEqual(1)
                expect(frac_1_5.den).toEqual(5)
            })

            it('can add two fractions with the same denominator', function() {
                let sum = frac_2_5.add(frac_1_5)
                expect(sum.num).toEqual(3)
                expect(sum.den).toEqual(5)
            })

            it('returns the same result regardless of order of operands', function(){
                let sum = frac_2_5.add(frac_1_5)
                let sum2 = frac_1_5.add(frac_2_5)
                expect(sum.num).toEqual(sum2.num)
                expect(sum.den).toEqual(sum2.den)
            })

            it('can add two fractions of different denominators', function(){
                let sum = frac_1_5.add(frac_1_3)

                expect(sum.num).toEqual(8)
                expect(sum.den).toEqual(15)
            })

            it('does not reduce the sum', function(){
                let sum = frac_1_6.add(frac_1_3)

                expect(sum.num).toEqual(3)
                expect(sum.den).toEqual(6)
            })

            it('fails if the sum would be greater than 1', function(){
                expect( () => frac_4_5.add(frac_2_5) ).toThrow(FracError.FractionTooLarge)
            })

            it('succeeds if the sum would be 1', function() {
                let sum = frac_4_5.add(frac_1_5)
                expect(sum.num).toEqual(5)
                expect(sum.den).toEqual(5)
            })

        })

        describe('subtraction', function(){
            let frac_5_7 = new Fraction(5, 7)
            let frac_3_7 = new Fraction(3, 7)
            let frac_2_5 = new Fraction(2, 5)

            it('does not modify the original fractions', function(){
                let diff = frac_5_7.subtract(frac_2_5) // eslint-disable-line

                expect(frac_5_7.num).toEqual(5)
                expect(frac_5_7.den).toEqual(7)

                expect(frac_2_5.num).toEqual(2)
                expect(frac_2_5.den).toEqual(5)
            })

            it('can subtract two fractions with the same denominator', function(){
                let diff = frac_5_7.subtract(frac_3_7)

                expect(diff.num).toEqual(2)
                expect(diff.den).toEqual(7)
            })

            it('can subtract two fractions of different denominators', function(){
                let diff = frac_5_7.subtract(frac_2_5)

                expect(diff.num).toEqual(11)
                expect(diff.den).toEqual(35)

            })

            it('fails if the result would be negative', function(){
                expect( () => frac_2_5.subtract(frac_5_7) ).toThrow(FracError.NoNegativeFractions)
            })

            it('succeeds if the result would be zero', function(){
                let diff = frac_2_5.subtract(frac_2_5)

                expect(diff.num).toEqual(0)
                expect(diff.den).toEqual(5)
            })
        })

        describe('reducing a fraction', function(){
            describe.each([
                [new Fraction(0,4)],
                [new Fraction(0, 94)],
                [new Fraction(0, 1)],
                [new Fraction(0, 86)]
            ])('does not reduce fractions with zero in the numerator', (orig) => {
                it(`do not reduce ${orig.str}`, () => {
                    expect(orig.reduce().num).toEqual(orig.num)
                    expect(orig.reduce().den).toEqual(orig.den)
                })
            })

            describe.each([
                [new Fraction(4,4)],
                [new Fraction(94, 94)],
                [new Fraction(1, 1)],
                [new Fraction(86, 86)]
            ])('does not reduce fractions with the same numerator and denominator', (orig) => {
                it(`do not reduce ${orig.str}`, () => {
                    expect(orig.reduce().num).toEqual(orig.num)
                    expect(orig.reduce().den).toEqual(orig.den)
                })
            })

            describe.each([
                [new Fraction(1,4)],
                [new Fraction(13, 94)],
                [new Fraction(27, 35)],
                [new Fraction(3, 86)]
            ])('does not reduce fractions that cannot be reduced', (orig) => {
                it(`do not reduce ${orig.str}`, () => {
                    expect(orig.reduce().num).toEqual(orig.num)
                    expect(orig.reduce().den).toEqual(orig.den)
                })
            })

            describe.each([
                [new Fraction(2,4), new Fraction(1,2)],
                [new Fraction(60, 94), new Fraction(30, 47)],
                [new Fraction(60, 92), new Fraction(15, 23)],
                [new Fraction(56, 86), new Fraction(28, 43)],
                [new Fraction(56, 63), new Fraction(8, 9)]
            ])('properly reduces fractions', (orig, result) => {
                it(`reduce ${orig.str} to ${result.str}`, () => {
                    expect(orig.reduce().num).toEqual(result.num)
                    expect(orig.reduce().den).toEqual(result.den)
                })
            })
        })
    })

    describe('static class method: Fraction.commonDen', function() {
        describe.each([
            [new Fraction(5, 7), new Fraction(1, 6), new Fraction(30, 42), new Fraction(7, 42)],
            [new Fraction(5, 7), new Fraction(30, 47), new Fraction(235, 329), new Fraction(210, 329)],
            [new Fraction(3, 4), new Fraction(7, 12), new Fraction(9, 12), new Fraction(7, 12)],
            [new Fraction(1, 86), new Fraction(0, 2), new Fraction(1, 86), new Fraction(0, 86)],
            [new Fraction(6, 16), new Fraction(8, 24), new Fraction(18, 48), new Fraction(16, 48)],
            [new Fraction(4, 16), new Fraction(2, 8), new Fraction(4, 16), new Fraction(4, 16)]
        ])('converts itself and the passed in fraction to a common denominator', (first, second, firstResult, secondResult) => {
            it(`convert ${first.str} => ${firstResult.str} and ${second.str} => ${secondResult.str}`, () => {
                let [firstTest, secondTest] = Fraction.commonDen(first, second)

                expect(firstTest.num).toEqual(firstResult.num)
                expect(firstTest.den).toEqual(firstResult.den)

                expect(secondTest.num).toEqual(secondResult.num)
                expect(secondTest.den).toEqual(secondResult.den)

                expect(firstResult.den).toEqual(secondResult.den)
            })
        })
    })
})
