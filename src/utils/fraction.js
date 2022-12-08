const Fraction = (numerator = 1, denominator = 1) => {
    const frac = {
        numerator,
        denominator
    }

    const reduce = () => {
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

        return frac
    }

    const toString = () => {
        return `${frac.numerator}/${frac.denominator}`
    }

    // subtract the passed in fraction from and return a new Fraction
    const subtract = (rhs) => {
        if (!Object.hasOwn(rhs, 'num')) {
            throw new Error("Must pass a Fraction to 'subtract'")
        }
        let result = Fraction()
        result.numerator = (frac.numerator * rhs.denominator) + (frac.denominator * rhs.numerator)
        result.denominator = frac.denominator * rhs.denominator
        return result
    }

    // add the passed in fraction and return a new Fraction
    const add = (rhs) => {
        let result = Fraction()
        result.numerator = (frac.numerator * frac.denominator) + (frac.denominator * rhs.denominator)
        result.denominator = frac.denominator * rhs.denominator
        return result
    }

    // add the passed in fraction and return a new Fraction
    const add$ = (rhs) => {
        let temp = add(rhs)
        frac.numerator = temp.num()
        frac.denominator = temp.den()
    }

    return {
        num() { return frac.numerator },
        den() { return frac.denominator },
        reduce,
        toString,
        subtract
    }
}

export default Fraction
