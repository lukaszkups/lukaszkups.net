import renderLayout from './layout';

const renderCategories = (meta, content) => {
  return (meta.category || '').split(', ').map((cat) => `
    <a 
      href="/notes/?category=${cat.toLowerCase()}"
      class="category-link"
    >${cat}</a>
  `);
}

const renderTags = (meta, content) => {
  return (meta.tags || '').split(', ').map((tag) => `
    <a 
      href="/notes/?tag=${tag.toLowerCase()}"
      class="category-link"
    >${tag}</a>
  `);
}

const renderNoteListEntry = (meta, content) => {
  return `
    <div class="content notes-content">
      <div class="note-list-entry__wrapper">
        <div class="note-list-entry">
          <h1>${meta.title}</h1>
          <div class="published">Published at ${meta.date}</div>
          <article>
            ${content}
          </article>
          <div class="published">
            <p>Categories: ${renderCategories(meta, content)}</p>
            <p>Tags: ${renderTags(meta, content)}</p>
          </div>
        </div>
      </div>
    </div>
  `;  
}

const render = (meta, content) => {
  return renderLayout(meta, content, renderNoteListEntry);
}

export default render;
