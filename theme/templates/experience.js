import renderLayout from "./layout.js";

const renderExperience = (contentData) => {
  return `<div>${JSON.stringify(contentData)}</div>`;
}

const render = (contentData) => {
  contentData.navIndex = 4;
  return renderLayout(contentData, renderExperience);
}
export default render;
