/*
 * Create a list that holds all of your cards*/
// the "Array.from" method transform the nodeList with all the list elements in the document in a array
const cardsList = Array.from(document.querySelectorAll('.deck li'));
let openCards = [];
const deck = document.querySelector('.deck');

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

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
};

// function to iterate true each card item and add then to the deck 
function shuffleDeck() {
    const shuffleCards = shuffle(cardsList);
    for(card of shuffleCards) {
        deck.appendChild(card);
    }
};
shuffleDeck();

// function to open or close the card
function toggleCard(card) {
    card.classList.toggle('open');
    card.classList.toggle('show');
};

// function to push a open card to the array 
function addOpenCard(card) {
    openCards.push(card);
};
// function of the "match" condition
function match() {
    openCards[0].classList.toggle('match');
    openCards[1].classList.toggle('match');
    openCards = [];
};
// function of the "not a match" condition
function notMatch() {
    setTimeout(function() {
    toggleCard(openCards[0]);
    toggleCard(openCards[1]);
    openCards = [];
    }, 700)
};

// function to check the "match and not a match" condition 
function checkMatch() {
    if (openCards[0].firstElementChild.className === openCards[1].firstElementChild.className) {
        match();
    }else {
        notMatch();
    }
};

// event listener to a click in the cards
deck.addEventListener('click', function(evt) {
    const target = evt.target;
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
        }
    }
});

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
