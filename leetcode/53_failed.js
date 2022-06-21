// 53. 最大子数组和
// 这个用的是暴力破解法，但是数组太长了会超时
// 这道题我目前做不出来
// 我想到了要用滑动窗口做，但是写不出来

/**
 * @param {number[]} nums
 * @return {number}
 */
 var maxSubArray = function(nums) {

    let max = 0;
    let start = 0;
    let end = 0;
    for(let i = 0; i < nums.length; i += 1) {
        let count = nums[i];
        if (count > max)  {
            max = count
            start = i;
            end = i;
        }
        for (let j = i + 1; j < nums.length; j += 1) {
            count += nums[j];
            if (count > max) {
                start = i;
                end = j;
                max = count;
            }
        }
    }

    console.log(start, end)
    return max;
};