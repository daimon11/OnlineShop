/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/js/modules/timer.js
const timer = (elem, deadline) => {
  const createElements = () => {
    elem.innerHTML = `
      <p class="main-promotion__timer-title">
        До конца акции:
          </p>
          <div class="timer-wrapper">
              <p class="timer__item timer__item--days">
                <span class="big-numbers">3</span>
                <span class="medium-text">дня</span>
              </p>
              <p class="timer__item timer__item--hours">
                <span class="big-numbers">8</span>
                <span class="medium-text">часов</span>
              </p>
              <p class="timer__item timer__item--minutes">
                <span class="big-numbers">43</span>
                <span class="medium-text">минуты</span>
              </p>
              <p class="timer__item timer__item--seconds visually-hidden">
                  <span class="big-numbers">43</span>
                  <span class="medium-text">секунд</span>
                </p>
            </div>
          `;
  };
  const getTimeRemaining = () => {
    const dateStop = new Date(deadline).getTime();
    const dateNow = Date.now();
    const timeRemaring = dateStop - dateNow;

    // секунды
    const seconds = Math.floor(timeRemaring / 1000 % 60);
    // минуты
    const minutes = Math.floor(timeRemaring / 1000 / 60 % 60);
    // часы
    const hours = Math.floor(timeRemaring / 1000 / 60 / 60 % 24);
    // дни
    const days = Math.floor(timeRemaring / 1000 / 60 / 60 / 24);
    return {
      timeRemaring,
      seconds,
      minutes,
      hours,
      days
    };
  };

  // функция склонения текста
  const decOfNum = (number, titles) => {
    let decCache = [],
      decCases = [2, 0, 1, 1, 1, 2];
    if (!decCache[number]) decCache[number] = number % 100 > 4 && number % 100 < 20 ? 2 : decCases[Math.min(number % 10, 5)];
    return titles[decCache[number]];
  };
  const start = (timerDays, timerHours, timerMinutes, timerSeconds, textDays, textHours, textMinutes, textSeconds, blockDays, blockSeconds, blockAllTimer) => {
    const newTimer = getTimeRemaining();
    timerDays.textContent = newTimer.days;
    timerHours.textContent = newTimer.hours;
    timerMinutes.textContent = newTimer.minutes;
    timerSeconds.textContent = newTimer.seconds;
    textDays.textContent = decOfNum(timerDays.textContent, ['день', 'дня', 'дней']);
    textHours.textContent = decOfNum(timerHours.textContent, ['час', 'часа', 'часов']);
    textMinutes.textContent = decOfNum(timerMinutes.textContent, ['минуты', 'минуты', 'минут']);
    textSeconds.textContent = decOfNum(timerSeconds.textContent, ['секунда', 'секунды', 'секунд']);
    if (newTimer.days === 0) {
      blockDays.classList.add('visually-hidden');
      blockSeconds.classList.remove('visually-hidden');
    } else if (newTimer.days >= 1) {
      blockDays.classList.remove('visually-hidden');
      blockSeconds.classList.add('visually-hidden');
    } else if (newTimer.days < 0) {
      blockAllTimer.classList.add('visually-hidden');
      document.querySelector('.title_size_1').textContent = 'Акция закончилась, сорян((';
    }
    ;
    const intervalId = setTimeout(getElements, 1000);
  };
  const getElements = () => {
    if (!elem.hasChildNodes()) {
      createElements();
    }
    const timerDays = document.querySelector('.timer__item--days .big-numbers');
    const timerHours = document.querySelector('.timer__item--hours .big-numbers');
    const timerMinutes = document.querySelector('.timer__item--minutes .big-numbers');
    const timerSeconds = document.querySelector('.timer__item--seconds .big-numbers');
    const textDays = document.querySelector('.timer__item--days .medium-text');
    const textHours = document.querySelector('.timer__item--hours .medium-text');
    const textMinutes = document.querySelector('.timer__item--minutes .medium-text');
    const textSeconds = document.querySelector('.timer__item--seconds .medium-text');
    const blockDays = document.querySelector('.timer__item--days');
    const blockSeconds = document.querySelector('.timer__item--seconds');
    const blockAllTimer = document.querySelector('.main-promotion__timer');
    start(timerDays, timerHours, timerMinutes, timerSeconds, textDays, textHours, textMinutes, textSeconds, blockDays, blockSeconds, blockAllTimer);
  };
  getElements();
};
;// CONCATENATED MODULE: ./src/js/modules/acc.js
const acc = (items, list) => {
  items.forEach((item, index) => {
    item.addEventListener('click', () => {
      for (let i = 0; i < items.length; i++) {
        if (index === i) {
          list[i].style.height = items[i].classList.contains('footer-item_active') ? '' : `${list[i].scrollHeight}px`;
          items[i].classList.toggle('footer-item_active');
          items[i].classList.toggle('footer__title--type_open');
          items[i].classList.toggle('footer__title--type_close');
        } else {
          items[i].classList.remove('footer__title--type_open');
          items[i].classList.remove('footer-item_active');
          list[i].style.height = 0;
          items[i].classList.add('footer__title--type_close');
        }
      }
    });
  });
};
const deleteAcc = (items, list) => {
  const newItems = [];
  newItems.push(items[0], items[1]);
  const newlist = [];
  newlist.push(list[0], list[1]);
  newItems.forEach((item, index) => {
    item.classList.remove('footer__title--type_open');
    item.classList.remove('footer-item_active');
    item.classList.add('footer__title--type_close');
  });
  newlist.forEach((item, index) => {
    item.removeAttribute("style");
  });
};
;// CONCATENATED MODULE: ./src/js/modules/menuShow.js
const menuControl = (btn, menu) => {
  btn.addEventListener('click', () => {
    document.body.classList.toggle('disable-scroll');
    btn.classList.toggle('header__btn-menu--type_close');
    btn.classList.toggle('header__btn-menu--type_open');
    menu.classList.toggle('header__menu-group--type_close');
  });
};
;// CONCATENATED MODULE: ./src/js/modules/pagination.js
const paginationControl = (btnPrev, btnNext, pagesBtn, currentActive) => {
  pagesBtn.forEach((item, index) => {
    if (index + 1 === currentActive) {
      item.classList.add('item-active');
    } else {
      item.classList.remove('item-active');
    }
  });
  if (currentActive === 1) {
    btnPrev.setAttribute('disabled', 'disabled');
    btnPrev.querySelector('.item-icon').classList.add('item-icon-disabled');
    btnNext.querySelector('.item-icon').classList.remove('item-icon-disabled');
  } else if (currentActive === 3) {
    btnNext.setAttribute('disabled', 'disabled');
    btnNext.querySelector('.item-icon').classList.add('item-icon-disabled');
    btnPrev.querySelector('.item-icon').classList.remove('item-icon-disabled');
  } else {
    btnPrev.removeAttribute('disabled', 'disabled');
    btnNext.removeAttribute('disabled', 'disabled');
    btnPrev.querySelector('.item-icon').classList.remove('item-icon-disabled');
    btnNext.querySelector('.item-icon').classList.remove('item-icon-disabled');
  }
  const update = () => {
    pagesBtn.forEach((item, index) => {
      if (index + 1 === currentActive) {
        item.click();
        item.classList.add('item-active');
      } else {
        item.classList.remove('item-active');
      }
    });
  };
  btnNext.addEventListener('click', () => {
    currentActive++;
    if (currentActive >= pagesBtn.length) {
      currentActive = pagesBtn.length;
    } else {
      btnPrev.removeAttribute('disabled');
    }
    update();
  });
  btnPrev.addEventListener('click', () => {
    currentActive--;
    if (currentActive <= 1) {
      currentActive = 1;
    } else {
      btnPrev.removeAttribute('disabled');
    }
    update();
  });
};
;// CONCATENATED MODULE: ./src/js/modules/uploadArticles.js
const loadGoods = async url => {
  const result = await fetch(url);
  const data = await result.json();
  return data.data;
};
;// CONCATENATED MODULE: ./src/js/modules/renderArticleList.js

