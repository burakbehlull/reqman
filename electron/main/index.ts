import { app, BrowserWindow, shell, ipcMain, Menu } from 'electron';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import os from 'node:os';
import fs from 'fs';
import { update } from './update';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

process.env.APP_ROOT = path.join(__dirname, '../..');

export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron');
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist');
export const VITE_DEV_SERVER_URL = process.env.VITE_DEV_SERVER_URL;

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL
  ? path.join(process.env.APP_ROOT, 'public')
  : RENDERER_DIST;

if (os.release().startsWith('6.1')) app.disableHardwareAcceleration();
if (process.platform === 'win32') app.setAppUserModelId(app.getName());
if (!app.requestSingleInstanceLock()) {
  app.quit();
  process.exit(0);
}

let win: BrowserWindow | null = null;
let currentLang = 'tr';
const preload = path.join(__dirname, '../preload/index.mjs');
const indexHtml = path.join(RENDERER_DIST, 'index.html');

const LANG_DIR = path.join(process.env.VITE_PUBLIC || '', 'languages');

function loadLangFile(lang: string) {
  try {
    const filePath = path.join(LANG_DIR, `${lang}.json`);
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Dil dosyası okunamadı:', err);
    return {};
  }
}

function createMenu(langData: any) {
  const menuTemplate : any = [
    {
      label: langData?.menu?.title || 'Request Man',
      submenu: [
        { label: langData?.menu?.new || 'Yeni', click: () => null },
        { label: langData?.menu?.open || 'Aç', click: () => null },
        { type: 'separator' },
        { label: langData?.menu?.exit || 'Çıkış', role: 'quit' },
      ],
    },
    {
      label: langData?.menu?.about || 'Hakkında',
      submenu: [
        { label: langData?.menu?.version || 'Versiyon', click: () => null },
      ],
    },
	
	/*{
		label: 'Geliştirici',
		submenu: [
		  {
			label: 'Toggle DevTools',
			accelerator: 'Ctrl+Shift+I', // Kısayol (Windows/Linux)
			click: () => {
			  const focusedWindow = BrowserWindow.getFocusedWindow();
			  if (focusedWindow) {
				focusedWindow.webContents.toggleDevTools();
			  }
			},
		  },
		  { role: 'reload', label: 'Yeniden Yükle' },
		]
	}*/
  
  ];

  Menu.setApplicationMenu(Menu.buildFromTemplate(menuTemplate));
}

async function createWindow() {
  win = new BrowserWindow({
    title: 'Request Man V1',
    icon: path.join(process.env.VITE_PUBLIC, 'favicon.ico'),
    webPreferences: {
      preload,
    },
  });

  const langData = loadLangFile(currentLang);
  createMenu(langData);

  if (VITE_DEV_SERVER_URL) {
    await win.loadURL(VITE_DEV_SERVER_URL);
    win.webContents.openDevTools();
  } else {
    await win.loadFile(indexHtml);
  }

  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', new Date().toLocaleString());
  });

  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('https:')) shell.openExternal(url);
    return { action: 'deny' };
  });
  
  win.once('ready-to-show', () => win.show());
  
  if (app.isPackaged) update(win);
  
}

ipcMain.on('set-language', (_, lang) => {
  currentLang = lang;
  const langData = loadLangFile(lang);
  createMenu(langData);
});

app.whenReady().then(createWindow);

ipcMain.handle("get-languages", () => {
  const langDir = path.join(process.env.VITE_PUBLIC ?? "", "languages");
  const files = fs.readdirSync(langDir);
  return files
    .filter((f) => f.endsWith(".json"))
    .map((f) => ({
      code: path.basename(f, ".json"),
      file: f,
    }));
});

app.on('window-all-closed', () => {
  win = null;
  if (process.platform !== 'darwin') app.quit();
});

app.on('second-instance', () => {
  if (win) {
    if (win.isMinimized()) win.restore();
    win.focus();
  }
});

app.on('activate', () => {
  const allWindows = BrowserWindow.getAllWindows();
  if (allWindows.length) {
    allWindows[0].focus();
  } else {
    createWindow();
  }
});

ipcMain.handle('open-win', (_, arg) => {
  const childWindow = new BrowserWindow({
    webPreferences: {
      preload,
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  if (VITE_DEV_SERVER_URL) {
    childWindow.loadURL(`${VITE_DEV_SERVER_URL}#${arg}`);
  } else {
    childWindow.loadFile(indexHtml, { hash: arg });
  }
});
