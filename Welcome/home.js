const Chapter = require("../models/Chapter");

// --- THEME COLOR (DARK / LIGHT) ---
const themeToggleBtn = document.getElementById("themeToggle");
const themeIcon = themeToggleBtn ? themeToggleBtn.querySelector("i") : null;

// VERIFICATION
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "light") {
  document.documentElement.setAttribute("data-theme", "light");
  if (themeIcon) {
    themeIcon.classList.replace("fa-moon", "fa-sun");
  }
}

if (themeToggleBtn) {
  themeToggleBtn.addEventListener("click", () => {
    const isLight = document.documentElement.getAttribute("data-theme") === "light";

    if (isLight) {
      document.documentElement.removeAttribute("data-theme");
      localStorage.setItem("theme", "dark");
      themeIcon.classList.replace("fa-sun", "fa-moon");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
      themeIcon.classList.replace("fa-moon", "fa-sun");
    }
  });
}









// --- AUTO SLIDER FOR HERO BANNER ---
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.getElementById('prevSlide');
const nextBtn = document.getElementById('nextSlide');

let currentSlide = 0;
let slideInterval;

// Функция переключения слайда
function showSlide(index) {
  if (slides.length === 0) return;

  // Закольцовываем индексы
  if (index >= slides.length) currentSlide = 0;
  else if (index < 0) currentSlide = slides.length - 1;
  else currentSlide = index;

  // Убираем активный класс у всех слайдов и точек
  slides.forEach(slide => slide.classList.remove('active'));
  dots.forEach(dot => dot.classList.remove('active'));

  // Активируем нужный слайд и точку
  const activeSlide = slides[currentSlide];
  activeSlide.classList.add('active');
  if (dots[currentSlide]) dots[currentSlide].classList.add('active');

  // Меняем главный неоновый цвет под текущий слайд (как в референсе!)
  const slideColor = activeSlide.getAttribute('data-color');
  if (slideColor) {
    document.documentElement.style.setProperty('--accent-color', slideColor);
  }
}

// Запуск автоматического перелистывания (каждые 5 секунд)
function startAutoSlide() {
  stopAutoSlide();
  slideInterval = setInterval(() => {
    showSlide(currentSlide + 1);
  }, 5000);
}

function stopAutoSlide() {
  if (slideInterval) clearInterval(slideInterval);
}

// Слушатели событий на кнопки
if (nextBtn) {
  nextBtn.addEventListener('click', () => {
    showSlide(currentSlide + 1);
    startAutoSlide();
  });
}

if (prevBtn) {
  prevBtn.addEventListener('click', () => {
    showSlide(currentSlide - 1);
    startAutoSlide();
  });
}

// Клики по точкам
dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    showSlide(index);
    startAutoSlide();
  });
});

// Запускаем слайдер при загрузке
document.addEventListener('DOMContentLoaded', () => {
  showSlide(0);
  startAutoSlide();
});












// --- POPULAR MANGA CAROUSEL SCROLL ---
const popularGrid = document.getElementById('popularGrid');
const popularNextBtn = document.getElementById('popularNext');
const popularPrevBtn = document.getElementById('popularPrev');

if (popularGrid) {
  // Прокрутка ВПЕРЕД
  if (popularNextBtn) {
    popularNextBtn.addEventListener('click', () => {
      popularGrid.scrollBy({
        left: 780,
        behavior: 'smooth'
      });
    });
  }

  // Прокрутка НАЗАД
  if (popularPrevBtn) {
    popularPrevBtn.addEventListener('click', () => {
      popularGrid.scrollBy({
        left: -780,
        behavior: 'smooth'
      });
    });
  }
}












// Add new chapters system
async function loadLatestChapters() {
  try {
    const response = await fetch("https://localhost:5000/api/chapters/latest");
    const chapters = await response.json();

    const chapterContainer = document.querySelector(".chapters-list");
    if (!chapterContainer) return;

    // Cleaning up old test data from HTML
    chapterContainer.innerHTML = "";

    // If there are no chapters in the database yet
    if (chapters.length === 0) {
      chapterContainer.innerHTML = '<p style="color: #666; font-size: 0.8rem;"> No chapters added yet</p>';
      return;
    }

    // Drawing each chapter
    chapters.forEach(chapter => {
      const badgeHTML = chapter.isNewChapter
        ? '<span class="badge-new">NEW</span>'
        : '<span class="badge-space"></span>';

      const chapterHTML = `
        <a href="#" class="chapter-item">
          <div class="chapter-thumb" style="background-image: url('${chapter.coverUrl}');"></div>
          <span class="manga-title">${chapter.mangaTitle}</span>
          span class="chapter-num">Chapter ${chapter.chapterNumber}</span>
          ${badgeHTML}
        </a>
      `;

      chapterContainer.insertAdjacentHTML("beforeend", chapterHTML);
    });
  } catch (err) {
    console.error("Error retrieving chapters from the server:", err);
  }
}

// Run when the page loads
document.addEventListener("DOMContentLoaded", loadLatestChapters); 

