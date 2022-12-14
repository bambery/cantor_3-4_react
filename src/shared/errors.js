class ZeroDenominator extends Error {
    constructor(message, options) {
        super(message, options)

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, ZeroDenominator)
        }
        this.name = 'ZeroDenominator'
        this.message = message ? message : 'Cannot have fractions with zero in the denominator'
    }
}

class NoNegativeFractions extends Error {
    constructor(message, options) {
        super(message, options)

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, NoNegativeFractions)
        }
        this.name = 'NoNegativeFractions'
        this.message = message ? message : 'Cannot support negative fractions'
    }
}

class FractionTooLarge extends Error {
    constructor(message, options) {
        super(message, options)

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, FractionTooLarge)
        }
        this.name = 'FractionTooLarge'
        this.message = message ? message : 'Cannot support fractions greater than 1'
    }
}

export class ValueError extends Error {
    constructor(message, options) {
        super(message, options)

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, FractionTooLarge)
        }
        this.name = 'ValueError'
        this.message = message ? message : 'An invalid value was passed'
    }
}

export const FracError = {
    ZeroDenominator,
    NoNegativeFractions,
    FractionTooLarge
}
