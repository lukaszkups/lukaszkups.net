import renderLayout from './layout';

const renderHomePageContent = (meta, content) => {
  return `
    <div class="content notes-content">
      <div class="home-content main-container">
        <div class="row row--flex">
          <div class="col-100">
            <h1>Just another front-end developer. Web crafter. Writer. Indie game dev. <br /> Making stuff around the web since 2010.</h1>
          </div>
        </div>
      </div>
      <div class="main-container">
        <div class="row row--flex">
          <div class="col-100">
            <div class="avatar-action main-container">
              <div class="square-avatar"></div>
              <h2>Hello</h2>
              <p>I'm Lukasz - I help companies with various things related to the digital media.</p>
            </div>
          </div>
        </div>
      </div>
      <div class="main-container">
        <div class="row row--flex">
          <div class="col-50">
            <ul class="specialties specialties--home">
              <li class="title">Tools of choice</li>
              <li>JavaScript, Vue.js 2 + 3, Vite.js, TypeScript, Construct 3</li>
            </ul>
          </div>
          <div class="col-50">
            <ul class="specialties specialties--home">
              <li class="title">Software</li>
              <li>Visual Studio Code, git, WSL, Affinity Designer, Jira, GitHub, Bitbucket, Zeplin</li>
            </ul>
          </div>
        </div>
        <div class="row row--flex">
          <div class="col-50">
            <ul class="specialties specialties--home">
              <li class="title">Main field of specialization</li>
              <li>Front-end development, Single Page Apps, 2D game development, digital design.</li>
            </ul>
          </div>
          <div class="col-50">
            <ul class="specialties specialties--home">
              <li class="title">Secondary field of specialization</li>
              <li>Node.js-powered APIs, hybrid mobile app development, tech writing.</li>
            </ul>
          </div>
        </div>
        <div class="gap gap-h-30"></div>
        <div class="row row--flex home-dynamic-content">
          <div class="col-100">
            ${content}
          </div>
        </div>
      </div>
    </div>
  `;  
}

const render = (meta, content) => {
  return renderLayout(meta, content, renderHomePageContent);
}

export default render;