import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

// Console colors
const RESET = '\x1b[0m';
const BLUE = '\x1b[94m';
const GREEN = '\x1b[92m';
const YELLOW = '\x1b[93m';
const blue = (text) => `${BLUE}${text}${RESET}`;
const green = (text) => `${GREEN}${text}${RESET}`;
const yellow = (text) => `${YELLOW}${text}${RESET}`;

if (fs.existsSync('.env.local')) {
  console.log(`Checking for ${blue('PROJECT')} and ${blue('NODE_ENV')} overrides in ${green('.env.local')}`);
  dotenv.config({ path: '.env.local' });
}

const licenceProject = process.env.PROJECT || 'starter-app';
const environmentName = process.env.NODE_ENV || 'development';

console.log(`Running local development environment for 
  project\t${blue(licenceProject)} 
  environment\t${blue(environmentName)}
`);

cleanEnvFiles('./');
cleanEnvFiles('server/');

copyFileAndAppendHeader(path.join('config', licenceProject, 'client', 'config.json'), './');
copyFileAndAppendHeader(path.join('config', licenceProject, 'client', `config.${environmentName}.json`), './');

copyFileAndAppendHeader(path.join('config', licenceProject, 'server', '.env'), 'server/');
copyFileAndAppendHeader(path.join('config', licenceProject, 'server', `.env.${environmentName}`), 'server/');

console.log('pre-start complete');

//////////

function cleanEnvFiles(destFolder) {
  const envFiles = fs.readdirSync(destFolder).filter((file) => /\.env.*/i.test(file) && !/\.local/i.test(file));

  if (envFiles.length === 0) return;

  console.log(`Removing old config files from ${green(destFolder)}`);
  envFiles.forEach((file) => {
    console.log(blue(`  ${file}`));
    fs.unlinkSync(path.join(destFolder, file));
  });

  console.log();
}

function copyFileAndAppendHeader(sourceFile, destFolder) {
  if (!fs.existsSync(sourceFile)) {
    console.warn(`${yellow('WARN')}: Source file not found: ${blue(sourceFile)}`);
    return;
  }

  const destFile = path.join(destFolder, path.basename(sourceFile));

  console.log(`Copying config file ${blue(sourceFile)} to ${green(destFile)}`);
  const sourceFileBuffer = fs.readFileSync(sourceFile);
  const sourceFileContents = new TextDecoder().decode(sourceFileBuffer);
  const targetStream = fs.createWriteStream(destFile, { flags: 'w' });

  // This file was created from '${sourceFile}' and will be overwritten each time you run "yarn start"
  targetStream.write(sourceFileContents.toString());

  // targetStream.uncork();
  targetStream.end();
}
