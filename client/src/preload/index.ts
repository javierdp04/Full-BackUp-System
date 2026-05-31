import { contextBridge } from 'electron'

// Aquí expondrás de forma segura las APIs del proceso main al renderer (React).
// Ejemplo:
//   contextBridge.exposeInMainWorld('api', {
//       hacerBackup: () => ipcRenderer.invoke('backup:run')
//   })

contextBridge.exposeInMainWorld('api', {})
