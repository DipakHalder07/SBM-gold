const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '..', 'out');

if (!fs.existsSync(outDir)) {
  console.error('Error: out directory does not exist.');
  process.exit(1);
}

// 1. Walk through out/ and for every .html file (except index.html and 404.html),
// ensure both <name>.html and <name>/index.html exist.
function syncHtmlFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== '_next') {
        syncHtmlFiles(fullPath);
      }
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      const baseName = entry.name.slice(0, -5);
      if (baseName === 'index' || baseName === '404') {
        continue;
      }

      // Check corresponding directory index.html
      const subDir = path.join(dir, baseName);
      const subIndex = path.join(subDir, 'index.html');

      if (!fs.existsSync(subDir)) {
        fs.mkdirSync(subDir, { recursive: true });
      }
      if (!fs.existsSync(subIndex)) {
        fs.copyFileSync(fullPath, subIndex);
        console.log(`Created dual index: ${path.relative(outDir, subIndex)}`);
      }
    }
  }
}

syncHtmlFiles(outDir);

// 2. Also ensure if any dir/index.html exists, the dir.html also exists
function syncDirToHtml(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.isDirectory() && entry.name !== '_next') {
      const subDir = path.join(dir, entry.name);
      const indexFile = path.join(subDir, 'index.html');
      const flatHtml = path.join(dir, `${entry.name}.html`);
      if (fs.existsSync(indexFile) && !fs.existsSync(flatHtml)) {
        fs.copyFileSync(indexFile, flatHtml);
        console.log(`Created dual flat: ${path.relative(outDir, flatHtml)}`);
      }
      syncDirToHtml(subDir);
    }
  }
}

syncDirToHtml(outDir);

// 3. Ensure .htaccess is in out
const htaccessPublic = path.join(__dirname, '..', 'public', '.htaccess');
const htaccessOut = path.join(outDir, '.htaccess');
if (fs.existsSync(htaccessPublic)) {
  fs.copyFileSync(htaccessPublic, htaccessOut);
  console.log('Ensured .htaccess in out/');
}

console.log('Dual-format HTML sync complete. Every page is accessible both with and without trailing slash!');

