import * as fs from 'fs';
import fse from 'fs-extra';
import showdown from 'showdown';
import pug from 'pug';
import path from 'path';
import watch from 'node-watch';
// import this.config from './../this.config.json' assert { type: "json" };
// import this from './helpers.ts';
import sass from 'node-sass';
import UglifyJS from 'uglify-es';
import http from 'http-server';
// @ts-ignore-next-line
import { Converter } from 'showdown';

interface KeyableInterface {
  [key: string]: any;
}

export default class RakunWritter {
  mdConverter: Converter;
  store: {
    pages: any[],
    lists: any[]
  }
  config: any;
  constructor(configFileUrl: string) {
    this.mdConverter = new showdown.Converter({metadata: true});
    this.mdConverter.setFlavor('github');

    this.store = {
      pages: [],
      lists: [],
    }
    this.config = JSON.parse(fs.readFileSync(path.normalize(configFileUrl), { encoding: 'utf-8'}) || '{}');
  }

  // method below source: https://stackoverflow.com/a/40686853/1004946
  mkDirByPathSync(targetDir: string, { isRelativeToScript = false } = {}) {
    const sep = path.sep;
    const initDir = path.isAbsolute(targetDir) ? sep : '';
    const baseDir = isRelativeToScript ? __dirname : '.';
    return targetDir.split(sep).reduce((parentDir, childDir) => {
      const curDir = path.resolve(baseDir, parentDir, childDir);
      try {
        fs.mkdirSync(curDir);
      } catch (err: any) {
        if (err.code === 'EEXIST') { // curDir already exists!
          return curDir;
        }
        // To avoid `EISDIR` error on Mac and `EACCES`-->`ENOENT` and `EPERM` on Windows.
        if (err.code === 'ENOENT') { // Throw the original parentDir error on curDir `ENOENT` failure.
          throw new Error(`EACCES: permission denied, mkdir '${parentDir}'`);
        }
        const caughtErr = ['EACCES', 'EPERM', 'EISDIR'].indexOf(err.code) > -1;
        if (!caughtErr || caughtErr && curDir === path.resolve(targetDir)) {
          throw err; // Throw if it's just the last created dir.
        }
      }
      return curDir;
    }, initDir);
  }

  slugify(txt: string) {
    const a = 'àáäâãåèéëêìíïîòóöôùúüûñçßÿœæŕśńṕẃǵǹḿǘẍźḧ·/_,:;';
    const b = 'aaaaaaeeeeiiiioooouuuuncsyoarsnpwgnmuxzh------';
    const p = new RegExp(a.split('').join('|'), 'g');
    return txt.toString().toLowerCase()
      .replace(/\s+/g, '-') // Replace spaces with
      .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
      .replace(/&/g, '-and-') // Replace & with ‘and’
      .replace(/[^\w\-]+/g, '') // Remove all non-word characters
      .replace(/\-\-+/g, '-') // Replace multiple — with single -
      .replace(/^-+/, ''); // Trim — from start of text .replace(/-+$/, '') // Trim — from end of text
  }

  // method below source: https://geedew.com/remove-a-directory-that-is-not-empty-in-nodejs/
  deleteFolderRecursive(url: string) {
    if (fs.existsSync(url)) {
      fs.readdirSync(url).forEach((file) => {
        const curPath = url + "/" + file;
        if(fs.lstatSync(curPath).isDirectory()) { // recurse
          this.deleteFolderRecursive(path.normalize(curPath));
        } else { // delete file
          fs.unlinkSync(curPath);
        }
      })
      fs.rmdirSync(url);
    }
  }

  async compileSass(_source: any, _target: any) {
    await sass.render({
      file: _source,
      outputStyle: 'compressed',
      indentedSyntax: this.config.indentedSass || false
    }, async (err: any, result: any) => {
      if (err) {
        throw new Error(err);
      } else {
        await fs.writeFile(path.normalize(_target), result && result.css ? result.css : '', (err: any) => {
          if (err) {
            throw new Error(err);
          }
        });
      }
    })
  }

  async uglifyJs(_source: any, _target: any) {
    await fs.readFile(path.normalize(_source), 'utf8', async (err: any, data) => {
      if (err) {
        throw new Error(err);
      } else {
        const uglified = UglifyJS.minify(data, {
          ie8: this.config.ie8support || false
        });
        if (uglified && uglified.error) {
          throw new Error(uglified.error as unknown as string);
        } else if (uglified && uglified.code) {
          await fs.writeFile(_target, uglified.code, async (error: any) => {
            if (error) {
              throw new Error(error);
            }
          });
        }
      }
    });
  }

