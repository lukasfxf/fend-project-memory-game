/*
 * Create a list that holds all of your cards*/
// the "Array.from" method transform the nodeList, with all the list elements in the document, in a array
const cardsList = Array.from(document.querySelectorAll('.card'));
const deck = document.querySelector('.deck');
const timer = document.querySelector('.fa-clock-o');
const moveText = document.querySelector('.moves');
const stars = document.querySelectorAll('.fa-star');
const cancelButton = document.querySelector('.modal-cancel');
const replayButton = document.querySelector('.modal-replay');
const resetButton = document.querySelector('.fa-repeat');
const winCount = 8;
let openCards = [];
let moveCount = 0;
let matched = 0;
let time = 0;
let timeHandler;
let timerOff = true;
let countStars = 3;

// Event listener to handler a click in the cards
deck.addEventListener('click', function(evt) {
    const target = evt.target;
        //this condition stop the timer from rushing and makes the stopTimer() function works
        if (timerOff) {
            startTimer();
            timerOff = false;
        }
        if (
        target.classList.contains('card') &&
        !target.classList.contains('match') && 
        openCards.length < 2 && 
        !openCards.includes(target)
        ) {
            toggleCard(target);
            addOpenCard(target);
        if (openCards.length == 2) {
            checkMatch();
            moves();
            starRating();
        }
        if (matched === winCount) {
            winGame();
        };
    }
});

// Event listeners to handler a click in the cancel and replay buttons on the modal
cancelButton.addEventListener('click', function() {
    toggleModal();
});
replayButton.addEventListener('click', function() {
    replayGame()
});

// Event listener to handler a click in the "Restart" Button
resetButton.addEventListener('click', function() {
    resetGame()
});

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

// Implement the shuffle function and iterate true each card item and add then to the deck 
function shuffleDeck() {
    const shuffleCards = shuffle(cardsList);
    for(card of shuffleCards) {
        deck.appendChild(card);
    }
}
shuffleDeck();

// Open or close the cards
function toggleCard(card) {
    card.classList.toggle('open');
    card.classList.toggle('show');
}

// Push an open card on the array openCards[] 
function addOpenCard(card) {
    openCards.push(card);
}

// Remove the stars 
function removeStar() {
    for (star of stars) {
        if (star.style.display !== 'none') {
            star.style.display = 'none';
            break;
        }
    }
}

// Remove star condiotional
function starRating() {
    if (moveCount === 15 || moveCount === 23) {
        removeStar();
        countStars--;
    }
}

// count and show the number of moves in the board (2 open cards = 1 move)
function moves() {
    moveCount++;
    moveText.innerHTML = moveCount; 
}

// Start the timer
function startTimer() {
    timeHandler = setInterval(function() {
        time++;
        displayTimer();   
    }, 1000);
}

// Display the timer
function displayTimer() {
    timer.innerHTML = ` ${time} Sec`;
}
    
//Stop the timer 
function stopTimer() {
    clearInterval(timeHandler);
}

// Toggle a matched card in the open position
function match() {
    openCards[0].classList.toggle('match');
    openCards[1].classList.toggle('match');
    openCards = [];
}

// Toggle back a non matched card in the close position
function notMatch() {
    setTimeout(function() {
    toggleCard(openCards[0]);
    toggleCard(openCards[1]);
    openCards = [];
    }, 700)
}

// Check the "match" or "notMatch" condition 
function checkMatch() {
    if (openCards[0].firstElementChild.className === openCards[1].firstElementChild.className) {
        match();
        matched++;
    }else {
        notMatch();
    }
}

// Win game function that stop the timer and show the modal
function winGame() {
    stopTimer();
    toggleModal();
}

// toggle the modal on and off
function toggleModal() {
    const modal = document.querySelector('.modal-background');
    modal.classList.toggle('hide');
    modalStats();
}

// show the game status on the modal
function modalStats() {
    const modalTime = document.querySelector('.modal-time');
    const timerValue = timer.innerHTML;
    const modalMoves = document.querySelector('.modal-moves');
    const modalStars = document.querySelector('.modal-stars');
    modalStars.innerHTML = `Stars = ${countStars}`;
    modalTime.innerHTML = `Time = ${timerValue}`;
    modalMoves.innerHTML = `Moves = ${moveCount}`;
}

// Resete the game and toggle the modal off
function replayGame() {
    resetGame();
    toggleModal();
}

// Reset the Game
function resetGame() {
    resetTimer();
    resetMoves();
    resetStars();
    shuffleDeck();
    resetCards();
    matched = 0;
}

// Reset the timer
function resetTimer() {
    stopTimer();
    timerOff = true;
    time = 0;
    displayTimer();
}

// Reset the move counter
function resetMoves() {
    moveCount = 0;
    moveText.innerHTML = moveCount;
}

// Reset the Stars counter
function resetStars() {
    countStars = 3;
    for (star of stars) {
        star.style.display = 'inline';
    }
}

// Reset the cards position
function resetCards() {
    for (card of cardsList) {
        card.className = 'card';
    }
}

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
