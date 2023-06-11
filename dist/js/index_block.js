import { paginationControl } from './modules/pagination.js';
import { renderGoods } from './modules/renderArticleList.js';
import { renderArticle } from './modules/renderArticlePage.js';
import {acc} from './modules/acc.js';

const renderArticles = (page) => {

  const btnPrev = document.querySelector('.pagination__btn-prev');
  const btnNext = document.querySelector('.pagination__btn-next');
  const pagesBtn = document.querySelectorAll('.item');
  console.log(pagesBtn);

  paginationControl(btnPrev, btnNext, pagesBtn, page);
  renderGoods(page);
}

let url = window.location.search;
let searchParams = new URLSearchParams(url);
if (searchParams.has("id")) {
  let id = searchParams.get("id") ?
    searchParams.get("id") : '';

  const articleModal = document.querySelector('.article__wrapper');

  renderArticle(    
    id,
    articleModal
    );
} else {
  let page = searchParams.get("page") ?
    searchParams.get("page") : 1;

  let currentPage = page;

  let currentActive = +currentPage;

  renderArticles(currentActive);
};

const accRun = acc(document.querySelectorAll('.footer__title--type_close'),
document.querySelectorAll('.footer__list--type_hidden'));




