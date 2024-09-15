window.inlineCodeSnippet = function inlineCodeSnippet(fn) {
  const str = fn.toString();
  const lines = str.split('\n').slice(1, -1);
  const leadingSpace = /^ +/;
  const minIndent = lines.reduce((min, line) => {
    if (!line.trim()) return min;
    let match = line.match(leadingSpace);
    return Math.min(match ? match[0].length : 0, min);
  }, Infinity);
  const out = lines.map(l => l.slice(minIndent)).join('\n');
  document.write(`<pre><code class="language-javascript">${out}</code></pre>`);
}