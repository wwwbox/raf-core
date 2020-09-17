import IField from "../IField";

export interface FieldCollectingConfiguration {
    ready: boolean;
    skipCollecting: boolean;
    asQuery: boolean;
    collect: (field: IField) => any;
}

export const DEFAULT_FIELD_COLLECTING_CONFIGURATION: FieldCollectingConfiguration = {
    asQuery: false,
    ready: true,
    skipCollecting: false,
    collect: field => field.value().get()
}