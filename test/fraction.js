import { expect } from 'chai'
import Fraction from '../src/models/fraction.js'

describe('Fractions', function() {
    describe('creating fractions', function() {
        it('default creates a 1/1 fraction', function() {
            let frac = new Fraction
            expect(frac.num).to.equal(1)
            expect(frac.den).to.equal(1)
            expect( frac.num / frac.den).to.equal(1)
        })

        it('creates a fraction for 1/2', function(){
            let frac = new Fraction(1, 2)
            expect(frac.num).to.equal(1)
            expect(frac.den).to.equal(2)
            expect( frac.num / frac.den).to.equal(0.5)
        })

        it('fails to create a fraction for 2/1', function(){
            // eventually need to create custom errors
            expect( () => new Fraction(2,1)).to.throw()
        })

        it('fails to create a fraction with zero in the denominator', function(){
            // eventually need to create custom errors
            expect( () => new Fraction(1,0)).to.throw()
        })

    })

    describe('modifying Fractions', function() {
        it('cannot directly modify numerator or denominator', function() {
            let frac = new Fraction(3, 4)
            expect( () => {frac.num = 1}).to.throw()
            expect( () => {frac.den= 1}).to.throw()
        })

        describe('addition via "add"', function() {
            //weirdly, one does NOT use a before block here with Mocha
            let frac1 = new Fraction(2, 5)
            let frac2 = new Fraction(1, 5)

            let sum1 = frac1.add(frac2)
            let sum2 = frac2.add(frac1)

            it('does not modify the original fractions', function() {
                expect(frac1.num).to.equal(2)
                expect(frac1.den).to.equal(5)

                expect(frac2.num).to.equal(1)
                expect(frac2.den).to.equal(5)
            })

            it('can add two fractions with the same denominator', function() {
                expect(sum1.num).to.equal(3)
                expect(sum1.den).to.equal(5)

            })

            it('returns the same result regardless of order of operands', function(){
                expect(sum1.num).to.equal(sum2.num)
                expect(sum1.den).to.equal(sum2.den)
            })

        })

    })
})
