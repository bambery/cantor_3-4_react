class ZeroDenominator extends Error {
    constructor(message, options) {
        super(message, options)

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor.name)
        }
        this.name = this.constructor.name
        this.message = message ? message : 'Cannot have fractions with zero in the denominator'
    }
}

class NoNegativeFractions extends Error {
    constructor(message, options) {
        super(message, options)

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor.name)
        }
        this.name = this.constructor.name
        this.message = message ? message : 'Cannot support negative fractions'
    }
}

class FractionTooLarge extends Error {
    constructor(message, options) {
        super(message, options)

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor.name)
        }
        this.name = this.constructor.name
        this.message = message ? message : 'Cannot support fractions greater than 1'
    }
}

export class IntervalRangeError extends Error {
    constructor(message, options) {
        super(message, options)

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor.name)
        }
        this.name = this.constructor.name
        this.message = message ? message : 'An invalid value was passed'
    }
}

export class ValueError extends Error {
    constructor(message, options) {
        super(message, options)

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor.name)
        }
        this.name = this.constructor.name
        this.message = message ? message : 'An invalid value was passed as an argument'
    }
}

export class IntervalSequenceError extends Error{
    constructor(message, options) {
        super(message, options)

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor.name)
        }
        this.name = this.constructor.name
        this.message = message ? message : 'An invalid action was performed with Intervals.'
    }
}

export class ArgumentError extends Error {
    constructor(message, options) {
        super(message, options)

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor.name)
        }
        this.name = this.constructor.name
        this.message = message ? message : 'An invalid argument was passed to this function.'
    }
}

export class UnsafeIntegerError extends Error {
    constructor(message, options) {
        super(message, options)

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor.name)
        }
        this.name = this.constructor.name
        this.message = message ? message : 'The common denominator for this interval was larger than the max interval size.'
    }
}

export const FracError = {
    ZeroDenominator,
    NoNegativeFractions,
    FractionTooLarge
}
