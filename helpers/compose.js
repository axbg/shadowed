const fs = require('fs')
const path = require('path')

const picturesPath = path.join(__dirname, "..", "public", "pictures", "full");
const outputPath = path.join(__dirname, "..", "assets", "pictures.json");

fs.readdir(picturesPath, (err, files) => {
    const sortedPictures = files
        .filter(el => Number.isInteger(Number.parseInt(el.split(".")[0])))
        .sort((a, b) => {
            const aNum = a.split(".")[0];
            const bNum = b.split(".")[0];
            return aNum - bNum;
        }).map(el => el);

    fs.writeFileSync(outputPath, JSON.stringify(sortedPictures));

    console.log("helpers/compose.js: generated the dynamic list of pictures in assets/pictures.json")
});