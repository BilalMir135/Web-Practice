const startQuizBtn = document.querySelector('#start-quiz');
const quiz = document.querySelector('#quiz');
const questionDiv = document.querySelector('.question');
const optionsDiv = document.querySelector('.options');
const questionNum = document.querySelector('#question-num');
const quizData = [
  {
    question: 'What does HTML stands for?',
    options: [
      'Highlevel markup language',
      'Highlevel markdown language',
      'Hypertext markup language',
      'Hello markup language',
    ],
    correctAnswer: 'Hypertext markup language',
  },
  {
    question: 'What does CSS stands for?',
    options: [
      'Course Code Stylesheet',
      'Cascading Stylesheet',
      'Complex Stylesheet',
      'Copycat Stylesheet',
    ],
    correctAnswer: 'Cascading Stylesheet',
  },
  {
    question: 'What display property span elements have by default?',
    options: ['Block', 'Inline', 'Inline-block', 'None'],
    correctAnswer: 'Inline',
  },
  {
    question: ' Is java script is case sensitive?',
    options: ['Yes', 'No'],
    correctAnswer: 'Yes',
  },
  {
    question: 'What does http stands for?',
    options: [
      'High text transfer protocol',
      'Hyper text type paragraph',
      'Hyper text transfer paragraph',
      'Hyper text transfer protocol',
    ],
    correctAnswer: 'Hyper text transfer protocol',
  },
];
const nextBtn = document.querySelector('#next');
let questionCount = 0;
let isUserSelectAns = false;
let score = 0;

//start quiz
startQuizBtn.addEventListener('click', () => {
  startQuizBtn.style.display = 'none';
  quiz.style.display = 'block';
  displayQuestion(
    quizData[questionCount].question,
    quizData[questionCount].options
  );
});

const createOption = (option) => {
  const opt = document.createElement('div');
  opt.innerHTML = option;
  opt.setAttribute('onclick', 'selectAns(this)');
  optionsDiv.appendChild(opt);
};

const displayQuestion = (question, options) => {
  questionDiv.innerHTML = question;
  questionNum.innerHTML = `Question ${questionCount + 1} of ${quizData.length}`;
  optionsDiv.innerHTML = '';
  options.forEach((option) => {
    createOption(option);
  });
};

const displayResult = () => {
  quiz.style.display = 'none';
  document.querySelector('#correct').innerHTML = `Correct = ${score}`;
  document.querySelector('#wrong').innerHTML = `Wrong = ${
    quizData.length - score
  }`;
  const percentage = (score / quizData.length) * 100;
  document.querySelector('#percentage').innerHTML = `${percentage}%`;
  percentage >= 50
    ? (document.querySelector('#percentage').style.color = '#009900')
    : (document.querySelector('#percentage').style.color = '#cc0001');
  document.querySelector('#result').style.display = 'block';
};

const selectAns = (e) => {
  if (!isUserSelectAns) {
    isUserSelectAns = true;
    if (e.innerHTML === quizData[questionCount].correctAnswer) {
      e.style = 'background-color:#009900; color:#fff';
      score++;
    } else {
      e.style = 'background-color:#cc0001; color:#fff';
    }
  }
};

nextBtn.addEventListener('click', () => {
  if (isUserSelectAns) {
    questionCount++;
    isUserSelectAns = false;
    if (questionCount < quizData.length) {
      displayQuestion(
        quizData[questionCount].question,
        quizData[questionCount].options
      );
    } else {
      displayResult();
    }
  }
});
