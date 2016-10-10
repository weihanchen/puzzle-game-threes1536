var colors = new Array("rgb(182,217,217)", "rgb(255,102,128)", "rgb(102,204,255)", "white");
var arrayMetrix;
var row = 5,
    col = 5,
    basicNum = 3,
    score = 0,
    addCount = 0;
var arrayBasicCount = new Array(1, 1, 1); //一開始平均出現一次，故將count設為1
var winNumber = 1536;
var musicPlay = true;

function Enum() {}
Enum.CheckType = { win: 0, lose: 1, canMove: 2 }
var audio;
var scoreText;
window.onresize = onResize;

function firstLoad() {
    audio = document.getElementById('myTune');
    scoreText = document.getElementById('scoreText');
    audio.addEventListener('ended', function() {
        //等待500毫秒 
        setTimeout(function() { audio.play(); }, 500);
    }, false);
    this.addEventListener("keydown", doKeyDown, true);
    Init();
}

function Init() {
    canvas = document.getElementById("puzzle-game-threes1536");
    canvas.focus();
    score = 0;
    MetrixInit();
    scoreText.innerHTML = score;
    onResize();
}

function onResize() {
    var container = document.getElementById('puzzle-game-threes1536-container');
    canvas.width = container.offsetWidth * 0.95;
    canvas.height = canvas.width;
    paint();
}

function musicControl() {
    if (musicPlay) {
        audio.pause();
        document.getElementById("musicImage").src = "picture/musicStop.png";
    } else {
        audio.play();
        document.getElementById("musicImage").src = "picture/musicPlay.png";
    }
    musicPlay = !musicPlay;
}

function doKeyDown(e) {
    e.preventDefault(); //避免預設事件，如滾動視窗
    if (e.keyCode == 38) { //上 
        MetrixOn();
    } else if (e.keyCode == 40) { //下
        MetrixDown();
    } else if (e.keyCode == 39) { //右
        MetrixRight();
    } else if (e.keyCode == 37) { //左
        MetrixLeft();
    }
    scoreText.innerHTML = score;
    paint();
    var checkWin = getCheckWin();
    if (checkWin == Enum.CheckType.win) winMessage();
    else if (checkWin == Enum.CheckType.lose) loseMessage();
}

function MetrixInit() {
    arrayMetrix = new Array(row);
    for (var i = 0; i < row; i++) {
        arrayMetrix[i] = new Array(col);
        for (var j = 0; j < col; j++) {
            arrayMetrix[i][j] = "";
        }
    }
    var size = row * col;
    var arrayTmp = getRandomArray(size);
    for (var i = 0; i < basicNum; i++) {
        var value = arrayTmp[i];
        var x = Math.floor(value / row);
        var y = value % row;
        arrayMetrix[x][y] = i + 1;
    }

}

function getRandomArray(size) {
    var arrayTmp = new Array(size);
    for (var i = 0; i < size; i++) arrayTmp[i] = i; //初始化
    for (var i = size - 1; i > 0; i--) { //亂數分配0~15
        var x = Math.floor(Math.random() * size);
        var tmp = arrayTmp[i];
        arrayTmp[i] = arrayTmp[x];
        arrayTmp[x] = tmp;

    }
    return arrayTmp;
}

function MetrixOn() {
    var addList = [];
    for (var i = 0; i < col; i++) {
        var addFlag = false;
        for (var j = 0; j < row - 1; j++) {
            var first = arrayMetrix[j][i];
            var second = arrayMetrix[j + 1][i];
            if (second == "") continue;
            else if (first == "") {
                arrayMetrix[j][i] = second;
                arrayMetrix[j + 1][i] = first;
                addFlag = true;
                continue;
            }
            var total = first + second;
            if (total == basicNum || (first == second && total >= basicNum * 2)) { //成功合併
                score += total;
                refreshBasicCount(total);
                arrayMetrix[j][i] = total;
                arrayMetrix[j + 1][i] = "";
                addFlag = true;
            }
        }
        if (addFlag) addList.push(i);
    }
    if (addList.length > 0) addNewNumber(row - 1, getAddForOne(addList));
}

function MetrixDown() {
    var addList = [];
    for (var i = 0; i < col; i++) {
        var addFlag = false;
        for (var j = row - 1; j > 0; j--) {
            var first = arrayMetrix[j][i];
            var second = arrayMetrix[j - 1][i];
            if (second == "") continue;
            else if (first == "") {
                arrayMetrix[j][i] = second;
                arrayMetrix[j - 1][i] = first;
                addFlag = true;
                continue;
            }
            var total = first + second;
            if (total == basicNum || (first == second && total >= basicNum * 2)) { //成功合併
                score += total;
                refreshBasicCount(total);
                arrayMetrix[j][i] = total;
                arrayMetrix[j - 1][i] = "";
                addFlag = true;
            }
        }
        if (addFlag) addList.push(i);
    }
    if (addList.length > 0) addNewNumber(0, getAddForOne(addList));
}

