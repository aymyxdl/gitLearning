// 27. 移除元素


/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
 var removeElement = function(nums, val) {
    let len = nums.length;
    for(let i = len - 1; i >= 0; i -= 1) {
        if (nums[i] === val) nums.splice(i, 1)
    }
    return nums.length
};