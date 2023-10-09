import * as fs from 'fs';
import showdown from 'showdown';
import pug from 'pug';
import CONFIG from './../config.json' assert { type: "json" };
import path from 'path';
import watch from 'node-watch';
import _helpers, { KeyableInterface } from './helpers.ts';
import Showdown from 'showdown';


export default class RakunWritter {
  mdConverter: typeof Showdown;
  store: {
    pages: any[],
    lists: any[]
  }
  constructor() {
    this.mdConverter = new showdown.Converter({metadata: true});
    this.mdConverter.setFlavor('github');

    this.store = {
      pages: [],
      lists: [],
    }
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
              template: path.normalize(`./theme/${CONFIG.theme}/${obj}.pug`),
              meta: {},
              contents: ''
            });
          } else if (obj.includes('--list')) {
            listsArr.push({
              id: listsArr.length + 1,
              path: path.normalize(`./contents/${obj}/index.md`),
              entriesPath: path.normalize(`./contents/${obj}/list/`),
              template: path.normalize(`./theme/${CONFIG.theme}/${obj}.pug`),
              entryTemplate: path.normalize(`./theme/${CONFIG.theme}/${obj}--entry.pug`),
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
        if (CONFIG.excludeDrafts === true) {
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
          slug: meta && meta.slug ? meta.slug : _helpers.slugify(meta.title || Date.now()),
          content: mdObj,
        }
        // @ts-ignore
        obj.output = _parentOutputPath ? `${_parentOutputPath}${obj.slug}/index.html` :`./output/${obj.slug}/index.html`;
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
    this.store.pages.map((page: any) => {
        try {
          await _helpers.mkDirByPathSync(page.output.slice(0, -10));
        } catch (err) {
          throw new Error(err as string | undefined);
        }
    })

    // create output folders list index
    this.store.lists.map((list: any) => {
      try {
        await _helpers.mkDirByPathSync(list.output.slice(0, -10));
      } catch (err) {
        throw new Error(err as string | undefined);
      }
    });

    // create output folders for list entries / pagination
    this.store.lists.map((list: any) => {
      // if list has pagination
      if (CONFIG && CONFIG.pagination && (CONFIG.pagination as KeyableInterface)[list.slug]) {
        const perPage = (CONFIG.pagination as KeyableInterface)[list.slug];
        let pages = Math.ceil(list.entries.length / perPage);
        list.paginationLinks = [];
        for (let i = 0; i < pages; i++) {
          // let first page doesn't have to contain page number
          list.paginationLinks.push(i === 0 ? list.output : `${list.output.slice(0, -11)}/${CONFIG.paginationSlug}${i + 1}/index.html`);
          try {
            await _helpers.mkDirByPathSync(path.normalize(list.paginationLinks[i].slice(0, -10)));
          } catch (error) {
            throw new Error(error as string | undefined);
          }
        }
      }
      // prepare folders for list entries
      list.entries.map(async (entry: any) => {
        try {
          await _helpers.mkDirByPathSync(path.normalize(entry.output.slice(0, -10)));
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
      let url = list.output.split('/');
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
      // add pagination helper property if list has configured pagination feature
      if (list.paginationLinks && list.paginationLinks.length > 1) {
        // @ts-ignore
        listObject.paginationLinks = [];
        list.paginationLinks.map((link: string) => {
          // @ts-ignore
          listObject.paginationLinks.push(`${link.slice(8, -10)}`);
        });
      }
      // page size variable
      const pageSize = (CONFIG.pagination as KeyableInterface)[list.slug];
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
    _helpers.mkDirByPathSync('./output/assets/css');
    _helpers.mkDirByPathSync('./output/assets/js');
    _helpers.mkDirByPathSync('./output/assets/img');
    _helpers.mkDirByPathSync('./output/assets/fonts');
    _helpers.mkDirByPathSync('./output/static/');
    _helpers.mkDirByPathSync('./output/vendor/');
    // copy image assets
    await _helpers.copyFolderContents(`./theme/${CONFIG.theme}/assets/img/`, './output/assets/img/');
    // copy fonts assets
    await _helpers.copyFolderContents(`./theme/${CONFIG.theme}/assets/fonts/`, './output/assets/fonts/');
    // copy content images/static files
    await _helpers.copyFolderContents('./contents/static/', './output/static/');
    // copy vendor files
    await _helpers.copyFolderRecursively(CONFIG.vendorsPath || `./theme/${CONFIG.theme}/vendor/`, './output/vendor/');
    // compile sass
    await _helpers.compileSass(`./theme/${CONFIG.theme}/assets/css/main.sass`, './output/assets/css/main.css');
    // compile js
    await _helpers.uglifyJs(`./theme/${CONFIG.theme}/assets/js/main.js`, './output/assets/js/main.js');
}

  async createOutputFiles() {
    await this.createOutputPageFiles();
    await this.createOutputListIndexFiles();
    await this.createOutputListEntryFiles();
    await this.prepareAssets();
  }

   async moveRootFolder() {
    if (CONFIG.rootFolder) {
      await _helpers.copyFolderContents(`./output/${CONFIG.rootFolder}/`, `./output/`);
    }
    console.log('No root page folder has been defined in CONFIG file.');
  }

  async compile() {
    await this.getAllContent();
    await this.createOutputFolders();
    await this.createOutputFiles();
    await this.createListJsonFiles();
    await this.moveRootFolder();
  }

  async compileOnce() {
    // _helpers.deleteFolderRecursive('./output/') // empty output folder for new content
    await this.compile();
  }
  
  async watchForChanges() {
    _helpers.startServer();
    await this.compileOnce();
    console.log('Initial compile completed.');
    await watch([path.normalize('./contents/'), path.normalize(`./theme/${CONFIG.theme}/`)], {recursive: true}, async (evt: any, name: string) => {
      const urlArr = name.split(path.sep);
      // recompile pages only
      if (name.includes('contents')) {
        if (name.includes('--page')) {
          await this.getAllContent();
          await this.createOutputFolders();
          await this.createOutputPageFiles();
          await this.moveRootFolder();
          console.log('Pages recompiled.')
        // recompile list entries & list index files
        } else if (urlArr.includes('list')) {
          await this.getAllContent();
          await this.createOutputFolders();
          await this.createOutputListIndexFiles();
          await this.createOutputListEntryFiles();
          await this.createListJsonFiles();
          await this.moveRootFolder();
          console.log('List entries recompiled.');
        // recompile list index files
        } else if (name.includes('--list')) {
          await this.getAllContent();
          await this.createOutputFolders();
          await this.createOutputListIndexFiles();
          await this.moveRootFolder();
          console.log('List indexes recompiled.');
        }
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
