import fs from 'fs';
import path from 'path';
import showdown from 'showdown';
import fm from 'front-matter';
import { clearFolder, ensureDirExists, getAllFilesWithinDirectory, slugify } from "./helpers/files.js";

class Engine {
  constructor(args) {
    this.routes = args?.routes || [];
    this.markdown = new showdown.Converter({ metadata: true });
    this.markdown.setFlavor('github');
    // get current project
    this.path = process.cwd();
  }

  addRoute(route) {
    this.routes.push(route);
  }

  addRoutes(routeArr) {
    routeArr.forEach(route => {
      this.routes.push(route);
    });
  }

  removeRoute(routeId) {
    const index = this.routes.findIndex((route) => route.id === routeId);
    if (index > -1) {
      this.routes.split(index, 1);
    }
  }

  compileRoutes() {
    clearFolder(path.join(this.path, 'output/*'));
    this.routes.forEach((route) => {
      if (route) {
        if (route.type === 'dynamic') {
          this.compileDynamicRoute(route);
        } else if (route.type === 'list') {
          this.compileListRoute(route);
        } else if (route.type === 'static') {
          this.compileStaticRoute(route);
        }
      }
    });
  }

  compileDynamicRoute(route) {
    const routePath = path.join(this.path, route.source)
    // collect markdown files within directory
    const sourceFilePaths = getAllFilesWithinDirectory(routePath);
    // create destination list directory (will contain folders 1 per list item with index.html file inside)
    ensureDirExists(path.join(this.path, route.destination));
    // loop over source files and save them in destination directory
    sourceFilePaths.forEach((sourceFilePath) => {
      // read single file
      const txtContent = fs.readFileSync(path.join(routePath, sourceFilePath), 'utf8');
      // extract markdown and parse it into HTML
      const htmlContent = this.markdown.makeHtml(txtContent);
      // extract metadata from the current file
      const meta = this.markdown.getMetadata();
      // create reusable object that we send to render functions
      const contentObj = {
        meta: meta,
        slug: meta?.slug || slugify(meta.title || Date.now()),
        content: htmlContent
      }
      // Add route-based content to the object
      if (route.content) {
        contentObj.routeContent = route.content;
      }
      // create destination file url
      const outputFilePath = path.join(this.path, route.destination, contentObj.slug);
      // create destination route item folder
      ensureDirExists(outputFilePath);
      // compile content object with template
      const content = route.template(contentObj);
      // save file in the final path as index.html (for seamless routing)
      fs.writeFileSync(path.join(outputFilePath, 'index.html'), content);
    });
  }

  compileListRoute(route) {
    const contentObj = {
      items: [],
    }
    const routePath = path.join(this.path, route.source);
    // collect markdown files within directory
    const sourceFilePaths = getAllFilesWithinDirectory(routePath);
    // create destination list directory (will contain folders 1 per list item with index.html file inside)
    ensureDirExists(route.destination);
    // loop over source files
    sourceFilePaths.forEach((sourceFilePath) => {
      // read single file
      const txtContent = fs.readFileSync(path.join(routePath, sourceFilePath), 'utf8');
      // extract metadata from the current file
      const meta = fm(txtContent);
      const slug = meta?.attributes?.slug || slugify(meta?.attributes?.title || Date.now());
      // create reusable object that we send to render functions
      const contentItemObj = {
        meta: meta?.attributes || { title: Date.now() },
        slug: slug,
        url: `${route.listItemUrl}${slug}/`
      }
      // add list item to collection
      contentObj.items.push(contentItemObj);
    });
    // create destination file url
    const outputFilePath = path.join(this.path, route.destination);
    // create destination route folder
    ensureDirExists(outputFilePath);
    // save json file for search purposes
    if (route.createSearchIndex) {
      fs.writeFileSync(path.join(outputFilePath, 'search.json'), JSON.stringify(contentObj));
    }
    // Add route-based content to the object
    if (route.content) {
      contentObj.routeContent = route.content;
    }
    // compile content object with template
    const content = route.template(contentObj);
    // save file in the final path as index.html (for seamless routing)
    fs.writeFileSync(path.join(outputFilePath, 'index.html'), content);
  }

  compileStaticRoute(route) {
    // create destination file url
    const outputFilePath = path.join(this.path, route.destination);
    // create destination directory (will contain index.html inside)
    ensureDirExists(outputFilePath);
    // compile content object with template
    const content = route.template(route.content || { title: Date.now() });
    // save file in the final path as index.html (for seamless routing)
    fs.writeFileSync(path.join(outputFilePath, 'index.html'), content);
  }
}

const engine = new Engine();
export default engine;
