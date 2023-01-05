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

export class IntervalRangeError extends Error {
    constructor(message, options) {
        super(message, options)

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, IntervalRangeError)
        }
        this.name = 'IntervalRangeError'
        this.message = message ? message : 'An invalid value was passed'
    }
}

export class ValueError extends Error {
    constructor(message, options) {
        super(message, options)

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, ValueError)
        }
        this.name = 'ValueError'
        this.message = message ? message : 'An invalid value was passed as an argument'
    }
}

export class IntervalSequenceError extends Error{
    constructor(message, options) {
        super(message, options)

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, ValueError)
        }
        this.name = 'IntervalSequenceError'
        this.message = message ? message : 'An invalid action was performed with Intervals.'
    }
}

export const FracError = {
    ZeroDenominator,
    NoNegativeFractions,
    FractionTooLarge
}
