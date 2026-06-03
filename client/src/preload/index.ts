import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('electronApi', {
    getEnvVariable : (name : string) => ipcRenderer.invoke('get-envVar', name)
})
