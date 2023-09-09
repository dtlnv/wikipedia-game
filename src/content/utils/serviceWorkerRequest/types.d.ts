export interface ServiceWorkerRequestInterface {
    (action: string, params?: object): Promise<any>;
}
