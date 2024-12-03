var fs = require('fs');
var file = fs.readFileSync('inputs/day1.txt', 'utf8');
console.log(pairwiseDistanceSum(file));
function pairwiseDistanceSum(raw) {
    var list1 = [];
    var list2 = [];
    for (var _i = 0, _a = raw.split('\n'); _i < _a.length; _i++) {
        var line = _a[_i];
        var _b = line.split('   '), el1 = _b[0], el2 = _b[1];
        list1.push(parseInt(el1, 10));
        list2.push(parseInt(el2, 10));
    }
    list1.sort();
    list2.sort();
    var distanceSum = 0;
    for (var i = 0; i < list1.length; i++) {
        distanceSum += Math.abs(list1[i] - list2[i]);
    }
    return distanceSum;
}
