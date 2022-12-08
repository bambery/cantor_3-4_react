import Fraction from './utils/fraction'
import SegmentCollection from './utils/line_segment'

import logo from './logo.svg';
import './App.css';

function App() {

    let foo = Fraction(0, 4)
    let bar = Fraction(4, 4)

    let seg = SegmentCollection(foo, bar)


    return (
        <div>
            {seg.toString()}
        </div>
    );
}

export default App;
