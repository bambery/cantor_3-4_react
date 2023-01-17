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
                e.message = `While trying to compute the LCM for the common denominator, ${arr[i]} * ${ans} exceded max integer size.`
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

function checkArrContents(arr, typeStr){
    if( !Array.isArray(arr) ){
        throw new ArgumentError(`Must pass an Array of type ${typeStr}: you passed ${type(arr)} with value ${arr}`)
    }
    let not_intervals = arr.filter( item => !(type(item) === typeStr))
    if(not_intervals.length !== 0){
        throw new ArgumentError(`Must pass an Array of ${typeStr}: inside the Array, you passed ${JSON.stringify(not_intervals)}`)
    }
    return true
}

function getLabel(index){
    if(index < 26){
        return String.fromCharCode(Math.floor(index + 65))
    } else {
        return `${String.fromCharCode(Math.floor(index/26) + 64)}${String.fromCharCode(index%26 + 65)}`
    }
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
