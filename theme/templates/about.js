import renderLayout from "./layout.js";

const renderAbout = (contentData) => {
  return `
    <div class="about-hero-wrapper">
      <div class="stack-container">
        <div class="stack" style="--stacks: 3;">
          <span style="--index: 0;">ABOUT ME</span>
          <span style="--index: 1;">ABOUT ME</span>
          <span style="--index: 2;">ABOUT ME</span>
        </div>
      </div>
      <div class="about-hero-avatar"></div>
    </div>
    <div class="middle-section middle-section--about">
      <div class="main-container main-container--middle-home">
        <article class="about-me-content">
          ${contentData.content}
        </article>
      </div>
      <div id="particles-js"></div>
    </div>
  `;
}

const render = (contentData) => {
  contentData.navIndex = 1;
  return renderLayout(contentData, renderAbout);
}
export default render;
