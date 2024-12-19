
let backgroundMusic = new Audio('./Sound/BackGroundMusic.mp3');

if (backgroundMusic) {
    backgroundMusic.play();
    backgroundMusic.volume = 0.5;
    backgroundMusic.loop = true;
}






//Create Main Div
const mainDiv = document.createElement('div');
mainDiv.id = 'mainDiv';
mainDiv.style.width = '80%';
mainDiv.style.height = '80vh';
mainDiv.style.border = '15px groove white';
mainDiv.style.boxShadow = '5px 5px 15px 15px white';
mainDiv.style.display = 'flex';
mainDiv.style.justifyContent = 'center';
mainDiv.style.alignItems = 'center';
mainDiv.style.margin = '0 auto';



document.body.appendChild(mainDiv);



//Creating Start Game Page
const startGamePage = document.createElement('div');
startGamePage.id = 'startGamePage';
startGamePage.style.width = '80%';
startGamePage.style.height = '80vh';
startGamePage.style.backgroundColor = 'linear-gradient(135deg, #3a1c71, #131648, #ffaf7b)';
startGamePage.style.position = 'absolute';
startGamePage.style.display = 'flex';
startGamePage.style.justifyContent = 'center';
startGamePage.style.alignItems = 'center';
startGamePage.style.flexDirection = 'column';
mainDiv.appendChild(startGamePage);




//Creating Start Game Button Function
const startGame = () => {
    const gameStartSound = new Audio('./Sound/StartGame.mp3').play();
    startGamePage.style.display = 'none';
    mainDiv.appendChild(gameContainer);
    mainDiv.style.border = '0';
    mainDiv.style.boxShadow = 'none';
}




//Creating Game Start Animated Title
const gameTitle = document.createElement('img');
gameTitle.src = './images/MemoryTitleGif.gif';
gameTitle.style.marginTop = '-30%';
gameTitle.style.width = '30%';



//Creating Creator Credits
const creatorCredits = document.createElement('h2');
creatorCredits.textContent = 'By Yossi Tsabari';
creatorCredits.style.position = 'absolute';
creatorCredits.style.width = '30%';
creatorCredits.style.textAlign = 'center';
creatorCredits.style.fontSize = '40px';
creatorCredits.style.color = 'white';
creatorCredits.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';




//Creating Start Game Button
const startGameButton = document.createElement('button');
startGameButton.textContent = 'Start Game';
startGameButton.style.width = '30%';
startGameButton.style.height = '10%';
startGameButton.style.fontSize = '30px';
startGameButton.style.background = 'linear-gradient(135deg, #3a1c71, #131648, #ffaf7b)';
startGameButton.style.color = 'white';
startGameButton.style.border = '5px groove white';
startGameButton.style.borderRadius = '10px';
startGameButton.style.cursor = 'pointer';
startGameButton.addEventListener('click', startGame);


startGamePage.appendChild(startGameButton);
startGamePage.appendChild(gameTitle);
startGamePage.appendChild(creatorCredits);

//Animating Game Title
const animateTitle = () => {

    const style = document.createElement('style');
    style.textContent = `
    @keyframes pulseDance {
        0% {
            transform: scale(1) translateX(0);
        }
        25% {
            transform: scale(1.2) translateX(10px);
        }
        50% {
            transform: scale(1) translateX(-10px);
        }
        75% {
            transform: scale(0.8) translateX(10px);
        }
        100% {
            transform: scale(1) translateX(0);
        }
    }
    `;
    document.head.appendChild(style);



}













const cards = [
    './Cards/1.png', './Cards/2.png', './Cards/3.png', './Cards/4.png', './Cards/5.png', './Cards/6.png', './Cards/7.png', './Cards/8.png',
    './Cards/1.png', './Cards/2.png', './Cards/3.png', './Cards/4.png', './Cards/5.png', './Cards/6.png', './Cards/7.png', './Cards/8.png',

];

let flippedCards = [];
let matchedCards = 0;
let gameBoard = [];

const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
};

