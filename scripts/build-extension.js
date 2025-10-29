import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const publicDir = path.join(rootDir, 'public');

// Copy manifest.json
fs.copyFileSync(
  path.join(publicDir, 'manifest.json'),
  path.join(distDir, 'manifest.json')
);

// Copy sidebar-injector.js
fs.copyFileSync(
  path.join(publicDir, 'sidebar-injector.js'),
  path.join(distDir, 'sidebar-injector.js')
);

// Copy background.js if it exists
const backgroundPath = path.join(publicDir, 'background.js');
if (fs.existsSync(backgroundPath)) {
  fs.copyFileSync(backgroundPath, path.join(distDir, 'background.js'));
}

// Copy icons
const icons = ['icon16.png', 'icon48.png', 'icon128.png'];
icons.forEach(icon => {
  const iconPath = path.join(publicDir, icon);
  if (fs.existsSync(iconPath)) {
    fs.copyFileSync(iconPath, path.join(distDir, icon));
  }
});

console.log('Chrome extension files copied successfully!');
