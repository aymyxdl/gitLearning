// 58. 最后一个单词的长度

/**
 * @param {string} s
 * @return {number}
 */
 var lengthOfLastWord = function(s) {
    // 我解题之前先看了一下评论，发现一个思路精妙绝伦
    // 从末尾往前处理

    let hasWord = false;
    let lastSpaceLen = 0;
    for (let i = s.length - 1; i >= 0; i -= 1) {
        console.log(s[i])
        if (s[i] === ' ' && hasWord) {
            return s.length - i - 1 - lastSpaceLen;
        } else if (s[i] !== ' ') {
            hasWord = true;
        } else if (s[i] === ' ') {
            lastSpaceLen += 1;
        }
    }
    return s.length - lastSpaceLen;

};