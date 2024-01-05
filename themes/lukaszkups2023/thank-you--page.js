import renderLayout from './layout';

const renderThankYouPageContent = (meta, content) => {
  return `
    <div class="content notes-content content">
      <div class="row row--flex">
        <div class="avatar-action main-container avatar-action-coffee">
          <div class="coffee-avatar"></div>
          <h2>Thank you!</h2>
          <p>
            <span>Your support gives me an additional motivation boost to work on even more online stuff!</span>
            <span>
              <a 
                href="/notes/ 
                class="gold-button"
              >
                See what I'm doing now
              </a>
            </span>
          </p>
        </div>
      </div>
    </div>
  `;  
}

const render = (meta, content) => {
  return renderLayout(meta, content, renderThankYouPageContent);
}

export default render;
