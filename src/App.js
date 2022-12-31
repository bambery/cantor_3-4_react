import Fraction from './models/fraction'
import Interval from './models/interval'
import IntervalCollection from './models/interval_collection'

import Cantor from './shared/cantor'

//import logo from './logo.svg';
import './App.css'

function App() {

    let foo = new Fraction(0, 2)
    let fooR = new Fraction(1, 2)
    let bar = new Fraction(3, 4)
    let barR = new Fraction(4,4)

    foo.add(bar)

    let ls1 = new Interval(foo, fooR)
    let ls2 = new Interval(bar, barR)

    let sc1 = new IntervalCollection([ls1, ls2])

    let aaL = new Fraction(0,5)
    let aaR = new Fraction(5,5)

    let inta = new Interval(aaL, aaR)
    window.Fraction = Fraction
    window.Cantor = Cantor
    window.Interval = Interval
    window.IntervalCollection = IntervalCollection

    let hh = new Interval(new Fraction(2, 5), new Fraction(3, 5))

//    let res = new Cantor(5, [2, 3], 2)
    let res = new Cantor(3, [2], 1)
    debugger

    // numberline
    // summary
    // intervalChart
    return (
        <div>
            whast up
        </div>
    )
}

export default App
