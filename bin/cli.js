#!/usr/bin/env node

const { loadConfig, saveConfig } = require('../lib/storage');
const { parseEnvFile } = require('../lib/parser');

const args = process.argv.slice(2);
const command = args[0];

if (!command) {
  console.log("Usage: envmgr <command> [options]");
  console.log("\nCommands:");
  console.log("  list     - list all saved environments");
  console.log("  add      - add new environment");
  console.log("  load     - load environment variables");
  console.log("  delete   - delete saved environment");
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
    const envName = args[1];
    const filePath = args[2];

    if (!envName || !filePath) {
      console.log("Usage: envmgr add <name> <file>");
      process.exit(1);
    }

    try {
      const vars = parseEnvFile(filePath);
      const cfg = loadConfig();
      cfg.environments[envName] = vars;
      saveConfig(cfg);
      console.log(`saved environment '${envName}' with ${Object.keys(vars).length} variables`);
    } catch(err) {
      console.error("error:", err.message);
      process.exit(1);
    }
    break;
  case 'load':
    const loadEnvName = args[1];

    if (!loadEnvName) {
      console.log("Usage: envmgr load <name>");
      process.exit(1);
    }

    const loadCfg = loadConfig();
    if (!loadCfg.environments[loadEnvName]) {
      console.error(`environment '${loadEnvName}' not found`);
      process.exit(1);
    }

    const envVars = loadCfg.environments[loadEnvName];
    Object.entries(envVars).forEach(([key, value]) => {
      console.log(`export ${key}="${value}"`);
    });
    break;
  case 'delete':
    const delEnvName = args[1];

    if (!delEnvName) {
      console.log("Usage: envmgr delete <name>");
      process.exit(1);
    }

    const delCfg = loadConfig();
    if (!delCfg.environments[delEnvName]) {
      console.error(`environment '${delEnvName}' not found`);
      process.exit(1);
    }

    delete delCfg.environments[delEnvName];
    saveConfig(delCfg);
    console.log(`deleted environment '${delEnvName}'`);
    break;
  default:
    console.log("unknown command:", command);
}