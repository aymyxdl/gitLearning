// 28. 实现 strStr()


/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
 var strStr = function(haystack, needle) {
    for (let i = 0; i < haystack.length; i += 1) {
        // console.log(arr, haystack[i], needle[i])
        if (haystack[i] === needle[0]) {
            let flag = true
            for (let j = 0; j < needle.length; j += 1) {
                if (haystack[i + j] !== needle[j]) {
                    flag = false
                    break
                }
            }
            if (flag) return i
        }
    }
    return -1
};