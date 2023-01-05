import { lcm, type, checkArrContents } from '../shared/utils'
import { ValueError, FracError } from '../shared/errors'

class Fraction {
    #numerator = 1
    #denominator = 1

    constructor(numeratorArg, denominatorArg) {
        let numerator, denominator

        if(arguments.length === 0
            ||( arguments.length === 1
                && type(numeratorArg) === 'Array'
                && numeratorArg.length === 0 )
        ){
            this.#numerator = 1
            this.#denominator = 1
            return this
        } else if (arguments.length === 1
            && type(numeratorArg) === 'Array'
            && numeratorArg.length === 2
            && checkArrContents(numeratorArg, 'number')
        ){
            numerator = numeratorArg[0]
            denominator = numeratorArg[1]
        } else if (arguments.length === 2
            && type(numeratorArg) === 'number'
            && type(denominatorArg === 'number')
        ){
            numerator = numeratorArg
            denominator = denominatorArg
        } else {
            throw new TypeError(`Must send either an Array of two numbers, or two numbers to new Fraction: you passed ${numeratorArg}, ${denominatorArg}`)
        }

        if(denominator === 0){
            throw new FracError.ZeroDenominator()
        } else if (numerator < 0 || denominator < 0){
            throw new FracError.NoNegativeFractions()
        } else if (denominator < numerator){
            throw new FracError.FractionTooLarge()
        } else {
            this.#numerator = numerator
            this.#denominator = denominator
        }
        // stop moving this into a getter! Console debugging is easier this way
        this.str = `${this.#numerator}/${this.#denominator}`
    }

    // given 2 fractions, convert them to have a common denominator and return them in a 2 item Array

    get num() {
        return this.#numerator
    }

    get den() {
        return this.#denominator
    }

    commonDen(otherFrac){
        if (type(otherFrac) !== 'Fraction'){
            throw new ValueError(`Must pass one fraction to Fraction.commonDen: you passed in ${type(otherFrac)}`)
        }
        const common = lcm([this.den, otherFrac.den])
        let numA = (this.num * (common/this.den))
        let numB = (otherFrac.num * (common/otherFrac.den))
        return [ new Fraction(numA, common), new Fraction(numB, common) ]
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
            throw new ValueError(`Must pass only Fraction argument to subtract: you passed in ${type(rhs)}`)
        }
        let [ leftHS, rightHS ] = this.commonDen(rhs)
        let numerator = leftHS.num - rightHS.num
        if(numerator < 0){
            throw new FracError.NoNegativeFractions(`Difference of ${this.str} and ${rhs.str} would be less than 0.`)
        }
        return new Fraction(numerator, leftHS.den)
    }

    add(rhs) {
        if(type(rhs) === 'Fraction'){
            let [ leftHS, rightHS ] = this.commonDen(rhs)
            let numerator = leftHS.num + rightHS.num
            if (numerator > leftHS.den){
                throw new FracError.FractionTooLarge(`Sum of ${this.str} and ${rhs.str} would be greater than 1.`)
            }
            return new Fraction(numerator, leftHS.den)
        } else {
            throw new TypeError(`Must pass only Fraction argument to add: you passed in ${type(rhs)}`)
        }
    }

    lessThan(rhs){
        let [fracA, fracB] = this.commonDen(rhs)
        return (fracA.num < fracB.num)
    }

    greaterThan(rhs){
        let [fracA, fracB] = this.commonDen(rhs)
        return (fracA.num > fracB.num)
    }

    equals(rhs){
        let [fracA, fracB] = this.commonDen(rhs)
        return (fracA.num === fracB.num)
    }

    mult(rhs){
        if(type(rhs) === 'number'){
            return new Fraction(this.num * rhs, this.den)
        } else if (type(rhs) === 'Fraction'){
            return new Fraction(this.num * rhs.num, this.den * rhs.den)
        } else {
            throw new TypeError('Can only multiply fractions by a scalar or another fraction.')
        }
    }
}

Fraction.prototype.toString = function fracToString() { return this.str }

Fraction.unit = new Fraction(1, 1)

export default Fraction
