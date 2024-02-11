import './styles.scss';
import Inputmask from 'inputmask';
import { validateForm } from './validation';

document.addEventListener('DOMContentLoaded', function () {
    // Инициализация маски для телефона
    Inputmask({ mask: '+7 (999) 999-99-99' }).mask('#phone');

    // Получение формы по идентификатору
    const form = document.getElementById('feedback-form');

    // Обработчик события отправки формы
    form.addEventListener('submit', function (event) {
        event.preventDefault();

        // Получение данных из формы
        const formData = new FormData(form);

        // Валидация формы
        const errors = validateForm(formData);

        // Очистка предыдущих ошибок
        form.querySelectorAll('.error').forEach(function (error) {
            error.textContent = '';
        });

        // Удаление класса ошибки у полей ввода
        form.querySelectorAll('.has-error').forEach(function (input) {
            input.classList.remove('has-error');
        });

        // Вывод сообщений об ошибках
        Object.keys(errors).forEach(function (fieldName) {
            const errorElement = document.getElementById(`${fieldName}-error`);
            const inputElement = document.getElementById(fieldName);
            if (errorElement) {
                inputElement.classList.add('has-error');
                errorElement.textContent = errors[fieldName];
            }
        });

        // Если форма валидна, можно отправить данные на сервер
        if (Object.keys(errors).length === 0) {
            console.log("форма  валидна", formData)
        }
    });

    // Обработчик события фокуса для полей ввода
    const inputFields = form.querySelectorAll('input, textarea');
    inputFields.forEach(function (input) {
        input.addEventListener('focus', function () {
            const errorElement = document.getElementById(`${input.id}-error`);
            if (errorElement) {
                errorElement.textContent = '';
                input.classList.remove('has-error');
            }
        });
    });
});  
