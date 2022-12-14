import { unit as unitFraction } from './fraction'
import { type } from '../shared/utils'
import { IntervalRangeError } from '../shared/errors'

class Interval {
    #leftEndpoint = null
    #rightEndpoint = null

    constructor ( leftEndpointArg, rightEndpointArg ){
        if (type(leftEndpointArg) !== 'Fraction' || type(rightEndpointArg) !== 'Fraction') {
            throw new TypeError('Interval constructor requires two fractions.')
        } else if (rightEndpointArg.lessThan(leftEndpointArg)) {
            throw new IntervalRangeError('Left endpoint must be smaller than right endpoint.')
        } else if (leftEndpointArg.equals(rightEndpointArg)) {
            throw new IntervalRangeError('Interval must have length greater than 0.')
        } else if (!rightEndpointArg.subtract(leftEndpointArg).lessThan(unitFraction)){
            throw new IntervalRangeError('Interval must have length less than or equal to 1.')
        }

        this.#leftEndpoint = leftEndpointArg
        this.#rightEndpoint = rightEndpointArg
        // do not move into getter - makes console debugging easier
        this.str = `Left: ${this.#leftEndpoint.str}, Right: ${this.#rightEndpoint.str}, Length: ${this.len.reduce().str}`
    }

    get len() {
        return this.#rightEndpoint.subtract(this.#leftEndpoint)
    }

    get left() {
        return this.#leftEndpoint
    }

    get right() {
        return this.#rightEndpoint
    }
}

export default Interval
