const gcd = function gcd(a, b){
    return b === 0 ? a : gcd(b, a % b)
}

const lcm = function lcm(arr) {
    if(!Array.isArray(arr)){
        throw new Error("Must pass an array of integers to lcm")
    }
    let ans = arr[0]

    for ( let i = 1; i < arr.length; i++ ) {
        ans = (( arr[i] * ans ) / ( gcd(arr[i], ans) ))
    }
    return ans
}

// from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof
function type(value) {
    if (value === null) {
        return "null";
    }
    const baseType = typeof value;
    // Primitive types
    if (!["object", "function"].includes(baseType)) {
        return baseType;
    }

    // Symbol.toStringTag often specifies the "display name" of the
    // object's class. It's used in Object.prototype.toString().
    const tag = value[Symbol.toStringTag];
    if (typeof tag === "string") {
        return tag;
    }

    // If it's a function whose source code starts with the "class" keyword
    if (
        baseType === "function" &&
        Function.prototype.toString.call(value).startsWith("class")
    ) {
        return "class";
    }

    // The name of the constructor; for example `Array`, `GeneratorFunction`,
    // `Number`, `String`, `Boolean` or `MyCustomClass`
    const className = value.constructor.name;
    if (typeof className === "string" && className !== "") {
        return className;
    }

    // At this point there's no robust way to get the type of value,
    // so we use the base implementation.
    return baseType;
}

export {
    lcm,
    type
}