const dateNow = () => {
  const option = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  return new Date().toLocaleString('ru', option);
};
const renderGoods = async currentPage => {
  //! переписать на промис.then
  const data = await loadGoods(`https://gorest.co.in/public-api/posts?page=${currentPage}`);
  const displayList = () => {
    const articlesList = document.querySelector('.articles__list');
    const date = dateNow();
    data.forEach(item => {
      const topic = document.createElement('a');
      topic.className = 'articles__item';
      topic.id = `${item.id}`;
      topic.href = `article.html?id=${item.id}`;
      topic.setAttribute('aria-label', item.title);
      topic.className = 'topic';
      topic.innerHTML = `
    ${item.image ? `<img src="${image}" alt="Изображение ${item.time}" class="topic__img">` : `<source srcset="./img/no-img.avif" type="image/avif">
          <source srcset="./img/no-img.webp" type="image/webp">
          <img class="topic__img" src="./img/no-img.png" width="195"
          height="195" loading="lazy" alt="Изображение для статьи отсутствует">`}
      <div class="topic__wrapper">
        <div class="topic__title-wrapper">
          <h2 class="topic__title">${item.title}</h2>
          ${item.time ? `<time class="topic__time" datetime="${item.time}">${item.time}</time>` : `<time class="topic__time" datetime="${date}">${date}</time>`}
      </div>

      <div class="topic__user-box">
        <figure class="topic__user">
          <img src="./img/icon-view.svg" alt="Иконка просмотра" class="topic__views-icon">
          <figcaption class="topic__views-text">${0}</figcaption>
        </figure>
        <figure class="topic__user">
          <img src="./img/icon-chat.svg" alt="Иконка чата" class="topic__views-icon">
          <figcaption class="topic__views-text">${0}</figcaption>
        </figure>

    </div>
    `;
      articlesList.append(topic);
    });
  };
  displayList();
  document.querySelector('.pagination').classList.remove('visually-hidden');
};
;// CONCATENATED MODULE: ./src/js/modules/renderArticlePage.js

