import renderLayout from "./layout.js";
import { notesYearList } from './enums.js';

const renderYearSelector = (contentData) => {
  let htmlString = '';
  notesYearList.forEach((year) => {
    htmlString += `<li><a href="/notes/${year}/">${year}</a><span></span></li>`;
  });
  return htmlString;
}

const renderNotesIndex = (contentData) => {
  return `
    <div class="notes-index-wrapper">
      <h2 class="bebas">notes<span>_</span></h2>
      <div id="particles-js--gold"></div>
    </div>
    <ul class="notes-years-wrapper bebas">
      ${renderYearSelector(contentData)}
    </ul>
  `;
}

const render = (contentData) => {
  contentData.navIndex = 2;
  return renderLayout(contentData, renderNotesIndex);
}
export default render;
