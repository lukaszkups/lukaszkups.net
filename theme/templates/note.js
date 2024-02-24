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

      <div class="comment-section">
        <script src="https://unpkg.com/commentbox.io/dist/commentBox.min.js"></script>
        <p id="show-comment-button">Click here to show comments</p>
        <div id="comment-section">
          <div class="commentbox"></div>
        </div>
      </div>
    </div>
  </div>
  `;
}

const render = (contentData) => {
  contentData.navIndex = 2;
  return renderLayout(contentData, renderNote);
}
export default render;
