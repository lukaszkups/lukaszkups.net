const render = (contentData) => {
  return `<ul>
    ${contentData.items.map((item) => '<li><a href="' + item.url + '">' + item.meta.title + '</a></li>')}
  </ul>`;
}

export default render;
