import { type, lcm } from '../shared/utils'
import { IntervalRangeError, ValueError } from '../shared/errors'
import Fraction from './fraction'

class Interval {
    #leftEndpoint = null
    #rightEndpoint = null

    constructor ( leftEndpointArg, rightEndpointArg ){
        if (type(leftEndpointArg) !== 'Fraction' || type(rightEndpointArg) !== 'Fraction') {
            throw new TypeError('Interval constructor requires two fractions.')
        } else if (rightEndpointArg.lessThan(leftEndpointArg)) {
            throw new IntervalRangeError(`Left endpoint ${leftEndpointArg.str} must be smaller than right endpoint ${rightEndpointArg.str}.`)
        } else if (leftEndpointArg.equals(rightEndpointArg)) {
            throw new IntervalRangeError('Interval must have length greater than 0.')
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

    commonDen(desiredDen = null) {
        var common = null
        if(!desiredDen){
            common = lcm([this.left.den, this.right.den])
        } else if (desiredDen % this.left.den > 0 || desiredDen % this.right.den > 0){
            throw new ValueError(`Cannot convert ${this.str} to denominator ${desiredDen}.`)
        } else {
            common = desiredDen
        }
        let pointL = new Fraction(common/this.left.den * this.left.num, common)
        let pointR = new Fraction(common/this.right.den * this.right.num, common)
        return new Interval(pointL, pointR)
    }

    // removes an internal part of the interval, returns a 2 element array of the remaining line segments
    subtract(intToSub) {
        let remainingSegments = []
        let commonDenominator = lcm([this.left.den, this.right.den, intToSub.left.den, intToSub.right.den])
        let intCommon = this.commonDen(commonDenominator)
        let subCommon = intToSub.commonDen(commonDenominator)

        // check that the interval to be subtracted is contained in the current interval
        if(!intCommon.left.lessThan(subCommon.left) || !intCommon.right.greaterThan(subCommon.right)){
            throw new IntervalRangeError(`Interval ${intToSub.str} is not contained within and cannot be subtracted from ${this.str}.`)
        }

        remainingSegments.push( new Interval(intCommon.left, subCommon.left) )
        remainingSegments.push( new Interval(subCommon.right, intCommon.right) )
        return remainingSegments
    }

    // returns a new interval representing the sum of the two sequential intervals
    add(intToAdd) {
        let commonDenominator = lcm([this.left.den, this.right.den, intToAdd.left.den, intToAdd.right.den])
        let intCommon = this.commonDen(commonDenominator)
        let addCommon = intToAdd.commonDen(commonDenominator)
        if(intCommon.right.num + 1 !== addCommon.left.num){
            throw new IntervalRangeError(`The given interval, ${intToAdd.str}, is not sequrntial to this interval, ${this.str}.`)
        }

        return new Interval(intCommon.left, addCommon.right)
    }
}

export default Interval
