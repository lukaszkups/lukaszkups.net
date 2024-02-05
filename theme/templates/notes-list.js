import renderLayout from "./layout.js";
// <h2 class="bebas">notes<span>:</span>${contentData?.routeContent?.year}</h2>

const getActiveYearClass = (currentYear, selectedYear) => {
  return String(currentYear) === String(selectedYear) ? 'active' : '';
}

const renderArticle = (article) => {
  return `
  <div class="article-list-item">
    <h2>${article?.meta?.title}</h2>
    <p>${article?.meta?.date}</p>
    <span></span>
  </div>
  `.replaceAll("\t", "").replaceAll("  ", " ").trim();
}

const renderArticles = (articles) => {
  let htmlString = '';
  articles.forEach((article) => {
    htmlString += renderArticle(article);
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
      <li class="${getActiveYearClass(contentData?.routeContent?.year, 2024)}"><a href="/notes/2024/">2024</a><span></span></li>
      <li class="${getActiveYearClass(contentData?.routeContent?.year, 2023)}"><a href="/notes/2023/">2023</a><span></span></li>
      <li class="${getActiveYearClass(contentData?.routeContent?.year, 2022)}"><a href="/notes/2022/">2022</a><span></span></li>
      <li class="${getActiveYearClass(contentData?.routeContent?.year, 2021)}"><a href="/notes/2021/">2021</a><span></span></li>
      <li class="${getActiveYearClass(contentData?.routeContent?.year, 2020)}"><a href="/notes/2020/">2020</a><span></span></li>
      <li class="${getActiveYearClass(contentData?.routeContent?.year, 2019)}"><a href="/notes/2019/">2019</a><span></span></li>
      <li class="${getActiveYearClass(contentData?.routeContent?.year, 2018)}"><a href="/notes/2018/">2018</a><span></span></li>
      <li class="${getActiveYearClass(contentData?.routeContent?.year, 2017)}"><a href="/notes/2017/">2017</a><span></span></li>
      <li class="${getActiveYearClass(contentData?.routeContent?.year, 2015)}"><a href="/notes/2015/">2015</a><span></span></li>
    </ul>
    <div class="article-list-wrapper">
      ${renderArticles(contentData.items)}
    </div>
    <div>${JSON.stringify(contentData)}</div>
    <ul>
      ${contentData.items.map((item) => '<li><a href="' + item.url + '">' + item.meta.title + '</a></li>')}
    </ul>
  `;
}

const render = (contentData) => {
  contentData.navIndex = 2;
  return renderLayout(contentData, renderNotesList);
}
export default render;
