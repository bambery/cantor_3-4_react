const Utils = {

    function gcd(a, b){
        return b === 0 ? a : gcd(b, a % b)
    }

    function lcm(arr) {
        let ans = arr[0]

        for ( let i = 1; i < arr.length; i++ ) {
            ans = (( arr[i] * ans ) / ( gcd(arr[i], ans) ))
        }
        return ans
    }
}

export default Utils
