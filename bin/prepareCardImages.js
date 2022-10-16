import fs from "fs/promises";
import path from "path";
import cp from "child_process";

const [, , targetRel] = process.argv;

const targetFolder = path.resolve(targetRel);

const files = await fs.readdir(targetFolder);
const sourceImgs = files.filter((img) => path.extname(img) === ".png");

cp.execSync(
  `mogrify -fuzz 10% -trim +repage ${path.join(targetFolder, "*.png")}`
);
cp.execSync(`mogrify -resize 500x698 ${path.join(targetFolder, "*.png")}`);
for (const srcFilename of sourceImgs) {
  const parts = path.parse(srcFilename);
  const destFilename = path.format({
    name: parts.name,
    ext: ".webp",
  });
  const src = path.join(targetFolder, srcFilename);
  const dest = path.join(targetFolder, destFilename);

  cp.execSync(`magick ${src} -define webp:lossless=false ${dest}`);
}
