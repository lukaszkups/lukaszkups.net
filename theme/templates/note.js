import renderLayout from "./layout.js";

const renderNote = (contentData) => {
  return `
  <div class="notes-index-wrapper">
    <h2 class="bebas">${contentData?.meta?.title}</h2>
    <p>Published at ${contentData?.meta?.date}</p>
    <div id="particles-js--gold"></div>
  </div>
  <div class="article-content-wrapper">
    <div class="main-container main-container--article">
      <article>
        ${contentData.content}
      </article>
    </div>
  </div>
  `;
}

const render = (contentData) => {
  contentData.navIndex = 2;
  return renderLayout(contentData, renderNote);
}
export default render;
