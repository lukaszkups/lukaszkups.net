import renderLayout from "./layout.js";

const renderNotesIndex = (contentData) => {
  return `<div>${JSON.stringify(contentData)}</div>`;
}

const render = (contentData) => {
  contentData.navIndex = 2;
  return renderLayout(contentData, renderNotesIndex);
}
export default render;
