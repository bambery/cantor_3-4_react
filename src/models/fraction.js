import { lcm, type } from '../shared/utils'

window.lcm = lcm
window.type = type

class Fraction {
    #numerator = 1
    #denominator = 1

    constructor(numerator, denominator) {
        if(denominator <= 0){
            throw new Error('cannot have fractions with zero or negative in the denominator')
        } else if (denominator < numerator){
            throw new Error("Cannot support fractions greater than 1")
        } else if (numerator < 0){
            throw new Error("Cannot support negative numbers")
        } else if (typeof numerator !== 'undefined' && typeof denominator !== 'undefined') {
            this.#numerator = numerator
            this.#denominator = denominator
            // stop removing this into a getter! It makes console debugging easier this way
            this.str = `${this.#numerator}/${this.#denominator}`
        }
    }

    // given 2 fractions, convert them to have a common denominator and return them in a 2 item Array
    static commonDen(fracA, fracB){
        if (type(fracA) !== 'Fraction' || type(fracB) !== 'Fraction'){
            throw new Error('Must pass two fractions as separate arguments to Fraction.commonDen')
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
/*
    reduce_() {
        let temp = this.reduce()
        this.#numerator = temp.num
        this.#denominator = temp.den
    }
    */

    // subtract the passed in fraction from and return a new Fraction
    subtract(rhs) {
        if (type(rhs) !== 'Fraction'){
            throw new Error('Must pass only Fraction argument')
        }
        let [ leftHS, rightHS ] = Fraction.commonDen(this, rhs)
        let numerator = leftHS.num - rightHS.num
        if(numerator < 0){
            throw new Error(`ERROR: Difference of ${this.str} and ${rhs.str} would be less than 0.`)
        }
        return new Fraction(numerator, leftHS.den)
    }
/*
    subtract_(rhs) {
        if (type(rhs) !== 'Fraction'){
            throw new Error('Must pass only Fraction argument')
        }
        let temp = this.subtract(rhs)
        this.#numerator = temp.num
        this.#denominator = temp.den
        return this
    }
    */

    // add the passed in fraction and return a new Fraction
    add(rhs) {
        if (type(rhs) !== 'Fraction'){
            throw new Error('Must pass only Fraction argument')
        }

        let [ leftHS, rightHS ] = Fraction.commonDen(this, rhs)
        let numerator = leftHS.num + rightHS.num
        if (numerator > leftHS.den){
            throw new Error(`ERROR: Sum of ${this.str} and ${rhs.str} would be greater than 1.`)
        }
        return new Fraction(numerator, leftHS.den)
    }
/*
    add_(rhs) {
        let temp = this.add(rhs)
        this.#numerator = temp.num
        this.#denominator = temp.den
        return this
    }
    */
}

export default Fraction
