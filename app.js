// Слайдер
const slider = document.querySelector('.slider');
const prevButton = document.querySelector('.prev-button');
const nextButton = document.querySelector('.next-button');
const slides = Array.from(slider.querySelectorAll('img'));
const slideCount = slides.length;
let slideIndex = 0;

// Обработчики событий для кнопок
prevButton.addEventListener('click', showPreviousSlide);
nextButton.addEventListener('click', showNextSlide);

// Функция для показа предыдущего слайда
function showPreviousSlide() {
    slideIndex = (slideIndex - 1 + slideCount) % slideCount;
    updateSlider();
}

// Функция для показа следующего слайда
function showNextSlide() {
    slideIndex = (slideIndex + 1) % slideCount;
    updateSlider();
}

// Функция для обновления отображения слайдера
function updateSlider() {
    slides.forEach((slide, index) => {
        if (index === slideIndex) {
            slide.style.display = 'block';
        } else {
            slide.style.display = 'none';
        }
    });
}

// Инициализация слайдера
updateSlider();

// Функции для открытия и закрытия изображения в полноэкранном режиме
function openFullscreenImage(element) {
    const fullscreenContainer = document.getElementById('fullscreen-container');
    const fullscreenImage = document.getElementById('fullscreen-image');
    
    fullscreenImage.src = element.src;
    fullscreenContainer.style.display = 'block';
}

function closeFullscreenImage() {
    const fullscreenContainer = document.getElementById('fullscreen-container');
    fullscreenContainer.style.display = 'none';
}

// Плавная прокрутка страницы и отображение кнопки «Наверх»
window.onscroll = function() {
    scrollFunction();
};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById('scrollToTopButton').style.display = 'block';
    } else {
        document.getElementById('scrollToTopButton').style.display = 'none';
    }
}

// Плавный скроллинг при клике на кнопку "Наверх"
document.getElementById('scrollToTopButton').addEventListener('click', function() {
    scrollToTop();
});

function scrollToTop() {
    const scrollStep = -window.scrollY / 15;
    const scrollInterval = setInterval(function() {
        if (window.scrollY !== 0) {
            window.scrollBy(0, scrollStep);
        } else {
            clearInterval(scrollInterval);
        }
    }, 15);
}

// Автоматическое переключение слайдов каждые 5 секунд
setInterval(showNextSlide, 5000);

// Викторина по Гарри Поттеру
const quizData = [
    {
        question: "Как зовут сову Гарри Поттера?",
        options: ["Букля", "Хедвиг", "Эррол", "Пигвиджен"],
        correctAnswer: 1
    },
    {
        question: "Какое животное является патронусом Гарри?",
        options: ["Лев", "Олень", "Волк", "Феникс"],
        correctAnswer: 1
    },
    {
        question: "Как называется школа магии и волшебства?",
        options: ["Ильверморни", "Бобатон", "Хогвартс", "Дурмстранг"],
        correctAnswer: 2
    },
    {
        question: "Как зовут лучшего друга Гарри?",
        options: ["Невилл", "Рон", "Драко", "Сириус"],
        correctAnswer: 1
    },
    {
        question: "Как называется газета в мире волшебников?",
        options: ["Волшебный вестник", "Ежедневный пророк", "Магические новости", "Оракул"],
        correctAnswer: 1
    }
];

let currentQuestion = 0;
let userAnswers = Array(quizData.length).fill(null);
let quizCompleted = false;

// Элементы викторины
const questionElement = document.getElementById('question');
const optionsContainer = document.getElementById('optionsContainer');
const progressBar = document.getElementById('progressBar');
const progressText = document.getElementById('progressText');
const prevButtonQuiz = document.getElementById('prevButton');
const nextButtonQuiz = document.getElementById('nextButton');
const submitButton = document.getElementById('submitButton');
const resultContainer = document.getElementById('resultContainer');
const questionContainer = document.getElementById('questionContainer');
const scoreElement = document.getElementById('score');
const resultMessageElement = document.getElementById('resultMessage');
const resultDetailsElement = document.getElementById('resultDetails');
const restartButton = document.getElementById('restartButton');

// Инициализация викторины
function initQuiz() {
    currentQuestion = 0;
    userAnswers = Array(quizData.length).fill(null);
    quizCompleted = false;
    
    loadQuestion();
    updateProgress();
    updateButtons();
    
    resultContainer.classList.add('hidden');
    questionContainer.classList.remove('hidden');
}

