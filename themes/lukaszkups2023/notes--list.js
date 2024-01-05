import renderLayout from './layout';

const renderPages = (meta, content) => {
  const template = '';
  content.pages.forEach((pageUrl, pageIndex) => {
    const pageNumber = pageIndex + 1;
    template += `
      <li>
        <a 
          href="${pageUrl}"
          class="${pageNumber === meta.currentPage ? 'current-page' : ''}"
        >
          ${pageNumber}
        </a>
      </li>
    `
  });
  return template;
}

const renderNotesPagination = (meta, content) => {
  if (content.pagination && content.pages?.length) {
    return `
      <div class="main-container">
        <ul id="pagination" class="pagination">
          ${renderPages(meta, content)}
        </div>
      </div>
    `;
  } else {
    return '';
  }
}

const renderNotesItems = (meta, content) => {
  if (!content.items || !content.items.length) {
    return `<li>No entries yet.</li>`;
  } else {
    return content.items.map((item) => {
      if (!item.meta.hidden) {
        return `
          <li 
            data-date="${item.meta.date.split('/').map((dateFragm) => parseInt(dateFragm)).join('-')}"
            data-category="${item.meta.category || ''}"
            data-tags="${item.meta.tags}"
          >
            <a href="${item.url}">
              <div class="txt">
                <span>${item.meta.date}</span> - ${item.meta.title}
              </div>
            </a>
          </li>
        `;
      }
    })
  }
}

const renderNotesListLayout = (meta, content) => {
  return `
    <div class="main-container notes-main-container">
      <div class="notes-list-wrapper">
        <div id="notes-list" class="notes-list">
          <ul class="notes">
            ${renderNotesItems(meta, content)}
          </div>
        </div>
      </div>
    </div>
    ${renderNotesPagination(meta, content)}
  `;  
}

const render = (meta, content) => {
  return renderLayout(meta, content, renderNotesListLayout);
}

export default render;