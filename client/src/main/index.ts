import { app, BrowserWindow, ipcMain, IpcMainInvokeEvent, Menu } from 'electron';
import { join } from 'path';
import * as fs from 'fs';
import "dotenv/config";
import { BackUpState } from "../shared/models/models"
import { error } from 'console';

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
    ipcMain.handle("load-backup-state", loadBackupState);
    ipcMain.handle("write-backup-state", writeBackupState);
    createWindow()
})
    
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})


Menu.setApplicationMenu(null);

                                                                                                  
const getEnvVar = async (event : Electron.IpcMainInvokeEvent, name : string) : Promise<string> => {
    const value = process.env[name];

    if(!value || value.length == 0 ) throw Error(`Can't find ${name} on dotenv`);
    
    return value;
}

const stateFile = () : string => join(app.getPath("userData"), "backup-state.json");

const loadBackupState = async (event : Electron.IpcMainInvokeEvent) : Promise<BackUpState | null> => {
    try {
        const raw = await fs.promises.readFile(stateFile(), "utf-8");
        const parsed = JSON.parse(raw) as BackUpState;

        return { ...parsed, date : new Date(parsed.date) };
    } catch (error) {
        if ((error as NodeJS.ErrnoException).code === "ENOENT") return null;
        throw Error(`Error loading backup-metadata: ${error}`);
    }
}

const writeBackupState = (event : Electron.IpcMainInvokeEvent, newData : BackUpState) : boolean => {
    try {
        fs.writeFileSync(stateFile(), JSON.stringify(newData, null, 2), "utf-8");
        return true;
    } catch (error) {
        throw Error(`Couldn't store last backup metadata. error: ${error}`);
    }
}

