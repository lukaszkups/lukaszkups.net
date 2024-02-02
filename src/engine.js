import fs from 'fs';
import path from 'path';
import showdown from 'showdown';
import { ensureDirExists, getAllFilesWithinDirectory, slugify } from "./helpers/files.js";

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
    this.routes.forEach((route) => {
      if (route) {
        if (route.type === 'dynamic') {
          this.compileDynamicRoute(route);
        }
      }
    });
  }

  compileDynamicRoute(route) {
    const routePath = path.join(this.path, route.source)
    // collect markdown files within directory
    const sourceFilePaths = getAllFilesWithinDirectory(routePath);
    // create destination list directory (will contain folders 1 per list item with index.html file inside)
    ensureDirExists(route.destination);
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
        slug: meta && meta.slug ? meta.slug : slugify(meta.title || Date.now()),
        content: htmlContent
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
}

const engine = new Engine();
export default engine;
