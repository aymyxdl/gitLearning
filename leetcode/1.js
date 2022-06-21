// 1. 两数之和

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
	try {
			const result = []
			nums.forEach((item, index) => {
					nums.forEach((sub, id) => {
							// console.log(item, sub, (item + sub) === target)
							if ((item + sub) === target && index !== id) {
									// console.log(item, sub)
									this.result = [index, id]
									throw new Error(e)
							}
					})
			})
	} catch (e) {
			return result;
	}

	// for (let i = 0; i < nums.length; i += 1) {
	//     for (let j = 0; j < nums.length; j += 1) {
	//         if ((nums[i] + nums[j]) === target && i !== j) {
	//             return [i, j]
	//         }
	//     }
	// }
};