  async copyFolderContents(_sourcePath: string, _targetPath: string) {
    await fs.readdir(path.normalize(_sourcePath), async (err: any, files) => {
      if (!err) {
        await files.forEach(async (file) => {
          const sourceFile = `${_sourcePath}${file}`;
          const targetFile = `${_targetPath}${file}`;
          await fs.writeFile(path.normalize(targetFile), fs.readFileSync(path.normalize(sourceFile)), (err: any) => {
            if (err) {
              throw new Error(err);
            }
          });
        });
      } else {
        console.log('There was an error while moving ',_sourcePath, ' to ', _targetPath);
        throw new Error(err);
      }
    });
  }

  async copyFolderRecursively(_sourcePath: string, _targetPath: string) {
    try {
      await fse.copy(path.normalize(_sourcePath), path.normalize(_targetPath));
    } catch (err: any) {
      throw new Error(err);
    }
  }

  startServer() {
    const server = http.createServer({root: './output/'});
    server.listen(this.config.port || 3000);
    console.log(`Output folder is now served under http://localhost:${this.config.port || 3000}`);
  }

  async getPages() {
    await fs.readdir(path.normalize('./contents/'), (err: any, files: any[]) => {
      if (!err) {
        let pagesArr: any[] = [];
        let listsArr: any[] = [];
        files.forEach((obj) => {
          if (obj.includes('--page')) {
            pagesArr.push({
              id: listsArr.length + 1,
              path: path.normalize(`./contents/${obj}/index.md`),
              template: path.normalize(`./theme/${this.config.theme}/${obj}.pug`),
              meta: {},
              contents: ''
            });
          } else if (obj.includes('--list')) {
            listsArr.push({
              id: listsArr.length + 1,
              path: path.normalize(`./contents/${obj}/index.md`),
              entriesPath: path.normalize(`./contents/${obj}/list/`),
              template: path.normalize(`./theme/${this.config.theme}/${obj}.pug`),
              entryTemplate: path.normalize(`./theme/${this.config.theme}/${obj}--entry.pug`),
              meta: {},
              contents: '',
              entries: []
            });
          }
        })
        this.store.pages = pagesArr;
        this.store.lists = listsArr;
      } else {
        throw new Error(err);
      }
    })
  }

  async getListEntries(filePath: string, listObj: any) {
    await fs.readdir(path.normalize(filePath), async (err: any, files: any) => {
      if (!err) {
        let promises: any[] = [];
        files.forEach((obj: any, index: number) => {
          // @ts-ignore
          promises.push(getMdFileContents(`${filePath}${obj}`, index, path.normalize(`./output/${listObj.slug}/`), listObj));
        })
        let arr = await Promise.all(promises);
        if (this.config.excludeDrafts === true) {
          arr = arr.filter((obj: any) => !obj.meta.draft);
        }
        return arr.reverse();
      } else {
        throw new Error(err);
      }
    });
  }

  async getMdFileContents(filePath: string, _index: number, _parentOutputPath?: string, parentObj?: any): Promise<any> {
    await fs.readFile(path.normalize(filePath), 'utf8', (err: any, data: any) => {
      if (!err) {
        const mdObj = this.mdConverter.makeHtml(data);
        const meta = this.mdConverter.getMetadata() as any;
        let obj = {
          id: _index + 1,
          meta: meta,
          slug: meta && meta.slug ? meta.slug : this.slugify(meta.title || Date.now()),
          content: mdObj,
          output: null,
        }
        // @ts-ignore
        obj.output = _parentOutputPath ? `${_parentOutputPath}${obj.slug}/index.html` :`./output/${obj.slug}/index.html`;
        console.log('output: ', obj.output);
        if (parentObj && parentObj.slug && parentObj.slug.length) {
          // @ts-ignore
          obj.url = `/${parentObj.slug}/${obj.slug}/`;
        }
        if (parentObj && parentObj.entryTemplate && parentObj.entryTemplate.length) {
          // @ts-ignore
          obj.template = parentObj.entryTemplate;
        }
        return obj;
      } else {
        throw new Error(err);
      }
    });
  }
  
  
  async getAllContent() {
    await this.getPages();
    // get all lists file contents
    await this.store.lists.map(async (list: any, index: number) => {
      const obj = await this.getMdFileContents(list.path, index);
      this.store.lists[index] = {...this.store.lists[index], ...obj};
      const arr = await this.getListEntries(list.entriesPath, list);
      this.store.lists[index].entries = arr;
    });
    // get all pages file contents
    await this.store.pages.map(async (page: any, index: number) => {
      const obj = await this.getMdFileContents(page.path, index);
      this.store.pages[index] = {...page, ...obj};
    });
    // resolve all files, generate slugs/meta etc.
    // get all list entries contents
    await this.store.lists.map(async (list: any, index: number) => {
      const arr = await this.getListEntries(list.entriesPath, list);
      this.store.lists[index].entries = arr;
    });
  }

