// 35. 搜索插入位置

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
 var searchInsert = function(nums, target) {
    for (let i = 0; i < nums.length; i += 1) {
        // 找到相同数字的位置 或者 比目标数字还要大的位置
        if (nums[i] === target || nums[i] > target) return i
    }
    return nums.length;
};