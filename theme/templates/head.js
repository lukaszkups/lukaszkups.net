const render = (contentData) => {
  return `
    <meta charset="utf-8" />
    <meta http-equiv="x-ua-compatible" content="ie=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${contentData?.title || ''}</title>
    <meta name="keywords" content="${contentData?.tags || ''}" />
    <link rel="stylesheet" href="/assets/css/main.css" />
    <link rel="shortcut icon" type="image/png" href="/assets/images/favicon.png" />
    <link rel="icon" type="image/x-icon" href="/assets/images/favicon.ico" />
    <link rel="preload" href="/assets/fonts/Bebas.eot" as="font" crossorigin="anonymous" />
    <link rel="preload" href="/assets/fonts/Bebas.woff" as="font" crossorigin="anonymous" />
    <link rel="preload" href="/assets/fonts/Bebas.ttf" as="font" crossorigin="anonymous" />
  `;
}

export default render;
