import Fraction from './utils/fraction'

import logo from './logo.svg';
import './App.css';

function App() {

    let foo = Fraction(2, 4)
    console.log('inside app')
    console.log(foo.toString())
    console.log(foo.num())
    console.log(foo.reduce())
    console.log(foo.num())

    return (
        <div>
            fractions!
        </div>
    );
}

export default App;
