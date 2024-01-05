const render = (meta, content) => {
  return `
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
              <li><a href="https://twitter.com/lukaszkups">Twitter</a></li>
              <li><a href="https://github.com/lukaszkups">GitHub</a></li>
              <li><a href="https://linkedin.com/in/lukaszkups">LinkedIn</a></li>
              <li><a href="https://gum.co/tATgO?wanted=true" target="_blank">Buy me a coffee</a></li>
            </ul>
          </div>
        </div>
        <div class="row copyrights">©&nbsp;<span id="year">2020</span>&nbsp;lukaszkups. All Rights Reserved.</div>
      </div>
    </footer>
    <script src="/assets/js/main.js"></script>
    <script src="https://gumroad.com/js/gumroad.js"></script>
  `;
}

export default render;