const date = dateNow();
const loadAutor = async userId => {
  const item = await fetch(`https://gorest.co.in/public-api/users/${userId}`);
  const autorArr = await item.json();
  return autorArr.data;
};
const loadArticle = async id => {
  const item = await fetch(`https://gorest.co.in/public-api/posts/${id}`);
  const data = await item.json();
  return data.data;
};
const renderArticle = async (id, articleModal) => {
  const params = new URLSearchParams(window.location.search);
  params.append('id', `${id}`);

  //! переписать на промис.then
  const arr = await loadArticle(id);
  const autorId = await loadAutor(arr.user_id);
  console.log('arr', arr);
  console.log('autorId', autorId);
  const breadcrumb = document.createElement('ul');
  breadcrumb.classList.add('breadcrumb');
  breadcrumb.innerHTML = `
    <li class="breadcrumb__item">
      <span class="link-to-home">Главная</span>
    <img src="./img/breadcrumb-icon.svg" alt="Иконка хлебной крошки" class="breadcrumb-icon"> 
    </li> 
    <li class="breadcrumb__item">
      <span class="link-to-blog">Блог</span>
    <img src="./img/breadcrumb-icon.svg" alt="Иконка хлебной крошки" class="breadcrumb-icon"> 
    </li> <li class="breadcrumb__item">
      <span class="link-to-article">${arr.title}
      </span>
    </li>
  `;
  const textWrapper = document.createElement('div');
  textWrapper.classList.add('article__text-wrapper');
  textWrapper.innerHTML = `
  <h2 class="article__title">${arr.title}</h2>
  <p class="article__paragraf">${arr.body}</p>
  `;
  const footer = document.createElement('div');
  footer.classList.add('article__footer');
  footer.innerHTML = `
    <a class="article__btn-back" href="#" onclick="window.history.go(-1); return false;">
    <img class="article__btn-back-icon" src="./img/to-back-icon.svg" alt="Иконка стрелки">
    <span class="btn-text">
      К списку статей
    </span>
    </a>

    <div class="article__autor-block">
    <h4 class="article__autor-name">${autorId.name ? autorId.name : ''}</h4>

    <span class="article__time">${date}</span>

    <div class="article__user-box">

      <figure class="article__user">
        <img src="./img/icon-view.svg" alt="Иконка просмотра" class="article__views-icon">
        <figcaption class="article__views-text">${0}</figcaption>
      </figure>
      <figure class="article__user">
        <img src="./img/icon-chat.svg" alt="Иконка чата" class="article__chat-icon">
        <figcaption class="article__chat-text">${0}</figcaption>
      </figure>

    </div>

    </div>
  `;
  articleModal.classList.add('article_visible');
  articleModal.append(breadcrumb, textWrapper, footer);
  document.querySelector('.adds-banners').classList.remove('visually-hidden');
};
;// CONCATENATED MODULE: ./src/js/index.js






let url = window.location.pathname;
console.log(url);
let htmlName;
url.length < 2 ? htmlName = 'index' : htmlName = url.match(/\/(\w+)\.html/)[1];
console.log('html', htmlName);
let searchParams = new URLSearchParams(window.location.search);
if (htmlName === 'index') {
  const timerElem = document.querySelector('.main-promotion__timer');
  const deadline = timerElem.getAttribute('data-deadline');
  console.log('deadline', deadline);
  timer(timerElem, deadline);
}
if (htmlName === 'blog') {
  const renderArticles = page => {
    const btnPrev = document.querySelector('.pagination__btn-prev');
    const btnNext = document.querySelector('.pagination__btn-next');
    const pagesBtn = document.querySelectorAll('.item');
    console.log(pagesBtn);
    paginationControl(btnPrev, btnNext, pagesBtn, page);
    renderGoods(page);
  };
  let page = searchParams.get("page") ? searchParams.get("page") : 1;
  let currentPage = page;
  let currentActive = +currentPage;
  console.log('currentActive', currentActive);
  renderArticles(currentActive);
}
if (htmlName === 'article') {
  let id = searchParams.get("id") ? searchParams.get("id") : '';
  const articleModal = document.querySelector('.article__wrapper');
  renderArticle(id, articleModal);
}
const footerTitles = document.querySelectorAll('.footer__title--type_close');
const footerlists = document.querySelectorAll('.footer__list--type_hidden');
const accRun = acc(footerTitles, footerlists);
menuControl(document.querySelector('.header__btn-menu'), document.querySelector('.header__menu-group'));

// надо при смене размеров видимого окна надо убрать открытые блоки в подвале и закинуть эти сбросы стилей в отдельные модули js

window.addEventListener('resize', e => {
  document.querySelector('.header__menu-group').classList.add('header__menu-group--type_close');
  document.body.classList.remove('disable-scroll');
  if (window.innerWidth <= 500) {
    deleteAcc(footerTitles, footerlists);
  }
});
/******/ })()
;