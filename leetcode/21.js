// 21. 合并两个有序链表

// 这道题写了一半：
// 注意，list1, list2看起来是数组，但是实际结构是链表（js的链表，还真没做过）
// 可以通过 Object.keys(list1) 看他的数据结构
// 但是，不仅要把链表转成了数组，最后还要把数组转回链表
// 这个链表互转的方法是网上借鉴的，自己只写了排序插入。。



/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
 var mergeTwoLists = function(list1, list2) {

    // console.log(list2, Object.keys(list2), list2.val, list2.next)

    function list2array(head) {
        if(!head) {
            return []
        }

        var result = []
        var p = head

        while(p) {
            result.push(p.val)
            p = p.next
        }

        head.size = 0;

        return result
    }

    const arr1 = list2array(list1)
    const arr2 = list2array(list2)
    let length = arr1.length + arr2.length;
    const arr = [];

    console.log(length, '----', arr1, arr2)
    for (let i = 0; i < length; i += 1) {
        if (!arr1.length) {
            arr.push(...arr2);
            break;
        } else if (!arr2.length) {
            arr.push(...arr1);
            break;
        } else if (arr1[0] > arr2[0]) {
            arr.push(arr2.shift());
        } else {
            arr.push(arr1.shift());
        }
    }


    function array2list(ary) {
        if(ary.length === 0) {
            return null
        }
        var nodes = []
        
        for(var i = 0; i < ary.length; i++) {
            var node = {}
            node.val = ary[i]
            node.next = null
            nodes.push(node)
        }

        for(var i = 0; i < nodes.length - 1; i++) {
            nodes[i].next = nodes[i + 1]
        }

        return nodes[0];
    }

    const list = array2list(arr);

    console.log(arr, '-----', list);
    

    return list;
};


