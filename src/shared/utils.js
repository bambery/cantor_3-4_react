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

export {
    lcm
}
