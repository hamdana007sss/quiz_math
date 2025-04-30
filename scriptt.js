const nameInputContainer = document.querySelector('.name-input-container');
const startQuizButton = document.getElementById('start-quiz-button');
const quizContainer = document.querySelector('.container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');
const resultContainer = document.getElementById('result-container');
const scoreElement = document.getElementById('score');
const restartButton = document.getElementById('restart-btn');

let currentQuestionIndex = 0;
let score = 0;
let questions = [
    {
        question: 'Diketahui jari-jari lingkaran= 27cm, berapakah luas lingkaran tersebut?',
        answers: [
            { text: '169,56', correct: true },
            { text: '165', correct: false },
            { text: '168,56', correct: false },
            { text: '159,65', correct: false }
        ]
    },
    {
        question: 'Diketahui deret aritmatika dengan suku ke-5 dan suku ke-8 berturut-turut adalah 8 dan 20, jumlah 8 suku pertama deret tersebut adalah?',
        answers: [
            { text: '104', correct: false },
            { text: '48', correct: true },
            { text: '64', correct: false },
            { text: '90', correct: false }
        ]
    },
    {
        question: 'Suatu perusahaan pada tahun pertama memproduksi 6000 unit barang pada tahun-tahun berikutnya, produksinya turun secara tetap sebesar 15% dari tahun sebelumnya. Perusahaan tersebut akan memproduksi barang tersebut pada tahun ketiga sebanyak?',
        answers: [
            { text: '4.860', correct: false },
            { text: '7.380', correct: false },
            { text: '4.335', correct: true },
            { text: '9.750', correct: false }
        ]
    },
    {
        question: 'Keuntungan seorang pengusaha bertambah setiap bulan dengan jumlah yang sama. Jika keuntungan sampai bulan ke-6 Rp. 9.700.000,00 dan jangan sampai bulan ke-10 Rp. 28.400.000,00, keuntungan sampai bulan ke-24 adalah?',
        answers: [
            { text: '105.000.000', correct: false },
            { text: '172.000.000', correct: false },
            { text: '171.400.001', correct: true },
            { text: '171.400.000', correct: false }
        ]
    },
    {
        question: 'Sebuah investasi memiliki tingkat pengembalian 10% per tahun. Jika anda menginvestasikan Rp. 100.000.000, berapa nilai investasi Anda setelah 5 tahun?',
        answers: [
            { text: '170.000.000', correct: false },
            { text: '161.000.000', correct: false },
            { text: '167.051.000', correct: false },
            { text: '161.051.000', correct: true }
        ]
    },
    {
        question: 'Sebuah bola dijatuhkan dari ketinggian 5 m setiap kali bola memantul ketinggian yang dicapai adalah 2 3 dari ketinggian sebelumnya titik berapa ketinggian bola setelah memantul 3 kali?',
        answers: [
            { text: '1,48 meter', correct: true },
            { text: '1,40 meter', correct: false },
            { text: '11,43 meter', correct: false },
            { text: '3 meter', correct: false }
        ]
    },
    {
        question: 'Jika tan(x) =√3, maka nilai x adalah?',
        answers: [
            { text: '60°', correct: false },
            { text: '80°', correct: false},
            { text: '240°', correct: true },
            { text: '140°', correct: false }
        ]
    },
    {
        question: 'Diketahui fungsi f(x) =2x + 3. Tentukan nilai f(4)!',
        answers: [
            { text: '11', correct: true },
            { text: '21', correct: false },
            { text: '12', correct: false },
            { text: '44', correct: false }
        ]
    
    },
    {
        question: 'Diketahui barisan aritmatika: 2,5,8,11,14. Tentukan suku ke-10!',
        answers: [
            { text: '40', correct: false },
            { text: '29', correct: true },
            { text: '59', correct: false },
            { text: '22', correct: false }
        ]
    },
    {
        question: 'Jika suku ke-3 dan ke-7 suatu barisan aritmatika adalah 11 dan 19. Maka suku ke-11 dari barisan tersebut adalah?',
        answers: [
            { text: '26', correct: false },
            { text: '25', correct: false },
            { text: '29', correct: false },
            { text: '27', correct: true }
        ]
    }
    // Tambahkan pertanyaan lain di sini
];

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.classList.add('hide');
    resultContainer.classList.add('hide');
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerText = `${questionNo}. ${currentQuestion.question}`;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('answer-btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    clearStatusClass(document.body);
    nextButton.classList.add('hide');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    setStatusClass(document.body, correct);
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
        button.disabled = true;
    });
    if (correct) {
        score++;
    }
    if (currentQuestionIndex < questions.length - 1) {
        nextButton.classList.remove('hide');
    } else {
        showResult();
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('incorrect');
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('incorrect');
}

function nextQuestion() {
    currentQuestionIndex++;
    showQuestion();
}

function showResult() {
    resetState();
    questionElement.innerText = `Kuis Selesai! Skor Anda adalah ${score} dari ${questions.length}`;
    nextButton.classList.add('hide');
    resultContainer.classList.remove('hide');
    scoreElement.innerText = `Skor Akhir: ${score} / ${questions.length}`;
}

// Event listener untuk tombol "Start Quiz"
startQuizButton.addEventListener('click', () => {
    const nameInputValue = document.getElementById('name').value.trim();
    if (nameInputValue !== '') {
        nameInputContainer.classList.add('hide');
        quizContainer.classList.remove('hide');
        startQuiz(); // Memulai kuis setelah nama diisi
    } else {
        alert('Silakan masukkan nama Anda!');
    }
});

restartButton.addEventListener('click', startQuiz);
nextButton.addEventListener('click', nextQuestion);

// Kuis tidak langsung dimulai, menunggu tombol "Start Quiz" ditekan
