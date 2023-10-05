import { watchForChanges } from './content.ts';

const store = {
  pages: [],
  lists: [],
}

watchForChanges(store);
