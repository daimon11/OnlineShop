import { dateNow } from './renderArticleList.js';

const date = dateNow();

const loadAutor = async (userId) => {
  const item = await fetch(`https://gorest.co.in/public-api/users/${userId}`);
  const autorArr = await item.json();
  return autorArr.data;
}

const loadArticle = async (id) => {
  const item = await fetch(`https://gorest.co.in/public-api/posts/${id}`);
  const data = await item.json();
  return data.data;
}

export const renderArticle = async (
  id,
  articleModal
) => {

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
  `

  articleModal.classList.add('article_visible');
  articleModal.append(breadcrumb, textWrapper, footer);
  document.querySelector('.adds-banners').classList.remove('visually-hidden');
};