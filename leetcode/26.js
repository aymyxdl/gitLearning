// 26. 删除有序数组中的重复项

// 这道题目不能用 num = [...new Set(nums)]


/**
 * @param {number[]} nums
 * @return {number}
 */
 var removeDuplicates = function(nums) {

    // 优化后的写法，不能直接 num = [...new Set(nums)]
    // 不过这个算法题确实不应该借用内置api
    let arr = [...new Set(nums)]
    for (let i = 0; i < arr.length; i += 1) {
        nums[i] = arr[i]
    }
    return arr.length



    // 这是一个写法，一开始这个需求看不懂
    // const arr = [];
    // let length = nums.length
    // for (let i = 0; i <length; i += 1) {
    //     if (nums[i] !== nums[i+1]) {
    //         // console.log(nums.splice(i, 1) nums)
    //         // arr.push(nums.splice(i, 1))
    //         arr.push(nums[i])
    //     }
    // }
    // console.log(arr)
    // console.log(nums)
    // for (let i = 0; i < arr.length; i += 1) {
    //     nums[i] = arr[i]
    // }
    // return arr.length
};