// Загрузка вопроса
function loadQuestion() {
    const currentQuizData = quizData[currentQuestion];
    
    questionElement.textContent = currentQuizData.question;
    optionsContainer.innerHTML = '';
    
    currentQuizData.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.classList.add('quiz-option');
        optionElement.textContent = option;
        
        // Проверка выбранного ответа
        if (userAnswers[currentQuestion] === index) {
            optionElement.classList.add('selected');
        }
        
        // Проверка правильного ответа (если викторина завершена)
        if (quizCompleted && index === currentQuizData.correctAnswer) {
            optionElement.classList.add('correct');
        } else if (quizCompleted && userAnswers[currentQuestion] === index && 
                   userAnswers[currentQuestion] !== currentQuizData.correctAnswer) {
            optionElement.classList.add('incorrect');
        }
        
        optionElement.addEventListener('click', () => selectOption(index));
        optionsContainer.appendChild(optionElement);
    });
}

// Выбор варианта ответа
function selectOption(index) {
    if (quizCompleted) return;
    
    userAnswers[currentQuestion] = index;
    loadQuestion();
    updateButtons();
}

// Обновление прогресса
function updateProgress() {
    const progress = ((currentQuestion + 1) / quizData.length) * 100;
    progressBar.style.width = `${progress}%`;
    progressText.textContent = `Вопрос ${currentQuestion + 1} из ${quizData.length}`;
}

// Обновление кнопок навигации
function updateButtons() {
    prevButtonQuiz.disabled = currentQuestion === 0;
    
    if (currentQuestion === quizData.length - 1) {
        nextButtonQuiz.style.display = 'none';
        submitButton.style.display = 'block';
    } else {
        nextButtonQuiz.style.display = 'block';
        submitButton.style.display = 'none';
    }
    
    nextButtonQuiz.disabled = userAnswers[currentQuestion] === null;
}

// Переход к следующему вопросу
nextButtonQuiz.addEventListener('click', () => {
    if (currentQuestion < quizData.length - 1) {
        currentQuestion++;
        loadQuestion();
        updateProgress();
        updateButtons();
    }
});

// Переход к предыдущему вопросу
prevButtonQuiz.addEventListener('click', () => {
    if (currentQuestion > 0) {
        currentQuestion--;
        loadQuestion();
        updateProgress();
        updateButtons();
    }
});

// Завершение викторины
submitButton.addEventListener('click', () => {
    quizCompleted = true;
    showResults();
});

// Показ результатов
function showResults() {
    let score = 0;
    let resultDetailsHTML = '';
    
    quizData.forEach((quizItem, index) => {
        const userAnswer = userAnswers[index];
        const isCorrect = userAnswer === quizItem.correctAnswer;
        
        if (isCorrect) score++;
        
        resultDetailsHTML += `
            <div class="result-item">
                <div class="result-question">${index + 1}. ${quizItem.question}</div>
                <div class="result-answer">
                    Ваш ответ: ${quizItem.options[userAnswer] || "Нет ответа"}
                    ${isCorrect ? 
                        '<span class="result-correct">✓ Правильно</span>' : 
                        `<span class="result-incorrect">✗ Неправильно</span><br>
                         <span class="result-correct">Правильный ответ: ${quizItem.options[quizItem.correctAnswer]}</span>`
                    }
                </div>
            </div>
        `;
    });
    
    scoreElement.textContent = score;
    resultDetailsElement.innerHTML = resultDetailsHTML;
    
    // Определение сообщения в зависимости от результата
    let message = "";
    if (score === 5) {
        message = "Потрясающе! Вы настоящий знаток мира Гарри Поттера! Волшебство течёт в ваших жилах!";
    } else if (score >= 3) {
        message = "Хороший результат! Вы определённо знаете мир магии, но есть куда расти!";
    } else {
        message = "Не расстраивайтесь! Возможно, вам стоит перечитать книги или пересмотреть фильмы!";
    }
    
    resultMessageElement.textContent = message;
    
    questionContainer.classList.add('hidden');
    resultContainer.classList.remove('hidden');
}

// Перезапуск викторины
restartButton.addEventListener('click', initQuiz);

// Инициализация викторины при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    initQuiz();
    
    // Добавляем шрифт Harry Potter
    const link = document.createElement('link');
    link.href = 'https://fonts.cdnfonts.com/css/harry-potter';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
});