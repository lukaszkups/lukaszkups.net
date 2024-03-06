#!/usr/bin/node
import watch from 'node-watch';
import { buildCmd } from './build.js';

watch(['./content/', './theme/'], {
  recursive: true,
}, () => {
  buildCmd();
});
