#!/usr/bin/node
import Engine from './src/engine.js';
import { routes } from './content/config.js';
import { notesYearList, assetsToMinify } from './theme/templates/enums.js';

export const buildCmd = () => {
  Engine.addRoutes(routes);

  Engine.compileRoutes();
  
  // Merge all notes search results (by year) together
  const yearSearchUrlArr = notesYearList.map((year) => `/output/notes/${year}/search.json`);
  Engine.mergeAllSearchResults(yearSearchUrlArr, '/output/notes/');
  
  // Minify assets
  Engine.minify(assetsToMinify);
}

buildCmd();
