const buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let started = false;
let level = "1";

startNewGame();
// console.log("Has the game started yet? " + started);
function startNewGame() {
    $(document).on('keypress', () => {
        if (!started) {
            started = true;
            nextSequence();
        }
        // console.log("Has the game started yet? " + started);
    });
}

function nextSequence() {
    userClickedPattern = [];


    let randomNumber = Math.floor(Math.random() * 4);
    // console.log("randomNumber is " + randomNumber )
    
    let randomChosenColour = buttonColours[randomNumber];
    // console.log("randomChosenColour is " + randomChosenColour);
    
    gamePattern.push(randomChosenColour);
    // console.log("gamePattern is " + gamePattern);
    
    $('#' + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);

    $("#level-title").text('Level ' + level);
    level++;
}

$('.btn').on('click', function () {
    let userChosenColour = $(this).attr('id');
    // console.log('userChosenColour is ' + userChosenColour);
    userClickedPattern.push(userChosenColour);
    // console.log('userClickedPattern is ' + userClickedPattern);

    playSound(userChosenColour);

    animatePress(this);

    checkAnswer();
})


function playSound(input) {
    var audio = new Audio('sounds/' + input + '.mp3');
    audio.play();
}

function animatePress(currentColour) {
    $(currentColour).addClass('pressed');
    setTimeout(function () {
        $(currentColour).removeClass('pressed');
    },100);
}

function checkAnswer() {

    // console.log(` userClickedPattern.length : ${userClickedPattern.length} .....  gamePattern.length : ${gamePattern.length}`)
    // if ((userClickedPattern[userClickedPattern.length - 1]) === (gamePattern[gamePattern.length - 1])) {
    if ((userClickedPattern[userClickedPattern.length - 1]) === (gamePattern[userClickedPattern.length - 1])) {
        //!! using the game pattern in the comparison is a mistake here as the game pattern is increasing while I'm resetting the user pattern in each iteration */
        // console.log(`success : userClickedPattern last color is ${userClickedPattern[userClickedPattern.length - 1]} EQUALS gamePattern last color ${gamePattern[gamePattern.length - 1]}`);
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        // console.log(`fail : userClickedPattern last color is ${userClickedPattern[userClickedPattern.length - 1]} NOT EQUAL gamePattern last color ${gamePattern[gamePattern.length - 1]}`);
        wrong();
    }
}


function wrong() {

    playSound('wrong');
    
    $('body').addClass('game-over');
    setTimeout(function () {
        $('body').removeClass('game-over');
    }, 200);

    $('h1').text('Game Over, Press Any Key to Restart');
    reset();
}

function reset() {
    started = false;
    level = 1;
    gamePattern = [];
    startNewGame();
}