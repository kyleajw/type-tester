import { words } from './common.json'

let currentWord = 0;
let wordIndex = 0;
const wordBox = document.getElementById('word-box');
const restartBtn = document.getElementById('restart');
let autoSpaceEnabled = true;

initalise()

restartBtn.addEventListener("click", e => {
    initalise();
})



document.addEventListener("keydown", e => {


    if (!(e.key == 'Alt' || e.key == 'Control' || e.key == 'Shift' || e.key == 'Tab' || e.key == 'Enter')) {

        const word = document.querySelectorAll('.word')[currentWord];
        const wordLength = word.querySelectorAll('.letter').length;
        const letter = word.querySelectorAll('.letter')[wordIndex];

        letter.classList.remove('current-letter');

        if (e.key == ' ' && !autoSpaceEnabled) {
            goToNextWord(word)
        }
        else if (e.key == "Backspace") {
            deleteCharacter(word)
        }
        else {
            if (e.key == letter.innerHTML) {
                letter.classList.add('correct');
            } else {
                letter.classList.add('incorrect');
            }


            if (!autoSpaceEnabled) {
                wordIndex < wordLength - 1 ? wordIndex++ : wordIndex

            } else {
                wordIndex < wordLength ? wordIndex++ : wordIndex

            }

            if (wordIndex < wordLength) {
                word.querySelectorAll('.letter')[wordIndex].classList.add('current-letter')
            }


            if (wordIndex >= wordLength && autoSpaceEnabled) {
                goToNextWord(word)
            }



        }
    }
})

function initalise() {
    currentWord = 0;
    wordIndex = 0;
    autoSpaceEnabled = document.getElementById('auto-space').checked;
    generateWords();
    document.querySelectorAll('.word')[0].classList.add('current-word');
    document.querySelectorAll('.letter')[0].classList.add('current-letter')
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
    if (wordIndex > 0) {
        word.querySelectorAll('.letter')[wordIndex - 1].classList.remove('correct', 'incorrect');
        wordIndex--
    } else {
        if (currentWord > 0) {
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

