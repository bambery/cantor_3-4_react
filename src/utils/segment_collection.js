// input: array of one or more Line Segments
const SegmentCollection = (segmentsArr) => {
    const segments = segmentsArr
    let count = segments.length
    const size = () =>
        let len = Fraction(0, 1)
        segments.forEach( segment ) => {
            len.add(segment.size)
        }


}

export default SegmentCollection
