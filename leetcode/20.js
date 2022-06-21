// 20. 有效的括号

// 执行用时：240 ms, 在所有 JavaScript 提交中击败了5.26%的用户
// 内存消耗：49.7 MB, 在所有 JavaScript 提交中击败了5.06%的用户

/**
 * @param {string} s
 * @return {boolean}
 */
 var isValid = function(s) {
    const arr = s.split('');

    if (arr.length % 2 !== 0) return false

    const result = []

    try {
        arr.forEach(item => {
            switch(item) {
                case '(': 
                    result.push(')');
                    break;
                case '[': 
                    result.push(']');
                    break;
                case '{': 
                    result.push('}');
                    break;
                default:
                    console.log(result, item)
                    if (result.pop() !== item) throw new Error('e')
            }
        })
    } catch (e) {
        return false
    }
    console.log(arr)

    return result.length ? false : true;

};