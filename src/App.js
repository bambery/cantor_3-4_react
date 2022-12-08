import Fraction from './utils/fraction'
import LineSegment from './utils/line_segment'
import SegmentCollection from './utils/segment_collection'

import logo from './logo.svg';
import './App.css';

function App() {

    let foo = Fraction(0, 2)
    let fooR = Fraction(1, 2)
    let bar = Fraction(3, 4)
    let barR = Fraction(4,4)

    let ls1 = LineSegment(foo, fooR)
    let ls2 = LineSegment(bar, barR)

    let seg = SegmentCollection([ls1, ls2])
    let foobar = seg.smallestInterval()

    debugger
    return (
        <div>
            whast up
        </div>
    );
}

export default App;
