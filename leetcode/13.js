// 13. 罗马数字转整数

/**
 * @param {string} s
 * @return {number}
 */
var romanToInt = function(s) {
    const obj = {
        'M': 1000,
        'D': 500,
        'C': 100,
        'L': 50,
        'X': 10,
        'V': 5,
        'I': 1,
        'CM': 900,
        'CD': 400,
        'XC': 90,
        'XL': 40,
        'IX': 9,
        'IV': 4,
    }
    const arr = s.split('')
    let nextIdx = 0;
    let count = 0;
    for (let i = 0; i < arr.length; i += 1) {
        if (i !== nextIdx) continue;
        let double = obj[arr[i] + arr[i + 1]];
        // 判断是否是双连数字
        if (double) {
            console.log(arr[i] + arr[i + 1])
            count += double;
            // 如果是双联数字，需要跳过下一次的计算
            nextIdx += 2;
        } else {
            console.log(arr[i])
            count += obj[arr[i]];
            nextIdx += 1;
        }
    }

    return count;
};