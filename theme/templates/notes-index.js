import renderLayout from "./layout.js";

const renderNotesIndex = (contentData) => {
  return `
    <div class="notes-index-wrapper">
      <h2 class="bebas">notes<span>_</span></h2>
      <div id="particles-js--gold"></div>
    </div>
    <ul class="notes-years-wrapper bebas">
      <li><a href="/notes/2024/">2024</a><span></span></li>
      <li><a href="/notes/2023/">2023</a><span></span></li>
      <li><a href="/notes/2022/">2022</a><span></span></li>
      <li><a href="/notes/2021/">2021</a><span></span></li>
      <li><a href="/notes/2020/">2020</a><span></span></li>
      <li><a href="/notes/2019/">2019</a><span></span></li>
      <li><a href="/notes/2018/">2018</a><span></span></li>
      <li><a href="/notes/2017/">2017</a><span></span></li>
      <li><a href="/notes/2015/">2015</a><span></span></li>
    </ul>
  `;
}

const render = (contentData) => {
  contentData.navIndex = 2;
  return renderLayout(contentData, renderNotesIndex);
}
export default render;
