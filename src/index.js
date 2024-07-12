"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs-extra"));
const path = __importStar(require("path"));
const glob = __importStar(require("glob"));
const marked_1 = require("marked");
const template_1 = require("./template");
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
    const htmlContent = (0, marked_1.marked)(fileContents);
    // Generate full HTML page
    const title = path.basename(file, '.md');
    const fullHtml = (0, template_1.generateHtml)(title, htmlContent);
    // Write the HTML file to the output directory
    const outputFilePath = path.join(outputDir, `${title}.html`);
    fs.writeFileSync(outputFilePath, fullHtml);
    console.log(`Generated ${outputFilePath}`);
});
console.log('Static site generated successfully.');
