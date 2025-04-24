const { app, BrowserWindow, globalShortcut, ipcMain } = require('electron');
const path = require('path');

let splash, mainWindow;

function createSplash() {
  splash = new BrowserWindow({
    width: 400,
    height: 300,
    resizable: false,
    frame: false,
    alwaysOnTop: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  splash.loadFile('assets/splash.html');

  splash.webContents.on('did-fail-load', () => {
    console.error('Failed to load splash screen');
  });
}

function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    kiosk: true,
    frame: false,
    show: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  mainWindow.loadURL("https://youtube.com");

  // Cegah navigasi keluar
  mainWindow.webContents.on('will-navigate', (e, url) => {
    if (url !== mainWindow.webContents.getURL()) e.preventDefault();
  });

  mainWindow.webContents.on('new-window', e => e.preventDefault());

  mainWindow.webContents.on('did-fail-load', () => {
    console.error('Failed to load main window');
  });

  mainWindow.setMenuBarVisibility(false);
  mainWindow.setFullScreen(true);

  // Shortcut keluar dari aplikasi
  globalShortcut.register('Control+Shift+Q', () => {
    app.quit();
  });
}

app.whenReady().then(() => {
  createSplash();
});

// Handle tombol "Mulai" dari splash
ipcMain.on('login-success', () => {
  console.log('Tombol Mulai diklik, membuka main window...');
  splash.close(); // Tutup splash screen
  createMainWindow(); // Buat dan tampilkan mainWindow
});

app.on('window-all-closed', () => {
  app.quit();
});
