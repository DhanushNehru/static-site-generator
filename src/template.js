"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateHtml = generateHtml;
function generateHtml(title, content) {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
</head>
<body>
    <div class="content">
        ${content}
    </div>
</body>
</html>
    `;
}
