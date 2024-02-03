import renderLayout from "./layout.js";

const renderHome = (contentData) => {
  return `
    <div>${JSON.stringify(contentData)}</div>
    <div class="hero-wrapper">
      <div class="hero-avatar-image"></div>
    </div>
  `;
}

const render = (contentData) => {
  return renderLayout(contentData, renderHome);
}


export default render;
