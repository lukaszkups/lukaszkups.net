import renderLayout from "./layout.js";

const renderProjectsList = (contentData) => {
  return `
    <div>${JSON.stringify(contentData)}</div>
    <ul>
      ${contentData.items.map((item) => '<li><a href="' + item.url + '">' + item.meta.title + '</a></li>')}
    </ul>
  `;
}

const render = (contentData) => {
  contentData.navIndex = 3;
  return renderLayout(contentData, renderProjectsList);
}
export default render;
