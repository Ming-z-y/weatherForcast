function delArrItem(arr, item) {
    for (let i = 0, j = arr.length; i < j; i++) {
        if (arr[i] == item) {
            arr.splice(`${i}`, 1)
        }
    }
    return arr;
}
Array.prototype.arrReverse = function () {
    for (let i = 0; i < this.length / 2; i++) {
        let changeItem = this[i];
        this[i] = this[this.length - 1 - i];
        this[this.length - 1 - i] = changeItem;
    }
}