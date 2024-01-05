import renderLayout from './layout';

const renderProjectDetailsLayout = (meta, content) => {
  return `
    <article>
      ${content}
    </article>
  `;  
}

const render = (meta, content) => {
  return renderLayout(meta, content, renderProjectDetailsLayout);
}

export default render;
