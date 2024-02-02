const render = (content) => {
  return `
    <div>${JSON.stringify(content.meta)}</div>
    <div>${content.content}</div>
  `
}

export default render;
