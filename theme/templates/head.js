const render = (contentData) => {
  return `
    <meta charset="utf-8" />
    <meta http-equiv="x-ua-compatible" content="ie=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${contentData?.title || ''}</title>
    <ta>${contentData?.tags || ''}</title>
    <link rel="stylesheet" href="/assets/css/main.css" />
    <link rel="icon" href="/assets/images/favicon.png" />
  `;
}

export default render;
