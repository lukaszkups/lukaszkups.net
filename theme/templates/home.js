import renderLayout from "./layout.js";

const renderHome = (contentData) => {
  return `
    <div class="hero-wrapper">
      <div class="hero-wrapper-bg"></div>
      <div class="hero-line"></div>
      <div class="hero-avatar-image"></div>
    </div>
    <div>${JSON.stringify(contentData)}</div>
  `;
}

const render = (contentData) => {
  contentData.navIndex = 0;
  return renderLayout(contentData, renderHome);
}


export default render;
