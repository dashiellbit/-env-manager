#!/usr/bin/env node

const { loadConfig, saveConfig } = require('../lib/storage');

const args = process.argv.slice(2);
const command = args[0];

if (!command) {
  console.log("Usage: envmgr <command> [options]");
  console.log("\nCommands:");
  console.log("  list     - list all saved environments");
  console.log("  add      - add new environment");
  console.log("  load     - load environment variables");
  process.exit(0);
}

switch(command) {
  case 'list':
    const config = loadConfig();
    const envNames = Object.keys(config.environments);
    if (envNames.length === 0) {
      console.log("no environments saved");
    } else {
      console.log("Saved environments:");
      envNames.forEach(name => console.log(`  - ${name}`));
    }
    break;
  case 'add':
    console.log("add not implemented yet");
    break;
  case 'load':
    console.log("load not implemented yet");
    break;
  default:
    console.log("unknown command:", command);
}