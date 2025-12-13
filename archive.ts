const fs = require('node:fs');
const archiver = require('archiver');

const folderPath = `${__dirname}/../build`;
const zipFileName = 'wiki-game.zip';

const output = fs.createWriteStream(zipFileName);

const archive = archiver('zip', {
    zlib: { level: 9 }, // Compression level (0-9)
});

archive.on('warning', (err: any) => {
    if (err.code === 'ENOENT') {
        console.warn(err);
    } else {
        throw err;
    }
});

archive.on('error', (err: any) => {
    throw err;
});

archive.pipe(output);

archive.directory(folderPath, false);

archive.finalize();

console.log(`Zip file created: ${zipFileName}`);
