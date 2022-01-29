const path = require('path');
const fs = require('fs-extra');
const ts = require('rollup-plugin-typescript2');
const {
  packageJson,
  packagePath,
  packageSrcPath,
  packageDistPath,
  packageNodeModulesPath,
  tsPluginCachePath,
  tsconfigPath,
  repoPath,
} = require('./packageInfos');
const { cleanBuild, rollupBuild, getFilesByGlob } = require('./buildUtils');

build();

async function build() {
  cleanBuild();
  fs.mkdirSync(packageDistPath);

  /**
   * copy LICENSE
   */
  const licensePath = path.resolve(repoPath, 'LICENSE');
  const licenseDistPath = path.resolve(packageDistPath, 'LICENSE');

  fs.copyFileSync(licensePath, licenseDistPath);

  /**
   * copy README.md/package.json
   */
  ['README.md', 'package.json'].forEach((file) => {
    const readmeFilePath = path.resolve(packagePath, file);
    const readmeDistpath = path.resolve(packageDistPath, file);

    fs.copyFileSync(readmeFilePath, readmeDistpath);
  });

  const input = await getFilesByGlob(`${packageSrcPath}/**/index.ts`);
  const externals = [
    ...Object.keys({
      ...packageJson.dependencies,
      ...packageJson.peerDependencies,
    }),
  ];

  await rollupBuild({
    input,
    external: (id) => externals.some((ext) => id.startsWith(ext)),
    output: [
      {
        dir: packageDistPath,
        externalLiveBindings: false,
        format: 'es',
        preserveModules: true,
        preserveModulesRoot: packageSrcPath,
      },
    ],
    plugins: [
      ts({
        check: true,
        cacheRoot: tsPluginCachePath,
        tsconfig: tsconfigPath,
      }),
    ],
    treeshake: {
      moduleSideEffects: packageJson.sideEffects,
    },
  });

  /**
   * copy dist to node_modules
   */
  fs.copySync(packageDistPath, packageNodeModulesPath);
}
