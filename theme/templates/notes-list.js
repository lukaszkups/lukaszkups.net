import renderLayout from "./layout.js";

const renderNotesList = (contentData) => {
  return `
    <div>${JSON.stringify(contentData)}</div>
    <ul>
      ${contentData.items.map((item) => '<li><a href="' + item.url + '">' + item.meta.title + '</a></li>')}
    </ul>
  `;
}

const render = (contentData) => {
  contentData.navIndex = 2;
  return renderLayout(contentData, renderNotesList);
}
export default render;
