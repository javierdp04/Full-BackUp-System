import { contextBridge, ipcRenderer } from 'electron'
import { BackUpState } from '../shared/models/models'

contextBridge.exposeInMainWorld('electronApi', {
    getEnvVariable : (name : string) => ipcRenderer.invoke('get-envVar', name),
    loadBackupState : () => ipcRenderer.invoke('load-backup-state'),
    writeBackupState : (newData : BackUpState) => ipcRenderer.invoke('write-backup-state', newData)
})