  compilePage(pageObj: any) {
    return pug.compileFile(pageObj.template);
  }

  async createOutputFolders() {
    // create output folders for pages
    this.store.pages.map(async (page: any) => {
        try {
          await this.mkDirByPathSync(page.output.slice(0, -10));
        } catch (err) {
          throw new Error(err as string | undefined);
        }
    })

    // create output folders list index
    this.store.lists.map(async (list: any) => {
      try {
        await this.mkDirByPathSync(list.output.slice(0, -10));
      } catch (err) {
        throw new Error(err as string | undefined);
      }
    });

    // create output folders for list entries / pagination
    await this.store.lists.map(async (list: any) => {
      // if list has pagination
      if (this.config && this.config.pagination && (this.config.pagination as KeyableInterface)[list.slug]) {
        const perPage = (this.config.pagination as KeyableInterface)[list.slug];
        let pages = Math.ceil(list.entries.length / perPage);
        list.paginationLinks = [];
        for (let i = 0; i < pages; i++) {
          // let first page doesn't have to contain page number
          list.paginationLinks.push(i === 0 ? list.output : `${list.output.slice(0, -11)}/${this.config.paginationSlug}${i + 1}/index.html`);
          try {
            await this.mkDirByPathSync(path.normalize(list.paginationLinks[i].slice(0, -10)));
          } catch (error) {
            throw new Error(error as string | undefined);
          }
        }
      }
      // prepare folders for list entries
      await list.entries.map(async (entry: any) => {
        try {
          await this.mkDirByPathSync(path.normalize(entry.output.slice(0, -10)));
        } catch (error) {
          throw new Error(error as string | undefined);
        }
      });
    });
  }

  async createOutputPageFiles(contentTemplateOptions = {}) {
    await this.store.pages.map(async (page: any) => {
      if (page.template && page.template.length) {
        const contentTemplate = pug.compileFile(page.template);
        const parsedContentTemplate = contentTemplate({
          title: page.meta && page.meta.title ? page.meta.title : '',
          date: page.meta && page.meta.date ? page.meta.date : '',
          tags: page.meta && page.meta.tags ? page.meta.tags : '',
          description: page.meta && page.meta.description ? page.meta.description : '',
          content: page.content,
          meta: page.meta || {},
          ...contentTemplateOptions
        });
        await fs.writeFile(path.normalize(page.output), parsedContentTemplate, (err: any) => {
          if (err) {
            throw new Error(err);
          }
        });
      }
    });
  }

  
  async createListJsonFiles() {
    await this.store.lists.map(async (list: any) => {
      let url = list.output?.split('/');
      if (url) {
        url[url.length - 1] = 'list.json';
        url = `./${url.join('/')}`;
        let entries = [...list.entries];
        let parsedList: any[] = [];
        entries.map(entry => {
          parsedList.push({
            id: entry.id,
            title: entry.meta.title,
            date: entry.meta.date,
            category: entry.meta.category,
            tags: entry.meta.tags,
            url: entry.output.slice(6, -10)
          });
        });
        await fs.writeFile(path.normalize(url), JSON.stringify({list: parsedList}), (err: any) => {
          if (err) {
            throw new Error(err);
          }
        });
      }
    });
  }
  
  async createOutputListIndexFiles(contentTemplateOptions = {}) {
    await this.store.lists.map(async (list: any) => {
      // list template
      const contentTemplate = pug.compileFile(list.template);
      // list object
      let listObject = {
        title: list.meta && list.meta.title ? list.meta.title : '',
        date: list.meta && list.meta.date ? list.meta.date : '',
        tags: list.meta && list.meta.tags ? list.meta.tags : '',
        description: list.meta && list.meta.description ? list.meta.description : '',
        list: list.entries || [],
        content: list.content,
        meta: list.meta || {},
        ...contentTemplateOptions,
      }
      // add pagination helper property if list has this.configured pagination feature
      if (list.paginationLinks && list.paginationLinks.length > 1) {
        // @ts-ignore
        listObject.paginationLinks = [];
        list.paginationLinks.map((link: string) => {
          // @ts-ignore
          listObject.paginationLinks.push(`${link.slice(8, -10)}`);
        });
      }
      // page size variable
      const pageSize = (this.config.pagination as KeyableInterface)[list.slug];
      // if list has pagination
      if (list.paginationLinks && list.paginationLinks.length > 1) {
        await list.paginationLinks.map(async (page: any, index: number) => {
          const paginatedListOfEntries = list && list.entries ? list.entries.slice(index * pageSize, (index + 1) * pageSize) : [];
          listObject.list = paginatedListOfEntries || [];
          // add also active page helper property
          // @ts-ignore
          listObject.currentPage = index + 1;
          const parsedContentTemplate = contentTemplate(listObject);
          await fs.writeFile(path.normalize(page), parsedContentTemplate, (err: any) => {
            if (err) {
              throw new Error(err);
            }
          });
        });
      } else {
        // if list doesn't have pagination
        const parsedContentTemplate = contentTemplate(listObject);
        await fs.writeFile(path.normalize(list.output), parsedContentTemplate, (err: any) => {
          if (err) {
            throw new Error(err);
          }
        });
      }
    });
  }

