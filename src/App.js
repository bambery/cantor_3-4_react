import Fraction from './utils/fraction'
import Interval from './utils/interval'
import IntervalCollection from './utils/interval_collection'

import logo from './logo.svg';
import './App.css';

function App() {

    let foo = new Fraction(0, 2)
    let fooR = new Fraction(1, 2)
    let bar = new Fraction(3, 4)
    let barR = new Fraction(4,4)

    let ls1 = new Interval(foo, fooR)
    let ls2 = new Interval(bar, barR)

    let sc1 = new IntervalCollection([ls1, ls2])
    debugger

/*
    let seg = SegmentCollection([ls1, ls2])
    let foobar = seg.smallestInterval()

    */
    return (
        <div>
            whast up
        </div>
    );
}

export default App;
