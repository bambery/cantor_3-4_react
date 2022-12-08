import Fraction from './fraction'
import LineSegment from './line_segment'

// input: array of one or more Line Segments
const SegmentCollection = (segmentsArr) => {
    if (!Array.isArray(segmentsArr)){ throw new Error('Must pass an array of segments to SegmentCollection')}

    const segments = segmentsArr
    let count = segments.length

    const size = function size(){
        let len = Fraction(0, 1)
        segments.forEach( segment  => {
            len.add_(segment.size())
        })
        return len
    }

    const gapSize = function gapSize(){
        let gap = Fraction(1,1)
        return gap.subtract(size())
    }

    const gaps = function gaps(){
        const g = []
        segments.forEach( segment => {
            let ls = LineSegment( segment.right, segment.left )
            g.push(ls)
        })
        return g
    }

    const concat_ = function concat_(segmentArr){
        segmentArr = segmentArr.concat(segmentArr)
    }

    // TODO: it may not always work in the future to assume the smallest interval is the largest denominator among the interval sizes
    const smallestInterval = function smallestInterval() {
    //const smallestInterval = function smallestInterval(segArr) {
        let denominators = segments.map(s => s.size().reduce().den())
        debugger
    }

    // returns an array of the segments converted to the lowest common denominator
    const segmentsCommonDen = function segmentsCommonDen(){
        return null

    }


    return {
        segments,
        count,
        size,
        gapSize,
        gaps,
        concat_,
        smallestInterval
    }
}

export default SegmentCollection
