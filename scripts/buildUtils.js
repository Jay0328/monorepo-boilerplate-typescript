const path = require('path');
const fs = require('fs-extra');
const glob = require('glob');
const { rollup } = require('rollup');
const chalk = require('chalk');
const { gzipSync } = require('zlib');
const { compress } = require('brotli');
const { packageDistPath, packageNodeModulesPath, packageJson } = require('./packageInfos');

function getFilesByGlob(globPath) {
  return new Promise((resolve, reject) => {
    glob(globPath, (error, files) => {
      if (error) {
        reject(error);
      }

      resolve(files);
    });
  });
}

function mergeCommonRollupOutputConfig(config) {
  return {
    banner: `/**
 * ${packageJson.name} v${packageJson.version}
 * (c) ${new Date().getFullYear()} Jay Chen
 * @license MIT
 */`,
    ...config,
  };
}

async function rollupBuild({ output, ...options }) {
  const bundle = await rollup(options);

  if (Array.isArray(output)) {
    await Promise.all(output.map((o) => bundle.write(o)));
  } else {
    await bundle.write(output);
  }
}

function cleanBuild() {
  fs.rmSync(packageDistPath, {
    force: true,
    recursive: true,
  });
  fs.rmSync(packageNodeModulesPath, {
    force: true,
    recursive: true,
  });
}

function checkPackageSize(target, formats) {
  const pkgDir = path.resolve(`packages/${target}`);

  checkFileSize(`${pkgDir}/dist/${target}.global.prod.js`);

  if (!formats || formats.includes('global-runtime')) {
    checkFileSize(`${pkgDir}/dist/${target}.runtime.global.prod.js`);
  }
}

function checkFileSize(filePath) {
  if (!fs.existsSync(filePath)) {
    return;
  }

  const file = fs.readFileSync(filePath);
  const minSize = (file.length / 1024).toFixed(2) + 'kb';
  const gzipped = gzipSync(file);
  const gzippedSize = (gzipped.length / 1024).toFixed(2) + 'kb';
  const compressed = compress(file);
  const compressedSize = (compressed.length / 1024).toFixed(2) + 'kb';

  console.log(
    `${chalk.gray(chalk.bold(path.basename(filePath)))} min:${minSize} / gzip:${gzippedSize} / brotli:${compressedSize}`
  );
}

module.exports = {
  getFilesByGlob,
  mergeCommonRollupOutputConfig,
  rollupBuild,
  cleanBuild,
  checkPackageSize,
  checkFileSize,
};
