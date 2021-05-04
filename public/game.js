const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: 'Which built-in method returns the length of the string?',
        choice1: 'length()',
        choice2: 'size()',
        choice3: 'index()',
        choice4: 'None of the above.',
        answer: 1,
    },

    {
        question: 'Which type of JavaScript language is ___',
        choice1: 'Object-Oriented',
        choice2: 'High-level',
        choice3: 'Assembly-language',
        choice4: 'Object-Based',
        answer: 4,
    },

    {
        question: 'Which of the following tag is used to insert a line-break in HTML?',
        choice1: '<br>',
        choice2: '<a>',
        choice3: '<pre>',
        choice4: '<b>',
        answer: 1,
    },

    {
        question: 'The HTML attribute used to define the internal stylesheet is -',
        choice1: '<script>',
        choice2: '<link>',
        choice3: '<style>',
        choice4: 'style',
        answer: 3,
    },

]

const SCORE_POINTS = 10
const MAX_QUESTIONS = 4

startGame = () => {
   questionCounter = 0
   score = 0
   availableQuestions =  [...questions]
   getNewQuestion()
} 

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => 
        {
            const number = choice.dataset['number']
            choice.innerText = currentQuestion['choice' + number]
        })

        availableQuestions.splice(questionsIndex, 1)

        acceptingAnswers = true

}
 
choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct')
        {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()