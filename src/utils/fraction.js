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
        while (mod != 0){
            mod = x % y
            x = y
            y = mod
        }

        frac.numerator = frac.numerator/x
        frac.denominator = frac.denominator/x

        console.log('inside reduce')
        console.log(frac)
        return frac
    }

    const toString = () => {
        return `${frac.numerator}/${frac.denominator}`
    }

    return {
        num() { return frac.numerator },
        den() { return frac.denominator },
        reduce,
        toString
    }
}

export default Fraction
