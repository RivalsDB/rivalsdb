import { readdirSync, statSync, createReadStream, createWriteStream } from "fs";
import { createBrotliCompress, constants } from "zlib";

const ext = ".br";

const getFilesFromPaths = (paths) => {
  return paths
    .reduce((acc, path) => {
      if (statSync(path).isDirectory()) {
        const files = readdirSync(path).map(
          (filename) => `${path}/${filename}`
        );
        acc.push(...files);
        return acc;
      }
      acc.push(path);
      return acc;
    }, [])
    .filter((file) => !file.endsWith(ext) && !statSync(file).isDirectory());
};

const compressFile = (file) =>
  new Promise((resolve, reject) => {
    const input = createReadStream(file);
    const output = createWriteStream(`${file}${ext}`);
    const params = {
      [constants.BROTLI_PARAM_MODE]: constants.BROTLI_MODE_TEXT,
      [constants.BROTLI_PARAM_QUALITY]: constants.BROTLI_MAX_QUALITY,
    };
    const compress = createBrotliCompress({ params });

    input.pipe(compress).pipe(output);
    output.on("finish", () => resolve(`${file}${ext}`));
    output.on("error", reject);
  });

const sizeOf = (file) => {
  const b = statSync(file).size || 0;
  const e = Math.floor(Math.log(b) / Math.log(1024));
  return `${(b / Math.pow(1024, e)).toFixed(2)} ${" KMGTP".charAt(e)}B`;
};

if (process.argv.length <= 2) {
  console.warn("Usage: npm start path/to or path/to/file");
  process.exit(0);
}

const files = getFilesFromPaths(process.argv.splice(2));

Promise.all(files.map(compressFile))
  .then((compressedFiles) => {
    const logs = files.map((file, i) => {
      return `${file} (${sizeOf(file)}) => ${compressedFiles[i]} (${sizeOf(
        compressedFiles[i]
      )})`;
    });
    console.log(logs);
  })
  .catch(console.warn);
