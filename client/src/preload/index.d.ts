import { BackUpState } from "../shared/models/models"

export interface ElectronApi {
    getEnvVariable: (name: string) => Promise<string>
    loadBackupState : () => Promise<BackUpState | null>
    writeBackupState : (data : BackUpState) => Promise<boolean>
}

declare global {
    interface Window {
        electronApi: ElectronApi
    }
}
