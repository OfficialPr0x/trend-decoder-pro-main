#!/usr/bin/env node

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
};

function log(color, prefix, message) {
  console.log(`${color}${colors.bright}[${prefix}]${colors.reset} ${message}`);
}

function checkEnvFile() {
  const envPath = join(__dirname, 'backend', '.env');
  if (!fs.existsSync(envPath)) {
    log(colors.yellow, 'WARN', 'backend/.env file not found. Using default RapidAPI key.');
    log(colors.yellow, 'WARN', 'For production, create backend/.env with RAPIDAPI_KEY=your_key');
  }
}

function startProcess(name, command, args, cwd, color) {
  return new Promise((resolve, reject) => {
    log(color, name, `Starting...`);
    
    const proc = spawn(command, args, {
      cwd,
      shell: true,
      stdio: 'pipe',
    });

    proc.stdout.on('data', (data) => {
      const lines = data.toString().split('\n').filter(line => line.trim());
      lines.forEach(line => log(color, name, line));
    });

    proc.stderr.on('data', (data) => {
      const lines = data.toString().split('\n').filter(line => line.trim());
      lines.forEach(line => log(colors.red, name, line));
    });

    proc.on('error', (error) => {
      log(colors.red, name, `Error: ${error.message}`);
      reject(error);
    });

    proc.on('close', (code) => {
      if (code !== 0) {
        log(colors.red, name, `Exited with code ${code}`);
      }
    });

    // Resolve after a short delay to allow process to start
    setTimeout(() => resolve(proc), 2000);
  });
}

async function main() {
  console.clear();
  log(colors.cyan, 'MASTER', '🚀 Starting Viralify Platform...\n');

  // Check environment
  checkEnvFile();

  const services = [];

  try {
    // Start TikTok API Backend
    log(colors.blue, 'SYSTEM', 'Starting TikTok API Backend Server...');
    const backend = await startProcess(
      'BACKEND',
      'npm',
      ['run', 'dev'],
      join(__dirname, 'backend'),
      colors.blue
    );
    services.push(backend);

    // Wait a bit for backend to fully start
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Start Next.js Dashboard
    log(colors.magenta, 'SYSTEM', 'Starting Dashboard (Next.js)...');
    const dashboard = await startProcess(
      'DASHBOARD',
      'npm',
      ['run', 'dev'],
      join(__dirname, 'dashboard'),
      colors.magenta
    );
    services.push(dashboard);

    // Wait for dashboard to start
    await new Promise(resolve => setTimeout(resolve, 5000));

    // Success message
    console.log('\n' + '='.repeat(60));
    log(colors.green, 'SUCCESS', '✓ All services started successfully!\n');
    log(colors.cyan, 'URLS', '🔗 Dashboard:        http://localhost:3002');
    log(colors.cyan, 'URLS', '🔗 Backend API:      http://localhost:3001');
    log(colors.cyan, 'URLS', '🔗 API Health:       http://localhost:3001/health');
    console.log('='.repeat(60) + '\n');
    log(colors.yellow, 'INFO', 'Press Ctrl+C to stop all services');
    console.log('');

  } catch (error) {
    log(colors.red, 'ERROR', `Failed to start services: ${error.message}`);
    // Kill all services on error
    services.forEach(proc => proc.kill());
    process.exit(1);
  }

  // Handle graceful shutdown
  process.on('SIGINT', () => {
    console.log('\n');
    log(colors.yellow, 'SYSTEM', 'Shutting down all services...');
    services.forEach(proc => proc.kill());
    setTimeout(() => {
      log(colors.green, 'SYSTEM', '✓ All services stopped');
      process.exit(0);
    }, 1000);
  });
}

main().catch((error) => {
  log(colors.red, 'FATAL', error.message);
  process.exit(1);
});

