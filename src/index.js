import { words } from './common.json'

let currentWord = 0;
let wordIndex = 0;
const wordBox = document.getElementById('word-box');
const restartBtn = document.getElementById('restart');

let wordCount = 0;
let letterCount = 0;
let seconds;
let timeElapsed;
let started = false;

const wordCounter = document.getElementById('word-count')
const letterCounter = document.getElementById('letter-count')
const wpmCounter = document.getElementById('wpm')
const secondsDisplay = document.getElementById('seconds')


let timer;
initalise()






document.addEventListener("keydown", e => {


    if (!(e.key == 'Alt' || e.key == 'Control' || e.key == 'Shift' || e.key == 'Tab' || e.key == 'Enter' || e.key == ' ')) {

        if (timeElapsed != 60) {
            const word = document.querySelectorAll('.word')[currentWord];
            const wordLength = word.querySelectorAll('.letter').length;
            const letter = word.querySelectorAll('.letter')[wordIndex];

            letter.classList.remove('current-letter');


            if (e.key == "Backspace") {
                deleteCharacter(word)
            }

            else {
                if (!started) {
                    started = true;
                    timer = setInterval(() => {

                        seconds--;
                        timeElapsed++
                        secondsDisplay.textContent = seconds;
                        wpmCounter.textContent = Math.round((letterCount / 5) / (timeElapsed / 60))
                        if (timeElapsed > 59) {
                            clearInterval(timer);
                        }

                    }, 1000)

                }
                letterCount++;
                if (e.key == letter.innerHTML) {
                    letter.classList.add('correct');
                } else {
                    letter.classList.add('incorrect');
                }


                wordIndex++

                if (wordIndex < wordLength) {
                    word.querySelectorAll('.letter')[wordIndex].classList.add('current-letter')
                }


                if (wordIndex >= wordLength) {
                    wordCount++
                    wordCounter.textContent = wordCount;
                    goToNextWord(word)
                }



            }
            letterCounter.textContent = letterCount;

        }
    }

    if (e.key == " ") {
        initalise();
    }
})

function initalise() {
    clearInterval(timer);
    wpmCounter.textContent = 0
    currentWord = 0;
    wordIndex = 0;
    letterCount = 0;
    wordCount = 0;
    seconds = 60;
    timeElapsed = 0;
    started = false;
    generateWords();
    document.querySelectorAll('.word')[0].classList.add('current-word');
    document.querySelectorAll('.letter')[0].classList.add('current-letter')
    secondsDisplay.textContent = seconds;
    letterCounter.textContent = 0;
    wordCounter.textContent = 0;
}

function generateWords() {
    const MAX_VISIBLE_WORDS = 36;
    wordBox.innerHTML = "";
    for (let i = 0; i < MAX_VISIBLE_WORDS; i++) {
        const word = words[Math.floor(Math.random() * words.length)]
        let wordHTML = "";
        for (let i = 0; i < word.length; i++) {
            wordHTML += `<span class="letter">${word[i]}</span>`;
        }
        wordBox.innerHTML += `<span class="word">${wordHTML}</span>`;
    }
}

function deleteCharacter(word) {
    if (wordIndex > 0 || currentWord > 0) {
        letterCount--;
    }
    if (wordIndex > 0) {
        word.querySelectorAll('.letter')[wordIndex - 1].classList.remove('correct', 'incorrect');
        wordIndex--
    } else {
        if (currentWord > 0) {
            wordCount--
            wordCounter.textContent = wordCount;

            word.classList.remove('current-word')
            currentWord--
            wordIndex = document.querySelectorAll('.word')[currentWord].querySelectorAll('.letter').length - 1
            document.querySelectorAll('.word')[currentWord].querySelectorAll('.letter')[wordIndex].classList.remove('correct', 'incorrect');
        }
    }
    document.querySelectorAll('.word')[currentWord].classList.add('current-word');
    document.querySelectorAll('.word')[currentWord].querySelectorAll('.letter')[wordIndex].classList.add('current-letter');
}

function goToNextWord(word) {
    word.classList.remove('current-word')
    wordIndex = 0;
    currentWord++
    if (currentWord > document.querySelectorAll('.word').length - 1) {
        currentWord = 0
        generateWords();
    }
    document.querySelectorAll('.word')[currentWord].classList.add('current-word');
    document.querySelectorAll('.word')[currentWord].querySelectorAll('.letter')[0].classList.add('current-letter');
}

