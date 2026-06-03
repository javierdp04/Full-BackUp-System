import { app, BrowserWindow, ipcMain, IpcMainInvokeEvent, Menu } from 'electron'
import { join } from 'path'
import "dotenv/config"

function createWindow(): void {
    const window = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: join(__dirname, '../preload/index.js'),
        }
    })


    if (process.env['ELECTRON_RENDERER_URL']) {
        window.loadURL(process.env['ELECTRON_RENDERER_URL'])
    } else {
        window.loadFile(join(__dirname, '../renderer/index.html'))
    }
}

app.whenReady().then(() => {
    ipcMain.handle("get-envVar", getEnvVar);
    createWindow()
})
    
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})


Menu.setApplicationMenu(null);

async function getEnvVar(event : Electron.IpcMainInvokeEvent, name : string) : Promise<string> {
    const value = process.env[name];

    if(!value || value.length == 0 ) throw Error(`Can't find ${name} on dotenv`);
    
    return value;
}
