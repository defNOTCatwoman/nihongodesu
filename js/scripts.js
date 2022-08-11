const question = document.getElementById("question");
const answers = Array.from(document.getElementsByClassName("answer-text"));
const questionCounterText = document.getElementById("counter");
const scoreText = document.getElementById("score");
const restart = document.getElementById("restart");



let questions = [
    {
        id: 1,
        question: `<h1>What is the te form for <fg t="い">行</fg>く?</h1>`,
        a: "って",
        b: "て",
        c: "いて",
        d: "んで",
        answer: "a",
    },
    {
        id: 2,
        question: `<h1>What is the te form for <fg t="よ">読</fg>む?</h1>`,
        a: "って",
        b: "て",
        c: "いて",
        d: "んで",
        answer: "d",
    },
    {
        id: 3,
        question: `<h1>What is the te form for <fg t="ね">寝</fg>る?</h1>`,
        a: "って",
        b: "て",
        c: "いて",
        d: "んで",
        answer: "b",
    },
    {
        id: 4,
        question: `<h1>What is the te form for くる?</h1>`,
        a: "って",
        b: "て",
        c: "きて",
        d: "んで",
        answer: "c",
    },
    {
        id: 5,
        question: `<h1>What is the te form for する?</h1>`,
        a: "って",
        b: "て",
        c: "いて",
        d: "して",
        answer: "d",
    },
    {
        id: 6,
        question: `<h1>What is the te form for <fg t="はな">話</fg>す?</h1>`,
        a: "って",
        b: "して",
        c: "いて",
        d: "て",
        answer: "b",
    },
    {
        id: 7,
        question: `<h1>What is the te form for <fg="あそ">遊</fg>ぶ?</h1>`,
        a: "って",
        b: "て",
        c: "んで",
        d: "して",
        answer: "c",
    },
    {
        id: 8,
        question: `<h1>What is the te form for <fg t="すわ">座</fg>る?</h1>`,
        a: "って",
        b: "て",
        c: "いて",
        d: "して",
        answer: "a",
    },
    {
        id: 9,
        question: `<h1>What is the te form for <fg t="み">見</f>る?</h1>`,
        a: "って",
        b: "て",
        c: "いて",
        d: "して",
        answer: "b",
    },
];


let questionCounter;
let score;
const MAX_QUESTIONS = 5;

let acceptingAnswers;


// function loadFromFile(){
//     let xhr = new XMLHttpRequest();

//     xhr.open("GET", "js.json", false);

//     xhr.send();

//     xhr.onload=function () {
//         if(this.status == 200) {
//             //console.log(this.response)

//         } else {
//             console.log("Opps, something went wrong");
//         }
//     };

//     return xhr.response;
// }

// //let questions = JSON.parse(loadfromfile());

const startGame = () => {

    questionCounter = 0;
    score = 0;
    acceptingAnswers = true;
    scoreText.innerText = score;

    availableQuestions = getRandomQuestions(questions, MAX_QUESTIONS);

    getNewQuestion();
};

const getRandomQuestions = (arr, n) => {
    let len = arr.lengthl
    if (n > len) {
        throw new RangeError(
            "getRandomQuestions: more elements taken than avialable"
        );
    }

    const shuffled = [...arr].sort(() => 0.5 - Math.random());

    return (selected = shuffled.slice(0, n));
};

const getNewQuestion = () => {
    if (availableQuestions.length === 0) {
        displayResults();
        return;
    }

    questionCounter++;
    questionCounterText.innerText = `${questionCounter}/${MAX_QUESTIONS}`;

    currentQuestion = availableQuestions[0];


    question.innerHTML = currentQuestion.question;

    answers.forEach((answer) => {
        answer.innerText = currentQuestion[answer.dataset["answer"]];
    });

    //TODO - ADD RANDOMIZATION;

    answers.forEach((answer) => {
        answer.addEventListener("click", e => {

            if (!acceptingAnswers) {
                return;
            }

            acceptingAnswers = false;
            const clickedAnswer = e.target;
            const answeredLetter = clickedAnswer.dataset["answer"]


            let classToApply = "incorrect";

            if (answeredLetter === currentQuestion.answer) {
                score++;
                scoreText.innerText= score;
                classToApply = "correct";
            }

            clickedAnswer.parentElement.classList.add(classToApply);

            setTimeout(() => {
                clickedAnswer.parentElement.classList.remove(classToApply);
                getNewQuestion();
                acceptingAnswers = true;

            }, 2000);
        });
    });

    availableQuestions.shift();
};

const displayResults = () => {
    const endGameModal = document.getElementById('endGame');
    const modal = new mdb.Modal(endGameModal);
    const modalBody = document.getElementById("modal-body");
    modalBody.innerText = `You scored: ${score}`;
    modal.show();
    acceptingAnswers = false;
}

restart.addEventListener("click", startGame);

startGame();