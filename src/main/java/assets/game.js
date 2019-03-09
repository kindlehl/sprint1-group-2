var isSetup = true;
var placedShips = 0;
var game;
var shipType;
var vertical;


var MineSweeper_User_row;
var MineSweeper_User_Col;

var MineSweeper_User_CQ_row;
var MineSweeper_User_CQ_col;

var Destroyer_User_row;
var Destroyer_User_col;

var Destroyer_User_CQ_row;
var Destroyer_User_CQ_col;


var Battleship_User_row;
var Battleship_User_col;

var Battleship_User_CQ_row;
var Battleship_User_CQ_col;

var MineSweeper_life =1;
var Destroyer_life = 2;
var Battleship_life = 2;


function makeGrid(table, isPlayer) {
    for (i=0; i<10; i++) {
        let row = document.createElement('tr');
        for (j=0; j<10; j++) {
            let column = document.createElement('td');
            column.addEventListener("click", cellClick);
            row.appendChild(column);
        }
        table.appendChild(row);
    }
}


var grid = document.getElementById('show');
var start_game= document.getElementById('show_opponent')

//modal.style.display = 'block';

start_game.addEventListener("click", myFunction)




var minesweeper = document.getElementsByClassName("hidden2")[0];
var destroyer = document.getElementsByClassName("hidden3")[0];
var battleship = document.getElementsByClassName("hidden4")[0];
var vert = document.getElementById("hidden5");
var instruction1 = document.getElementById("instruction1");
var pLabel = document.getElementById("pLabel");

function myFunction() {

    grid.style.display = 'block';
    start_game.style.display = 'none';
    instruction2.style.display = 'block';
    isSetup = false;

}



function markHits(board, elementId, surrenderText) {
    //var hit = 0;
    /* board.attacks.forEach((attack) => {
         let className;

     if (attack.location.row === MineSweeper_User_CQ_row && attack.location.column === MineSweeper_User_CQ_col) {
         //alert("Minsweeeper Captains Quarters have been hit");
         if(MineSweeper_life === 1)
         {
             alert("Minsweeeper Captains Quarters have been hit");
             MineSweeper_life--;
             hit = 1;
             console.log("Hit is equal to: " + hit);

         }

     }
     else if (attack.location.row === Battleship_User_CQ_row && attack.location.column === Battleship_User_CQ_col) {
         if (Battleship_life === 2) {

             alert("The Battleship Captains Quarters have been hit");
             Battleship_life--;
             hit = 2;
             console.log("Hit is equal to: " + hit);
         }
     }
     else if (attack.location.row === Destroyer_User_CQ_row && attack.location.column === Destroyer_User_CQ_col) {
         if (Destroyer_life === 2)
         {

             alert("The Destroyer's Captains Quarters have been hit");
             Destroyer_life--;
             hit = 3;
             console.log("Hit is equal to: " + hit);
         }

     }
 });

 */
    board.attacks.forEach((attack) => {let className;

    /*if(hit ===1 && (attack.location.row === MineSweeper_User_CQ_row && attack.location.column === MineSweeper_User_CQ_col))
    {
        console.log("Do not record ship placement because it was the first hit");

    }
    else if(hit ===2 && (attack.location.row === Battleship_User_CQ_row && attack.location.column===Battleship_User_CQ_col))
    {
        console.log("Do not record ship placement because it was the first hit");

    }
    else if(hit ===3&& (attack.location.row === Destroyer_User_CQ_row && attack.location.column===Destroyer_User_CQ_col))
    {
        console.log("Do not record ship placement because it was the first hit");

    }

    else {
    */
    if (attack.result === "MISS")
        className = "miss";
    else if (attack.result === "HIT")
        className = "hit";
    else if (attack.result === "SUNK")
        className = "hit"
    else if (attack.result === "SURRENDER")
        alert(surrenderText);

    //className = "hit";
    document.getElementById(elementId).rows[attack.location.row - 1].cells[attack.location.column.charCodeAt(0) - 'A'.charCodeAt(0)].classList.add(className);

});

}


function redrawGrid() {
    Array.from(document.getElementById("opponent").childNodes).forEach((row) => row.remove());
    Array.from(document.getElementById("player").childNodes).forEach((row) => row.remove());
    makeGrid(document.getElementById("opponent"), false);
    makeGrid(document.getElementById("player"), true);
    if (game === undefined) {
        return;
    }

    game.playersBoard.ships.forEach((ship) => ship.occupiedSquares.forEach((square) => {
        document.getElementById("player").rows[square.row-1].cells[square.column.charCodeAt(0) - 'A'.charCodeAt(0)].classList.add("occupied");
}));
    markHits(game.opponentsBoard, "opponent", "You won the game");

    markHits(game.playersBoard, "player", "You lost the game");

}

var oldListener;
function registerCellListener(f) {
    let el = document.getElementById("player");
    for (i=0; i<10; i++) {
        for (j=0; j<10; j++) {
            let cell = el.rows[i].cells[j];
            cell.removeEventListener("mouseover", oldListener);
            cell.removeEventListener("mouseout", oldListener);
            cell.addEventListener("mouseover", f);
            cell.addEventListener("mouseout", f);
        }
    }
    oldListener = f;

//alert ("You have placed a ship");
}


