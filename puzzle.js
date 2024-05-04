var rows = 3;
var columns = 3;
var blankTile = [rows - 1, columns - 1]; // Coordinates of the blank tile
var turns = 0;

var imgOrder = ["1", "5", "2", "3", "6", "4", "7", "8", "9"];

window.onload = function() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let tile = document.createElement("img");
            tile.id = r.toString() + "-" + c.toString();
            tile.src = imgOrder.shift() + ".jpg";
            tile.addEventListener("click", onClick);
            document.getElementById("board").append(tile);
        }
    }
    document.getElementById('board').ondragstart = function() { return false; };
}
function onClick() {
    let clickedTile = this;
    let clickedCoords = clickedTile.id.split("-");
    let r = parseInt(clickedCoords[0]);
    let c = parseInt(clickedCoords[1]);

    // Check if the clicked tile is adjacent to the blank tile
    let isAdjacent = (
        (r === blankTile[0] && Math.abs(c - blankTile[1]) === 1) ||
        (c === blankTile[1] && Math.abs(r - blankTile[0]) === 1)
    );

    if (isAdjacent) {
        // Swap the clicked tile with the blank tile
        let tempSrc = clickedTile.src;
        clickedTile.src = document.getElementById(blankTile[0] + "-" + blankTile[1]).src;
        document.getElementById(blankTile[0] + "-" + blankTile[1]).src = tempSrc;

        // Update blank tile coordinates
        blankTile = [r, c];

        // Increment turns counter
        turns++;
        document.getElementById("turns").innerText = turns;   
    }
    checkIfSolved();
}

function checkIfSolved() {
    let solved = true;
    let index = 1;
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let currentTile = document.getElementById(r + "-" + c);
            let expectedSrc = index + ".jpg";
            if (currentTile.src.endsWith(expectedSrc) === false) {
                solved = false;
                break;
            }
            index++;
            // console.log("=====")
            // console.log(index)
            // console.log(r+c)
            // console.log(expectedSrc)
        }
    }
    if (solved) {
        setTimeout(function(){
            document.getElementById("title").innerHTML = "CONGRATULATIONS";
            document.getElementById("board").setAttribute("style","display: none");
            document.getElementById("full_img").setAttribute("style", "display: flex");
            document.getElementById("learn_more").setAttribute("style", "display: flex");
        },10);
    }
}

