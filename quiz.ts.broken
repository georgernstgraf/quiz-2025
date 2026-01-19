const dataStr = sessionStorage.getItem("quizData");
const answer0 = document.getElementById("answer0") as HTMLInputElement;
const answer1 = document.getElementById("answer1") as HTMLInputElement;
const answer2 = document.getElementById("answer2") as HTMLInputElement;
const answer3 = document.getElementById("answer3") as HTMLInputElement;
const allQuestionCount = document.getElementById(
    "allQuestionCount",
) as HTMLElement;
allQuestionCount.innerText = "Hallo Welt";
let questionIndex = 0;
let data: any = {};

window.onload = () => {
    if (dataStr) {
        data = JSON.parse(dataStr);
    }
    loadQuestion();
};

function loadQuestion() {
    let currentQuestion = data.results[questionIndex];
    const allAnswers = currentQuestion.incorrect_answers.concat(
        currentQuestion.correct_answer,
    );
    allAnswers.sort(() => Math.random() - 0.5);
    answer0.value = allAnswers[0];
    answer1.value = allAnswers[1];
    answer2.value = allAnswers[2];
    answer3.value = allAnswers[3];
}
