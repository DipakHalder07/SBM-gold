/* eslint-disable */
// SBM GOLD pipe-around-the-Earth animation.
// Draws a rotating Earth (WebGL, with a 2D-canvas fallback) and an HDPE pipe
// growing around the equator. Used by components/sections/PipeEarth.tsx.
// initPipeEarth(sectionElement) starts it and returns a function that stops it.

export function initPipeEarth(root) {
  /* ---------- Settings: change these to match your business ---------- */
  var CFG = {
    percent: 76,                 // how much of Earth's circumference your pipe covers
    circumferenceKm: 40075,      // Earth's equatorial circumference
    growMs: 8000,                // how long the pipe takes to wrap (ms)
    spinSeconds: 60,             // one Earth rotation (seconds)
    tiltDeg: 23.5,               // Earth's axial tilt
    viewElevDeg: 22,             // camera looks slightly down on the north
    pipeRadius: 0.0715,          // pipe thickness, as a fraction of Earth's radius
    pipeColor: [24, 27, 31],     // HDPE black
    stripeColor: [30, 139, 255], // blue water stripes (use [255, 138, 0] for gas pipe)
    jointEvery: 24,              // degrees between butt-fusion weld beads
    printText: 'SBM GOLD',       // brand printed along the pipe
    printColor: '#ffffff',
    clouds: 0.65,                // cloud strength 0..1
    landUrl: 'https://cdn.jsdelivr.net/npm/world-atlas@2.0.2/land-110m.json'
  };
  /* -------------------------------------------------------------------- */

  var destroyed = false;
  var q = function (s) { return root.querySelector(s); };
  var qa = function (s) { return root.querySelectorAll(s); };
  var canvas = q('.pe-canvas'), ctx = canvas.getContext('2d');
  var box = q('.pe-globe');
  var headTag = q('.pe-head');
  var barFill = q('.pe-bar-fill');
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  var TAU = Math.PI * 2, DEG = Math.PI / 180;
  var totalKm = Math.round(CFG.circumferenceKm * CFG.percent / 100);
  var fmt = function (n) { return Math.round(n).toLocaleString('en-IN'); };
  var setAll = function (sel, txt) { qa(sel).forEach(function (el) { el.textContent = txt; }); };
  setAll('[data-pe-total]', fmt(totalKm) + ' km');
  setAll('[data-pe-circ]', fmt(CFG.circumferenceKm) + ' km');
  setAll('[data-pe-left]', fmt(CFG.circumferenceKm - totalKm) + ' km');

  function clamp01(x) { return x < 0 ? 0 : x > 1 ? 1 : x; }
  function sstep(a, b, x) { var t = clamp01((x - a) / (b - a)); return t * t * (3 - 2 * t); }
  function norm(v) { var l = Math.hypot(v[0], v[1], v[2]); return [v[0] / l, v[1] / l, v[2] / l]; }
  function wrapPi(a) { a = (a + Math.PI) % TAU; if (a < 0) a += TAU; return a - Math.PI; }

  /* ---------- view rotation (Earth frame <-> screen frame, y up, z toward viewer) ---------- */
  var tA = -CFG.tiltDeg * DEG, eA = CFG.viewElevDeg * DEG;
  var ct = Math.cos(tA), st = Math.sin(tA), ce = Math.cos(eA), se = Math.sin(eA);
  function toView(x, y, z) {
    var y1 = y * ce - z * se, z1 = y * se + z * ce;
    return [x * ct - y1 * st, x * st + y1 * ct, z1];
  }
  function toEarth(x, y, z) {
    var x1 = x * ct + y * st, y1 = -x * st + y * ct;
    return [x1, y1 * ce + z * se, -y1 * se + z * ce];
  }
  var VY = toView(0, 1, 0);                 // Earth's axis in view space
  var LIGHT = norm([-0.55, 0.5, 0.68]);     // sun direction
  var HALF = norm([LIGHT[0], LIGHT[1], LIGHT[2] + 1]);

  /* ---------- noise ---------- */
  function hash3(x, y, z) { var n = Math.sin(x * 127.1 + y * 311.7 + z * 74.7) * 43758.5453; return n - Math.floor(n); }
  function noise3(x, y, z) {
    var xi = Math.floor(x), yi = Math.floor(y), zi = Math.floor(z);
    var xf = x - xi, yf = y - yi, zf = z - zi;
    xf = xf * xf * (3 - 2 * xf); yf = yf * yf * (3 - 2 * yf); zf = zf * zf * (3 - 2 * zf);
    var L = function (a, b, t) { return a + (b - a) * t; };
    return L(L(L(hash3(xi, yi, zi), hash3(xi + 1, yi, zi), xf), L(hash3(xi, yi + 1, zi), hash3(xi + 1, yi + 1, zi), xf), yf),
      L(L(hash3(xi, yi, zi + 1), hash3(xi + 1, yi, zi + 1), xf), L(hash3(xi, yi + 1, zi + 1), hash3(xi + 1, yi + 1, zi + 1), xf), yf), zf);
  }
  function fbm3(x, y, z, oct) {
    var v = 0, a = 0.5, f = 1, s = 0;
    for (var o = 0; o < oct; o++) { v += a * noise3(x * f, y * f, z * f); s += a; a *= 0.5; f *= 2.03; }
    return v / s;
  }

  /* ---------- land mask (equirectangular) ---------- */
  var TW = 1024, TH = 512;

  function topoToMask(topo) {
    var c = document.createElement('canvas'); c.width = TW; c.height = TH;
    var g = c.getContext('2d');
    var tf = topo.transform;
    var arcs = topo.arcs.map(function (arc) {
      var x = 0, y = 0;
      return arc.map(function (p) {
        if (!tf) return p;
        x += p[0]; y += p[1];
        return [x * tf.scale[0] + tf.translate[0], y * tf.scale[1] + tf.translate[1]];
      });
    });
    var X = function (lon) { return (lon + 180) / 360 * TW; };
    var Y = function (lat) { return (90 - lat) / 180 * TH; };
    g.beginPath();
    function ring(r) {
      var pts = [];
      r.forEach(function (ai) {
        var a = ai >= 0 ? arcs[ai] : arcs[~ai].slice().reverse();
        for (var k = pts.length ? 1 : 0; k < a.length; k++) {
          var lon = a[k][0];
          if (pts.length) {
            var pl = pts[pts.length - 1][0];
            while (lon - pl > 180) lon -= 360;
            while (lon - pl < -180) lon += 360;
          }
          pts.push([lon, a[k][1]]);
        }
      });
      if (pts.length < 3) return;
      var first = pts[0], lastP = pts[pts.length - 1];
      if (Math.abs(lastP[0] - first[0]) > 180) { // ring goes round a pole (Antarctica)
        var pole = first[1] < 0 ? -90 : 90;
        pts.push([lastP[0], pole], [first[0], pole]);
      }
      [-360, 0, 360].forEach(function (off) {
        pts.forEach(function (p, i) {
          if (!i) g.moveTo(X(p[0] + off), Y(p[1])); else g.lineTo(X(p[0] + off), Y(p[1]));
        });
        g.closePath();
      });
    }
    function geom(o) {
      if (o.type === 'Polygon') o.arcs.forEach(ring);
      else if (o.type === 'MultiPolygon') o.arcs.forEach(function (poly) { poly.forEach(ring); });
      else if (o.type === 'GeometryCollection') o.geometries.forEach(geom);
    }
    geom(topo.objects.land);
    g.fillStyle = '#fff';
    g.fill('evenodd');
    var d = g.getImageData(0, 0, TW, TH).data, m = new Uint8Array(TW * TH);
    for (var i = 0; i < m.length; i++) m[i] = d[i * 4 + 3];
    return m;
  }

  function proceduralMask() { // offline fallback: made-up continents
    var m = new Uint8Array(TW * TH);
    for (var j = 0; j < TH; j++) {
      var lat = (0.5 - (j + 0.5) / TH) * Math.PI, cl = Math.cos(lat), sl = Math.sin(lat);
      for (var i = 0; i < TW; i++) {
        var lon = ((i + 0.5) / TW) * TAU - Math.PI;
        var v = fbm3(cl * Math.sin(lon) * 1.7 + 5, sl * 1.7 + 5, cl * Math.cos(lon) * 1.7 + 5, 5);
        m[j * TW + i] = clamp01((v - 0.52) * 14) * 255;
      }
    }
    return m;
  }

  /* ---------- colour texture: biomes, ice, shallow coastal water ---------- */
  function blurH(src, w, h, r) {
    var out = new Float32Array(src.length), n = 2 * r + 1;
    for (var y = 0; y < h; y++) {
      var o = y * w, acc = 0;
      for (var x = -r; x <= r; x++) acc += src[o + ((x + w) % w)];
      for (x = 0; x < w; x++) {
        out[o + x] = acc / n;
        acc += src[o + ((x + r + 1) % w)] - src[o + ((x - r + w) % w)];
      }
    }
    return out;
  }
  function blurV(src, w, h, r) {
    var out = new Float32Array(src.length), n = 2 * r + 1;
    for (var x = 0; x < w; x++) {
      var acc = 0;
      for (var y = -r; y <= r; y++) acc += src[Math.min(h - 1, Math.max(0, y)) * w + x];
      for (y = 0; y < h; y++) {
        out[y * w + x] = acc / n;
        acc += src[Math.min(h - 1, y + r + 1) * w + x] - src[Math.max(0, y - r) * w + x];
      }
    }
    return out;
  }
  var BIOME = [
    [0, [34, 100, 44]], [12, [52, 116, 50]], [19, [132, 134, 80]], [25, [182, 158, 106]],
    [31, [164, 148, 100]], [37, [98, 126, 64]], [46, [70, 118, 56]], [56, [50, 92, 54]],
    [63, [98, 102, 84]], [71, [236, 240, 244]]
  ];
  function biome(al) {
    if (al <= 0) return BIOME[0][1];
    for (var i = 1; i < BIOME.length; i++) {
      if (al < BIOME[i][0]) {
        var a = BIOME[i - 1], b = BIOME[i], t = (al - a[0]) / (b[0] - a[0]);
        return [a[1][0] + (b[1][0] - a[1][0]) * t, a[1][1] + (b[1][1] - a[1][1]) * t, a[1][2] + (b[1][2] - a[1][2]) * t];
      }
    }
    return BIOME[BIOME.length - 1][1];
  }
  function buildTexture(mask) {
    var f = new Float32Array(TW * TH);
    for (var i = 0; i < f.length; i++) f[i] = mask[i] / 255;
    var coast = blurV(blurH(f, TW, TH, 7), TW, TH, 7);
    coast = blurV(blurH(coast, TW, TH, 7), TW, TH, 7);
    var t = new Uint8ClampedArray(TW * TH * 4);
    for (var j = 0; j < TH; j++) {
      var lat = 90 - (j + 0.5) / TH * 180, la = lat * DEG, cl = Math.cos(la), sl = Math.sin(la);
      var seaIce = sstep(74, 84, lat);
      for (i = 0; i < TW; i++) {
        var k = j * TW + i, m = f[k], lon = (i + 0.5) / TW * 360 - 180, lo = lon * DEG;
        var lr = 0, lg = 0, lb = 0;
        if (m > 0.004) {
          var n = fbm3(cl * Math.sin(lo) * 3 + 11, sl * 3 + 11, cl * Math.cos(lo) * 3 + 11, 3);
          var col = biome(Math.abs(lat) + (n - 0.5) * 16), br = 0.86 + (n - 0.5) * 0.5;
          lr = col[0] * br; lg = col[1] * br; lb = col[2] * br;
          var greenland = lat > 59.5 && lon > -74 && lon < -11 && !(lat < 67 && lon > -25);
          if (lat < -62 || greenland) { lr = 236; lg = 240; lb = 245; }
        }
        var sh = sstep(0, 0.45, coast[k]);
        var or = 10 + 18 * sh, og = 46 + 72 * sh, ob = 118 + 64 * sh;
        or += (226 - or) * seaIce; og += (233 - og) * seaIce; ob += (241 - ob) * seaIce;
        var o = k * 4;
        t[o] = or + (lr - or) * m; t[o + 1] = og + (lg - og) * m; t[o + 2] = ob + (lb - ob) * m;
        t[o + 3] = (1 - m) * (1 - seaIce) * 255; // "wetness" for sun glint
      }
    }
    return t;
  }

  var CW = 1024, CHT = 512;
  function buildClouds(done) { // built a few rows at a time so the animation never stutters
    var a = new Uint8Array(CW * CHT), j = 0;
    (function step() {
      for (var end = Math.min(CHT, j + 64); j < end; j++) {
        var lat = (0.5 - (j + 0.5) / CHT) * Math.PI, cl = Math.cos(lat), sl = Math.sin(lat);
        for (var i = 0; i < CW; i++) {
          var lon = ((i + 0.5) / CW) * TAU - Math.PI;
          var v = fbm3(cl * Math.sin(lon) * 2.4 + 3, sl * 5 + 3, cl * Math.cos(lon) * 2.4 + 3, 6);
          a[j * CW + i] = sstep(0.54, 0.76, v) * 255;
        }
      }
      if (destroyed) return;
      if (j < CHT) setTimeout(step, 0); else done(a);
    })();
  }

  /* ---------- globe precompute ---------- */
  var tex = null, clouds = null, quality = 1; // quality drops automatically on slow devices
  var N = 0, R = 0, C = 0, G = 0, gx = 0, P = null, img = null, PR = 0;
  var gcan = document.createElement('canvas'), gctx = gcan.getContext('2d');

  /* ---------- GPU (WebGL) Earth: fast and smooth; falls back to CPU if unavailable ---------- */
  var glcan = document.createElement('canvas'), gl = null, glU = {}, glTex = null, glCloud = null;
  var FS = [
    '#ifdef GL_FRAGMENT_PRECISION_HIGH', 'precision highp float;', '#else', 'precision mediump float;', '#endif',
    'uniform mat3 uM; uniform vec3 uL; uniform vec3 uH; uniform vec2 uCenter;',
    'uniform float uR; uniform float uRot; uniform float uCRot; uniform float uCS;',
    'uniform sampler2D uTex; uniform sampler2D uCloud;',
    'const float PI = 3.14159265;',
    'void main() {',
    '  vec2 p = (gl_FragCoord.xy - uCenter) / uR; float d2 = dot(p, p); float d = sqrt(d2);',
    '  float a = clamp((1.0 - d) * uR + 0.5, 0.0, 1.0);',
    '  if (a <= 0.0) { gl_FragColor = vec4(0.0); return; }',
    '  vec3 n = vec3(p, sqrt(max(0.0, 1.0 - d2)));',
    '  vec3 e = uM * n;',
    '  float v = 0.5 - asin(clamp(e.y, -1.0, 1.0)) / PI;',
    '  float ang = atan(e.x, e.z);',
    '  vec4 t = texture2D(uTex, vec2(fract((ang - uRot + PI) / (2.0 * PI)), v));',
    '  float df = max(0.0, (dot(n, uL) + 0.08) / 1.08);',
    '  float dh = max(0.0, dot(n, uH));',
    '  float sp = (pow(dh, 60.0) * 0.9 + pow(dh, 12.0) * 0.12) * t.a * 0.08;',
    '  vec3 col = t.rgb * (0.62 + 0.45 * df) + vec3(sp, sp, sp * 0.95);',
    '  float ca = texture2D(uCloud, vec2(fract((ang - uCRot + PI) / (2.0 * PI)), v)).r * uCS;',
    '  float cl = (250.0 / 255.0) * (0.75 + 0.25 * df);',
    '  col = mix(col, vec3(cl, cl, cl + 4.0 / 255.0), ca);',
    '  float gr = (col.r + col.g + col.b) / 3.0; col += (gr - col) * 0.12;',
    '  col += pow(1.0 - n.z, 2.6) * 0.35 * vec3(90.0, 140.0, 200.0) / 255.0;',
    '  col = min(col, vec3(1.0));',
    '  gl_FragColor = vec4(col * a, a);',
    '}'
  ].join('\n');

  function initGL() {
    try {
      gl = glcan.getContext('webgl', { premultipliedAlpha: true, preserveDrawingBuffer: true, antialias: false });
      if (!gl) return;
      var mk = function (type, src) {
        var sh = gl.createShader(type); gl.shaderSource(sh, src); gl.compileShader(sh);
        if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(sh));
        return sh;
      };
      var prog = gl.createProgram();
      gl.attachShader(prog, mk(gl.VERTEX_SHADER, 'attribute vec2 a; void main() { gl_Position = vec4(a, 0.0, 1.0); }'));
      gl.attachShader(prog, mk(gl.FRAGMENT_SHADER, FS));
      gl.linkProgram(prog);
      if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error('link');
      gl.useProgram(prog);
      gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
      var loc = gl.getAttribLocation(prog, 'a');
      gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
      ['uM', 'uL', 'uH', 'uCenter', 'uR', 'uRot', 'uCRot', 'uCS', 'uTex', 'uCloud'].forEach(function (k) { glU[k] = gl.getUniformLocation(prog, k); });
      var mkTex = function () {
        var t = gl.createTexture(); gl.bindTexture(gl.TEXTURE_2D, t);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        return t;
      };
      gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);
      glTex = mkTex();
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([12, 56, 136, 255]));
      glCloud = mkTex();
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.LUMINANCE, 1, 1, 0, gl.LUMINANCE, gl.UNSIGNED_BYTE, new Uint8Array([0]));
      gl.uniformMatrix3fv(glU.uM, false, new Float32Array([].concat(toEarth(1, 0, 0), toEarth(0, 1, 0), toEarth(0, 0, 1))));
      gl.uniform3fv(glU.uL, LIGHT); gl.uniform3fv(glU.uH, HALF);
      gl.uniform1i(glU.uTex, 0); gl.uniform1i(glU.uCloud, 1);
    } catch (err) { gl = null; }
  }
  function glUpload(which, data) {
    if (!gl) return;
    gl.bindTexture(gl.TEXTURE_2D, which === 'earth' ? glTex : glCloud);
    if (which === 'earth') gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, TW, TH, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array(data.buffer));
    else gl.texImage2D(gl.TEXTURE_2D, 0, gl.LUMINANCE, CW, CHT, 0, gl.LUMINANCE, gl.UNSIGNED_BYTE, data);
  }
  function glDraw(rot) {
    var cx = C - gx;
    gl.uniform2f(glU.uCenter, cx, G - cx);
    gl.uniform1f(glU.uR, R);
    gl.uniform1f(glU.uRot, rot);
    gl.uniform1f(glU.uCRot, rot * 1.05 + 1.3);
    gl.uniform1f(glU.uCS, clouds ? CFG.clouds : 0);
    gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, glTex);
    gl.activeTexture(gl.TEXTURE1); gl.bindTexture(gl.TEXTURE_2D, glCloud);
    gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }

  function setup() {
    var css = box.clientWidth;
    if (!css) return false;
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    N = Math.min(gl ? 1200 : 900, Math.round(css * dpr * quality));
    canvas.width = canvas.height = N;
    R = N * 0.37; C = N / 2; PR = CFG.pipeRadius * R;
    G = Math.ceil(R * 2) + 4; gx = Math.round(C - G / 2);
    if (gl) { // GPU path needs no per-pixel tables
      glcan.width = glcan.height = G; gl.viewport(0, 0, G, G); P = { gpu: true };
      return true;
    }
    gcan.width = gcan.height = G;
    img = gctx.createImageData(G, G);
    var cx = C - gx;
    var idx = [], ang = [], row = [], crow = [], diff = [], spec = [], rim = [], alpha = [];
    for (var y = 0; y < G; y++) {
      for (var x = 0; x < G; x++) {
        var px = (x + 0.5 - cx) / R, py = (y + 0.5 - cx) / R, d2 = px * px + py * py, d = Math.sqrt(d2);
        var a = clamp01((1 - d) * R + 0.5);
        if (a <= 0) continue;
        var nx = px, ny = -py, nz = Math.sqrt(Math.max(0, 1 - d2));
        var e = toEarth(nx, ny, nz);
        var lat = Math.asin(Math.max(-1, Math.min(1, e[1])));
        var dl = nx * LIGHT[0] + ny * LIGHT[1] + nz * LIGHT[2];
        var dh = Math.max(0, nx * HALF[0] + ny * HALF[1] + nz * HALF[2]);
        idx.push(y * G + x);
        ang.push(Math.atan2(e[0], e[2]));
        row.push(Math.min(TH - 1, Math.max(0, Math.floor((0.5 - lat / Math.PI) * TH))));
        crow.push(Math.min(CHT - 1, Math.max(0, Math.floor((0.5 - lat / Math.PI) * CHT))));
        diff.push(Math.max(0, (dl + 0.08) / 1.08));
        spec.push(Math.pow(dh, 60) * 0.9 + Math.pow(dh, 12) * 0.12);
        rim.push(Math.pow(1 - nz, 2.6));
        alpha.push(Math.round(a * 255));
      }
    }
    P = {
      idx: Uint32Array.from(idx), ang: Float32Array.from(ang), row: Uint16Array.from(row), crow: Uint16Array.from(crow),
      diff: Float32Array.from(diff), spec: Float32Array.from(spec), rim: Float32Array.from(rim), alpha: Uint8Array.from(alpha)
    };
    return true;
  }

  function drawGlobe(rot) {
    if (gl) { glDraw(rot); return; }
    var D = img.data, n = P.idx.length, cs = CFG.clouds, crot = rot * 1.05 + 1.3;
    for (var k = 0; k < n; k++) {
      var a = P.ang[k];
      var u = (a - rot + Math.PI) / TAU; u -= Math.floor(u);
      var ti = (P.row[k] * TW + (((u * TW) | 0) & (TW - 1))) * 4;
      var df = P.diff[k], lt = 0.62 + 0.45 * df;          // soft, even light: no dark side
      var sp = P.spec[k] * tex[ti + 3] * 0.08;           // almost no sun glare
      var r = tex[ti] * lt + sp, g = tex[ti + 1] * lt + sp, b = tex[ti + 2] * lt + sp * 0.95;
      if (clouds) {
        var cu = (a - crot + Math.PI) / TAU; cu -= Math.floor(cu);
        var ca = clouds[P.crow[k] * CW + (((cu * CW) | 0) & (CW - 1))] / 255 * cs;
        var cl = 250 * (0.75 + 0.25 * df);
        r += (cl - r) * ca; g += (cl - g) * ca; b += (cl + 4 - b) * ca;
      }
      var gr = (r + g + b) / 3;                          // slightly muted so the pipe stands out
      r += (gr - r) * 0.12; g += (gr - g) * 0.12; b += (gr - b) * 0.12;
      var rm = P.rim[k] * 0.35;
      var o = P.idx[k] * 4;
      D[o] = r + rm * 90;
      D[o + 1] = g + rm * 140;
      D[o + 2] = b + rm * 200;
      D[o + 3] = P.alpha[k];
    }
    gctx.putImageData(img, 0, 0);
  }

  /* ---------- the pipe: a lit 3D tube resting on the equator ---------- */
  function frameAt(lam, rot) {
    var a = lam + rot, sa = Math.sin(a), ca = Math.cos(a), rc = 1 + CFG.pipeRadius;
    var vr = toView(sa, 0, ca), vt = toView(ca, 0, -sa);
    return { x: C + vr[0] * rc * R, y: C - vr[1] * rc * R, z: vr[2], vr: vr, vt: vt, p0: Math.atan2(VY[2], vr[2]) };
  }
  // point on the tube surface at angle phi around the pipe (0 = facing away from Earth, +90deg = north)
  function surf(f, phi, sc) {
    var c = Math.cos(phi), s = Math.sin(phi), k = PR * (sc || 1);
    var nx = c * f.vr[0] + s * VY[0], ny = c * f.vr[1] + s * VY[1], nz = c * f.vr[2] + s * VY[2];
    return [f.x + nx * k, f.y - ny * k, nx, ny, nz];
  }
  // Glossy black HDPE under studio light:
  //  - soft key light from the upper left that wraps around the tube
  //  - a long, sharp specular streak plus a wider satin sheen
  //  - the top reflects the bright sky, the underside picks up blue light bounced off the ocean
  //  - a cool rim light from behind on the right edge
  // rad = how much the surface faces away from the Earth (1) or toward it (-1)
  var RIM = norm([0.8, 0.3, -0.4]);
  // hl = extra highlight (0..1) from the long strip light that runs along the pipe
  function shade(nx, ny, nz, base, gloss, rad, hl) {
    var nl = nx * LIGHT[0] + ny * LIGHT[1] + nz * LIGHT[2];
    var wrap = clamp01((nl + 0.3) / 1.3);
    var h = Math.max(0, nx * HALF[0] + ny * HALF[1] + nz * HALF[2]);
    var h2 = h * h, h4 = h2 * h2, h8 = h4 * h4, h16 = h8 * h8, h32 = h16 * h16;
    var sp = (h32 * h16 * 120 + h16 * h4 * 30 + h4 * 8 + (hl || 0) * 255) * gloss;
    var fr = 1 - Math.max(0, nz); fr = fr * fr * fr * 0.5 * gloss;
    var sky = clamp01(ny * 0.6 + 0.5);
    var bounce = Math.max(0, -(rad || 0)) * 0.55;
    var rm = Math.max(0, nx * RIM[0] + ny * RIM[1] + nz * RIM[2]); rm = rm * rm * rm * 70 * gloss;
    var l = 0.28 + 1.2 * wrap;
    var r = base[0] * l + sp + (40 + 205 * sky) * fr + 14 * bounce + rm * 0.85;
    var g = base[1] * l + sp + (68 + 180 * sky) * fr + 36 * bounce + rm * 0.93;
    var b = base[2] * l + sp + (115 + 140 * sky) * fr + 72 * bounce + rm;
    return 'rgb(' + (r > 255 ? 255 : r | 0) + ',' + (g > 255 ? 255 : g | 0) + ',' + (b > 255 ? 255 : b | 0) + ')';
  }
  // colour of the tube surface at angle phi around frame f
  function shadeAt(f, phi, base, gloss, hl) {
    var p = surf(f, phi);
    return shade(p[2], p[3], p[4], base, gloss, Math.cos(phi), hl);
  }
  // Where the strip-light reflection sits across the tube for frame f (angle from f.p0)
  // and how strong it is there. A long light makes a continuous streak on a long tube,
  // which is what makes a glossy pipe read as round and real.
  function streakOf(f) {
    var a = f.vr[0] * HALF[0] + f.vr[1] * HALF[1] + f.vr[2] * HALF[2];
    var b = VY[0] * HALF[0] + VY[1] * HALF[1] + VY[2] * HALF[2];
    return { th: wrapPi(Math.atan2(b, a) - f.p0), k: 0.55 + 0.45 * clamp01(Math.hypot(a, b)) };
  }
  function streakAt(st, th) {
    var c = Math.max(0, Math.cos(th - st.th)), c2 = c * c, c4 = c2 * c2, c8 = c4 * c4, c16 = c8 * c8;
    var c64 = c16 * c16; c64 *= c64;
    return (c64 * c64 * 0.85 + c8 * 0.1) * st.k; // sharp line + soft glow around it
  }
  function buildFrames(l0, l1, rot, stepDeg) {
    var n = Math.max(1, Math.ceil((l1 - l0) / (stepDeg * DEG))), out = [];
    for (var i = 0; i <= n; i++) out.push(frameAt(l0 + (l1 - l0) * i / n, rot));
    return out;
  }
  function splitRuns(F) {
    var runs = { back: [], front: [] }, run = null, side = null, prev = null;
    F.forEach(function (f) {
      var s = f.z >= 0;
      if (s !== side) { run = prev ? [prev] : []; (s ? runs.front : runs.back).push(run); side = s; }
      run.push(f); prev = f;
    });
    return runs;
  }

  var CHUNK = 4;
  // sample points across the tube (sine-spaced = even across the screen width)
  var XS = [];
  for (var sk = 0; sk <= 12; sk++) XS.push(-1 + sk / 6);
  var STRIPES = [45, 135, 225, 315].map(function (d) { return d * DEG; });

  function strokeAlong(run, i0, i1, phiOf) {
    ctx.beginPath();
    for (var m = i0; m <= i1; m++) {
      var p = surf(run[m], phiOf(run[m]));
      if (m === i0) ctx.moveTo(p[0], p[1]); else ctx.lineTo(p[0], p[1]);
    }
    ctx.stroke();
  }

  function drawTube(run) {
    if (run.length < 2) return;
    var n = run.length - 1;
    ctx.lineJoin = 'round'; ctx.lineCap = 'butt';
    // dark core under the shading so no hairline gaps show between pieces
    ctx.beginPath();
    run.forEach(function (f, i) { if (i) ctx.lineTo(f.x, f.y); else ctx.moveTo(f.x, f.y); });
    ctx.lineWidth = PR * 2; ctx.strokeStyle = 'rgb(8,9,11)'; ctx.stroke();

    // each short piece is filled with a gradient running across the tube, from one
    // silhouette edge to the other, so the shading is smooth with no strand seams
    ctx.lineWidth = PR * 2;
    for (var i = 0; i < n; i += CHUNK) {
      var i1 = Math.min(n, i + CHUNK + 1), mid = run[Math.min(n, i + 1)];
      var A = surf(mid, mid.p0 - Math.PI / 2), B = surf(mid, mid.p0 + Math.PI / 2);
      var gr = ctx.createLinearGradient(A[0], A[1], B[0], B[1]);
      // the highlight is narrow, so add extra samples right around it
      var st = streakOf(mid);
      var ths = XS.map(function (x) { return Math.asin(x * 0.999); });
      if (Math.abs(st.th) < 1.5) [-0.2, -0.1, -0.04, 0, 0.04, 0.1, 0.2].forEach(function (d) {
        var t = st.th + d; if (Math.abs(t) < 1.55) ths.push(t);
      });
      ths.sort(function (a, b) { return a - b; });
      for (var k = 0; k < ths.length; k++) {
        gr.addColorStop((1 + Math.sin(ths[k])) / 2,
          shadeAt(mid, mid.p0 + ths[k], CFG.pipeColor, 1, streakAt(st, ths[k])));
      }
      ctx.strokeStyle = gr;
      ctx.beginPath();
      for (var m = i; m <= i1; m++) { if (m === i) ctx.moveTo(run[m].x, run[m].y); else ctx.lineTo(run[m].x, run[m].y); }
      ctx.stroke();
    }
    STRIPES.forEach(function (ph) {
      var phiOf = function () { return ph; };
      for (var i = 0; i < n; i += CHUNK) {
        var mid = run[Math.min(n, i + 1)], th = wrapPi(ph - mid.p0);
        if (Math.abs(th) > 1.45) continue;
        ctx.strokeStyle = shadeAt(mid, ph, CFG.stripeColor, 0.6, streakAt(streakOf(mid), th));
        ctx.lineWidth = PR * 0.22 * Math.cos(th) + 0.6;
        strokeAlong(run, i, Math.min(n, i + CHUNK + 1), phiOf);
      }
    });
  }

  function drawBead(f) { // raised butt-fusion weld ring
    var steps = 14, a0 = f.p0 - Math.PI / 2 * 0.97, a1 = f.p0 + Math.PI / 2 * 0.97;
    ctx.lineCap = 'round'; ctx.lineWidth = PR * 0.32;
    for (var i = 0; i < steps; i++) {
      var pa = a0 + (a1 - a0) * i / steps, pb = a0 + (a1 - a0) * (i + 1) / steps;
      var A = surf(f, pa, 1.1), B = surf(f, pb, 1.1), M = surf(f, (pa + pb) / 2, 1.1);
      ctx.strokeStyle = shade(M[2], M[3], M[4], [36, 40, 45], 1.1, Math.cos((pa + pb) / 2));
      ctx.beginPath(); ctx.moveTo(A[0], A[1]); ctx.lineTo(B[0], B[1]); ctx.stroke();
    }
  }

  function ellipse(f, sc) {
    ctx.beginPath();
    for (var i = 0; i <= 32; i++) {
      var p = surf(f, i / 32 * TAU, sc);
      if (i) ctx.lineTo(p[0], p[1]); else ctx.moveTo(p[0], p[1]);
    }
    ctx.closePath();
  }
  function drawCap(f, dir) { // open pipe end, only when it faces the viewer
    var oz = f.vt[2] * dir;
    if (oz <= 0.03) { // facing away: tidy the end with a smooth back edge
      var c = surf(f, f.p0);
      ellipse(f, 1.02);
      ctx.fillStyle = shade(c[2] * 0.6, c[3] * 0.6, c[4], CFG.pipeColor, 0.6); ctx.fill();
      return;
    }
    ellipse(f, 1);
    ctx.fillStyle = shade(f.vt[0] * dir, f.vt[1] * dir, oz, [70, 75, 82], 0.5); ctx.fill();
    ellipse(f, 0.8);
    ctx.fillStyle = '#060708'; ctx.fill();
  }

  function drawShadow(runs) { // shadow of the pipe on the Earth (stacked strokes, no blur filter: cheap)
    var ox = -LIGHT[0] * PR, oy = LIGHT[1] * PR;
    ctx.save();
    ctx.beginPath(); ctx.arc(C, C, R, 0, TAU); ctx.clip();
    ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    // [width, opacity, offset]: wide and faint far from the pipe, dark right where it touches
    [[PR * 3.6, 0.05, 1.7], [PR * 3.0, 0.07, 1.4], [PR * 2.5, 0.09, 1.0], [PR * 2.15, 0.16, 0.45]].forEach(function (l) {
      ctx.lineWidth = l[0]; ctx.strokeStyle = 'rgba(0,8,24,' + l[1] + ')';
      var dx = ox * l[2], dy = oy * l[2];
      runs.forEach(function (run) {
        if (run.length < 2) return;
        ctx.beginPath();
        run.forEach(function (f, i) { if (i) ctx.lineTo(f.x + dx, f.y + dy); else ctx.moveTo(f.x + dx, f.y + dy); });
        ctx.stroke();
      });
    });
    ctx.restore();
  }

  // "SBM GOLD" printed along the pipe. It always sits on the side facing the viewer,
  // so the name stays readable on every visible piece of pipe.
  function drawPrint(l0, span, rot) {
    var fs = PR * 0.72, step = CFG.jointEvery * DEG;
    ctx.save();
    ctx.font = '800 ' + fs + 'px "Plus Jakarta Sans", Arial, sans-serif';
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = CFG.printColor;
    var tw = ctx.measureText(CFG.printText).width;
    var half = step / 2 - 2.5 * DEG; // room between two weld rings
    for (var m = l0 + step / 2; m < l0 + span - 3 * DEG; m += step) {
      var f = frameAt(m, rot);
      if (f.z <= 0) continue; // behind the Earth
      var a = frameAt(m - half, rot), b = frameAt(m + half, rot);
      var room = Math.hypot(b.x - a.x, b.y - a.y);
      var sx = Math.min(1, room / (tw * 1.08)); // squeeze instead of hiding when the pipe turns away
      var p = surf(f, f.p0 - 0.22), ang = Math.atan2(b.y - a.y, b.x - a.x);
      if (ang > Math.PI / 2) ang -= Math.PI; else if (ang < -Math.PI / 2) ang += Math.PI;
      ctx.setTransform(1, 0, 0, 1, p[0], p[1]);
      ctx.rotate(ang);
      ctx.scale(Math.max(0.3, sx), 0.95);
      ctx.globalAlpha = clamp01(f.z * 10) * 0.95;
      ctx.fillText(CFG.printText, 0, 0);
    }
    ctx.restore();
  }

  /* ---------- render ---------- */
  var rot = 0.6, progress = 0, lam0 = 0, growStart = null, growPending = false;
  var START_ANGLE = -70 * DEG;
  var shownPct = -1, shownKm = -1;

  function render() {
    if (!P || !tex) return;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, N, N);

    // soft shadow under the globe
    ctx.save();
    ctx.translate(C, C + R * 1.1); ctx.scale(1, 0.12);
    var fl = ctx.createRadialGradient(0, 0, 0, 0, 0, R * 0.85);
    fl.addColorStop(0, 'rgba(17,17,17,0.08)'); fl.addColorStop(1, 'rgba(17,17,17,0)');
    ctx.fillStyle = fl; ctx.beginPath(); ctx.arc(0, 0, R * 0.85, 0, TAU); ctx.fill();
    ctx.restore();

    // thin atmosphere glow
    var halo = ctx.createRadialGradient(C, C, R * 0.97, C, C, R * 1.16);
    halo.addColorStop(0, 'rgba(70,140,240,0.12)');
    halo.addColorStop(1, 'rgba(70,140,240,0)');
    ctx.fillStyle = halo; ctx.fillRect(0, 0, N, N);

    var span = progress * CFG.percent / 100 * TAU, runs = null, beads = [], fStart = null, fHead = null;
    if (span > 0.003) {
      var F = buildFrames(lam0, lam0 + span, rot, 1.2);
      runs = splitRuns(F); fStart = F[0]; fHead = F[F.length - 1];
      var step = CFG.jointEvery * DEG;
      for (var j = lam0 + step; j < lam0 + span - 0.5 * DEG; j += step) beads.push(frameAt(j, rot));
    }

    if (runs) { // parts of the pipe behind the Earth
      runs.back.forEach(drawTube);
      beads.forEach(function (b) { if (b.z < 0) drawBead(b); });
      if (fStart.z < 0) drawCap(fStart, -1);
      if (fHead.z < 0) drawCap(fHead, 1);
    }

    drawGlobe(rot);
    ctx.drawImage(gl ? glcan : gcan, gx, gx);

    var headVisible = false;
    if (runs) { // parts in front
      drawShadow(runs.front);
      runs.front.forEach(drawTube);
      beads.forEach(function (b) { if (b.z >= 0) drawBead(b); });
      if (fStart.z >= 0) drawCap(fStart, -1);
      if (fHead.z >= 0) drawCap(fHead, 1);
      drawPrint(lam0, span, rot); // name goes on last so nothing covers it

      var outside = Math.hypot(fHead.x - C, fHead.y - C) > R * 1.02;
      headVisible = fHead.z > -0.02 || outside;
      if (headVisible) {
        // the tag has no background, so it sits just outside the globe's edge
        // (on the light page) in line with the pipe's end, where it is always readable
        var dx = fHead.x - C, dy = fHead.y - C, dl = Math.hypot(dx, dy) || 1;
        var ux = dx / dl, uy = dy / dl, k = box.clientWidth / N;
        var hw = headTag.offsetWidth / 2, hh = headTag.offsetHeight / 2, bw = box.clientWidth;
        var dist = Math.max(dl, R + PR * 1.6) * k + Math.abs(ux) * hw + Math.abs(uy) * hh + 8;
        var tx = C * k + ux * dist, ty = C * k + uy * dist;
        // never let it run off the edge of the globe box
        tx = Math.max(hw + 2, Math.min(bw - hw - 2, tx));
        ty = Math.max(hh + 2, Math.min(bw - hh - 2, ty));
        headTag.style.transform = 'translate3d(' + tx.toFixed(2) + 'px,' + ty.toFixed(2) + 'px,0) translate(-50%,-50%)';
      }
    }
    headTag.style.opacity = headVisible ? '1' : '0';
  }

  function updateText() {
    var pct = Math.round(progress * CFG.percent), km = Math.round(progress * totalKm);
    if (pct !== shownPct) { shownPct = pct; setAll('[data-pe-pct]', pct + '%'); }
    if (km !== shownKm) {
      shownKm = km;
      setAll('[data-pe-km]', fmt(km) + ' km');
      headTag.textContent = fmt(km) + ' km';
    }
    if (barFill) barFill.style.width = (progress * CFG.percent) + '%';
  }

  var ease = function (t) { return -(Math.cos(Math.PI * t) - 1) / 2; }; // smooth start and finish
  var running = false, last = 0;

  function startGrow() {
    if (reduce) { progress = 1; lam0 = START_ANGLE - rot; updateText(); render(); return; }
    growPending = true;
  }

  function frame(t) {
    if (!running || destroyed) return;
    var dt = last ? Math.min(0.05, (t - last) / 1000) : 0; last = t;
    rot += dt * TAU / CFG.spinSeconds;
    if (growPending && tex) { growPending = false; growStart = t; lam0 = START_ANGLE - rot; }
    if (growStart !== null) progress = ease(Math.min(1, (t - growStart) / CFG.growMs));
    var t0 = performance.now();
    render(); updateText();
    tune(performance.now() - t0);
    requestAnimationFrame(frame);
  }
  // if frames take too long on this device, lower the globe's pixel count a little
  var costSum = 0, costN = 0;
  function tune(ms) {
    if (!tex) return;
    costSum += ms; costN++;
    if (costN < 40) return;
    var avg = costSum / costN; costSum = 0; costN = 0;
    if (avg > 14 && quality > 0.5) { quality = Math.max(0.5, quality * 0.8); setup(); }
  }

  function play() {
    if (running || reduce) return;
    running = true; last = 0; requestAnimationFrame(frame);
  }
  function pause() { running = false; }

  /* ---------- boot ---------- */
  if (!reduce) { progress = 0; updateText(); }
  initGL();
  setup();

  function onTexture(mask) {
    if (destroyed) return;
    tex = buildTexture(mask);
    glUpload('earth', tex);
    box.classList.add('is-ready');
    if (reduce && progress === 1) lam0 = START_ANGLE - rot;
    if (!running) render();
    buildClouds(function (a) { glUpload('clouds', a); clouds = a; if (!running) render(); });
  }
  fetch(CFG.landUrl)
    .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
    .then(topoToMask)
    .catch(function () { return proceduralMask(); })
    .then(onTexture);

  var started = false, io = null;
  if ('IntersectionObserver' in window) {
    io = new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting) {
        if (!started) { started = true; startGrow(); }
        play();
      } else pause();
    }, { threshold: 0.3 }).observe(box);
  } else { started = true; startGrow(); play(); }

  var replayBtn = q('.pe-replay');
  function onReplay() { started = true; startGrow(); play(); }
  replayBtn.addEventListener('click', onReplay);

  var rt;
  function onResize() {
    clearTimeout(rt);
    rt = setTimeout(function () { if (!destroyed) { setup(); if (!running) render(); } }, 120);
  }
  window.addEventListener('resize', onResize);

  return function destroy() {
    destroyed = true; running = false;
    clearTimeout(rt);
    if (io) io.disconnect();
    replayBtn.removeEventListener('click', onReplay);
    window.removeEventListener('resize', onResize);
    if (gl) { var lose = gl.getExtension('WEBGL_lose_context'); if (lose) lose.loseContext(); gl = null; }
  };
}
