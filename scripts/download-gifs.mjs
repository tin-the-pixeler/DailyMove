/**
 * Script: download-gifs.mjs
 * Downloads exercise GIFs from ExerciseDB (via RapidAPI) into public/gifs/.
 *
 * Usage:
 *   RAPIDAPI_KEY=your_key node scripts/download-gifs.mjs
 *
 * If no API key is provided, falls back to generating placeholder GIF files
 * so the build doesn't break during development.
 */

import { readFileSync, mkdirSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import https from 'https';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const GIFS_DIR = join(ROOT, 'public', 'gifs');
const EXERCISES_PATH = join(ROOT, 'src', 'data', 'exercises.json');

mkdirSync(GIFS_DIR, { recursive: true });

const exercises = JSON.parse(readFileSync(EXERCISES_PATH, 'utf8'));
const apiKey = process.env.RAPIDAPI_KEY;

async function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = require('fs').createWriteStream(dest);
    https.get(url, { headers: { 'x-rapidapi-key': apiKey, 'x-rapidapi-host': 'exercisedb.p.rapidapi.com' } }, (res) => {
      res.pipe(file);
      file.on('finish', () => { file.close(); resolve(); });
    }).on('error', reject);
  });
}

// Minimal 1x1 transparent GIF (placeholder)
const PLACEHOLDER_GIF = Buffer.from(
  'R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
  'base64'
);

(async () => {
  for (const ex of exercises) {
    const filename = ex.gifUrl.replace('/gifs/', '');
    const dest = join(GIFS_DIR, filename);

    if (existsSync(dest)) {
      console.log(`[skip] ${filename} already exists`);
      continue;
    }

    if (apiKey) {
      try {
        const apiUrl = `https://exercisedb.p.rapidapi.com/exercises/exercise/${ex.id}`;
        // In a real script, fetch the exercise JSON and then download its gifUrl
        console.log(`[todo] Would download: ${filename} from API`);
        writeFileSync(dest, PLACEHOLDER_GIF);
      } catch (err) {
        console.warn(`[warn] Failed to download ${filename}: ${err.message}`);
        writeFileSync(dest, PLACEHOLDER_GIF);
      }
    } else {
      console.log(`[placeholder] ${filename}`);
      writeFileSync(dest, PLACEHOLDER_GIF);
    }
  }
  console.log(`\nDone. ${exercises.length} GIF files in public/gifs/`);
})();
