/* Draws each post's hand-stitch (hitomezashi) pattern from the letters of its title.
   Vowels decide where the rows start, letter codes decide the columns, so every
   title gets its own pattern and it never changes. */
(function () {
  function stitch(text, cols, rows, s) {
    var t = String(text).toLowerCase().normalize('NFD').replace(/[^a-z]/g, '') || 'staystitch';
    var chars = t.split('');
    var rb = chars.map(function (c) { return 'aeiou'.indexOf(c) >= 0 ? 1 : 0; });
    var cb = chars.map(function (c) { return c.charCodeAt(0) % 2; });
    var d = '';
    for (var j = 1; j < rows; j++) {
      var sx = rb[j % rb.length] ? s : 0;
      for (var x = sx; x < cols * s; x += 2 * s) d += 'M' + x + ' ' + (j * s) + 'h' + s;
    }
    for (var i = 1; i < cols; i++) {
      var sy = cb[i % cb.length] ? s : 0;
      for (var y = sy; y < rows * s; y += 2 * s) d += 'M' + (i * s) + ' ' + y + 'v' + s;
    }
    return d;
  }
  document.querySelectorAll('svg[data-stitch]').forEach(function (svg) {
    var path = svg.querySelector('path');
    if (!path) return;
    path.setAttribute('d', stitch(svg.dataset.stitch, +svg.dataset.cols, +svg.dataset.rows, +svg.dataset.size));
  });
})();
