import { ValueError, ArgumentError, UnsafeIntegerError } from './errors'

function gcd(a, b){
    return b === 0 ? a : gcd(b, a % b)
}

function lcm(arr) {
    try {
        checkArrContents(arr, 'number')
    } catch(e) {
        throw e
    }

    let ans = arr[0]

    for ( let i = 1; i < arr.length; i++ ) {
        if (arr[i] === 0){
            throw new ValueError(`Cannot compute lcm of 0: zero value passed in at index ${i}`)
        } else if (arr[i] !== ans){
            try {
                checkUnsafe(arr[i] * ans)
            } catch(e) {
                e.message = `While trying to compute the LCM for the common denominator, ${arr[i]} * ${ans} exceeded max integer size. Please decrease the number of segments or the number of iterations and try again.`
                throw e
            }
            ans = (( arr[i] * ans ) / ( gcd(arr[i], ans) ))
        }
    }

    return ans
}

function checkUnsafe(num) {
    if(!Number.isSafeInteger(num)) {
        throw new UnsafeIntegerError()
    }
}

// modified to include NaN from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof
// this now is used to ONLY return the "name" of an object. Cannot be used to check type due to minification
function type(value) {
    if (value === null) {
        return 'null'
    } else if (Number.isNaN(value)) {
        return 'NaN'
    }

    const baseType = typeof value
    // Primitive types
    if (!['object', 'function'].includes(baseType)) {
        return baseType
    }

    // Symbol.toStringTag often specifies the "display name" of the
    // object's class. It's used in Object.prototype.toString().
    const tag = value[Symbol.toStringTag]
    /* istanbul ignore if */
    if (typeof tag === 'string') {
        return tag
    }

    // If it's a function whose source code starts with the "class" keyword
    /* istanbul ignore if */
    if (
        baseType === 'function' &&
        Function.prototype.toString.call(value).startsWith('class')
    ){
        return 'class'
    }

    // The name of the constructor; for example `Array`, `GeneratorFunction`,
    // `Number`, `String`, `Boolean` or `MyCustomClass`

    const className = value.constructor.name
    /* istanbul ignore if */
    if (typeof className === 'string' && className !== '') {
        return className
    }

    // At this point there's no robust way to get the type of value,
    // so we use the base implementation.
    /* istanbul ignore next */
    return baseType
}

function checkArrContents(arr, typeClass){
    if( !Array.isArray(arr) ){
        throw new ArgumentError(`Must pass an Array of type ${type(typeClass)}: you passed ${type(arr)} with value ${arr}`)
    } else if( typeof(typeClass) === 'string' ){
        let not_intervals = arr.filter( item => type(item) !== typeClass)
        if(not_intervals.length !== 0){
            throw new ArgumentError(`Must pass an Array of ${type(typeClass)}: inside the Array, you passed ${JSON.stringify(not_intervals)}`)
        }
    } else if (typeof(typeClass) === 'function') {
        let not_intervals = arr.filter( item => !(item instanceof typeClass) )
        if(not_intervals.length !== 0){
            throw new ArgumentError(`Must pass an Array of ${type(typeClass)}: inside the Array, you passed ${JSON.stringify(not_intervals)}`)
        }
    } else {
        throw new Error(`something is wrong. You passed an array, but typeof(typeClass) is ${typeof(typeClass)}. The array contains ${JSON.stringify(arr)}`)
    }
    return true
}

// translates 1 = A, 2 = B, ..., 26 = Z, 27 = AA, 28 = AB, ....702 = ZZ, 703 = AAA, ...
// convert base 10 to 26, then convert back to base 10 digit by digit as an index into the dictionary. Must account for the representation of "10" in any base.
function getLabel(index){
    let alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    if(index < 26){
        return alpha[index]
    }
    let base26 = (index).toString(26)
    let result = ''
    for(let i = base26.length - 1; i >= 0; i--){
        let base10 = parseInt(base26[i], 26)
        result = ( i === 0 )
            ? alpha.charAt(base10 - 1) + result
            : alpha.charAt(base10) + result
    }
    return result
}

/* istanbul ignore if */
if (process.env['NODE_ENV'] === 'test') {
    exports.gcd = gcd
}

export {
    lcm,
    type,
    checkArrContents,
    checkUnsafe,
    getLabel
}
