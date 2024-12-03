var fs = require('fs');
var file = fs.readFileSync('inputs/day3.txt', 'utf8');
var nums = new Set(['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']);
console.log(sumOfUncorruptedMultiplyInstructions(file));
function sumOfUncorruptedMultiplyInstructions(raw) {
    var i = 0;
    var sumOfProducts = 0;
    while (i < raw.length) {
        if (raw.slice(i, i + 4) !== 'mul(') {
            i++;
            continue;
        }
        i += 4;
        var j = i;
        while (nums.has(raw[j])) {
            j++;
        }
        if (j == i || j - i > 3 || raw[j] !== ',')
            continue;
        var first = parseInt(raw.slice(i, j), 10);
        j++;
        i = j;
        while (nums.has(raw[j])) {
            j++;
        }
        if (j == i || j - i > 3 || raw[j] !== ')')
            continue;
        var second = parseInt(raw.slice(i, j), 10);
        sumOfProducts += (first * second);
        i = j;
    }
    return sumOfProducts;
}
