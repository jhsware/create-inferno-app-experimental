'use strict';

const execa = require('execa');
const { mkdirp, remove, writeFileSync, existsSync } = require('fs-extra');
const { join } = require('path');

const cli = require.resolve('create-inferno-app/index.js');

jest.setTimeout(1000 * 60 * 5);

const projectName = 'test-app';
const genPath = join(__dirname, projectName);

const generatedFiles = [
  '.gitignore',
  'package.json',
  'src',
  'package-lock.json',
];

beforeEach(() => remove(genPath));
afterAll(() => remove(genPath));

const run = (args, options) => execa('node', [cli].concat(args), options);

const genFileExists = f => existsSync(join(genPath, f));

describe('create-inferno-app', () => {
  it('asks to supply an argument if none supplied', async () => {
    const { stderr } = await run([], { reject: false });
    expect(stderr).toContain('Please specify the project directory');
  });

  it('creates a project on supplying a name as the argument', async () => {
    await run([projectName], { cwd: __dirname });

    // Assert for the generated files
    generatedFiles.forEach(file => expect(genFileExists(file)).toBeTruthy());
  });

  it('warns about conflicting files in path', async () => {
    // Create the temporary directory
    await mkdirp(genPath);

    // Create a package.json file
    const pkgJson = join(genPath, 'package.json');
    writeFileSync(pkgJson, '{ "foo": "bar" }');

    const { stdout } = await run([projectName], {
      cwd: __dirname,
      reject: false,
    });

    // Assert for the expected message
    expect(stdout).toContain(
      `The directory ${projectName} contains files that could conflict`
    );
  });

  it('creates a project in the current directory', async () => {
    // Create temporary directory
    await mkdirp(genPath);

    // Create a project in the current directory
    await run(['.'], { cwd: genPath });

    // Assert for the generated files
    generatedFiles.forEach(file => expect(genFileExists(file)).toBeTruthy());
  });

  it('uses yarn as the package manager', async () => {
    await run([projectName], {
      cwd: __dirname,
      env: { npm_config_user_agent: 'yarn' },
    });

    // Assert for the generated files
    const generatedFilesWithYarn = [
      ...generatedFiles.filter(file => file !== 'package-lock.json'),
      'yarn.lock',
    ];

    generatedFilesWithYarn.forEach(file =>
      expect(genFileExists(file)).toBeTruthy()
    );
  });

  it('creates a project based on the typescript template', async () => {
    await run([projectName, '--template', 'typescript'], {
      cwd: __dirname,
    });

    // Assert for the generated files
    [...generatedFiles, 'tsconfig.json'].forEach(file =>
      expect(genFileExists(file)).toBeTruthy()
    );
  });
});
