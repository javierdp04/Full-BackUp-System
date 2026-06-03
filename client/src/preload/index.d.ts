export interface ElectronApi {
    getEnvVariable: (name: string) => Promise<string>
}

declare global {
    interface Window {
        electronApi: ElectronApi
    }
}
