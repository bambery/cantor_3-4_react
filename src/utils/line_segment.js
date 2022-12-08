import Fraction from './fraction'

const LineSegment = ( leftEndpoint, rightEndpoint ) => {
    let left = leftEndpoint
    let right = rightEndpoint
    let size = left.subtract(right)

    const s = function str() {
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
