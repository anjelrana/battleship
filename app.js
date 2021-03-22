var fireButton = document.querySelector(".button-fire");
var inputValue = document.querySelector("#coordinate-value");
window.onload = function () {
    model.generateShipLocations();
}


var view = {
    displayMessage: function (msg) {
        var messageDiv = document.querySelector(".message");
        messageDiv.innerText = msg;
        
    },
    displayHit: function (location) {
        var place = document.getElementById(location);
        place.classList.add("hit")
    },
    displayMiss: function (location) {
        var place = document.getElementById(location);
        place.classList.add("miss")
    }
}

var model = {
    boardSize: 7, // size of grid
    numShips: 3, // number of ship
    shipLength: 3, // number of location meaning the grid space it is taking for the ship.
    shipsSunk: 0, // how many ships are destroyed

    ships: [{
        locations: ["0", "0", "26"],
        hits: ["", "", ""]
    }, {
        locations: ["0", "0", "04"],
        hits: ["", "", ""]
    }, {
        locations: ["0", "0", "0"],
        hits: ["", "", ""]
    }],
    fire: function (guess) {

        for (var i = 0; i < this.numShips; i++) {
            if (this.ships[i].locations.indexOf(guess) != -1) {
                var indexValue = this.ships[i].locations.indexOf(guess);
                this.ships[i].hits[indexValue] = "hit";
                view.displayHit(guess);
                view.displayMessage("what a HIT!");
                if (this.isSunk(this.ships[i])) {
                    this.shipsSunk++;
                    view.displayMessage("yo yo you just sank my ship")
                }
                console.log("found you")
                return true;
            }
        }
        console.log("not there")
        view.displayMiss(guess);
        view.displayMessage("better luck next time B*t**")
        return false;

    },
    isSunk: function (ship) {
        for (var i = 0; i < this.shipLength; i++) {
            if (ship.hits[i] !== "hit") {
                return false;
            }
        }
        return true;
    },
    generateShipLocations: function () {
        var locations;
        for (var i = 0; i < this.numShips; i++) {

            do {
                locations = this.generateShip();
                
            } while (this.collision(locations)) ;
                this.ships[i].locations = locations;
                
            

        }
    },
    collision: function (locations) {
        for (var i = 0; i < this.numShips; i++) {
            var ship = model.ships[i];            
            
            for (var j = 0; j < locations.length; j++) {
                if (ship.locations.indexOf(locations[j]) >= 0) {
                    console.log("checking 11111");
                    console.log(locations[j])
                    return true;                    
                    
                }
            }
        }

        return false;
    },
    generateShip: function () {
        var direction = Math.round(Math.random());
        var col, row;

        // choosing between direction - i.e 1 or 0
        if (direction === 1) {
            //horizontal  - starting location 
            row = Math.floor(Math.random() * this.boardSize);
            col = Math.floor(Math.random() * (this.boardSize - this.shipLength));
        } else {
            //vertical - starting location 
            col = Math.floor(Math.random() * this.boardSize);
            row = Math.floor(Math.random() * (this.boardSize - this.shipLength));

        }

        var newShipLocations = [];
        for (var i = 0; i < this.shipLength; i++) {
            if (direction === 1) {
                // add location to array for new horizontal ship
                newShipLocations.push(row + "" + (col + i));
            } else {
                newShipLocations.push((row + i) + "" + (col));
            }
        }
        return newShipLocations;
    }

}

var controller = {
    guesses: 0,
    processGuess: function (guess) {
        var location = parseGuess(guess);
        if (parseGuess(guess)) {
            //rest of the code
            this.guesses++;
            var hit = model.fire(parseGuess(guess)); // we get true in return
            if ( hit&&model.shipsSunk === model.numShips) {
                view.displayMessage("you sank all my battleships, in " + controller.guesses + " guesses");
            }
        }

    }
}

function parseGuess(guess) {
    var aplha = ["A", "B", "C", "D", "E", "F", "G"]
    if (guess === null || guess.length !== 2) {
        alert("please be aware and put a letter and a digit eg : A5")
    } else {
        var firstChr = guess.charAt(0);
        var row = aplha.indexOf(firstChr);
        var col = guess.charAt(1);

        if (isNaN(row) || isNaN(col)) {
            alert("oh no there is a NaN")
        } else if (row < 0 || row >= 7 || col < 0 || col >= 7) {
            alert("ffffffffff")
        } else {
            return row + col;
        }


    }
    return null;
}


fireButton.addEventListener("click", handleFireButton);
inputValue.addEventListener("keypress", executeFireButton);


function handleFireButton() {
    
    var guessValue = inputValue.value;
    controller.processGuess(guessValue);
    inputValue.value = ""; // reseting the value to back in the dom structure
    if(model.shipsSunk === 3) {
        setTimeout(()=> {
            location.reload();
        },3500)
    }

}

function executeFireButton(event) {
    if (event.key === "Enter") {
        fireButton.click();
        return false;
    }
}

