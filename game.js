var gamePattern = [];
var userClickedPattern = [];

var buttonColours = ["red", "blue", "green", "yellow"];
var level = 0;
var started = false;


//Trigger nextSequence function ONLY on the FIRST KEYBOARD PRESS.
$(document).on('keydown', function(event) {
  if (started == false) {
    // $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
})




function nextSequence() {

  //Empty array everytime we call this function
  userClickedPattern = [];

  //Increase level by 1 everytime the nextSequence function is called and change h1 depending on level.
  level++
  $("#level-title").text("Level " + level);

  // Number between 0-3 and inserting a colour in the empty array based on the random number given
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  // Flashy button
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);

  // Play the sound for the button colour selected
  playSound(randomChosenColour);


}




// detect when any of the buttons are clicked and trigger a handler function.
$(".btn").on("click", function() {

  // store the id of the button that got clicked.
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);


  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1)
})



// Play that sound, m8 !
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}



// Function that adds class "pressed" to the pressed button then removes it after 100 ms
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");

  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed")
  }, 100)
}



function checkAnswer(currentLevel) {

  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("Succes !!!");


    if (userClickedPattern.length === gamePattern.length) {

      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {

    console.log("Wrong")
    playSound("wrong");

    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over")
    }, 300)

    $("#level-title").text("Game Over, Press Any Key to Restart")
    startOver();
  }
}


function startOver(){

level = 0;
gamePattern = [];
started = false;

}
