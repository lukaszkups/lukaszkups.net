// extends layout.pug

// block content
//   .content.notes-content
//     .main-container.projects-list-wrapper
//       .projects-list
//         ul.projects
//           each item, index in list.length ? list : ['No entries yet.']
//             - const parsedDate = item.meta.date.split('/').map(obj => parseInt(obj)).join('-')
//             if !item.meta.hidden
//               li(data-date=parsedDate, data-category=item.meta.category, data-tags=item.meta.tags)
//                   .title #{item.meta.title}
//                     if item.meta.image
//                       img(src=item.meta.image, width=20)
//                   div !{item.content}
//                   .links
//                     - repo = item.meta.repo
//                     - demo = item.meta.demo
//                     - npm = item.meta.npm
//                     - changelog = item.meta.changelog
//                     - link = item.meta.link
//                     if repo
//                       a.button(href=repo, target='_blank') &laquo; Repository
//                     if demo
//                       a.button(href=demo, target='_blank') &laquo; Demo
//                     if npm
//                       a.button(href=npm, target='_blank') &laquo; npm
//                     if link
//                       a.button(href=link, target='_blank') &laquo; Link
//                     if changelog
//                       a.button(href=changelog, target='_blank') &laquo; Changelog

import { link } from 'fs';
import renderLayout from './layout';

const renderProjectImage = (projectEntryObj) => {
  if (projectEntryObj && projectEntryObj.meta?.image) {
    return `<img src="${projectEntryObj.meta.image}" width="20" />`;
  } else {
    return '';
  }
}

const renderProjectLinks = (projectEntryObj) => {
  const links = [];
  if (projectEntryObj.meta.repo) {
    links.push({ link: projectEntryObj.meta.repo, label: 'Repository' });
  }
  if (projectEntryObj.meta.demo) {
    links.push({ link: projectEntryObj.meta.demo, label: 'Demo' });
  }
  if (projectEntryObj.meta.npm) {
    links.push({ link: projectEntryObj.meta.npm, label: 'npm' });
  }
  if (projectEntryObj.meta.link) {
    links.push({ link: projectEntryObj.meta.link, label: 'Link' });
  }
  if (projectEntryObj.meta.changelog) {
    links.push({ link: projectEntryObj.meta.changelog, label: 'Changelog' });
  }
  return link.map((entry) => `
    <a
      class="button"
      href="${entry.link}"
    >
      &laquo; ${entry.label}
    </a>
  `);
}

const renderProjectListItems = (meta, content) => {
  if (!content.items || !content.items.length) {
    return `<li>No entries yet.</li>`;
  } else {
    return content.items.map((item) => {
      if (!item.meta.hidden) {
        return `
          <li 
            data-date="${item.meta.date.split('/').map((dateFragm) => parseInt(dateFragm)).join('-')}"
            data-category="${item.meta.category || ''}"
            data-tags="${item.meta.tags}"
          >
            <div class="title">
              ${item.meta.title}
              ${renderProjectImage(item)}
            </div>
            <div>${item.content}</div>
            <div class="links">
              ${renderProjectLinks(item)}
            </div>
          </li>
        `;
      }
    });
  }
}

const renderProjectListLayout = (meta, content) => {
  return `
    <div class="content notes-content">
      <div class="main-container projects-list-wrapper">
        <div class="projects-list">
          <ul class="projects">
            ${renderProjectListItems(meta, content)}
          </ul>
        </div>
      </div>
    </div>
  `;  
}

const render = (meta, content) => {
  return renderLayout(meta, content, renderProjectListLayout);
}

export default render;
