
import { localAsset } from './util.js';
import { parse as parseComments } from 'comment-parser';

// Function to disable scroll
function disableScroll() {

  // document.addEventListener('touchmove', preventDefault, { passive: false }); // Disable touch scroll
}

// Function to enable scroll
function enableScroll() {
}

// Listen for messages from the iframe
window.addEventListener('message', function(event) {
  if (event.data === 'disableScroll') {
    disableScroll();
  } else if (event.data === 'enableScroll') {
    enableScroll();
  }
});

customElements.define('p5-example', class P5Example extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
    return ['src', 'width', 'height', 'responsive'];
  }

  connectedCallback() {
    this.updateFrame();
  }

  async attributeChangedCallback(name, oldValue, newValue) {
    if (['src', 'responsive'].includes(name) && oldValue !== newValue) return this.updateFrame();
    if (['width', 'height'].includes(name) && oldValue !== newValue) return this.updateFrame(true);
  }

  async updateFrame() {
    let src = this.getAttribute('src');
    let width = parseInt(this.getAttribute('width') || '300');
    let height = parseInt(this.getAttribute('height') || '300');
    let responsive = this.hasAttribute('responsive');

    let frame;
    let wrapper;
    let needsSetup = this.shadowRoot.children.length === 0;

    if (needsSetup) {
      wrapper = document.createElement('div');
      frame = document.createElement('iframe');
      frame.credentialless = 'true';
      frame.style.border = 'none';
      frame.style.outline = '1px solid #cdd';
      frame.style.borderRadius = '3px';
      wrapper.appendChild(frame);
      wrapper.style.position = 'relative';
      this.shadowRoot.appendChild(wrapper);
    } else {
      wrapper = this.shadowRoot.children[0];
      frame = wrapper.children[0];
    }

    if (responsive) {
      this.style.width = '100%';
      wrapper.style.height = '0px';
      wrapper.style.paddingBottom = `${height / width * 100}%`;
      frame.style.width = `100%`;
      frame.style.height = `100%`;
      frame.style.position = 'absolute';
      frame.style.top = '0';
      frame.style.bottom = '0';
    } else {
      this.style.width = 'initial';
      wrapper.style.height = 'initial';
      wrapper.style.paddingBottom = `initial`;
      frame.style.position = 'initial';
      frame.style.width = `${width}px`;
      frame.style.height = `${height}px`;
    }

    const styleTags = (
      await Promise.all([
        './css/reset.css',
      ].map(src => localAsset(src)))
    ).map(href => `<link rel="stylesheet" href="${href}">`).join('\n');

    frame.src = await localAsset(src, 'text/html', async (txt) => {
      const extraScripts = [];
      if (responsive) {
        extraScripts.push('./plugins/responsive.js');
      } else {
        // TODO: manipulate call to createCanvas...
      }

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

      const scriptTags = (
        await Promise.all(extraScripts.map(src => localAsset(src)))
      ).map(url => `<script src="${url}"></script>`).join('\n');
      return `<!doctype html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            ${styleTags}
            <style>body { width: 100vw; height: 100vh; overflow: hidden; }</style>
          </head>
          <body>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.10.0/p5.min.js"></script>
            ${scriptTags}
            <script>
              // Notify parent when the drawing starts
              document.body.addEventListener('touchstart', function() {
                window.parent.postMessage('disableScroll', '*');
              });

              // Notify parent when the drawing stops
              document.body.addEventListener('touchend', function() {
                window.parent.postMessage('enableScroll', '*');
              });
              ${txt}
            </script>
          </body>
        </html>`;
    });
  }
});
