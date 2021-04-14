var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var count = 0;
var started = false;
var userClickedPattern = [];
$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("level:" + count);
    newSequence();
    started = true;
  }
})
$(".btn").click(function() {
  var userChosenColor = $(this).attr("id");

  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});

function newSequence() {
  userClickedPattern = [];
  count++;
  $("#level-title").text("level:" + count);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChoosenColor = buttonColors[randomNumber];

  gamePattern.push(randomChoosenColor);
  $("#" + randomChoosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChoosenColor);


}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");



  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] == userClickedPattern[currentLevel]) {
    console.log("success");

    if (gamePattern.length == userClickedPattern.length) {
      setTimeout(function() {
        newSequence();
      }, 1000);
    } }else {
      $("#level-title").text("Game Over,press any key to restart");
      $("body").addClass("game-over");
      setTimeout(function(){
        $("body").removeClass("game-over");
      },200);
      var wrong= new Audio("sounds/wrong.mp3")
      wrong.play();
      $(document).keypress(function(){
        location.reload(true);
      })


  }}
