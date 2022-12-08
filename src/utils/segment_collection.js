import LineSegment from './line_segment'

// input: array of one or more Line Segments
const SegmentCollection = (segmentsArr) => {
    const segments = segmentsArr
    let count = segments.length

    const size = fraction size(){
        let len = Fraction(0, 1)
        segments.forEach( segment ) => {
            len.add_(segment.size)
        }
        return len
    }

    const gapSize = function gapSize(){
        let gap = Fraction(1,1)
        return gap.subtract(len())
    }

    const gaps = function gaps(){
        const g = []
        segments.forEach( segment => {
            let ls = LineSegment( segment.right, segment.left )
            g.push(ls)
        })
        return g
    }

    const push = function


}

export default SegmentCollection
