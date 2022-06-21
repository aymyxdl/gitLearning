// 9. 回文数

/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function(x) {
    const arr = x.toString().split('')
    const length = arr.length;
    let flag = true;
    for (let i = 0; i <= length / 2 - 1; i += 1) {
        if (arr[i] !== arr[length - 1 - i]) flag = false
    }
    return flag;
};