var gamePattern = []
var userClickedPattern = []
var level = 0;

var buttonColors = ['red', 'blue', 'green', 'yellow']
// flash(randomColor)

$(document).on('keypress', function(){
  $('h1').text(`Level ${level}`);
  nextSequence()
})

$('.btn').click(function(){
  var color = event.target.id;
  flash(color);
  userClickedPattern.push(color);

  checkAnswer(userClickedPattern.length - 1);
})

function nextSequence(){
  var randNum = Math.floor(Math.random()*4);
  var randomColor = buttonColors[randNum];
  flash(randomColor);
  gamePattern.push(randomColor);
}

function flash(color){
  $(`#${color}`).addClass('pressed');
  var audio = new Audio(`./sounds/${color}.mp3`);
  audio.play();

  setTimeout(function() {
    $(`#${color}`).removeClass('pressed');
  }, 100);
}

function checkAnswer(currLevel){
  if(userClickedPattern[currLevel] === gamePattern[currLevel]){
    if(currLevel === level){
      setTimeout(function(){
        nextSequence();
        userClickedPattern = []
        level ++;
        $('h1').text(`Level ${level}`);
      }, 1000);
    }
  } else {
    gameOver();
  }
}

function gameOver(){
  level = 0;
  userClickedPattern = []
  gamePattern = []

  var audio = new Audio(`./sounds/wrong.mp3`);
  audio.play();
  $('body').addClass('game-over')

  setTimeout(function(){
    $('body').removeClass('game-over')
  }, 200)

  $('h1').text("Game Over, Press Any Key to Restart.")
}
