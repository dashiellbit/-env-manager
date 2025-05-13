#!/usr/bin/env node

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
    console.log("no environments saved");
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