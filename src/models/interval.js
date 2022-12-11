import Fraction from './fraction'

class Interval {
    #leftEndpoint = null
    #rightEndpoint = null

    constructor ( leftEndpointArg, rightEndpointArg ){
        this.#leftEndpoint = leftEndpointArg
        this.#rightEndpoint = rightEndpointArg
        this.len = this.#rightEndpoint.subtract(this.#leftEndpoint)
        this.str = `Left: ${this.#leftEndpoint.str}, Right: ${this.#rightEndpoint.str}, Length: ${this.len.reduce().str}`;
    }

    get left() {
        return this.#leftEndpoint
    }

    get right() {
        return this.#rightEndpoint
    }
}

export default Interval
