import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import archiver from 'archiver';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const folderPath = `${__dirname}/../build`;
const zipFileName = 'wiki-game.zip';

const output = fs.createWriteStream(zipFileName);

const archive = archiver('zip', {
    zlib: { level: 9 }, // Compression level (0-9)
});

archive.on('warning', (err) => {
    if (err.code === 'ENOENT') {
        console.warn(err);
    } else {
        throw err;
    }
});

archive.on('error', (err) => {
    throw err;
});

archive.pipe(output);

archive.directory(folderPath, false);

archive.finalize();

console.log(`Zip file created: ${zipFileName}`);
