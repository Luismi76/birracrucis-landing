
const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = require('ffmpeg-static');
const path = require('path');
const fs = require('fs');

ffmpeg.setFfmpegPath(ffmpegPath);

const assetsDir = path.join(__dirname, '../assets');
const output = path.join(assetsDir, 'demo-movil.mp4');

// Images to stitch (in order)
const images = [
    'screenshot-lista.png',
    'screenshot-ruta.png',
    'screenshot-contador.png',
    'screenshot-bote.png'
];

console.log('🎬 Creating slideshow from screenshots...');

// Verify images exist
for (const img of images) {
    if (!fs.existsSync(path.join(assetsDir, img))) {
        console.error(`❌ Missing image: ${img}`);
        process.exit(1);
    }
}

// Create a complex filter to loop each image and concatenate
// We will create a simple concat input list for ffmpeg
const listPath = path.join(assetsDir, 'images.txt');
const fileContent = images.map(img => {
    // Duration 3 seconds each, using absolute paths to be safe
    // Windows paths in ffmpeg concat file need escaped backslashes or forward slashes
    const absPath = path.join(assetsDir, img).replace(/\\/g, '/');
    return `file '${absPath}'\nduration 3`;
}).join('\n');

// Add the last file again
const lastAbsPath = path.join(assetsDir, images[images.length - 1]).replace(/\\/g, '/');
const finalContent = fileContent + `\nfile '${lastAbsPath}'`;

fs.writeFileSync(listPath, finalContent);

ffmpeg()
    .input(listPath)
    .inputOptions(['-f concat', '-safe 0'])
    .videoFilters('scale=trunc(iw/2)*2:trunc(ih/2)*2') // Ensure even dimensions
    .outputOptions([
        '-c:v libx264',
        '-pix_fmt yuv420p', // Important for browser support
        '-r 30',
        '-movflags +faststart'
    ])
    .on('start', (cmd) => console.log('Spawned:', cmd))
    .on('error', (err, stdout, stderr) => {
        console.error('Error:', err.message);
        console.error('Stderr:', stderr);
    })
    .on('end', () => {
        console.log('✅ Slideshow created successfully!');
        fs.unlinkSync(listPath); // Cleanup
    })
    .save(output);
