const JSZip = require('jszip');
const fs = require('fs');

const zip = new JSZip();

try {
    zip.file("PDFFile1.pdf", fs.readFileSync('sample.pdf'));
    zip.file("PDFFile2.pdf", fs.readFileSync('sample.pdf'));
    zip.file("PDFFile3.pdf", fs.readFileSync('sample.pdf'));

    zip.generateNodeStream({ type: 'nodebuffer', streamFiles: true })
        .pipe(fs.createWriteStream('sample.zip'))
        .on('finish', function () {
            console.log("sample.zip written.");
        });

} catch (err) {
    console.error(err)
}

// delete the sample.zip file
setTimeout(() => {
    fs.unlinkSync('sample.zip');
}, 5000);