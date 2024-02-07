import renderLayout from "./layout.js";
import { notesYearList } from './enums.js';

const getActiveYearClass = (currentYear, selectedYear) => {
  return String(currentYear) === String(selectedYear) ? 'active' : '';
}

const renderArticle = (article) => {
  return `
  <a class="cube article-item" href="${article.url}">
    <div class="flippety">
      <h2>${article?.meta?.title || JSON.stringify(article)} - ${article?.meta?.date}</h2>
    </div>
    <div class="flop">
      <h2>${article?.meta?.title || JSON.stringify(article)} - ${article?.meta?.date}</h2>
    </div>
  </a>
  `.replaceAll("\t", "").replaceAll("  ", " ").trim();
}

const renderArticles = (articles) => {
  let htmlString = '';
  if (articles?.length) {
    articles.forEach((article) => {
      if (!article.meta.draft) {
        htmlString += renderArticle(article);
      }
    });
  } else {
    htmlString += '<h1 class="no-articles-yet">No articles yet, working on it!</h1>'
  }
  return htmlString;
}

const renderYearSelector = (contentData) => {
  let htmlString = '';
  notesYearList.forEach((year) => {
    htmlString += `<li class="${getActiveYearClass(contentData?.routeContent?.year, year)}"><a href="/notes/${year}/">${year}</a><span></span></li>`;
  });
  return htmlString;
}

const renderNotesList = (contentData) => {
  return `
    <div class="notes-index-wrapper">
      <h2 class="bebas">notes<span>_</span></h2>
      <div id="particles-js--gold"></div>
    </div>
    <ul class="notes-years-wrapper notes-years-wrapper--small bebas">
      ${renderYearSelector(contentData)}
    </ul>
    <div id="notes-list" class="article-list-wrapper bebas">
      ${renderArticles(contentData.items)}
    </div>
  `;
}

const render = (contentData) => {
  contentData.navIndex = 2;
  return renderLayout(contentData, renderNotesList);
}
export default render;
