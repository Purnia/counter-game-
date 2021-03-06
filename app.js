/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/


//global variables 

var totalScore, roundScore, activePlayer, playingGame;

var diceRolls;

init();


//create onclick event 
document.querySelector('.btn-roll').addEventListener('click', function() {
 if(playingGame) {

//pick a number randomly
var dice = Math.floor(Math.random() * 6 + 1);


//add it to ui

diceDom = document.querySelector('.dice');
diceDom.style.display = 'block';
diceDom.src = 'dice-' + dice + '.png';



//update round score unless it hits 1, switch players
if (dice === 2 && diceRolls === 2 ) {
//player loses
totalScore[activePlayer]= 0;
document.querySelector('#score-' + activePlayer).textContent = '0';

roundScore = 0;
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.querySelector('.dice').style.display = 'none';

}
else if(dice !== 1) {
roundScore += dice;
//add that to UI
document.getElementById('current-' + activePlayer).textContent = roundScore; 
}

else{
    roundScore = 0;
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.querySelector('.dice').style.display = 'none';
}
//save dice to diceRolls here so that after the whole function is executed then it
//saves it to the global variable. otherwise, dice=dicerolls the moment the function runs
//and youll get the most recent value(i.e) dice and not the old value (i.e dicerolls)
diceRolls = dice
console.log(diceRolls);

 }


});

//hold button function//
//onclick, add current score to total score and display on dom 

document.querySelector('.btn-hold').addEventListener('click', function() {
    if(playingGame){
        totalScore[activePlayer] += roundScore;
        document.querySelector('#score-' + activePlayer).textContent = totalScore[activePlayer];
        
        //check if player has won
        var scoreSet = document.getElementById("scoreSet").value;
        
        if (totalScore[activePlayer] >= scoreSet) {
            document.querySelector('#name-' + activePlayer).textContent ='Winner!!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            playingGame = false;
           
            
        }
            
        else {
        //switch to other player 
        roundScore = 0;
            activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
            document.getElementById('current-0').textContent = '0';
            document.getElementById('current-1').textContent = '0';
        
            document.querySelector('.player-0-panel').classList.toggle('active');
            document.querySelector('.player-1-panel').classList.toggle('active');
        
            document.querySelector('.dice').style.display = 'none';
            
            
        
        }
        
        
           
    }


});

document.querySelector('.btn-new').addEventListener('click' , init);

function init() {
    totalScore = [0,0];
    activePlayer = 0;
    roundScore = 0;
    document.querySelector('.dice').style.display = 'none';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent ='Player 1';
    document.getElementById('name-1').textContent ='Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    playingGame= true;
    document.getElementById("scoreSet").textContent = '0';
}


