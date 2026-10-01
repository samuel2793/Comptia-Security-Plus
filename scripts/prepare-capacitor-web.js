const fs = require("node:fs");
const path = require("node:path");

const projectRoot = path.resolve(__dirname, "..");
const webRoot = path.join(projectRoot, "www");
const webFiles = new Set(["app.js", "index.html", "styles.css"]);
const excludedDirectories = new Set([".git", "android", "node_modules", "scripts", "www"]);

fs.mkdirSync(webRoot, { recursive: true });

for (const entry of fs.readdirSync(projectRoot, { withFileTypes: true })) {
  if (entry.name.startsWith(".") || excludedDirectories.has(entry.name)) continue;

  const sourcePath = path.join(projectRoot, entry.name);
  const destinationPath = path.join(webRoot, entry.name);

  if (entry.isDirectory()) {
    fs.cpSync(sourcePath, destinationPath, { recursive: true });
  } else if (webFiles.has(entry.name)) {
    fs.copyFileSync(sourcePath, destinationPath);
  }
}

console.log(`Capacitor web assets prepared in ${webRoot}`);