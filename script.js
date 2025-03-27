const questions = [
    {
        question: "Which planet is known as the Red Planet?",
        answers: [
            {text: "Earth", correct: false},
            {text: "Jupitar", correct: false},
            {text: "Mars", correct: true},
            {text: "Venus", correct: false},
        ]
    },
    {
        question: "WWhat is the largest animal on Earth?",
        answers: [
            {text: "African Elephant", correct: false},
            {text: "Blue Whale", correct: true},
            {text: "Giraffe", correct: false},
            {text: "Great White Shark", correct: false},
        ]
    },
    {
        question: "What is the chemical symbol for gold?",
        answers: [
            {text: "Ag", correct: false},
            {text: "Au", correct: true},
            {text: "Fe", correct: false},
            {text: "Hg", correct: false},
        ]
    },
    {
        question: "Who developed the theory of relativity?",
        answers: [
            {text: "Isaac Newton", correct: false},
            {text: "Galileo Galilei", correct: false},
            {text: "Albert Einstein", correct: true},
            {text: "Marie Curie", correct: false},
        ]
    }
];

const questionList = document.getElementById("question");
const answerButton = document.getElementById("answer-btn");
const mainButton = document.getElementById("main-btn");

let questionsIndex = 0;
let score = 0;

function startQuiz(){
    questionsIndex = 0;
    score = 0;
    mainButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[questionsIndex];
    let questionNo = questionsIndex + 1;
    questionList.innerHTML = questionNo + '. '+currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add('btn');
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    })
}

    function resetState(){
        mainButton.style.display = "none";
        while(answerButton.firstChild){
            answerButton.removeChild(answerButton.firstChild);
        }
    };
    function selectAnswer(e){
        const selectedBtn = e.target;
        const isCorrect = selectedBtn.dataset.correct === "true";
        if(isCorrect){
            selectedBtn.classList.add("correct");
            score++;
        }else {
            selectedBtn.classList.add("incorrect");
        }
        Array.from(answerButton.children).forEach(button =>{
            if(button.dataset.correct === "true"){
                button.classList.add("correct");
            }
            button.disabled = true;
        });
        mainButton.style.display = "block";
    }

    function showScore(){
        resetState();
        questionList.innerHTML = `You Scored ${score} out of ${questions.length}`;
        mainButton.innerHTML = "Play Again";
        mainButton.style.display = "block";
    }

    function handleMainButton(){
        questionsIndex++;
        if(questionsIndex < questions.length){
            showQuestion();
        }else {
            showScore();
        }
    }

    mainButton.addEventListener("click", () => {
        if(questionsIndex < questions.length){
            handleMainButton();
        }
        else {
            startQuiz();
        }
    })



