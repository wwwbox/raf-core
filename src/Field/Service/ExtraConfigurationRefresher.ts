import Field from "../Field";


export interface ExtraConfigurationRefresher {
    refresh(field: Field): boolean;
}

type UpdatingType = "only" | "except";

type CustomChangeHandler = {
    [property: string]: (current: any, passed: any, currentValue: any, passedValue: any) => boolean;
}

export class DefaultExtraConfigurationRefresher implements ExtraConfigurationRefresher {

    private readonly updatingType: UpdatingType;
    private readonly customChangeHandler: CustomChangeHandler;

    public constructor(customChangeHandler: CustomChangeHandler = {},
                       listingType: UpdatingType = "except") {
        this.updatingType = listingType;
        this.customChangeHandler = customChangeHandler;
    }

    public refresh(field: Field): boolean {
        const extraState = field.getConfiguration('extra') ?? {};
        const extraProps = field.getProps().extra ?? {};
        return this.update(extraState, extraProps);
    }

    protected selectedProperties(): string[] {
        return [];
    }

    protected update(current: any, passed: any): boolean {
        let changed = false;
        const passedKeys = Object.keys(passed);

        for (let key of passedKeys) {

            const isKeyInSelectedProperties = this.selectedProperties().includes(key);
            if (isKeyInSelectedProperties && this.updatingType === "except") {
                continue;
            }
            if (!isKeyInSelectedProperties && this.updatingType === "only") {
                continue;
            }

            const passedValue = passed[key as any];
            const currentValue = current[key as any];

            if (typeof passedValue !== typeof currentValue) {
                current[key] = passedValue;
                changed = true;
            }

            const customHandler = this.customChangeHandler[key];
            if (customHandler) {
                changed = customHandler(current, passed, currentValue, passedValue) || changed;
            }

            const type = typeof passed[key as any];

            if (type === "object") {
                changed = this.handleObject(key, current, passed, currentValue, passedValue) || changed;
            } else {
                changed = this.handlePrimitiveAndOthers(key, current, passed, currentValue, passedValue) || changed;
            }
        }

        return changed;
    }


    protected handleObject(key: string, current: any, passed: any, currentValue: any, passedValue: any): boolean {
        if (typeof currentValue === "object" && typeof passedValue === "object") {
            if (JSON.stringify(currentValue) !== JSON.stringify(passedValue)) {
                current[key] = passed[key];
                return true;
            }
        }

        return false;
    }

    protected handlePrimitiveAndOthers(key: string, current: any, passed: any, currentValue: any, passedValue: any): boolean {
        if (passedValue != currentValue) {
            current[key] = passedValue;
            return true;
        }
        return false;
    }

}