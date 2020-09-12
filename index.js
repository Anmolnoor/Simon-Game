// var gamePattern = [];
// var userClickedPattern = [];
// var userChosenColour;
// var buttonColor =["red","blue","green","yellow"];
// var levels = 1;
// var up = 0 ;
// function nextSequence(){
//   var randomNumber = Math.floor(Math.random()*4);
//   var keycolor = buttonColor[randomNumber];
//     gamePattern.push(keycolor);
//     animatePress("#"+keycolor);
//     var k = "sounds/"+keycolor+".mp3";
//     playsound(k);
//
// }
// nextSequence();
// $(".btn").on("click",function(){
//   var clickedbtn = $(this).attr("id");
//
//   if(clickedbtn==gamePattern[up]){
//     animatePress(this);
//     userChosenColour=clickedbtn;
//     userClickedPattern.push(userChosenColour);
//     var key = "sounds/"+userChosenColour+".mp3";
//     playsound(key);
//     $("h1").text("Level "+levels++);
//     up++;
//     nextSequence();
//
//   }else{
//     $("h1").text("Game Over, Press Any Key to Restart");
//     $("body").addClass("game-over");
//     playsound("sounds/wrong.mp3");
//     setTimeout($("body").removeClass("game-over"),200);
//     levels=1;
//     up=0;
//   }
// });
//
// function playsound(name){
//   var audio = new Audio(name);
//   audio.play();
// }
//
// function animatePress(keypoint){
//   $(keypoint).fadeOut(100).fadeIn(100);
// }



var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});


function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      console.log("success");

      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }

    } else {

      console.log("wrong");

      //1. In the sounds folder, there is a sound called wrong.mp3, play this sound if the user got one of the answers wrong.
      playSound("wrong");

      //2. In the styles.css file, there is a class called "game-over", apply this class to the body of the website when the user gets one of the answers wrong and then remove it after 200 milliseconds.
      $("body").addClass("game-over");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      //3. Change the h1 title to say "Game Over, Press Any Key to Restart" if the user got the answer wrong.
      $("#level-title").text("Game Over, Press Any Key to Restart");

      startOver();
    }

}

function nextSequence() {

  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}
function startOver(){
  level=0;
  gamePattern=[];
  userClickedPattern = [];
  started = false;
}
