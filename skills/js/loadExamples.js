
import { localAsset } from '/skills/js/util.js';
import { parse as parseComments } from 'comment-parser';

window.onHoldIt('p5-viewer', async function loadExample(root, props) {
  const iframe = document.createElement('iframe');
  iframe.credentialless = 'true';
  iframe.position = 'absolute';
  iframe.inset = '0';
  iframe.style.width = '100%';
  iframe.style.height = '100%';
  root.appendChild(iframe);

  const styleTags = (
    await Promise.all([
      '/skills/css/reset.css',
    ].map(src => localAsset(src)))
  ).map(href => `<link rel="stylesheet" href="${href}">`).join('\n');

  iframe.src = await localAsset(props.src, 'text/html', async (txt) => {
    const extraScripts = [
      '/skills/plugins/responsive.js'
    ];
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
});
