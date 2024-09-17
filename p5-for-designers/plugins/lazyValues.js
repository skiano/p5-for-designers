// @see https://github.com/processing/p5.js/blob/main/contributor_docs/creating_libraries.md#step-6

(function p5Responsive(p5) {
  p5.prototype._createLazyValues = function() {
    const keys = [];
    const values = {};
    const damp = {};
    const ctx = this;
    const epsilon = 0.01;

    this.lazy = new Proxy({}, {
      get(target, key) {
        if (key === '_update') {
          return () => {
            keys.forEach((k) => {
              if (values[k] === target[k]) {
                return;
              } else if (Math.abs(values[k] - target[k]) < epsilon) {
                values[k] = target[k];
              } else {
                values[k] = ctx.lerp(values[k], target[k], damp[k] || 0.5);
              }
            });
          }
        }
        if (key === 'damping') {
          return (damping) => { Object.assign(damp, damping) }
        }
        if (key === 'hardSet') {
          return (k, v) => {
            target[k] = v;
            values[k] = v;
          }
        }
        return values[key];
      },
      set(target, key, val) {
        target[key] = val;
        if (!values.hasOwnProperty(key)) {
          values[key] = val;
          keys.push(key);
        }
        return true;
      }
    });
  }

  p5.prototype._updateLazyValues = function() {
    this.lazy._update();
  }

  p5.prototype.registerMethod('beforeSetup', p5.prototype._createLazyValues);
  p5.prototype.registerMethod('post', p5.prototype._updateLazyValues);

})(window.p5); // assumes this is loaded in global mode
