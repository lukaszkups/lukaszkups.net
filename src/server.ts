import RakunWritter from './content.ts';

const rkn = new RakunWritter('./config.json');
rkn.watchForChanges();
