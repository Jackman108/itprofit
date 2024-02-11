import './styles.scss';
import Inputmask from 'inputmask';
import validateForm from './validation';

document.addEventListener('DOMContentLoaded', function () {

    // Получение формы по идентификатору
    const form = document.getElementById('feedback-form');

    // Инициализация маски для телефона
    Inputmask({ mask: '+7 (999) 999-99-99' }).mask('#phone');

    // Обработчик события отправки формы
    form.addEventListener('submit', function (event) {
        event.preventDefault();

        // Получение данных из формы
        const formData = new FormData(form);

        //Преобразование FormData в объект для JSON.stringify
        const formDataObject = {};
        formData.forEach((value, key) => {
            formDataObject[key] = value;
        });

        // Валидация формы
        const errors = validateForm(formDataObject);

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
        fetch('http://localhost:9090/api/registration', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formDataObject),
        })
            .then(response => response.json())
            .then(data => {
                console.log("Response from server:", data);
                if (data.status === 'error') {
                    handleFormError(data.fields);
                } else if (data.status === 'success') {
                    handleFormSuccess(data.message);
                }
            })
            .catch(error => {
                console.error('Error during fetch:', error);
            });
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

    function handleFormError(fields) {
        for (const fieldName in fields) {
            const errorElement = document.getElementById(`${fieldName}-error`);
            if (errorElement) {
                errorElement.textContent = fields[fieldName];
                const inputElement = document.getElementById(fieldName);
                if (inputElement) {
                    inputElement.classList.add('has-error');
                }
            }
        }
    }
    //Обработка ответа от сервера и вывод сообщений об ошибках
    function handleFormSuccess(message) {
        alert(message);
        form.reset();
        form.querySelectorAll('.error').forEach(error => error.textContent = '');
        form.querySelectorAll('.has-error').forEach(input => input.classList.remove('has-error'));
    }

    // Обработчики событий для кнопок и модального окна
    const modal = document.getElementById('modal');
    const openModalButton = document.getElementById('openModal');
    const closeModalButton = document.getElementById('close');

    openModalButton.addEventListener('click', function () {
        modal.classList.add('show');
        // Добавляем класс для блокировки скролла
        document.body.classList.add('modal-open'); 
    });

    closeModalButton.addEventListener('click', function () {
        modal.classList.remove('show');
        // Убираем класс для разблокировки скролла
        document.body.classList.remove('modal-open'); 
    });

    // Закрытие модального окна при клике вне его
    window.addEventListener('click', function (event) {
        if (event.target === modal) {
            modal.classList.remove('show');
            // Убираем класс для разблокировки скролла
            document.body.classList.remove('modal-open'); 
        }
    });
});