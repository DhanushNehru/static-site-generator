import * as fs from 'fs-extra';
import * as path from 'path';
import * as glob from 'glob';
import { marked } from 'marked';
import { generateHtml } from './template';

// Directories
const contentDir = path.join(__dirname, '..', 'content');
const outputDir = path.join(__dirname, '..', 'output');

// Ensure output directory exists
fs.ensureDirSync(outputDir);

// Read all markdown files from the content directory
const files = glob.sync('*.md', { cwd: contentDir });

files.forEach(file => {
    const filePath = path.join(contentDir, file);
    const fileContents = fs.readFileSync(filePath, 'utf-8');

    // Convert markdown to HTML
    const htmlContent = marked(fileContents) as string;

    // Generate full HTML page
    const title = path.basename(file, '.md');
    const fullHtml = generateHtml(title, htmlContent);

    // Write the HTML file to the output directory
    const outputFilePath = path.join(outputDir, `${title}.html`);
    fs.writeFileSync(outputFilePath, fullHtml);

    console.log(`Generated ${outputFilePath}`);
});

console.log('Static site generated successfully.');
