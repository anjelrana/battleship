var randomLoc = Math.floor(Math.random() * 5);
var locationOne = randomLoc;
var locationTwo = locationOne + 1;
var locationThree = locationTwo + 1;

var guess;
var guesses = 0;
var hits = 0;
var isSunk = false;

while (isSunk === false) {
    guess = prompt("Enter your 1-D coordinate between 0 to 6");

    if (guess === null) {
        alert("we are ending the game!");
        isSunk = true;
    } else if (guess >= 0 && guess < 7) {

        guesses++;
        if (guess === locationOne || guess === locationTwo || guess === locationThree) {
            hits++;
            if (guess === location) {
                locationOne = false;
            } else if (guess === locationTwo) {
                locationTwo = false;
            } else if (guess === locationThree) {
                locationThree = false;
            }
            if (hits === 3) {
                alert("you have sunken the ship");
                isSunk = true;
            } else {
                alert("hit");
            }
        } else {
            alert("miss")
        }


    } else {
        alert("please enter valid input")
    }
}

var stats = "your total guesses is " + guesses + " and your accuracy is " + (3 / guesses) * 100 + " %";
alert(stats);

//adding the game end - using the null value.and changing the state condition for the loop to end.