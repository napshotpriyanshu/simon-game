var colorBtn =["red","blue","green","yellow"];
var gameMoves=[];
var userInputPattern=[];
var level = 0;
var started = true;

$(".btn").click(function(){
    var userInput = $(this).attr("id");
    userInputPattern.push(userInput);
    playSound(userInput);
    animatePress(userInput);
    checkAnswer(userInputPattern.length-1);
});

$(document).keypress(()=>{
    if (started) {

         $("#level-title").text("Level " + level);
         nextSequence();
        started = false;
      }

});


function nextSequence(){
    userInputPattern = [];
    level++;
    $("#level-title").text("LEVEL"+level);

    var randomNumber = Math.floor(Math.random()*4);
    var randomColor = colorBtn[randomNumber];
    
    gameMoves.push(randomColor);

    $("#" + randomColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomColor);
    
}


function playSound(name){
    var audio = new Audio("sounds/"+ name +".mp3");
    audio.play();
}

function animatePress(pressColor){
    $("#"+ pressColor).addClass("pressed");

    setTimeout(() => {
        $("#"+ pressColor).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel){
    if(gameMoves[currentLevel]===userInputPattern[currentLevel]){
        console.log("success");
        if(userInputPattern.length=== gameMoves.length){
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    }
    else{
        console.log("worng");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 300);

        $("#level-title").text("Game Over, Press any key to start");
        startOver();
    }

}

function startOver() {
    level =0;
    gameMoves=[];
    started=true;
}