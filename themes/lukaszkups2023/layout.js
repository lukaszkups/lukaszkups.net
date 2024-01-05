import renderHeader from './_header';
import renderFooter from './_footer';

const render = (meta, content, renderContent) => {
  return `
  <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta content="text/html;charset=utf-8" http-equiv="Content-Type">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <meta name="description" content="${meta.description}">
        <meta name="keywords" content="${meta.tags}">
        <link rel="icon" type="image/png" href="/assets/img/favicon-192x192.png" sizes="192x192">
        <link rel="preload" href="/assets/fonts/Bebas.eot" as="font" crossorigin="anonymous">
        <link rel="preload" href="/assets/fonts/Bebas.woff" as="font" crossorigin="anonymous">
        <link rel="preload" href="/assets/fonts/Bebas.ttf" as="font" crossorigin="anonymous">
        <link rel="stylesheet" href="/assets/css/main.css" type="text/css">
        <title>${meta.title}</title>
      </head>
      <body>
        ${renderHeader(meta, content)}
        ${renderContent(meta, content)}
        ${renderFooter(meta, content)}
      </body>
    </html>
  `;
}

export default render;
