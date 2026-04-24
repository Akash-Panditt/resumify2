const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
    });
}

const frontendSrc = path.join(__dirname, '..', 'frontend', 'src');

walkDir(frontendSrc, (filePath) => {
    if (filePath.endsWith('.jsx') || filePath.endsWith('.js')) {
        let content = fs.readFileSync(filePath, 'utf8');
        let newContent = content.replace(/(['"])\$\{import\.meta\.env\.VITE_API_URL\}/g, '`${import.meta.env.VITE_API_URL}');
        // Replace closing quote if it was started by the above
        newContent = newContent.replace(/VITE_API_URL\}(.*?)(['"])/g, (match, p1, p2) => {
            return `VITE_API_URL}${p1}\``;
        });
        if (content !== newContent) {
            fs.writeFileSync(filePath, newContent);
            console.log(`Updated: ${filePath}`);
        }
    }
});
