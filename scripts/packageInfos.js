const path = require('path');

const { PWD } = process.env;
const packagePath = PWD;
const packageJson = require(path.resolve(packagePath, 'package.json'));
const repoPath = path.resolve(packagePath, '..', '..');
const nodeModulesPath = path.resolve(repoPath, 'node_modules');
const tsPluginCachePath = path.resolve(nodeModulesPath, '.cache', 'rts2');
const packageSrcPath = path.resolve(packagePath, 'src');
const packageDistPath = path.resolve(packagePath, 'dist');
const packageNodeModulesPath = path.resolve(nodeModulesPath, ...packageJson.name.split('/'));
const tsconfigPath = path.resolve(packagePath, 'tsconfig.build.json');

module.exports = {
  packagePath,
  repoPath,
  nodeModulesPath,
  tsPluginCachePath,
  packageJson,
  packageSrcPath,
  packageDistPath,
  packageNodeModulesPath,
  tsconfigPath,
};
