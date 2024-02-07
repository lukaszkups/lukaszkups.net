#!/usr/bin/node
import Engine from './src/engine.js';
import { routes } from './content/config.js';
import { notesYearList } from './theme/templates/enums.js';

Engine.addRoutes(routes);

Engine.compileRoutes();

// Merge all notes search results (by year) together
const yearSearchUrlArr = notesYearList.map((year) => `/output/notes/${year}/search.json`);
Engine.mergeAllSearchResults(yearSearchUrlArr, '/output/notes/');
