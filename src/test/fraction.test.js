import Fraction from '../models/fraction'
import { ValueError, FracError } from '../shared/errors'

describe('Fractions', function() {

    describe('creating fractions', function() {
        it('default creates a 1/1 fraction if no arguments passed', function() {
            let frac = new Fraction
            expect(frac.num).toEqual(1)
            expect(frac.den).toEqual(1)
            expect( frac.num / frac.den).toEqual(1)
        })

        it('creates a fraction for 1/2 passing in 1, 2', function(){
            let frac = new Fraction(1, 2)
            expect(frac.num).toEqual(1)
            expect(frac.den).toEqual(2)
            expect( frac.num / frac.den).toEqual(0.5)
        })

        it('creates a fraction for 1/2 passing in an Array [1, 2]', function(){
            let frac = new Fraction([1, 2])
            expect(frac.num).toEqual(1)
            expect(frac.den).toEqual(2)
            expect( frac.num / frac.den).toEqual(0.5)
        })

        it('fails to create a fraction when only one number is passed in', function(){
            expect( () => new Fraction(1) ).toThrow(TypeError)
        })

        it('fails to create when non-numbers are passed', function(){
            expect( () => new Fraction(new Fraction(1,2), 2 )).toThrow(TypeError)
        })

        it('fails to create a fraction with zero in the denominator', function(){
            expect( () => new Fraction(1,0)).toThrow(FracError.ZeroDenominator)
        })

        it('fails to create a fraction if it would be larger in magnitude than 1', function(){
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
            [ new Fraction(1,3), new Fraction(3,4), true]
        ])('lessThan', (lhs, rhs, answer) => {
            expect(lhs.lessThan(rhs)).toEqual(answer)
        })

        describe.each([
            [ new Fraction(1,2), new Fraction(1,2), false ],
            [ new Fraction(0,2), new Fraction(1,2), false ],
            [ new Fraction(2,2), new Fraction(1,2), true ],
            [ new Fraction(2,2), new Fraction(4,4), false ],
            [ new Fraction(2,3), new Fraction(1,8), true ],
            [ new Fraction(1,3), new Fraction(3,4), false]
        ])('greaterThan', (lhs, rhs, answer) => {
            expect(lhs.greaterThan(rhs)).toEqual(answer)
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
                let sum = frac_2_5.add(frac_1_5)
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

            describe('addition with a scalar', function(){
                it('it increases the numerator by that much', function(){
                    expect( new Fraction(1,6).add(1).equals( new Fraction(2, 6) )).toBe(true)
                })

                it('does not modify the original Fraction', function(){
                    let frac = new Fraction(1,6)
                    frac.add(new Fraction(1,2))
                    expect(new Fraction(1,6).equals(frac)).toBe(true)
                })
            })



        })

        describe('subtraction', function(){
            let frac_5_7 = new Fraction(5, 7)
            let frac_3_7 = new Fraction(3, 7)
            let frac_2_5 = new Fraction(2, 5)

            it('does not modify the original fractions', function(){
                let diff = frac_5_7.subtract(frac_2_5)

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

            it('fails if passed an argument other than Fraction', function(){
                expect( () => new Fraction(1,2).subtract(4) ).toThrow(ValueError)
            })
        })

        describe('multiplication', function(){
            describe.each`
            first       | second        | result
            ${[1, 2]}   | ${[1, 4]}     | ${[1, 8]}
            ${[0, 2]}   | ${[1, 4]}     | ${[0, 8]}
            ${[15, 20]} | ${[1, 7]}     | ${[15, 140]}
            `('multiplying a fraction by another fraction', ({first, second, result}) => {
                [first, second, result] = [first, second, result].map( frac => new Fraction(frac) )

                it(`multiply ${first.str} by ${second.str} to get ${result.str}`, () => {
                    expect(first.mult(second).equals(result)).toBeTruthy()
                })
            })

            describe.each`
            frac        | scalar    | result
            ${[1, 2]}   | ${2}      | ${[1, 1]}
            ${[2, 18]}  | ${3}      | ${[6, 18]}
            ${[5, 7]}   | ${0}      | ${[0, 7]}
            ${[5, 7]}   | ${1}      | ${[5, 7]}
            `('multiplying a fraction by a scalar', ({frac, scalar, result}) => {
                [frac, result] = [frac, result].map( arr => new Fraction(arr) )

                it(`multiply ${frac.str} by ${scalar} to get ${result}`, () => {
                    expect(frac.mult(scalar).equals(result)).toBeTruthy()
                })
            })
        })
    }) // fraction arithmetic

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

        describe.each`
            original    | result
            ${[2,4]}    | ${[1,2]}
            ${[60, 94]} | ${[30, 47]}
            ${[60, 92]} | ${[15, 23]}
            ${[56, 86]} | ${[28, 43]}
            ${[56, 63]} | ${[8, 9]}
        `('properly reduces fractions', ({original, result}) => {
            [original, result] = [original, result].map( frac => new Fraction(frac) )
            it(`reduce ${original.str} to ${result.str}`, () => {
                expect(original.reduce().equals(result)).toBeTruthy()
            })
        })
    })

    describe('finding a common denominator', function() {
        describe.each`
            first       | second        | firstCommon   | secondCommon
            ${[5, 7]}   | ${[1, 6]}     | ${[30, 42]}   | ${[7, 42]}
            ${[5, 7]}   | ${[30, 47]}   | ${[235, 329]} | ${[210, 329]}
            ${[3, 4]}   | ${[7, 12]}    | ${[9, 12]}    | ${[7, 12]}
            ${[1, 86]}  | ${[0, 2]}     | ${[1, 86]}    | ${[0, 86]}
            ${[6, 16]}  | ${[8, 24]}    | ${[18, 48]}   | ${[16, 48]}
            ${[4, 16]}  | ${[2, 8]}     | ${[4, 16]}    | ${[4, 16]}
        `('given a second fraction, converts itself and the passed in fraction to a common denominator', ({first, second, firstCommon, secondCommon}) => {
            [first, second, firstCommon, secondCommon] = [first, second, firstCommon, secondCommon].map( frac => new Fraction(frac) )

            it(`convert ${first.str} => ${firstCommon.str} and ${second.str} => ${secondCommon.str}`, () => {
                let [firstTest, secondTest] = first.commonDen(second)
                let common = firstCommon.den

                expect(firstTest.equals(firstCommon)).toBeTruthy()
                expect(secondTest.equals(secondCommon)).toBeTruthy()

                expect(firstTest.den).toEqual(secondTest.den)
                expect(firstTest.den).toEqual(common)
                expect(secondTest.den).toEqual(common)
            })
        })

        it('throws if something other than Fraction is passed', function(){
            expect( () => new Fraction(1,2).commonDen(4) ).toThrow(ValueError)
        })
    })
})
