import renderLayout from "./layout.js";

const renderExperience = (contentData) => {
  return `
    <div class="exp-index-wrapper experience-wrapper">
      <div class="main-container">
        <h2 class="bebas experience-h2">Trust me, I'm an enginee<input type="checkbox" id="engineer-clickable"><label for="engineer-clickable">r</label>
        </h2>
      </div>
      <div class="experience-wrapper main-container">
        <div class="row row--flex">
          <div class="col col-25"><div class="title">About me:</div></div>
          <div class="col col-75">
            <div class="title">Łukasz Kupś</div>
            <p>I am a Web Developer with <span class="lk-calculate-timespan" data-since-year="2010">14</span>+ years of experience, focused on Front-end side of the development process. I love creating nice and useful things for the Internet people.</p>
            <p>In my spare time I love to read sci-fi books, do some jogging, work on side-projects, write tech articles on personal website or create my own indie games.</p>
          </div>
        </div>
        <div class="row row--flex">
          <div class="col col-25"><div class="title">Skills:</div></div>
          <div class="col col-75">
            <div class="title">Daily basis experience</div>
            <p>JavaScript ES6(experienced)</p>
            <p>Vue.js / Vuex (experienced)</p>
            <p>Git (experienced)</p>
            <p>Construct 3 game engine (experienced)</p>
            <p>Node.js (intermediate)</p>
            <p>Typescript (intermediate)</p>
            <p>Express.js (intermediate)</p>
            <p>Wordpress (intermediate)</p>
            <p>Experienced in working with provided backend services built with Ruby On Rails, Django or Node.js frameworks.</p>
            <p>Working in Agile methodologies</p>
            <div class="title">Software</div>
            <p>Windws, Linux, OSX</p>
            <p>Visual Studio Code, git, WSL, Affinity Designer, Jira, GitHub, Bitbucket, Construct 3, Leonardo, Zeplin, Sublime Text 3, vim</p>
            <div class="title">Used in the past, no longer on daily basis</div>
            <p>Unit Testing (Mocha, Chai, Jest) (intermediate)</p>
            <p>PhoneGap / Cordova mobile development (intermediate)</p>
            <p>Meteor.js (beginner)</p>
            <p>Angular.js 1.x (beginner)</p>
            <p>React.js (beginner)</p>
          </div>
        </div>
        <div class="row row--flex">
          <div class="col col-25"><div class="title">Work history:</div></div>
          <div class="col col-75">
          <div class="title">Senior Software Engineer at Altium (remote)</div>
            <p>04/2024 - currently</p>
            <p>Extending Altium 365 web application with new modules and functionalities.</p>
            <div class="title">Front-end developer at Mercedes-Benz.io (remote)</div>
            <p>02/2021 - 04/2024</p>
            <p>In the first 6 moths I've been developing an internal MVP project, based on provided prototype & documentation.</p>
            <p>After succesfully finishing MVP I've been assigned to another MB.io project, that will be used across all the markets that are being handled by Mercedes-Benz company.</p>
            <p>Technologies used: Vue.js, TypeScript, JavaScript, Node.js, Jest, Jenkins, Sass, Webpack, Adobe AEM.</p>
            <div class="title">Full-stack freelance web developer (remote)</div>
            <p>01/2015 - 04/2024</p>
            <p>A-Z web development from UI design to the deployment on client's server. Working on side-projects that automate everyday programming tasks.</p>
            <p>Using Node.js, JavaScript, Vue.js, Express.js, Webpack, Gulp.js, Brunch.js, Sass, git, Construct 3.</p>
            <div class="title">Front-end developer at Upstack.co (remote)</div>
            <p>02/2020 - 12/2023</p>
            <p>Contract / freelance front-end development via Upstack platform.</p>
            <div class="title">Front-end developer at HICX Solutions (remote)</div>
            <p>02/2020 - 08/2021</p>
            <p>Maintaining company product, developing new functionalities using Vue.js framework.</p>
            <div class="title">Front-end developer at QContact (remote)</div>
            <p>01/2018 - 02/2020</p>
            <p>Front-end development of SaaS application for communication. Using Vue.js, WebRTC, SIP, Webpack, Mocha, Chai, Jest, git</p>
            <div class="title">Front-end developer at Influenster (remote)</div>
            <p>06/2017 –10/2017</p>
            <p>Maintaining company product, rebuilt main application module (search) from Django template based to React.js one.</p>
            <div class="title">JavaScript developer at ITM Business sp. z o.o. (Poznan, Poland)</div>
            <p>04/2015 –04/2017</p>
            <p>
              Maintenance and further development of internal front-end framework, creating web applications and Single Page Apps based on company’s product API.Developing mobile applications based on already created web modules. Using
              JavaScript, jQuery, PhoneGap, Cordova, bits of Angular.js 1.x, git.
            </p>
            <div class="title">Web developer at ITM Business sp. z o.o. sp. k. (Poznan, Poland)</div>
            <p>10/2013 –03/2015</p>
            <p>Creating Wordpress and custom CMS based websites, development of front-end framework for ERP (SaaS) application. Using JavaScript, Wordpress, git.</p>
            <div class="title">Freelance web developer, Webrackets (remote)</div>
            <p>06/2010 –11/2014</p>
            <p>Creating Wordpress-based websites, slicing psd files to templates, front-end development.</p>
          </div>
        </div>
        <div class="row row--flex">
          <div class="col col-25"><div class="title">Education</div></div>
          <div class="col col-75">
            <div class="title">Poznan University of Technology (Master degree: IT in business processes)</div>
            <p>Thesis title: Development of Content Management System using Meteor.js – a Node.js framework.</p>
            <div class="title">Poznan University of Technology (Engineer degree: computer science)</div>
            <p>BsC Thesis title: Implementing personal data generator for testing purposes in Ruby on Rails framework.</p>
          </div>
        </div>
        <div class="row row--flex">
          <div class="col col-25"><div class="title">Other resources</div></div>
          <div class="col col-75">
            <div class="title">Linkedin</div>
            <p><a href="https://linkedin.com/in/lukaszkups" target="_blank">https://linkedin.com/in/lukaszkups</a></p>
            <div class="title">Github</div>
            <p><a href="https://github.com/lukaszkups" target="_blank">https://github.com/lukaszkups</a></p>
            <div class="title">Blog</div>
            <p><a href="https://lukaszkups.net/notes" target="_blank">https://lukaszkups.net/notes</a></p>
            <div class="title">Mastodon</div>
            <p><a href="https://mastodon.social/@lukaszkups" target="_blank">https://mastodon.social/@lukaszkups</a></p>
            <div class="title">Twitter</div>
            <p><a href="https://twitter.com/lukaszkups" target="_blank">https://twitter.com/lukaszkups</a></p>
          </div>
        </div>
        <div class="centered-text download-cv-button">
          <a class="cube article-item" href="/static/lukasz-kups-cv-2024.pdf" target="_blank">
            <div class="flippety">Download my CV</div>
            <div class="flop">Download my CV</div>
          </a>
        </div>
      </div>
      <div id="particles-js--exp"></div>
    </div>
  `;
}

const render = (contentData) => {
  contentData.navIndex = 4;
  return renderLayout(contentData, renderExperience);
}
export default render;
/* <span class="lk-calculate-timespan" data-since-year="2010">14</span> */
