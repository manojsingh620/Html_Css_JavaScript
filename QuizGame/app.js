const questions = [
    {
        question: "What is the default value of a variable of the int type in Java ?",
        answer: [
            { text: "1", correct: false },
            { text: "0", correct: true },
            { text: "-1", correct: false },
            { text: "NULL", correct: false },
        ]
    },
    {
        question: "In Java, which keyword is used to implement multiple inheritance ?",
        answer: [
            { text: "impliments", correct: true },
            { text: "extends", correct: false },
            { text: "inheritance", correct: false },
            { text: "extends/inheritance", correct: false },
        ]
    },
    {
        question: "What is the purpose of the finalize() method in Java ?",
        answer: [
            { text: "To clean up system resources", correct: false },
            { text: "To execute before program termination", correct: true },
            { text: "To invoke garbage collection", correct: false },
            { text: "To release memory leaks", correct: false },
        ]
    },
    {
        question: "What is the difference between ArrayList and LinkedList in Java ?",
        answer: [
            { text: "ArrayList allows null elements, LinkedList doesn't", correct: false },
            { text: "ArrayList allows faster random access, LinkedList allows faster insertion and deletion", correct: true },
            { text: "ArrayList is synchronized, LinkedList is not", correct: false },
            { text: "ArrayList is a generic class, LinkedList is not", correct: false },
        ]
    },
    {
        question: "Which of the following is an unchecked exception in Java ?",
        answer: [
            { text: "IOException ", correct: false },
            { text: "SQLException", correct: false },
            { text: "ClassNotFoundException", correct: false },
            { text: "RuntimeException", correct: true },
        ]
    },
    {
        question: "Which method is used to explicitly request garbage collection in Java ?",
        answer: [
            { text: "Runtime.gc()", correct: false },
            { text: "System.gc()", correct: true },
            { text: "garbageCollect()", correct: false },
            { text: "collectGarbage()", correct: false },
        ]
    },
    {
        question: "What is the purpose of the super keyword in Java ?",
        answer: [
            { text: "To refer to the superclass object ", correct: false },
            { text: "To invoke superclass methods", correct: false },
            { text: "To access superclass fields", correct: false },
            { text: "All of the above", correct: true },
        ]
    },
    {
        question: "What is the role of the compareTo() method in the Comparable interface ?",
        answer: [
            { text: "To compare two objects based on their natural order ", correct: true },
            { text: "To compare two objects for equality", correct: false },
            { text: "To compare two objects for reference equality ", correct: false },
            { text: "To compare two objects based on their hash codes", correct: false },
        ]
    },
    {
        question: "Which design pattern is used to provide a simple interface for a set of interfaces in a subsystem?",
        answer: [
            { text: "Decorator ", correct: false },
            { text: "Observer", correct: false },
            { text: "Facade", correct: true },
            { text: "Singleton", correct: false },
        ]
    },
    {
        question: "What is the purpose of the transient keyword in Java ?",
        answer: [
            { text: "To make a variable thread-safe", correct: false },
            { text: "To prevent serialization of a variable", correct: true },
            { text: "To declare a variable as constant", correct: false },
            { text: "To declare a variable as volatile", correct: false },
        ]
    },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("ans-btn");
const nextButton = document.getElementById("next-btn");


let currentQuestionIndex = 0;
let score = 0;

// The main function, startQuiz(), initializes the game and calls the showQuestion() function to display the first question.

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

// The showQuestion() function displays the question and the answer options, and then calls the selectAnswer() function to handle the user's selection.

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + "." + currentQuestion.question;

    currentQuestion.answer.forEach(answer =>{
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectAnawer);    //---> selectAnawer fuction()
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

// The selectAnswer() function checks the user's answer and updates the score. If the user has answered all of the questions, the showScore() function is called to display the user's score. 

function selectAnawer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score ++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = "true";
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `you scored ${score} out of ${questions.length} !`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handlenextButton(){
    currentQuestionIndex ++;
    if(currentQuestionIndex < questions.length){
       showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handlenextButton();
    }
    else{
        startQuiz();
    }
});

startQuiz();