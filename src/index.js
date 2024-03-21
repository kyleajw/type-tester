import { words } from './common.json'

let currentWord = 0;
let wordIndex = 0;
const wordBox = document.getElementById('word-box');
generateWords();

document.querySelectorAll('.word')[currentWord].classList.add('current-word');
document.querySelectorAll('.letter')[wordIndex].classList.add('current-letter')


document.addEventListener("keydown", e => {
    if (!(e.key == 'Alt' || e.key == 'Control' || e.key == 'Shift')) {
        const word = document.querySelectorAll('.word')[currentWord];
        const wordLength = word.querySelectorAll('.letter').length;
        const letter = word.querySelectorAll('.letter')[wordIndex];

        letter.classList.remove('current-letter');

        // console.log(wordIndex)
        if (e.key == "Backspace") {
            if (wordIndex > 0) {
                word.querySelectorAll('.letter')[wordIndex - 1].classList.remove('correct', 'incorrect');
                wordIndex--

            } else {
                if (currentWord > 0) {
                    currentWord--
                    wordIndex = document.querySelectorAll('.word')[currentWord].querySelectorAll('.letter').length - 1
                    document.querySelectorAll('.word')[currentWord].querySelectorAll('.letter')[wordIndex].classList.remove('correct', 'incorrect');

                }
            }
            document.querySelectorAll('.word')[currentWord].classList.add('current-word');
            document.querySelectorAll('.word')[currentWord].querySelectorAll('.letter')[wordIndex].classList.add('current-letter');

        }
        else {
            if (e.key == letter.innerHTML) {
                letter.classList.add('correct');
            } else {
                letter.classList.add('incorrect');
            }

            wordIndex++;
            if (wordIndex < wordLength) {
                word.querySelectorAll('.letter')[wordIndex].classList.add('current-letter')

            }

            if (wordIndex >= wordLength) {
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
        }

    }






})


function generateWords() {
    const MAX_VISIBLE_WORDS = 36;
    wordBox.innerHTML = "";
    for (let i = 0; i < MAX_VISIBLE_WORDS; i++) {
        const word = words[Math.floor(Math.random() * words.length)]
        // visibleWords.push(word);
        let wordHTML = "";
        for (let i = 0; i < word.length; i++) {
            wordHTML += `<span class="letter">${word[i]}</span>`;

        }
        wordBox.innerHTML += `<span class="word">${wordHTML}</span>`;
    }

}
