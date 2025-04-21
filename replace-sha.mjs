import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { execSync } from 'child_process';

// Get the current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Get the commit SHA
const getGitCommitSHA = () => {
  try {
    return execSync('git rev-parse HEAD').toString().trim();
  } catch (error) {
    console.warn('Failed to get git commit SHA:', error);
    return 'unknown';
  }
};

// Read the built index.html
const indexPath = join(__dirname, 'dist', 'index.html');
const html = readFileSync(indexPath, 'utf8');

// Get the commit SHA
const commitSHA = getGitCommitSHA();

// Replace all instances of the placeholder
const updatedHtml = html.replace(/%GIT_COMMIT_SHA%/g, commitSHA);

// Write back to the file
writeFileSync(indexPath, updatedHtml);

console.log(`Successfully injected commit SHA: ${commitSHA}`); 