import { serve } from '@hono/node-server';
import app from './app';

// Start the server and serve the app
serve(app);

