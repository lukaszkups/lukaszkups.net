import renderLayout from "./layout.js";

const renderHome = (contentData) => {
  return `<div>${JSON.stringify(contentData)}</div>`;
}

const render = (contentData) => {
  return renderLayout(contentData, renderHome);
}


export default render;
