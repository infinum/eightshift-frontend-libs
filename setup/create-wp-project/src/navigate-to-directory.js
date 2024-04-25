const fs = require('fs');
const path = require('path');

const findProjectRoot = (currentDir) => {
    if (!currentDir || currentDir === '/') {
        // Reached the root without finding wp-config.php
        return null;
    }

    const wpConfigPath = path.join(currentDir, 'wp-config.php');
    const wpConfigExists = fs.existsSync(wpConfigPath);

    if (wpConfigExists) {
        // Found wp-config.php, return the current directory as the project root
        return currentDir;
    }

    // Move up one directory level and continue the search
    const parentDir = path.dirname(currentDir);
    return findProjectRoot(parentDir);
};

const navigateToDirectory = (dirname) => {
    const rootDir = findProjectRoot(process.cwd());

    if (!rootDir) {
        console.error('Unable to find project root.');
        process.exit(1);
    }

    const directoryPath = path.join(rootDir, 'wp-content', dirname);
    process.chdir(directoryPath);
};

module.exports = {
    navigateToDirectory,
};
