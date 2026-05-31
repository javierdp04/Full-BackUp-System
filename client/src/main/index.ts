import { app, BrowserWindow, Menu } from 'electron'
import { join } from 'path'

function createWindow(): void {
    const window = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: join(__dirname, '../preload/index.js'),
            sandbox: false
        }
    })

    // En desarrollo carga el servidor de Vite (con recarga en caliente).
    // En producción (build) carga el HTML ya empaquetado.
    if (process.env['ELECTRON_RENDERER_URL']) {
        window.loadURL(process.env['ELECTRON_RENDERER_URL'])
    } else {
        window.loadFile(join(__dirname, '../renderer/index.html'))
    }
}

app.whenReady().then(() => {
    createWindow()

    // En macOS es habitual recrear la ventana al hacer clic en el icono del dock.
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

Menu.setApplicationMenu(null);
