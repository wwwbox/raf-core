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


export type Data = { [key: string]: any };
export type Files = {
    [key: string]: File | File[]
}

export default class CollectedData implements ICollectedData {

    private readonly data: Data;
    private readonly query: Data;
    private readonly files: Files;

    constructor() {
        this.data = {};
        this.files = {};
        this.query = {};
    }

    append(key: string, value: any): void {
        this.data[key] = value;
    }

    appendQuery(key: string, value: any): void {
        this.query[key] = value;
    }

    appendFile(key: string, file: File | File[]): void {
        this.files[key] = file;
    }

    remove(key: string): void {
        delete this.data[key];
    }

    removeFile(key: string) {
        delete this.files[key];
    }

    removeQuery(key: string) {
        delete this.query[key];
    }

    getData(): Data {
        return this.data;
    }

    getFiles(): Files {
        return this.files;
    }

    getQuery(): Data {
        return this.query;
    }

    merge(collectedData: CollectedData): void {
        this.appendData(collectedData.getData());
        this.appendFiles(collectedData.getFiles());
        this.appendQueries(collectedData.getQuery());
    }

    appendData(data: Data): void {
        const keysOfData = Object.keys(data);
        for (let key of keysOfData)
            this.append(key, data[key]);
    }

    appendFiles(files: Files): void {
        const keysOfFiles = Object.keys(files);
        for (let key of keysOfFiles)
            this.appendFile(key, files[key]);
    }

    appendQueries(query: Data): void {
        const keys = Object.keys(query);
        for (let key of keys)
            this.appendQuery(key, query[key]);
    }
}