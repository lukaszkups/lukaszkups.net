const render = (contentData) => {
  return `<div>${contentData.items.map((item) => '<p>' + item.slug + '</p>')}</div>`;
}

export default render;
