import { IField } from "../IField";

export interface FieldCollectingConfiguration {
    ready: boolean;
    skipCollecting: boolean;
    asQuery: boolean;
    collect: (field: IField) => any;
}

export function getDefaultFieldCollectingConfiguration(): FieldCollectingConfiguration {
    return {
        asQuery: false,
        ready: true,
        skipCollecting: false,
        collect: field => field.value().get()
    }
}
