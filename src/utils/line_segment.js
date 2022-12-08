import Fraction from './fraction'

const LineSegment = ( leftEndpoint, rightEndpoint ) => {
    let left = leftEndpoint
    let right = rightEndpoint

    // keeping as function for consistency with SegmentCollection's instance.size() which must be a function
    const size = function size() { return right.subtract(left) }

    const str = function str() {
        return `Left: ${left.str()}, Right: ${right.str()}, Length: ${size.str()}`;
    }

    return {
        left,
        right,
        size,
        str
    }
}

export default LineSegment
