import renderHead from './head';
import renderNav from './nav';
import renderFooter from './footer';

const render = (contentData, contentTemplateRenderFunction) => {
  return `<html>
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

export default render;
