const fs = require('fs');
const archiver = require('archiver');
const { version } = require('./package.json');

const folderPath = `${__dirname}/build`;
const zipFileName = 'wiki-game.zip';

const output = fs.createWriteStream(zipFileName);

const archive = archiver('zip', {
    zlib: { level: 9 }, // Compression level (0-9)
});

archive.on('warning', function (err) {
    if (err.code === 'ENOENT') {
        console.warn(err);
    } else {
        throw err;
    }
});

archive.on('error', function (err) {
    throw err;
});

archive.pipe(output);

archive.directory(folderPath, false);

archive.finalize();

console.log(`Zip file created: ${zipFileName}, version: ${version}`);