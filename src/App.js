import Fraction from './models/fraction'
import Interval from './models/interval'
import IntervalCollection from './models/interval_collection'

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

    let baz = new Fraction(0, 10)
    let bazR = new Fraction(2, 10)
    let moo = new Fraction(7, 10)
    let mooR = new Fraction(10, 10)

    let ls3 = new Interval(baz, bazR)
    let ls4 = new Interval(moo, mooR)

    let sc2 = new IntervalCollection([ls3, ls4])

    window.Fraction = Fraction

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
