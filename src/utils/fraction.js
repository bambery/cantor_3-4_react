const Fraction = (numerator = 1, denominator = 1) => {

    if(denominator === 0){
        throw new Error('cannot have fractions with zero in the denominator')
        return false
    }

    const frac = {
        numerator,
        denominator
    }

    const reduce = function reduceFrac() {
        if (frac.numerator === 0 || frac.denominator === 0 || frac.numerator === frac.denominator) {
            // decide to not reduce the leftmost/rightmost interval for now
            return frac
        }

        let x = frac.numerator
        let y = frac.denominator
        let mod = null
        while (mod !== 0){
            mod = x % y
            x = y
            y = mod
        }

        frac.numerator = frac.numerator/x
        frac.denominator = frac.denominator/x

        return this
    }

    const reduce_ = function reduceMutative() {
        let temp = reduce()
        frac.numerator = temp.num()
        frac.denominator = temp.den()
    }

    const str = function toString() {
        return `${frac.numerator}/${frac.denominator}`
    }

    // subtract the passed in fraction from and return a new Fraction
    const subtract = function subtractFrac(rhs) {
        let num = (frac.numerator * rhs.den()) - (frac.denominator * rhs.num())
        let den = frac.denominator * rhs.den()
        return Fraction(num, den)
    }

    const subtract_ = function subtractMutative(rhs){
        let temp = subtract(rhs)
        frac.numerator = temp.num()
        frac.denominator = temp.den()
    }

    // add the passed in fraction and return a new Fraction
    const add = function addFrac(rhs) {
        let num = (frac.numerator * rhs.den()) + (frac.denominator * rhs.den())
        let den = frac.denominator * rhs.den()
        return Fraction(num, den)
    }

    // add the passed in fraction and return a new Fraction
    const add_ = function add_(rhs) {
        let temp = add(rhs)
        frac.numerator = temp.num()
        frac.denominator = temp.den()
    }

    return {
        num() { return frac.numerator },
        den() { return frac.denominator },
        str,
        reduce,
        reduce_,
        subtract,
        subtract_,
        add,
        add_
    }
}

export default Fraction
