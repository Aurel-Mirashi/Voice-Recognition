'use strict'

const btn = document.querySelector('.btn');
const message = document.querySelector('.message')
const errorMessage = document.querySelector('.message-error');
const container = document.getElementById('container');

//Basic setup
var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList

let recognition = new SpeechRecognition();
let grammar = '#JSGF V1.0; '

const speechRecognitionList = new SpeechGrammarList();
speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;
recognition.lang = 'en-US';
recognition.interimResults = false;


//Adding functionality
btn.addEventListener('click', () => {
    message.textContent = '';
    errorMessage.textContent = '';
    container.style.background = 'rgba(51, 51, 51, 0.6)'
    recognition.start()
})

recognition.onresult = function (event) {
    const last = event.results.length - 1;
    let spokenWord = event.results[last][0].transcript

    
    //Getting the database data
    fetch(`http://localhost:8020/users`)
        .then(res => res.json())
        .then(res => {
            let users = res.data;
            const existingUser = users.find((user) => spokenWord === user.name || spokenWord.includes(user.name));

            if (existingUser) {
                message.textContent = `${existingUser.name} just spoke! Changed the background to ${existingUser.color}`;
                errorMessage.textContent = ''
                container.style.background = existingUser.color;
            } else {
                errorMessage.classList.remove('none')
                errorMessage.textContent = 'You do not belong in the class!'
            }
        })
}

recognition.onspeechend = function () {
    recognition.stop()
}

recognition.onerror = function () {
    errorMessage.classList.remove('none')
}

