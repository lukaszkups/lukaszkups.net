import renderHead from './head.js';
import renderNav from './nav.js';
import renderFooter from './footer.js';

const renderLayout = (contentData, contentTemplateRenderFunction) => {
  return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      ${renderHead(contentData)}
    </head>
    <body>
      ${renderNav(contentData)}
      ${contentTemplateRenderFunction(contentData)}
      ${renderFooter(contentData)}
    </body>
  </html>`
}

export default renderLayout;
