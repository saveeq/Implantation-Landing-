
var swiper = new Swiper(".reviews__swiper", {
    slidesPerView: 1,
    spaceBetween: 30,

    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});


// document.addEventListener('DOMContentLoaded', function () {
//     const modal = document.getElementById('feedbackModal');
//     const modalContent = modal.querySelector('.modal-content');
//     const buttons = document.querySelectorAll('.feedbackButton');
//     const span = document.getElementsByClassName('close')[0];
//     const form = document.getElementById('feedbackForm');
//     const error = document.getElementById('wrongnumber');
//     const thankYouMessage = document.getElementById('thankYouMessage');
//     const police = document.getElementById('formPolice');
//     const formhead = document.getElementById('formHead');



//     function openModal() {
//         modal.classList.add('active');
//         document.body.classList.add('no-scroll');
//         if (sessionStorage.getItem('formSubmitted') === 'true') {
//             form.style.display = 'none';
//             police.style.display = 'none';
//             formhead.style.display = 'none';// Скрываем форму
//             thankYouMessage.style.display = 'block'; // Показываем сообщение "Спасибо!"
//         } else {
//             form.style.display = 'flex'; // Показываем форму при открытии модального окна
//             thankYouMessage.style.display = 'none'; // Скрываем сообщение "Спасибо!" при открытии модального окна
//             error.style.display = 'none'; // Скрываем сообщение об ошибке при открытии модального окна
//         }
//     };


//     const modalTimer = setInterval(openModal, 30000);
    
        



//     buttons.forEach(button => {
//         button.onclick = function () {
//             openModal();
//             clearInterval(modalTimer);
//         }
//     });

//     modal.onclick = function (event) {
//         if (!modalContent.contains(event.target)) { // Проверяем, что клик не по содержимому
//             form.reset();
//             modal.classList.remove('active');
//             document.body.classList.remove('no-scroll');
//         }
//     };

//     span.onclick = function () {
//         form.reset();
//         modal.classList.remove('active');
//         document.body.classList.remove('no-scroll');
//     }

//     form.onsubmit = function (event) {
//         event.preventDefault();
//         const name = document.getElementById('name').value;
//         const phone = document.getElementById('phone').value;

//         if (validatePhone(phone)) {
//             error.style.display = 'none';
//             sendData(name, phone);
//             window.location.href = 'thankyou.html';
//             clearInterval(modalTimer);
//         } else {
//             error.style.display = 'block';
//         }

//     }

//     function validatePhone(phone) {

//         const phonePattern = /^(\+7|8)\s?\(?\d{3}\)?\s?\d{3}[- ]?\d{2}[- ]?\d{2}$/;
//         return phonePattern.test(phone);
//     }

//     function sendData(name, phone) {
//         const xhr = new XMLHttpRequest();
//         xhr.open('POST', 'sendmail.php', true);
//         xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
//         xhr.onreadystatechange = function () {
//             if (xhr.readyState == 4 && xhr.status == 200) {
//                 console.log('Data sent successfully');
//                 form.style.display = 'none';
//                 police.style.display = 'none';
//                 formhead.style.display = 'none';// Скрываем форму
//                 thankYouMessage.style.display = 'block'; // Показываем сообщение "Спасибо!"
//                 sessionStorage.setItem('formSubmitted', 'true'); // Устанавливаем флаг успешной отправки
//             } else if (xhr.readyState == 4) {
//                 console.log('Error sending data');
//                 alert('Ошибка при отправке сообщения.');
//             }
//         }
//         xhr.send(`name=${encodeURIComponent(name)}&phone=${encodeURIComponent(phone)}`);
//     }
// });

