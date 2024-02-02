#!/usr/bin/node
import Engine from './src/engine.js';
import { routes } from './content/config.js';

Engine.addRoutes(routes);

Engine.compileRoutes();
