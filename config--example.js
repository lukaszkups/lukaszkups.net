// IMPORTANT: RENAME THIS FILE TO 'config.js'
module.exports = {
  theme: 'lukaszkups',
  indentedSass: true,
  ie8support: true,
  vendorsPath: '',
  recompile: true,
  recompileInterval: 5000,
  rootFolder: 'home',
  excludeDrafts: true,
  paginationSlug: 'page/',
  pagination: {
    notes: 20
  },
  deployViaFtp: true, // if you want to deploy your files via writte.li itself via deploy command
  ftpConfig: {
    user: '<your ftp user name>',
    password: '<your ftp password>',
    host: '<your ftp host e.g. ftp.goooogle.com>',
    localRoot: './output', // don't change it, it points directly to the source folder of generated website
    remoteRoot: '/<path to the folder on your ftp server>/',
    deleteRemote: false, // if you want always to remove old contents in ftp, change it to true
    forcePasv: true // ftp will force to run in passive mode (EPSV command is not sent)
  }
}
