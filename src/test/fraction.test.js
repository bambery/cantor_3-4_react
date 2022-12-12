import Fraction from '../models/fraction'

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

        it('fails to create a fraction for 2/1', function(){
            // eventually need to create custom errors
            expect( () => new Fraction(2,1)).toThrow()
        })

        it('fails to create a fraction with zero in the denominator', function(){
            // eventually need to create custom errors
            expect( () => new Fraction(1,0)).toThrow()
        })

    })

    describe('modifying Fractions', function() {
        it('cannot directly modify numerator or denominator', function() {
            let frac = new Fraction(3, 4)
            expect( () => {frac.num = 1}).toThrow()
            expect( () => {frac.den= 1}).toThrow()
        })

        describe('addition via "add"', function() {
            //weirdly, one does NOT use a before block here with Mocha
            let frac1 = new Fraction(2, 5)
            let frac2 = new Fraction(1, 5)

            let sum1 = frac1.add(frac2)
            let sum2 = frac2.add(frac1)

            it('does not modify the original fractions', function() {
                expect(frac1.num).toEqual(2)
                expect(frac1.den).toEqual(5)

                expect(frac2.num).toEqual(1)
                expect(frac2.den).toEqual(5)
            })

            it('can add two fractions with the same denominator', function() {
                expect(sum1.num).toEqual(3)
                expect(sum1.den).toEqual(5)

            })

            it('returns the same result regardless of order of operands', function(){
                expect(sum1.num).toEqual(sum2.num)
                expect(sum1.den).toEqual(sum2.den)
            })

        })
    })
})
