// Background Web Worker for Diwali Sparkler Particle Calculations
self.onmessage = function(e) {
  let { u, s, l, n, inkWidth } = e.data;
  let c = 0;
  for (let t = 3; t < u.length; t += 4) {
    if (u[t] > 128) c++;
  }
  let h = Math.max(1.5, Math.sqrt(c / n)), f = [];
  for (let t = h / 2; t < l; t += h) {
    for (let e = h / 2; e < s; e += h) {
      let r = e + (Math.random() - 0.5) * h * 0.7;
      let n_pos = t + (Math.random() - 0.5) * h * 0.7;
      let i = Math.min(s - 1, Math.max(0, Math.round(r)));
      let idx = (Math.min(l - 1, Math.max(0, Math.round(n_pos))) * s + i) * 4 + 3;
      if (u[idx] > 128) {
        f.push([r - s / 2, n_pos - l / 2]);
      }
    }
  }
  self.postMessage({ pts: f, step: h, inkWidth });
};
