import Fraction from './fraction'

const LineSegment = ( leftEndpoint, rightEndpoint ) => {
    let left = leftEndpoint
    let right = rightEndpoint
    let size = left.subtract(right)

    const toString = () => {
        return `Left: ${left.toString()}, Right: ${right.toString()}, Length: ${size.toString()}`;
    }

    return {
        left,
        right,
        size,
        toString
    }
}

export default LineSegment
