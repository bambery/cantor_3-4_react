import { lcm, type } from '../shared/utils'
import { FracError } from '../shared/errors'

class Fraction {
    #numerator = 1
    #denominator = 1

    constructor(numerator, denominator) {
        if(denominator === 0){
            throw new FracError.ZeroDenominator()
        } else if (numerator < 0 || denominator < 0){
            throw new FracError.NoNegativeFractions()
        } else if (denominator < numerator){
            throw new FracError.FractionTooLarge()
        } else if (typeof numerator !== 'undefined' && typeof denominator !== 'undefined') {
            this.#numerator = numerator
            this.#denominator = denominator
        }
        // stop moving this into a getter! Console debugging is easier this way
        this.str = `${this.#numerator}/${this.#denominator}`
    }

    // given 2 fractions, convert them to have a common denominator and return them in a 2 item Array
    static commonDen(fracA, fracB){
        if (type(fracA) !== 'Fraction' || type(fracB) !== 'Fraction'){
            throw new TypeError(`Must pass two fractions as separate arguments to Fraction.commonDen: you passed in ${type(fracA)} and ${type(fracB)}`)
        }
        const common = lcm([fracA.den, fracB.den])
        let numA = (fracA.num * (common/fracA.den))
        let numB = (fracB.num * (common/fracB.den))
        return [ new Fraction(numA, common), new Fraction(numB, common) ]
    }

    get num() {
        return this.#numerator
    }

    get den() {
        return this.#denominator
    }

    reduce() {
        if (this.#numerator === 0 || this.#numerator === this.#denominator) {
            // decide to not reduce the leftmost/rightmost interval for now
            return this
        }

        let x = this.#numerator
        let y = this.#denominator
        let mod = null
        while (mod !== 0){
            mod = x % y
            x = y
            y = mod
        }

        return new Fraction(this.#numerator/x, this.#denominator/x)
    }

    // subtract the passed in fraction from and return a new Fraction
    subtract(rhs) {
        if (type(rhs) !== 'Fraction'){
            throw new TypeError(`Must pass only Fraction argument to subtract: you passed in ${type(rhs)}`)
        }
        let [ leftHS, rightHS ] = Fraction.commonDen(this, rhs)
        let numerator = leftHS.num - rightHS.num
        if(numerator < 0){
            throw new FracError.NoNegativeFractions(`Difference of ${this.str} and ${rhs.str} would be less than 0.`)
        }
        return new Fraction(numerator, leftHS.den)
    }

    add(rhs) {
        if (type(rhs) !== 'Fraction'){
            throw new TypeError(`Must pass only Fraction argument to add: you passed in ${type(rhs)}`)
        }

        let [ leftHS, rightHS ] = Fraction.commonDen(this, rhs)
        let numerator = leftHS.num + rightHS.num
        if (numerator > leftHS.den){
            throw new FracError.FractionTooLarge(`Sum of ${this.str} and ${rhs.str} would be greater than 1.`)
        }
        return new Fraction(numerator, leftHS.den)
    }

    lessThan(rhs){
        let [fracA, fracB] = Fraction.commonDen(this, rhs)
        return (fracA.num < fracB.num)
    }

    equals(rhs){
        let [fracA, fracB] = Fraction.commonDen(this, rhs)
        return (fracA.num === fracB.num)
    }
}

Fraction.unit = new Fraction(1, 1)
export const unit = Fraction.unit

export default Fraction
