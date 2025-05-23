const fs = require('fs');

function parseEnvFile(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`file not found: ${filePath}`);
  }

  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  const vars = {};

  lines.forEach(line => {
    line = line.trim();
    if (!line || line.startsWith('#')) return;

    const idx = line.indexOf('=');
    if (idx === -1) return;

    const key = line.substring(0, idx).trim();
    let value = line.substring(idx + 1).trim();

    // remove quotes
    if ((value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }

    vars[key] = value;
  });

  return vars;
}

module.exports = { parseEnvFile };