document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Калькулятор
document.addEventListener('DOMContentLoaded', function() {
    const calculatorSteps = document.querySelectorAll('.calculator-step');
    const progressBar = document.querySelector('.progress-bar::after');
    const currentStepText = document.querySelector('.current-step');
    const prevButton = document.querySelector('.prev-step');
    const nextButton = document.querySelector('.next-step');
    let currentStep = 1;
    let calculatorData = {
        teeth: null,
        jaw: null,
        xray: null,
        jawMultiplier: 1
    };

    function updateProgressBar() {
        const progress = ((currentStep - 1) / 3) * 100;
        document.documentElement.style.setProperty('--progress', `${progress}%`);
        currentStepText.textContent = currentStep;
    }

    function updateNavigationButtons() {
        prevButton.disabled = currentStep === 1;
        nextButton.disabled = !isStepValid(currentStep);
        
        if (currentStep === 4) {
            nextButton.style.display = 'none';
        } else {
            nextButton.style.display = 'flex';
        }
    }

    function isStepValid(step) {
        switch(step) {
            case 1:
                return calculatorData.teeth !== null;
            case 2:
                return calculatorData.jaw !== null;
            case 3:
                return calculatorData.xray !== null;
            default:
                return false;
        }
    }

    function goToStep(step) {
        if (step < 1 || step > 4) return;
        
        calculatorSteps.forEach((s, index) => {
            if (index + 1 === step) {
                s.classList.add('active');
            } else {
                s.classList.remove('active');
            }
        });
        
        currentStep = step;
        updateProgressBar();
        updateNavigationButtons();
    }

    // Обработчики для кнопок выбора количества зубов
    document.querySelectorAll('.teeth-image-container').forEach(container => {
        container.addEventListener('click', function() {
            document.querySelectorAll('.teeth-image-container').forEach(cont => cont.classList.remove('selected'));
            this.classList.add('selected');
            calculatorData.teeth = this.dataset.teeth;
            updateNavigationButtons();
            if (isStepValid(currentStep)) {
                setTimeout(() => goToStep(currentStep + 1), 300);
            }
        });
    });

    // Обработчики для выбора челюсти
    document.querySelectorAll('.jaw-image-container').forEach(container => {
        container.addEventListener('click', function() {
            document.querySelectorAll('.jaw-image-container').forEach(cont => {
                cont.classList.remove('selected');
            });
            this.classList.add('selected');
            calculatorData.jaw = this.dataset.jaw;
            
            switch(calculatorData.jaw) {
                case 'upper':
                case 'lower':
                    calculatorData.jawMultiplier = 1;
                    break;
                case 'both':
                    calculatorData.jawMultiplier = 1.8;
                    break;
                default:
                    calculatorData.jawMultiplier = 1;
            }
            
            setTimeout(() => goToStep(currentStep + 1), 300);
        });
    });

    // Обработчики для кнопок выбора наличия снимков
    document.querySelectorAll('.xray-button').forEach(button => {
        button.addEventListener('click', function() {
            document.querySelectorAll('.xray-button').forEach(btn => btn.classList.remove('selected'));
            this.classList.add('selected');
            calculatorData.xray = this.dataset.xray;
            setTimeout(() => goToStep(currentStep + 1), 300);
        });
    });

    // Обработчики навигационных кнопок
    prevButton.addEventListener('click', () => goToStep(currentStep - 1));
    nextButton.addEventListener('click', () => goToStep(currentStep + 1));

    // Обработчик формы
    document.getElementById('calculatorForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = {
            name: document.getElementById('calc-name').value,
            phone: document.getElementById('calc-phone').value,
            ...calculatorData
        };
        console.log('Отправка данных:', formData);
        // Здесь можно добавить код для отправки данных на сервер
        alert('Спасибо! Мы свяжемся с вами в ближайшее время.');
    });

    // Инициализация
    updateProgressBar();
    updateNavigationButtons();

    // Маска для телефона
    const phoneInput = document.getElementById('calc-phone');
    phoneInput.addEventListener('input', function(e) {
        let x = e.target.value.replace(/\D/g, '').match(/(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
        e.target.value = !x[2] ? x[1] : '+7 (' + x[2] + ') ' + (x[3] ? x[3] + '-' : '') + (x[4] ? x[4] + '-' : '') + x[5];
    });

    // Обновляем функцию расчета итоговой стоимости
    function calculateTotalPrice() {
        let basePrice = 0;
        // ... existing price calculation code ...
        
        // Применяем множитель в зависимости от выбора челюсти
        if (calculatorData.jawMultiplier) {
            basePrice *= calculatorData.jawMultiplier;
        }
        
        return Math.round(basePrice);
    }
});

// Функционал модального окна калькулятора
document.addEventListener('DOMContentLoaded', function() {
    const calculatorModal = document.getElementById('calculatorModal');
    const closeCalculator = document.querySelector('.close-calculator');
    const calculatorButtons = document.querySelectorAll('[data-calculator="open"]');

    // Открытие модального окна
    calculatorButtons.forEach(button => {
        button.addEventListener('click', function() {
            calculatorModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Закрытие модального окна
    closeCalculator.addEventListener('click', function() {
        calculatorModal.classList.remove('active');
        document.body.style.overflow = '';
    });

    // Закрытие по клику вне модального окна
    calculatorModal.addEventListener('click', function(event) {
        if (event.target === calculatorModal) {
            calculatorModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Закрытие по Escape
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && calculatorModal.classList.contains('active')) {
            calculatorModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});





