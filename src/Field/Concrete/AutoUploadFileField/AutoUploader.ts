export interface AutoUploader<Options, Response = any> {

    options(): Options;

    upload(): Promise<Response>;

    cancel(): void;
}