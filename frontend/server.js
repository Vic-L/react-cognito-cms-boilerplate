import express from 'express';
import path from 'path';

import { renderToString } from 'react-dom/server';
import bundle from './dist/assets/bundle.js';

const app = express();

app.use(express.static(path.resolve(__dirname, 'dist')));

app.get('/*', (req, res) => {
    const reactDom = renderToString(bundle);

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(htmlTemplate(reactDom));
});

app.listen(2048, () => console.log('listening to port 2048'));

function htmlTemplate(reactDom) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>React SSR</title>
    </head>
    
    <body>
      <div id="app">${reactDom}</div>
      <script src="./bundle.js"></script>
    </body>
    </html>
  `;
}
