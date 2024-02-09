import notesRenderer from './../theme/templates/note.js';
import notesListRenderer from './../theme/templates/notes-list.js';
import notesIndexRenderer from './../theme/templates/notes-index.js';
import projectsListRenderer from './../theme/templates/projects-list.js';
import homeRenderer from './../theme/templates/home.js';
import aboutRenderer from './../theme/templates/about.js';
import experienceRenderer from './../theme/templates/experience.js';
import { notesYearList } from './../theme/templates/enums.js';

const getNoteRoutesByYear = () => {

}

const liteRoutes = () => {
  const routes = [
    {
      id: 'notes-2015',
      type: 'dynamic',
      source: '/content/pages/notes/2015/',
      destination: '/output/notes/',
      template: notesRenderer,
    },
    {
      id: 'notes-2017',
      type: 'dynamic',
      source: '/content/pages/notes/2017/',
      destination: '/output/notes/',
      template: notesRenderer,
    },
    {
      id: 'notes-2018',
      type: 'dynamic',
      source: '/content/pages/notes/2018/',
      destination: '/output/notes/',
      template: notesRenderer,
    },
    {
      id: 'notes-2019',
      type: 'dynamic',
      source: '/content/pages/notes/2019/',
      destination: '/output/notes/',
      template: notesRenderer,
    },
    {
      id: 'notes-2020',
      type: 'dynamic',
      source: '/content/pages/notes/2020/',
      destination: '/output/notes/',
      template: notesRenderer,
    },
    {
      id: 'notes-2021',
      type: 'dynamic',
      source: '/content/pages/notes/2021/',
      destination: '/output/notes/',
      template: notesRenderer,
    },
    {
      id: 'notes-2022',
      type: 'dynamic',
      source: '/content/pages/notes/2022/',
      destination: '/output/notes/',
      template: notesRenderer,
    },
    {
      id: 'notes-2023',
      type: 'dynamic',
      source: '/content/pages/notes/2023/',
      destination: '/output/notes/',
      template: notesRenderer,
    },
    {
      id: 'notes-2024',
      type: 'dynamic',
      source: '/content/pages/notes/2024/',
      destination: '/output/notes/',
      template: notesRenderer,
    },
    // {
    //   id: 'notes-list-2015',
    //   type: 'list',
    //   source: '/content/pages/notes/2015/',
    //   destination: '/output/notes/2015/',
    //   listItemUrl: '/notes/',
    //   createSearchIndex: true,
    //   content: {
    //     title: 'lukaszkups.net - Blog notes',
    //     year: '2015',
    //     tags: 'Front-end developer, FE dev, gamedev, JavaScript, TypeScript, Blog, Blogger, Blogging, lifestyle, technology, tech writing, Vue.js, Vue, Vue.js 2, Vue.js 3, Vue 2, Vue 3, Construct 3'
    //   },
    //   template: notesListRenderer,
    // },
    // {
    //   id: 'notes-list-2017',
    //   type: 'list',
    //   source: '/content/pages/notes/2017/',
    //   destination: '/output/notes/2017/',
    //   listItemUrl: '/notes/',
    //   createSearchIndex: true,
    //   content: {
    //     title: 'lukaszkups.net - Blog notes',
    //     year: '2017',
    //     tags: 'Front-end developer, FE dev, gamedev, JavaScript, TypeScript, Blog, Blogger, Blogging, lifestyle, technology, tech writing, Vue.js, Vue, Vue.js 2, Vue.js 3, Vue 2, Vue 3, Construct 3'
    //   },
    //   template: notesListRenderer,
    // },
    // {
    //   id: 'notes-list-2018',
    //   type: 'list',
    //   source: '/content/pages/notes/2018/',
    //   destination: '/output/notes/2018/',
    //   listItemUrl: '/notes/',
    //   createSearchIndex: true,
    //   content: {
    //     title: 'lukaszkups.net - Blog notes',
    //     year: '2018',
    //     tags: 'Front-end developer, FE dev, gamedev, JavaScript, TypeScript, Blog, Blogger, Blogging, lifestyle, technology, tech writing, Vue.js, Vue, Vue.js 2, Vue.js 3, Vue 2, Vue 3, Construct 3'
    //   },
    //   template: notesListRenderer,
    // },
    // {
    //   id: 'notes-list-2019',
    //   type: 'list',
    //   source: '/content/pages/notes/2019/',
    //   destination: '/output/notes/2019/',
    //   listItemUrl: '/notes/',
    //   createSearchIndex: true,
    //   content: {
    //     title: 'lukaszkups.net - Blog notes',
    //     year: '2019',
    //     tags: 'Front-end developer, FE dev, gamedev, JavaScript, TypeScript, Blog, Blogger, Blogging, lifestyle, technology, tech writing, Vue.js, Vue, Vue.js 2, Vue.js 3, Vue 2, Vue 3, Construct 3'
    //   },
    //   template: notesListRenderer,
    // },
    // {
    //   id: 'notes-list-2020',
    //   type: 'list',
    //   source: '/content/pages/notes/2020/',
    //   destination: '/output/notes/2020/',
    //   listItemUrl: '/notes/',
    //   createSearchIndex: true,
    //   content: {
    //     title: 'lukaszkups.net - Blog notes',
    //     year: '2020',
    //     tags: 'Front-end developer, FE dev, gamedev, JavaScript, TypeScript, Blog, Blogger, Blogging, lifestyle, technology, tech writing, Vue.js, Vue, Vue.js 2, Vue.js 3, Vue 2, Vue 3, Construct 3'
    //   },
    //   template: notesListRenderer,
    // },
    // {
    //   id: 'notes-list-2021',
    //   type: 'list',
    //   source: '/content/pages/notes/2021/',
    //   destination: '/output/notes/2021/',
    //   listItemUrl: '/notes/',
    //   createSearchIndex: true,
    //   content: {
    //     title: 'lukaszkups.net - Blog notes',
    //     year: '2021',
    //     tags: 'Front-end developer, FE dev, gamedev, JavaScript, TypeScript, Blog, Blogger, Blogging, lifestyle, technology, tech writing, Vue.js, Vue, Vue.js 2, Vue.js 3, Vue 2, Vue 3, Construct 3'
    //   },
    //   template: notesListRenderer,
    // },
    // {
    //   id: 'notes-list-2022',
    //   type: 'list',
    //   source: '/content/pages/notes/2022/',
    //   destination: '/output/notes/2022/',
    //   listItemUrl: '/notes/',
    //   createSearchIndex: true,
    //   content: {
    //     title: 'lukaszkups.net - Blog notes',
    //     year: '2022',
    //     tags: 'Front-end developer, FE dev, gamedev, JavaScript, TypeScript, Blog, Blogger, Blogging, lifestyle, technology, tech writing, Vue.js, Vue, Vue.js 2, Vue.js 3, Vue 2, Vue 3, Construct 3'
    //   },
    //   template: notesListRenderer,
    // },
    // {
    //   id: 'notes-list-2023',
    //   type: 'list',
    //   source: '/content/pages/notes/2023/',
    //   destination: '/output/notes/2023/',
    //   listItemUrl: '/notes/',
    //   createSearchIndex: true,
    //   content: {
    //     title: 'lukaszkups.net - Blog notes',
    //     year: '2023',
    //     tags: 'Front-end developer, FE dev, gamedev, JavaScript, TypeScript, Blog, Blogger, Blogging, lifestyle, technology, tech writing, Vue.js, Vue, Vue.js 2, Vue.js 3, Vue 2, Vue 3, Construct 3'
    //   },
    //   template: notesListRenderer,
    // },
    // {
    //   id: 'notes-list-2024',
    //   type: 'list',
    //   source: '/content/pages/notes/2024/',
    //   destination: '/output/notes/2024/',
    //   listItemUrl: '/notes/',
    //   createSearchIndex: true,
    //   content: {
    //     title: 'lukaszkups.net - Blog notes',
    //     year: '2024',
    //     tags: 'Front-end developer, FE dev, gamedev, JavaScript, TypeScript, Blog, Blogger, Blogging, lifestyle, technology, tech writing, Vue.js, Vue, Vue.js 2, Vue.js 3, Vue 2, Vue 3, Construct 3'
    //   },
    //   template: notesListRenderer,
    // },
    {
      id: 'notes-index',
      type: 'static',
      destination: '/output/notes/',
      content: {
        title: 'lukaszkups.net - Blog notes',
        tags: 'Front-end developer, FE dev, gamedev, JavaScript, TypeScript, Blog, Blogger, Blogging, lifestyle, technology, tech writing, Vue.js, Vue, Vue.js 2, Vue.js 3, Vue 2, Vue 3, Construct 3'
      },
      template: notesIndexRenderer,
    },
    {
      id: 'projects-list',
      type: 'list',
      source: '/content/pages/projects/',
      destination: '/output/projects/',
      template: projectsListRenderer,
    },
    {
      id: 'home',
      type: 'static',
      destination: '/output/',
      content: {
        title: 'lukaszkups.net - Just Another Front-end developer',
        tags: 'Front-end developer, FE dev, gamedev, JavaScript, TypeScript, portfolio, web developer, webdev, programming, programmer, technology, tech writing, Vue.js, Vue, Vue.js 2, Vue.js 3, Vue 2, Vue 3, Construct 3'
      },
      template: homeRenderer,
    },
    {
      id: 'about',
      type: 'static',
      destination: '/output/about/',
      source: '/content/pages/about.md',
      template: aboutRenderer,
    },
    {
      id: 'experience',
      type: 'static',
      destination: '/output/experience/',
      content: {
        title: 'lukaszkups.net - Front-end developer',
        tags: 'Front-end developer, FE dev, gamedev, JavaScript, TypeScript, programmer, web developer, webdev, technology, tech writer, Vue.js, Vue, Vue.js 2, Vue.js 3, Vue 2, Vue 3, Construct 3'
      },
      template: experienceRenderer,
    },
  ];
  notesYearList.forEach((year) => {
    routes.push({
      id: `notes-list-${year}`,
      type: 'list',
      source: `/content/pages/notes/${year}/`,
      destination: `/output/notes/${year}/`,
      listItemUrl: '/notes/',
      createSearchIndex: true,
      content: {
        title: 'lukaszkups.net - Blog notes',
        year: year,
        tags: 'Front-end developer, FE dev, gamedev, JavaScript, TypeScript, Blog, Blogger, Blogging, lifestyle, technology, tech writing, Vue.js, Vue, Vue.js 2, Vue.js 3, Vue 2, Vue 3, Construct 3'
      },
      template: notesListRenderer,
    })
  })
  return routes
}

export const routes = liteRoutes();