#!/usr/bin/env node
import fs from 'fs';
import path from 'path';


const input = process.argv[2];
if (!input) {
console.error('Usage: node write-files-from-gpt.js <json-file>');
process.exit(1);
}


const data = JSON.parse(fs.readFileSync(input, 'utf8'));
Object.entries(data.files).forEach(([filePath, content]) => {
const fullPath = path.join(process.cwd(), filePath);
const dir = path.dirname(fullPath);
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });


if (fs.existsSync(fullPath)) {
fs.copyFileSync(fullPath, `${fullPath}.bak`);
}
fs.writeFileSync(fullPath, content);
console.log('✅ Wrote', filePath);
});
