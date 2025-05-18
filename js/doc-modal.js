document.addEventListener('DOMContentLoaded', function () {
    const body = document.body;

    // Открытие диалогов
    document.querySelectorAll('[data-dialog]').forEach(button => {
        button.addEventListener('click', function () {
            const dialogId = this.getAttribute('data-dialog');
            const dialog = document.getElementById(dialogId);

            if (dialog) {
                dialog.classList.remove('fadeOut'); // Убираем эффект исчезновения
                dialog.showModal(); // Открыть диалог
                requestAnimationFrame(() => dialog.classList.add('showing')); // Запускаем анимацию появления
                body.classList.add('no-scroll'); // Отключаем прокрутку страницы
            }
        });
    });

    // Обработчик для всех диалогов
    document.querySelectorAll('dialog').forEach(dialog => {
        // Закрытие через кнопку .close
        dialog.querySelector('.doctorInfo__close').addEventListener('click', function () {
            closeDialog(dialog);
        });

        // Закрытие при клике на фон
        dialog.addEventListener('click', function (event) {
            if (event.target === dialog) {
                closeDialog(dialog);
            }
        });
    });

    // Функция для закрытия диалога с анимацией исчезновения
    function closeDialog(dialog) {
        dialog.classList.remove('showing'); // Убираем класс появления
        dialog.classList.add('fadeOut'); // Добавляем класс исчезновения

        // Ждём завершения анимации перед закрытием диалога
        dialog.addEventListener('transitionend', function onTransitionEnd() {
            dialog.close(); // Закрываем диалог
            dialog.classList.remove('fadeOut'); // Сбрасываем класс fadeOut
            body.classList.remove('no-scroll'); // Включаем прокрутку страницы
            dialog.removeEventListener('transitionend', onTransitionEnd); // Удаляем слушатель
        });
    }
});

function openOverlay(element) {
    const src = element.getAttribute('data-large');
    const overlay = document.getElementById('overlay');
    const overlayImg = overlay.querySelector('img');
    overlayImg.src = src;
    overlay.style.display = 'flex';
    document.getElementById('headerjs').classList.add('hidden__header');
    document.body.classList.add('no-scroll');
}
function closeOverlay() {
    const overlay = document.getElementById('overlay');
    overlay.style.display = 'none';
    document.getElementById('headerjs').classList.remove('hidden__header');
    document.body.classList.remove('no-scroll');
}