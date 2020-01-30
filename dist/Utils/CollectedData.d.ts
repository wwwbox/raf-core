export interface ICollectedData {
    append(key: string, value: any): void;
    appendQuery(key: string, value: any): void;
    appendFile(key: string, file: File): void;
    getData(): Data;
    getQuery(): Data;
    getFiles(): Files;
    merge(data: CollectedData): void;
    appendData(data: Data): void;
    appendFiles(files: Files): void;
    appendQueries(query: Data): void;
    remove(key: string): void;
    removeFile(key: string): void;
    removeQuery(key: string): void;
}
export declare type Data = {
    [key: string]: any;
};
export declare type Files = {
    [key: string]: File | File[];
};
export default class CollectedData implements ICollectedData {
    private readonly data;
    private readonly query;
    private readonly files;
    constructor();
    append(key: string, value: any): void;
    appendQuery(key: string, value: any): void;
    appendFile(key: string, file: File | File[]): void;
    remove(key: string): void;
    removeFile(key: string): void;
    removeQuery(key: string): void;
    getData(): Data;
    getFiles(): Files;
    getQuery(): Data;
    merge(collectedData: CollectedData): void;
    appendData(data: Data): void;
    appendFiles(files: Files): void;
    appendQueries(query: Data): void;
}
