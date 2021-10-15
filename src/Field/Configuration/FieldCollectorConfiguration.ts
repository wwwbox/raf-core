import {IField} from "../IField";

export interface FieldCollectorConfiguration {
    ready: boolean;
    skipCollecting: boolean;
    asQuery: boolean;
    collect: (field: IField) => any;
}

