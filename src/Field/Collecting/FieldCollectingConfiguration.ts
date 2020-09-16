export interface FieldCollectingConfiguration {
    ready: boolean;
    skipCollecting: boolean;
    asQuery: boolean;
}

export const DEFAULT_FIELD_COLLECTING_CONFIGURATION: FieldCollectingConfiguration = {
    asQuery: false,
    ready: true,
    skipCollecting: false
}