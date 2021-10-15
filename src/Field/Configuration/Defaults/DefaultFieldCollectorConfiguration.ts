import {FieldCollectorConfiguration} from "../FieldCollectorConfiguration";

export function getDefaultFieldCollectingConfiguration(): FieldCollectorConfiguration {
    return {
        asQuery: false,
        ready: true,
        skipCollecting: false,
        collect: field => field.valueService().get()
    }
}
