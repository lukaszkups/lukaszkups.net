import notesRenderer from './../theme/templates/note.js';
import notesListRenderer from './../theme/templates/notes-list.js';
import notesIndexRenderer from './../theme/templates/notes-index.js';
import projectsListRenderer from './../theme/templates/projects-list.js';
import homeRenderer from './../theme/templates/home.js';
import aboutRenderer from './../theme/templates/about.js';
import experienceRenderer from './../theme/templates/experience.js';

export const routes = [
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
  {
    id: 'notes-list-2015',
    type: 'list',
    source: '/content/pages/notes/2015/',
    destination: '/output/notes/2015/',
    template: notesListRenderer,
  },
  {
    id: 'notes-list-2017',
    type: 'list',
    source: '/content/pages/notes/2017/',
    destination: '/output/notes/2017/',
    template: notesListRenderer,
  },
  {
    id: 'notes-list-2018',
    type: 'list',
    source: '/content/pages/notes/2018/',
    destination: '/output/notes/2018/',
    template: notesListRenderer,
  },
  {
    id: 'notes-list-2019',
    type: 'list',
    source: '/content/pages/notes/2019/',
    destination: '/output/notes/2019/',
    template: notesListRenderer,
  },
  {
    id: 'notes-list-2020',
    type: 'list',
    source: '/content/pages/notes/2020/',
    destination: '/output/notes/2020/',
    template: notesListRenderer,
  },
  {
    id: 'notes-list-2021',
    type: 'list',
    source: '/content/pages/notes/2021/',
    destination: '/output/notes/2021/',
    template: notesListRenderer,
  },
  {
    id: 'notes-list-2022',
    type: 'list',
    source: '/content/pages/notes/2022/',
    destination: '/output/notes/2022/',
    template: notesListRenderer,
  },
  {
    id: 'notes-list-2023',
    type: 'list',
    source: '/content/pages/notes/2023/',
    destination: '/output/notes/2023/',
    template: notesListRenderer,
  },
  {
    id: 'notes-list-2024',
    type: 'list',
    source: '/content/pages/notes/2024/',
    destination: '/output/notes/2024/',
    template: notesListRenderer,
  },
  {
    id: 'notes-index',
    type: 'static',
    destination: '/output/notes/',
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
    template: homeRenderer,
  },
  {
    id: 'about',
    type: 'static',
    destination: '/output/about/',
    template: aboutRenderer,
  },
  {
    id: 'experience',
    type: 'static',
    destination: '/output/experience/',
    template: experienceRenderer,
  },
];