function cellClick() {
    let row = this.parentNode.rowIndex + 1;
    let col = String.fromCharCode(this.cellIndex + 65);
    if (isSetup) {
        sendXhr("POST", "/place", {game: game, shipType: shipType, x: row, y: col, isVertical: vertical}, function(data) {
            game = data;
            redrawGrid();
            placedShips++;

            console.log(shipType);

            if(shipType == "MINESWEEPER")
            {
                console.log("You have placed a MINESWEEPER");
                console.log("Ship was placed at x: " + row + " Y: "+ col );
                MineSweeper_User_Col = col;
                MineSweeper_User_row = row;
                MineSweeper_User_CQ_col = col;
                MineSweeper_User_CQ_row = row;
                console.log("Ship was placed at x: " + MineSweeper_User_row + " Y: "+ MineSweeper_User_Col );
                minesweeper.style.display = 'inline';
                minesweeper.disabled = 'true';

            }
            else if(shipType == "DESTROYER")
            {
                console.log("You have placed a DESTROYER");
                console.log("Ship was placed at x: " + row + " Y: "+ col );


                Destroyer_User_col = col;
                Destroyer_User_row = row;

                col = String.fromCharCode(col.charCodeAt(0) + 1);
                Destroyer_User_CQ_col = col;
                Destroyer_User_CQ_row = row;

                console.log("Destoyer's captains quarters are at " + Destroyer_User_CQ_row + " Y: "+ col );



                // console.log("Ship was placed at x: " + Destroyer_User_row + " Y: "+ Destroyer_User_col );
                destroyer.style.display = 'inline';
                destroyer.disabled = 'true';

            }
            else if(shipType == "BATTLESHIP")
            {
                console.log("You have placed a BATTLESHIP");
                console.log("Ship was placed at x: " + row + " Y: "+ col );
                Battleship_User_col = col;
                Battleship_User_row = row;

                col = String.fromCharCode(col.charCodeAt(0) + 2);

                Battleship_User_CQ_col= col;
                Battleship_User_CQ_row = row;

                console.log("The Battleships captain's quarters are at " + Battleship_User_CQ_row + " Y: "+ col);
                battleship.style.display = 'inline';
                battleship.disabled = 'true';

            }



            if (placedShips == 3) {
                vert.style.display= 'none';
                instruction1.style.display= 'none';
                start_game.style.display='block';

                //myFunction();
                //
                //isSetup = false;
                registerCellListener((e) => {});

            }

        });
        //alert("You have placed a ship");
    } else {
        sendXhr("POST", "/attack", {game: game, x: row, y: col}, function(data) {
            console.log("x location is " + row);
            console.log("y location is " + col);

            //console.log("The MineSweeper location is x: "+ MineSweeper_User_row + " Y:" + MineSweeper_User_Col);

            game = data;

            game.playersBoard.attacks.forEach((attack) => {let className;
            if (attack.location.row === MineSweeper_User_CQ_row && attack.location.column === MineSweeper_User_CQ_col) {
                //alert("Minsweeeper Captains Quarters have been hit");
                if(MineSweeper_life === 1)
                {
                    alert("Minsweeeper Captains Quarters have been hit");
                    MineSweeper_life--;
                    hit = 1;
                    input = 1;
                    console.log("Hit is equal to: " + hit);


                }

            }
            else if (attack.location.row === Battleship_User_CQ_row && attack.location.column === Battleship_User_CQ_col) {
                if (Battleship_life === 2) {

                    alert("The Battleship Captains Quarters have been hit");
                    Battleship_life--;
                    hit = 2;
                    input = 1;
                    console.log("Hit is equal to: " + hit);

                }
            }
            else if (attack.location.row === Destroyer_User_CQ_row && attack.location.column === Destroyer_User_CQ_col) {
                if (Destroyer_life === 2)
                {

                    alert("The Destroyer's Captains Quarters have been hit");
                    Destroyer_life--;
                    hit = 3;
                    input = 1;
                    console.log("Hit is equal to: " + hit);

                }

            }


        });


            redrawGrid();

        })
    }

}



function sendXhr(method, url, data, handler) {
    var req = new XMLHttpRequest();
    req.addEventListener("load", function(event) {


        if (req.status != 200) {
            if (shipType != null) {
                alert("Two ships may not occupy one square. Please try placing in another spot.");
                return;
            }
            alert("You must select a ship first.");
            return;
        }
        handler(JSON.parse(req.responseText));
        // alert("You have placed a ship");
    });
    req.open(method, url);
    req.setRequestHeader("Content-Type", "application/json");
    req.send(JSON.stringify(data));

}

function place(size) {
    return function() {
        let row = this.parentNode.rowIndex;
        let col = this.cellIndex;
        vertical = document.getElementById("is_vertical").checked;
        let table = document.getElementById("player");
        for (let i=0; i<size; i++) {
            let cell;
            if(vertical) {
                let tableRow = table.rows[row+i];
                if (tableRow === undefined) {
                    // ship is over the edge; let the back end deal with it
                    break;
                }
                cell = tableRow.cells[col];
            } else {
                cell = table.rows[row].cells[col+i];
            }
            if (cell === undefined) {
                // ship is over the edge; let the back end deal with it
                break;
            }
            cell.classList.toggle("placed");
            //alert("You have placed a ship");
        }
        //alert("You have placed a ship");
    }

}

function initGame() {
    makeGrid(document.getElementById("opponent"), false);
    makeGrid(document.getElementById("player"), true);
    document.getElementById("place_minesweeper").addEventListener("click", function(e) {
        shipType = "MINESWEEPER";
        registerCellListener(place(2));
    });
    document.getElementById("place_destroyer").addEventListener("click", function(e) {
        shipType = "DESTROYER";
        registerCellListener(place(3));
    });
    document.getElementById("place_battleship").addEventListener("click", function(e) {
        shipType = "BATTLESHIP";
        registerCellListener(place(4));
    });
    sendXhr("GET", "/game", {}, function(data) {
        game = data;

    });

};
