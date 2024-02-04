import renderLayout from "./layout.js";

const renderHome = (contentData) => {
  return `
    <div class="hero-wrapper">
      <div class="hero-wrapper-bg"></div>
      <div class="hero-line"></div>
      <div class="hero-avatar-image"></div>
      <h2 class="hero-h2 bebas">Hello<span></span></h2>
      <p class="hero-p">I'm Lukasz - I help companies with various things related to the digital media.<span></span></p>
    </div>
    <div class="middle-section">
      <div class="main-container main-container--middle-home">
        <div class="section-wrapper section-wrapper--first">
          <h2>My tools of choice</h2>
          <p>JavaScript, TypeScript, Vue.js, Pinia, Construct 3, Express.js, Node.js, Vite</p>
          <span></span>
        </div>
        <div class="clearfix"></div>
        <div class="section-wrapper section-wrapper--second">
          <h2>Software</h2>
          <p>Visual Studio Code, git, WSL, GitHub, Bitbucket, Zeplin, Figma, Affinity Designer, Jira, Photopea</p>
          <span></span>
        </div>
        <div class="clearfix"></div>
        <div class="section-wrapper section-wrapper--third">
          <h2>Main field of specialization</h2>
          <p>Front-end development, Single Page Apps, 2D game development, tech writing.</p>
          <span></span>
        </div>
        <div class="clearfix"></div>
        <div class="section-wrapper section-wrapper--fourth">
          <h2>Secondary field of specialization</h2>
          <p>Node.js-powered APIs, hybrid mobile app development, digital design.</p>
          <span></span>
        </div>
      </div>
      <div id="particles-js"></div>
    </div>
  `;
}

const render = (contentData) => {
  contentData.navIndex = 0;
  return renderLayout(contentData, renderHome);
}


export default render;
