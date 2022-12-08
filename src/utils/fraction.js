class Fraction {
    #numerator = 1
    #denominator = 1

    constructor(numerator, denominator) {
        if(denominator === 0){
            throw new Error('cannot have fractions with zero in the denominator')
            return false
        }

        this.#numerator = numerator
        this.#denominator = denominator
    }

    get num() {
        return this.numerator
    }

    get den() {
        return this.denominator
    }

    reduce() {
        if (this.numerator === 0 || this.numerator === this.denominator) {
            // decide to not reduce the leftmost/rightmost interval for now
            return this
        }

        let x = this.numerator
        let y = this.denominator
        let mod = null
        while (mod !== 0){
            mod = x % y
            x = y
            y = mod
        }

        return new Fraction(this.numerator/x, this.denominator/x)
    }

    reduce_() {
        let temp = this.reduce()
        this.numerator = temp.num
        this.denominator = temp.den
    }

    toString() {
        return `${this.numerator}/${this.denominator}`
    }

    // subtract the passed in fraction from and return a new Fraction
    subtract(rhs) {
        let num = (this.numerator * rhs.den) - (this.denominator * rhs.num)
        let den = this.denominator * rhs.den
        return new Fraction(num, den)
    }

    subtract_(rhs) {
        let temp = this.subtract(rhs)
        this.numerator = temp.num
        this.denominator = temp.den
        return this
    }

    // add the passed in fraction and return a new Fraction
    add(rhs) {
        let num = (this.numerator * rhs.den) + (this.denominator * rhs.den)
        let den = this.denominator * rhs.den
        return new Fraction(num, den)
    }

    add_(rhs) {
        let temp = this.add(rhs)
        this.numerator = temp.num
        this.denominator = temp.den
        return this
    }
}

export default Fraction
