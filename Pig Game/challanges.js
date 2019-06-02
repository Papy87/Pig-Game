
var score, activePlayer, roundScore, gamePlaying, lastDice;

init()

document.querySelector(".btn-roll").addEventListener('click', function () {
    if (gamePlaying) {
        //1. Treaba nam random broj
        var dice = Math.floor(Math.random() * 6) + 1;
        var diceSecond= Math.floor(Math.random() * 6) + 1;

        //2. Treba nam da prikazemo taj broj
        var diceDOM = document.querySelector("#dice-1")
        diceDOM.style.display = "block"
        diceDOM.src = "dice-" + dice + ".png"

        var diceDOMTwo = document.querySelector("#dice-2")
        diceDOMTwo.style.display = "block"
        diceDOMTwo.src = "dice-" + diceSecond + ".png"
  

        // 3. Update rezultat osim ako broj nije broj 1
        if (dice === 6 && lastDice === 6) {
            scores[activePlayer] = 0
            document.getElementById("score-" + activePlayer).textContent = scores[activePlayer];
            nextPlayer()
        } else if (dice !==1 && diceSecond!==1) {
            // Dodaj rezultat
            roundScore += dice+diceSecond;
            // Prikazi taj rezultat u UI
            document.querySelector("#current-" + activePlayer).textContent = roundScore;
        } else {
            // Predji na drugog Igraca
            nextPlayer()
        }
        lastDice = dice
    }

})

document.querySelector(".btn-hold").addEventListener('click', function () {
    if (gamePlaying) {
        // Dodaj trenutni rezultat trajnom razultatu
        scores[activePlayer] += roundScore

        // Prikazi rezultat na UI
        document.getElementById("score-" + activePlayer).textContent = scores[activePlayer];
        //Predji na drugog igraca
        var input = document.querySelector(".final-score").value;
        var winningScore;
        console.log(input);
        // Proveri jel igrac pobedio
        if (input) {
            winningScore = input;
        } else {
            winningScore = 100;
        }

        if (scores[activePlayer] >= winningScore) {
            gamePlaying = false;
            document.querySelector("#name-" + activePlayer).textContent = " Winner!!!!!";
            document.querySelector(".dice").style.display = "none";
            document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner")
            document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active")

        } else {
            nextPlayer()
        }
    }
})

document.querySelector(".btn-new").addEventListener("click", init)

function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;

    document.querySelector("#dice-1").style.display = "none";
    document.querySelector("#dice-2").style.display = "none";


    document.getElementById("score-0").textContent = "0"
    document.getElementById("score-1").textContent = "0 "
    document.getElementById("current-0").textContent = "0"
    document.getElementById("current-1").textContent = "0"

    document.getElementById("name-0").textContent = " Player 1";
    document.getElementById("name-1").textContent = " Player 2";

    document.querySelector(".player-0-panel").classList.remove("winner")
    document.querySelector(".player-1-panel").classList.remove("winner")

    document.querySelector(".player-0-panel").classList.remove("active");
    document.querySelector(".player-0-panel").classList.add('active')

    document.querySelector(".player-1-panel").classList.add('active')
    document.querySelector(".player-1-panel").classList.remove("active");
}

function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById("current-0").textContent = "0";
    document.getElementById("current-1").textContent = "0";

    document.querySelector(".player-0-panel").classList.toggle('active')
    document.querySelector(".player-1-panel").classList.toggle("active");

    document.querySelector(".dice").style.display = "none";
    document.querySelector("#dice-2").style.display = "none";
}




