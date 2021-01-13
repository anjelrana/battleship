var randomLoc = Math.floor(Math.random() * 5 +1 );
var locationOne = randomLoc;
var locationTwo = locationOne + 1;
var locationThree = locationTwo + 1;

var guess;
var guesses = 0;
var hits = 0;
var isSunk = false;

while (isSunk === false) {
    guess = prompt("Enter your 1-D coordinate between 1 to 7");

    if (guess === null) {
        guesses = 0;
        alert("we are ending the game!");
        isSunk = true;
    } else if (guess > 0 && guess <= 7) {
         
        guesses++;
        if (Number(guess) === locationOne || Number(guess) === locationTwo || Number(guess) === locationThree) {
            alert("hit");
            hits++;
            if (hits === 3) {
                alert("you have sunken the ship");
                isSunk = true;
            }


            if (guess === location) {
                locationOne = false;
            } else if (guess === locationTwo) {
                locationTwo = false;
            } else if (guess === locationThree) {
                locationThree = false;
            } else {
                console.log(randomLoc);
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
