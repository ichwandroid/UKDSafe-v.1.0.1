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

  globalShortcut.register('Control+Shift+Q', () => {
    app.quit();
  });

  globalShortcut.register('Control+Shift+R', () => {
    splash.webContents.reload();
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

  mainWindow.loadURL("https://ukdkotamalang.cbt.siap.id/auth/login");

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

app.whenReady().then(async () => {
  // Bersihkan cache sebelum membuka aplikasi
  try {
    const session = require('electron').session;
    await session.defaultSession.clearCache();
    console.log('Cache berhasil dibersihkan.');
  } catch (error) {
    console.error('Gagal membersihkan cache:', error);
  }

  // Buat splash screen
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
