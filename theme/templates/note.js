import renderLayout from "./layout.js";

const renderNote = (contentData) => {
  return `<div>${JSON.stringify(contentData)}</div>`;
}

const render = (contentData) => {
  contentData.navIndex = 2;
  return renderLayout(contentData, renderNote);
}
export default render;
