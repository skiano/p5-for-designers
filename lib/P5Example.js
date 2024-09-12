
import { localAsset } from './util.js';
import { parse as parseComments } from 'comment-parser';

const pluginCache = {};

// Share one promise across all instances
const stylePromise = Promise.all([
  './css/reset.css',
  './css/base.css',
].map(localAsset))

customElements.define('p5-example', class P5Example extends HTMLElement {
  constructor() {
    super();
    // Create a shadow root
    this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
    return ['data-url'];
  }

  connectedCallback() {
    this.createDom();
  }

  async attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'src' && oldValue !== newValue) this.createDom();
  }

  async createDom() {
    const src = this.getAttribute('src');
    if (!src) return;
    const iframe = await this.loadExample(src);
    this.shadowRoot.innerHTML = ''; // Clears all content inside the shadow root
    this.shadowRoot.appendChild(iframe);
  }

  async loadPlugins(plugins) {
    if (!plugins.length) return '';
    const snippets = await Promise.all(plugins.map(async (src) => {
      if (pluginCache[src]) return pluginCache[src];
      const res = await fetch(src);
      const txt = await res.text();
      pluginCache[src] = txt;
      return txt;
    }));
    return snippets.map((s) => (
      `<script>${s}</script>`
    )).join('\n');
  }

  async loadExample(src, opt) {
    opt = {
      width: '540px',
      height: '540px',
      ...opt,
    }
    const res = await fetch(src);
    const txt = await res.text();

    // gather any plugins
    const extraScripts = [];
    const comments = parseComments(txt);
    comments.forEach((comment) => {
      if (comment.tags) {
        comment.tags.forEach((tag) => {
          if (tag.tag === 'requires') {
            extraScripts.push(tag.name);
          }
        });
      }
    });


    const styleTags = (await stylePromise).map(href => `<link rel="stylesheet" href="${href}">`).join('\n');
    console.log(styleTags)


    const extraScriptHTML = await this.loadPlugins(extraScripts);

    const html = `<!doctype html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          ${styleTags}
        </head>
        <body class="center-body-content">
          <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.10.0/p5.min.js"></script>
          ${extraScriptHTML}
          <script>
            ${/* txt */ ''}
          </script>
        </body>
      </html>`;
  
    let width = opt.width;
    let height = opt.height;
  
    const sizeRegex = /createCanvas\(\s*(\d+)\s*,\s*(\d+)\s*\)/;
    const match = txt.match(sizeRegex);
    if (match) {
      width = match[1] + 'px';
      height = match[2] + 'px';
    }

    const blob = new Blob([html], { type: 'text/html' });
    const blobUrl = URL.createObjectURL(blob);
  
    const iframe = document.createElement('iframe');
    iframe.src = blobUrl;
    iframe.credentialless = 'true';
    iframe.style.border = 'none';
    iframe.style.outline = '1px solid #cdd';
    iframe.style.borderRadius = '3px';
    // iframe.sandbox = 'allow-same-origin';
    if (width) iframe.style.width = width;
    if (height) iframe.style.height = height;
    return iframe;
  }

  // Simulate an async operation (e.g., fetching data)
  fetchData() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('Hello from Async!');
      }, 2000); // Simulate a 2-second delay
    });
  }
});