  async createOutputListEntryFiles(contentTemplateOptions = {}) {
    await this.store.lists.map(async (list: any) => {
      await list.entries.map(async (entry: any) => {
        const contentTemplate = pug.compileFile(entry.template);
        const parsedContentTemplate = contentTemplate({
          title: entry.meta && entry.meta.title ? entry.meta.title : '',
          date: entry.meta && entry.meta.date ? entry.meta.date : '',
          tags: entry.meta && entry.meta.tags ? entry.meta.tags : '',
          description: entry.meta && entry.meta.description ? entry.meta.description : '',
          content: entry.content,
          meta: entry.meta || {},
          ...contentTemplateOptions
        });
        await fs.writeFile(path.normalize(entry.output), parsedContentTemplate, (err: any) => {
          if (err) {
            throw new Error(err);
          }
        });
      })
    });
  }

  async prepareAssets() {
    this.mkDirByPathSync('./output/assets/css');
    this.mkDirByPathSync('./output/assets/js');
    this.mkDirByPathSync('./output/assets/img');
    this.mkDirByPathSync('./output/assets/fonts');
    this.mkDirByPathSync('./output/static/');
    this.mkDirByPathSync('./output/vendor/');
    // copy image assets
    await this.copyFolderContents(`./theme/${this.config.theme}/assets/img/`, './output/assets/img/');
    // copy fonts assets
    await this.copyFolderContents(`./theme/${this.config.theme}/assets/fonts/`, './output/assets/fonts/');
    // copy content images/static files
    await this.copyFolderContents('./contents/static/', './output/static/');
    // copy vendor files
    await this.copyFolderRecursively(this.config.vendorsPath || `./theme/${this.config.theme}/vendor/`, './output/vendor/');
    // compile sass
    await this.compileSass(`./theme/${this.config.theme}/assets/css/main.sass`, './output/assets/css/main.css');
    // compile js
    await this.uglifyJs(`./theme/${this.config.theme}/assets/js/main.js`, './output/assets/js/main.js');
  }

  async createOutputFiles() {
    await this.createOutputPageFiles();
    await this.createOutputListIndexFiles();
    await this.createOutputListEntryFiles();
    await this.prepareAssets();
  }

  async moveRootFolder() {
    if (this.config.rootFolder) {
      // TODO 111
      // await this.copyFolderContents(`./output/${this.config.rootFolder}/`, `./output/`);
    } else {
      console.log('No root page folder has been defined in this.config file.');
    }
  }

  async compile() {
    await this.getAllContent();
    await this.createOutputFolders();
    await this.createOutputFiles();
    await this.createListJsonFiles();
    await this.moveRootFolder();
  }

  async compileOnce() {
    this.deleteFolderRecursive('./output/') // empty output folder for new content
    await this.compile();
  }
  
  async watchForChanges() {
    this.startServer();
    await this.compileOnce();
    console.log('Initial compile completed.');
    // @ts-ignore
    await watch([path.normalize('./contents/'), path.normalize(`./theme/${this.config.theme}/`)], {recursive: true}, async (evt: any, name: string) => {
      const urlArr = name.split(path.sep);
      // recompile pages only
      if (name.includes('contents')) {
        await this.getAllContent();
        await this.createOutputFolders();

        if (name.includes('--page')) {
          await this.createOutputPageFiles();
          console.log('Pages recompiled.')
        // recompile list entries & list index files
        } else if (urlArr.includes('list')) {
          await this.createOutputListIndexFiles();
          await this.createOutputListEntryFiles();
          await this.createListJsonFiles();
          console.log('List entries recompiled.');
        // recompile list index files
        } else if (name.includes('--list')) {
          await this.createOutputListIndexFiles();
          console.log('List indexes recompiled.');
        }
        await this.moveRootFolder();
      // recompile assets
      } else if (urlArr.includes('assets')){
        await this.prepareAssets();
        console.log('Static assets recompiled.');
      } else {
        this.compile();
        console.log('Templates recompiled.');
      }
    });
  }
}
