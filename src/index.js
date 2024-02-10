import './styles.scss';
import Inputmask from 'inputmask';

document.addEventListener('DOMContentLoaded', function() {
    // Инициализация маски для телефона
    Inputmask({ mask: '+7 (999) 999-99-99' }).mask('#phone');
});
