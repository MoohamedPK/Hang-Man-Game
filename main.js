const letters = "qwertyuiopasdfghjklzxcvbnm123456789$+#";
let lettersArray = Array.from(letters);

let letterContainer = document.querySelector(".letters");

lettersArray.forEach(letter => {

    let span = document.createElement("span");
    span.className = "letter-box";

    let theLetter = document.createTextNode (letter);

    span.appendChild(theLetter);

    letterContainer.appendChild(span);
})

const words = {
    rappers: [
        "21 savage",
        "chainz",
        "dugg",
        "50 cent",
        "action bronson",
        "a$ap rocky",
        "azealia banks",
        "cardi b",
        "desiigner",
        "french montana",
    ],
    countries: [
        "morroco",
        "america",
        "austrialia",
        "canada",
        "france",
        "china",
        "russia",
        "brazil",
        "argentine",
        "ukrain",
    ],
    actors: [
        "leonardo dicaprio",
        "morgan freeman",
        "brad pitt",
        "vin diesel",
        "shah rukh khan",
        "will smith",
        "bruce lee",
        "jacki chane",
        "angelina jolie",
        "tom cruise",
    ],
    cars: [
        "dacia",
        "ferrari",
        "lamborgini",
        "nissan",
        "porsh",
        "maclaren",
        "bugatti",
        "aston martin",
        "bmw",
        "mercedes",
    ],
    programming : [
        "javaScript",
        "java",
        "laravel",
        "go",
        "c++",
        "c#",
        "python",
        "mysql",
        "php",
        "scala",
    ],
};

let wordsKeys = Object.keys(words);

let randomWordNumber = Math.floor(Math.random() * wordsKeys.length);
let randomPropName = wordsKeys[randomWordNumber];
let randomPropValue = words[randomPropName];
console.log(randomPropValue);

let randomValueNumber = Math.floor(Math.random() * randomPropValue.length) ;
let randomValuename = randomPropValue[randomValueNumber];

document.querySelector(".category span").innerHTML = randomPropName; 

let guess = document.querySelector(".letters-guess");
let letterWithSpace = Array.from(randomValuename);

letterWithSpace.forEach(letter => {
    let emptySpan = document.createElement("span");

    if (letter === ' ') {
        emptySpan.className = "space";
    }
    guess.appendChild(emptySpan);
});

// get all letters spans 
let allSpans = document.querySelectorAll(".letters-guess span");
let wrongsLimit = 0;
let theDraw = document.querySelector(".hangman-draw");

document.addEventListener("click", (e) => {

    let theStatus = false;

    if (e.target.className == "letter-box") {
        e.target.classList.add("clicked");

        let clickedLetter = e.target.innerHTML.toLowerCase() ; 

        letterWithSpace.forEach((wordLetter, wordIndex) => {
            if (clickedLetter == wordLetter) {

                theStatus = true;

                allSpans.forEach((span, indexSpan) => {
                    if (wordIndex === indexSpan ) {
                        document.getElementById("success").play();
                        span.innerHTML = clickedLetter;
                    }
                });
            }
        });
        
        if (theStatus !== true) {

            wrongsLimit++ ;
            theDraw.classList.add(`wrongs-${wrongsLimit}`);
            document.getElementById("failed").play();

            if (wrongsLimit === 8) {
                endGame();
                document.getElementById("end").play();
                letterContainer.classList.add("stop");
            }
        }
    };
});

function endGame() {
    let overlay = document.createElement("div");
    overlay.className = "overlay";
    document.body.appendChild(overlay);

    let div = document.createElement("div");
    div. className = "popup";
    let divText = document.createTextNode(`Game Over :( , The Word Is :  ${randomValuename}`);
    div.appendChild(divText);

    document.body.appendChild(div);

    let closeButton = document.createElement("button");
    closeButton.className = "close";
    let buttonText = document.createTextNode("Play Again")

    closeButton.appendChild(buttonText);
    document.body.appendChild(closeButton)
    div.appendChild(closeButton);

    closeButton.onclick = function () {
        window.location.reload();
    }    
}