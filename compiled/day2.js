var fs = require('fs');
var raw = fs.readFileSync('inputs/day2.txt', 'utf8');
console.log(numberOfSafeLevels(raw));
function numberOfSafeLevels(raw) {
    var levels = raw.split('\n');
    var numSafe = 0;
    for (var _i = 0, levels_1 = levels; _i < levels_1.length; _i++) {
        var level = levels_1[_i];
        var nums = level.split(' ').map(function (a) { return parseInt(a, 10); });
        if (isSafe(nums))
            numSafe++;
    }
    return numSafe;
}
function isSafe(nums) {
    var prev = null;
    var isDecreasing = nums[0] > nums[nums.length - 1];
    for (var i = 0; i < nums.length; i++) {
        if (prev == null) {
            prev = nums[i];
            continue;
        }
        if (isDecreasing) {
            if (nums[i] >= prev || prev - nums[i] > 3)
                return false;
        }
        else {
            if (nums[i] <= prev || nums[i] - prev > 3)
                return false;
        }
        prev = nums[i];
    }
    return true;
}
