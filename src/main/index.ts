import { app, BrowserWindow } from 'electron';
import path from 'node:path';
import { initDatabase } from './database/client';
import { registerInvoiceHandlers } from './ipc/invoiceHandler';
import { registerTallyHandlers } from './ipc/tallyHandler';
import { registerPortalHandlers } from './ipc/portalHandler';
import { registerProfileHandlers } from './ipc/profileHandler';
import { logAuditEvent } from './database/auditLogger';

let mainWindow: BrowserWindow | null = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 1024,
    minHeight: 680,
    title: 'MFD Invoice Automation',
    webPreferences: {
      preload: path.join(__dirname, '../preload/preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  if (process.env.VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL);
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, '../../dist/index.html'));
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(() => {
  // Initialize Database
  initDatabase();

  // Register IPC handlers
  registerInvoiceHandlers();
  registerTallyHandlers();
  registerPortalHandlers();
  registerProfileHandlers();

  logAuditEvent('INFO', 'APP_LAUNCHED', 'Application initialized successfully');

  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