const createCard = (value, index) => {
    return {
        id: index,
        value: value,
        flipped: false,
        matched: false,
    };
};

const initializeGame = () => {
    shuffle(cards);
    gameBoard = cards.map((card, index) => createCard(card, index));
    renderBoard();
};

const renderBoard = () => {
    const gameContainer = document.getElementById('gameContainer');
    gameContainer.innerHTML = ''; // נקה את הלוח לפני יצירה מחדש

    gameBoard.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.className = 'card';
        cardElement.style.border = '1px solid white';
        cardElement.style.width = '100px';
        cardElement.style.height = '120px';
        cardElement.style.display = 'flex';
        cardElement.style.justifyContent = 'center';
        cardElement.style.alignItems = 'center';
        cardElement.style.margin = '15px';
        cardElement.style.marginLeft = '25%';
        cardElement.style.marginTop = '5%';
        cardElement.style.cursor = 'pointer';
        cardElement.style.backgroundImage = 'url(./images/BackCard.png)';
        cardElement.style.backgroundSize = 'cover';
        cardElement.style.backgroundPosition = 'center';
        cardElement.style.backgroundRepeat = 'no-repeat';

        // הוספת אירוע לחיצה
        cardElement.addEventListener('click', () => flipCard(index));
        gameContainer.appendChild(cardElement);



        if (card.flipped || card.matched) {
            cardElement.style.backgroundImage = `url(${card.value})`;
            cardElement.style.backgroundSize = 'cover';
            cardElement.style.backgroundRepeat = 'no-repeat';
            cardElement.style.backgroundPosition = 'center';

            cardElement.style.height = '120px';
        } else {
            cardElement.style.backgroundImage = 'url(./images/BackCard.png)'; // תמונת קלף סגור
        }



        // הוספת אירוע לחיצה
        cardElement.addEventListener('click', () => flipCard(index));
        gameContainer.appendChild(cardElement);
    });
};

const flipCard = (index) => {
    const card = gameBoard[index];

    if (card.flipped || card.matched) {
        return; // אם הקלף כבר הפוך או תואם, לא נעשה כלום
    }

    card.flipped = true;
    flippedCards.push(card);

    renderBoard();

    if (flippedCards.length === 2) {
        checkMatch();
    }
};

const checkMatch = () => {
    const [card1, card2] = flippedCards;

    if (card1.value === card2.value) {
        card1.matched = true;
        card2.matched = true;
        matchedCards++;

        if (matchedCards === gameBoard.length / 2) {
            const winMessage = document.createElement('div');
            winMessage.style.backgroundImage = 'url(./images/congrats.gif)';
            winMessage.style.backgroundSize = 'cover';
            winMessage.style.backgroundRepeat = 'no-repeat';
            winMessage.style.backgroundPosition = 'center';
            winMessage.style.width = '80%';
            winMessage.style.height = '80vh';
            winMessage.style.position = 'absolute';
            winMessage.style.top = '50%';
            winMessage.style.left = '50%';
            winMessage.style.transformOrigin = 'center';
            winMessage.style.transform = 'translate(-50%, -50%)';
            winMessage.style.border = '20px solid white';

            document.body.appendChild(winMessage);
        }
    } else {
        setTimeout(() => {
            card1.flipped = false;
            card2.flipped = false;
            renderBoard();
        }, 1000);
    }

    flippedCards = [];
};

// יצירת אלמנט דינמי לדף

const gameContainer = document.createElement('div');
gameContainer.id = 'gameContainer';
gameContainer.style.display = 'grid';
gameContainer.style.gridTemplateColumns = 'repeat(4, 1fr)';
gameContainer.style.width = '70%';
gameContainer.style.height = '90%';
gameContainer.style.marginLeft = '5%';
gameContainer.style.gap = '10px';
gameContainer.style.borderRadius = '7%';
gameContainer.style.backgroundImage = 'url(./images/PlatformBackgroundImage.jpg)';
gameContainer.style.border = '2px dashed white';


mainDiv.appendChild(gameContainer);




// התחלת המשחק
initializeGame();
