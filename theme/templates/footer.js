const render = (contentData) => {
  return `
  <div class="footer-right-now">
    <div class="main-container"><span>Current status:</span> Besides working as a full-time FE dev at <a href="https://www.mercedes-benz.io">MB.io</a> I'm catching up with writing all the pending tech articles!</div>
  </div>
    <footer>
      <div class="main-container footer-container">
        <div class="row">
          <div class="col-25">
            <ul>
              <li class="title">Links</li>
              <li><a href="/">Home</a></li>
              <li><a href="/about">About</a></li>
              <li><a href="/notes">Writing</a></li>
              <li><a href="/projects">Projects</a></li>
              <li><a href="/experience">CV</a></li>
            </ul>
          </div>
          <div class="col-25">
            <ul>
              <li class="title">Projects</li>
              <li><a href="https://github.com/lukaszkups">Open Source Code</a></li>
              <li><a href="https://store.steampowered.com/app/1935130/Terry_Poorflyer/">Terry Poorflyer PC game</a></li>
              <li><a href="https://lukaszkups.itch.io/">Game prototypes</a></li>
            </ul>
          </div>
          <div class="col-25">
            <ul>
              <li class="title">Categories</li>
              <li><a href="/notes/?tag=programming">Programming</a></li>
              <li><a href="/notes/?tag=vue">Vue.js</a></li>
              <li><a href="/notes/?tag=reviews">Reviews</a></li>
              <li><a href="/notes/?tag=thoughts">Thoughts</a></li>
            </ul>
          </div>
          <div class="col-25">
            <ul>
              <li class="title">Social</li>
              <li><a href="https://mastodon.social/@lukaszkups">Mastodon</a></li>
              <li><a href="https://twitter.com/lukaszkups">Twitter</a></li>
              <li><a href="https://github.com/lukaszkups">GitHub</a></li>
              <li><a href="https://linkedin.com/in/lukaszkups">LinkedIn</a></li>
              <li>
                <a href="https://lukaszkups.gumroad.com/l/thank-you-coffee?wanted=true&amp;referrer=https%3A%2F%2Flukaszkups.net%2F" target="_blank">
                  Buy me a coffee
                  <span class="logo-full"></span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div class="row copy">
          ©&nbsp;
          <span class="lk-update-year">2024</span>
          &nbsp;lukaszkups. All Rights Reserved.
        </div>
      </div>
    </footer>
    <script src="/assets/js/highlight.min.js"></script>
    <script src="https://gumroad.com/js/gumroad.js"></script>
    <link rel="stylesheet" href="/assets/css/highlightjs.monokai-sublime.min.css" />
    <script src="/assets/js/main.js"></script>
  `;
}

export default render;
