
import { parse as parseComments } from 'comment-parser';

const pluginCache = {};

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

    const extraScriptHTML = await this.loadPlugins(extraScripts);

    const html = `<!doctype html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <style>
            html, body, div, span, applet, object, iframe,
            h1, h2, h3, h4, h5, h6, p, blockquote, pre,
            a, abbr, acronym, address, big, cite, code,
            del, dfn, em, img, ins, kbd, q, s, samp,
            small, strike, strong, sub, sup, tt, var,
            b, u, i, center,
            dl, dt, dd, ol, ul, li,
            fieldset, form, label, legend,
            table, caption, tbody, tfoot, thead, tr, th, td,
            article, aside, canvas, details, embed, 
            figure, figcaption, footer, header, hgroup, 
            menu, nav, output, ruby, section, summary,
            time, mark, audio, video {
              margin: 0;
              padding: 0;
              border: 0;
              font-size: 100%;
              font: inherit;
              vertical-align: baseline;
            }
            /* HTML5 display-role reset for older browsers */
            article, aside, details, figcaption, figure, 
            footer, header, hgroup, menu, nav, section {
              display: block;
            }
            body {
              line-height: 1;
            }
            ol, ul {
              list-style: none;
            }
            blockquote, q {
              quotes: none;
            }
            blockquote:before, blockquote:after,
            q:before, q:after {
              content: '';
              content: none;
            }
            table {
              border-collapse: collapse;
              border-spacing: 0;
            }
            body {
              width: 100vh;
              height: 100vw;
              overflow: hidden;
            }
          </style>
        </head>
        <body class="center-body-content">
          <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.10.0/p5.min.js"></script>
          ${extraScriptHTML}
          <script>
            ${txt}
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
  
    const iframe = document.createElement('iframe');
    iframe.src = `data:text/html;charset=utf-8,${window.escape(html)}`;
    iframe.setAttribute('frameBorder', '0');
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