function MetrixLeft() {
    var addList = [];
    for (var i = 0; i < row; i++) {
        var addFlag = false;
        for (var j = 0; j < col - 1; j++) {
            var first = arrayMetrix[i][j];
            var second = arrayMetrix[i][j + 1];
            if (second == "") continue;
            else if (first == "") {
                arrayMetrix[i][j] = second;
                arrayMetrix[i][j + 1] = first;
                addFlag = true;
                continue;
            }
            var total = first + second;
            if (total == basicNum || (first == second && total >= basicNum * 2)) { //成功合併
                score += total;
                refreshBasicCount(total);
                arrayMetrix[i][j] = total;
                arrayMetrix[i][j + 1] = "";
                addFlag = true;
            }
        }
        if (addFlag) addList.push(i);
    }
    if (addList.length > 0) addNewNumber(getAddForOne(addList), col - 1);
}

function MetrixRight() {
    var addList = [];
    for (var i = 0; i < row; i++) {
        var addFlag = false;
        for (var j = col - 1; j > 0; j--) {
            var first = arrayMetrix[i][j];
            var second = arrayMetrix[i][j - 1];
            if (second == "") continue;
            else if (first == "") {
                arrayMetrix[i][j] = second;
                arrayMetrix[i][j - 1] = first;
                addFlag = true;
                continue;
            }
            var total = first + second;
            if (total == basicNum || (first == second && total >= basicNum * 2)) { //成功合併
                score += total;
                refreshBasicCount(total);
                arrayMetrix[i][j] = total;
                arrayMetrix[i][j - 1] = "";
                addFlag = true;
            }
        }
        if (addFlag) addList.push(i);
    }
    if (addList.length > 0) addNewNumber(getAddForOne(addList), 0);
}

function getAddForOne(addList) { //可能新增的有很多組，但只要其中一組
    var theIndex = Math.floor(Math.random() * addList.length);
    return addList[theIndex];
}

function refreshBasicCount(total) {//重新計算數字1~3出現的次數，待優化為MAP
    if (total == basicNum) { //total為3則代表1跟2進行合併故將1、2的count-1，3的count+1
        arrayBasicCount[0] = arrayBasicCount[0] - 1;
        arrayBasicCount[1] = arrayBasicCount[1] - 1;
        arrayBasicCount[2] = arrayBasicCount[2] + 1;
    } else if (total == basicNum * 2) { //代表兩個3合併了
        arrayBasicCount[2] = arrayBasicCount[2] - 2;
    }
}

function addNewNumber(i, j) { //加入新的號碼
    var theNum = arrayMetrix[i][j];
    if (theNum === "") {
        var addNum = getMinBasicCount();
        arrayMetrix[i][j] = addNum;
        arrayBasicCount[addNum - 1] = arrayBasicCount[addNum - 1] + 1;
    }
}

function getMinBasicCount() { //將1、2、3中出現最少的取出
    var minCount = Number.MAX_VALUE,
        index = 0;
    var sText = "";
    for (var i = 0; i < arrayBasicCount.length; i++) {
        if (minCount > arrayBasicCount[i]) {
            minCount = arrayBasicCount[i];
            index = i;
        }
    }
    return index + 1;
}

function getCheckWin() {
    var canMove = false;
    //-----------------由左至右依序掃描--------------------------//
    for (var i = 0; i < row; i++) {
        for (var j = 0; j < col - 1; j++) {
            var first = arrayMetrix[i][j];
            var second = arrayMetrix[i][j + 1];
            var total = first + second;
            if (second == winNumber || first == winNumber) return Enum.CheckType.win;
            else if (second == "" || first == "" || total == basicNum || (first == second && total >= basicNum * 2)) {
                canMove = true;
            }
        }
    }
    //-----------------由上上而下依序掃描------------------------//
    for (var j = 0; j < col; j++) {
        for (var i = 0; i < row - 1; i++) {
            var first = arrayMetrix[i][j];
            var second = arrayMetrix[i + 1][j];
            var total = first + second;
            if (second == winNumber || first == winNumber) return Enum.CheckType.win;
            else if (second == "" || first == "" || total == basicNum || (first == second && total >= basicNum * 2)) {
                canMove = true;
            }
        }
    }
    //-----------------未達過關分數及沒有可移動的格子-------------//
    if (canMove) return Enum.CheckType.canMove;
    return Enum.CheckType.lose;
}

function winMessage() {
    swal({
    	title: '<h1>Congratulation For Passing!</h1>',
    	html: true
    });
}

function loseMessage() {
	swal({
		title: '<h1 class="title">...Game Over...</h1>',
		text: 'You have not added to the total to 1536 figures.',
		html: true
	})
}

function paint() { //繪圖函式
    var iWidth = canvas.width;
    var iHeight = canvas.height;
    var c = document.getElementById("puzzle-game-threes1536").getContext('2d');
    var rectDiffer = 10;
    var rectSize = (iWidth - rectDiffer * (col - 1)) / col;
    var xOffset = rectSize / 2;
    var yOffset = rectSize / 3 * 2;
    var y = 0;
    for (var i = 0; i < row; i++) {
        var x = 0;
        for (var j = 0; j < col; j++) {
            var num = arrayMetrix[i][j];
            var color = getColor(num);
            c.fillStyle = color;
            c.fillRect(x, y, rectSize, rectSize);
            c.fillStyle = "black";
            c.textAlign = "center";
            c.font = xOffset + "px Arial bold";
            c.fillText(num, x + xOffset, y + yOffset);
            x += rectSize + rectDiffer;
        }
        y += rectSize + rectDiffer;
    }
}

function getColor(num) { //矩形背景顏色
    if (num == "") return colors[0];
    else if (num >= basicNum) return colors[basicNum];
    else return colors[num];
}
