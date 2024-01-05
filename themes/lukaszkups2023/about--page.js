import renderLayout from './layout';

const renderAboutPageContent = (meta, content) => {
  return `
    <div class="content notes-content content">
      <div class="row row--flex">
        <div class="avatar-action main-container avatar-action-coffee">
          <div class="coffee-avatar"></div>
          <h2>Lukasz Kups</h2>
          <p>Helping companies by turning ☕️ into code since <span>2010</span>.</p>
        </div>
      </div>
      <div class="main-container about-page-container">
        <div class="about-page-wrapper">
          <article>
            ${content}
          </article>
        </div>
      </div>
    </div>
  `;  
}

const render = (meta, content) => {
  return renderLayout(meta, content, renderAboutPageContent);
}

export default render;
