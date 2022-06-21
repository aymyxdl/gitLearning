// 14. 最长公共前缀

/**
 * @param {string[]} strs
 * @return {string}
*/
 var longestCommonPrefix = function(strs) {
    let str = ''

    let minItem = strs[0];
    strs.forEach(item => {
        if (item.length < minItem.length) minItem = item
    })

    // if (!minItem) return str

    console.log(minItem)

    const arr = minItem.split('')

    for (let i = 0; i < arr.length; i += 1) {
        for (let j = 0; j < strs.length; j += 1) {
            if (strs[j][i] !== arr[i]) return str
        }
        str += arr[i]
    }

    return str
};

