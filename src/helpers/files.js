import fs from 'fs';

export const getAllFilesWithinDirectory = (path) => {
  return fs.readdirSync(path, { withFileTypes: true }).filter(item => !item.isDirectory()).map(item => item.name);
}

export const ensureDirExists = (path) => {
  if (!fs.existsSync(path)){
    fs.mkdirSync(path, { recursive: true });
  }
}

export const slugify = (txt) => {
  const a = 'àáäâãåèéëêìíïîòóöôùúüûñçßÿœæŕśńṕẃǵǹḿǘẍźḧ·/_,:;'
  const b = 'aaaaaaeeeeiiiioooouuuuncsyoarsnpwgnmuxzh------'
  const p = new RegExp(a.split('').join('|'), 'g')
  return txt.toString().toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with
    .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
    .replace(/&/g, '-and-') // Replace & with ‘and’
    .replace(/[^\w\-]+/g, '') // Remove all non-word characters
    .replace(/\-\-+/g, '-') // Replace multiple — with single -
    .replace(/^-+/, '') // Trim — from start of text .replace(/-+$/, '') // Trim — from end of text
}

export const clearFolder = async (path) => {
  await fs.rm(path, { recursive: true }, () => ({}));
}

export const stripFromQuotes = (title) => {
  if (
    title && 
    title[0] === '"' && 
    title[title.length - 1] === '"'
  ) {
    return title.slice(1, -1);
  } else if (
    title &&
    title.includes('&quot;') 
  ) {
    return title.replace(/&quot;/g, '');
  }
  return title;
}
