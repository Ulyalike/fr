// Инициализация Reveal.js
Reveal.initialize({
    hash: true,
    controls: true,
    progress: true,
    center: false,
    transition: 'slide',
    
    // Опции для презентации
    slideNumber: 'c/t',
    showSlideNumber: 'speaker',
    
    // Ширина и высота
    width: '100%',
    height: '100%',
    margin: 0.1,
    
    // Минимальный и максимальный масштаб
    minScale: 0.2,
    maxScale: 2.0
});

// Таймер обратного отсчета до 20 декабря
function updateCountdown() {
    const targetDate = new Date('December 20, 2024 23:59:59').getTime();
    const now = new Date().getTime();
    const timeLeft = targetDate - now;
    
    if (timeLeft < 0) {
        document.getElementById('countdown').innerHTML = "Время вышло!";
        return;
    }
    
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
    
    document.getElementById('countdown').innerHTML = 
        `${days}д ${hours}ч ${minutes}м ${seconds}с`;
}

// Обновляем таймер каждую секунду
setInterval(updateCountdown, 1000);
updateCountdown(); // Первоначальный вызов

// Добавляем класс pulse к элементам с анимацией
document.addEventListener('DOMContentLoaded', function() {
    const features = document.querySelectorAll('.feature');
    features.forEach((feature, index) => {
        feature.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Добавляем обработчики для навигации
    const links = document.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                Reveal.slide(...this.getAttribute('href').substring(1).split('/').map(Number));
            }
        });
    });
});

// Функция для отображения текущего слайда
function updateSlideInfo() {
    const state = Reveal.getState();
    console.log(`Текущий слайд: ${state.indexh + 1}.${state.indexv + 1}`);
}

// Слушаем события переключения слайдов
Reveal.on('slidechanged', updateSlideInfo);

// Добавляем возможность переключения клавиатурой
document.addEventListener('keydown', function(e) {
    // Пробел для переключения
    if (e.code === 'Space') {
        Reveal.next();
        e.preventDefault();
    }
    
    // Стрелки для навигации
    if (e.code === 'ArrowRight' || e.code === 'ArrowDown') {
        Reveal.next();
        e.preventDefault();
    }
    
    if (e.code === 'ArrowLeft' || e.code === 'ArrowUp') {
        Reveal.prev();
        e.preventDefault();
    }
    
    // F для полноэкранного режима
    if (e.code === 'KeyF' && !e.ctrlKey && !e.altKey && !e.metaKey) {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
        e.preventDefault();
    }
});

// Сохраняем позицию в локальном хранилище
Reveal.addEventListener('slidechanged', function(event) {
    localStorage.setItem('reveal-slide', JSON.stringify(Reveal.getState()));
});

// Восстанавливаем позицию при загрузке
window.addEventListener('load', function() {
    const savedState = localStorage.getItem('reveal-slide');
    if (savedState) {
        Reveal.setState(JSON.parse(savedState));
    }
});
