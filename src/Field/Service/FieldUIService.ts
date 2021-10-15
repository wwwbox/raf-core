import {FieldMessageType, FieldUIConfiguration} from "../Configuration/FieldUIConfiguration";
import {IField} from "../IField";
import {FieldConfigurationServiceBase, IFieldConfigurationService} from "./FieldConfigurationService";

export interface FieldUIService extends IFieldConfigurationService<FieldUIConfiguration> {

    shouldDisable(): boolean;

    isReadonly(): boolean;

    isDisableOnLoading(): boolean;

    isDisabled(): boolean;

    isLoading(): boolean;

    isHidden(): boolean;

    getMessageType(): FieldMessageType;

    getMessage(): string;

    isDisableOnFormLoading(): boolean;

    setDisableOnFormLoading(disableOnFormLoading: boolean): void;

    setReadonly(readonly: boolean): void;

    setDisableOnLoading(disableOnLoading: boolean): void;

    setDisabled(disable: boolean, afterChange?: () => void): void;

    setLoading(loading: boolean, afterChange?: () => void): void;

    setHidden(hidden: boolean, afterChange?: () => void): void;

    setMessage(message: string, afterChange?: () => void): void;

    setMessageType(type: FieldMessageType, afterChange?: () => void): void;
}


export class DefaultFieldUIService extends FieldConfigurationServiceBase<FieldUIConfiguration> implements FieldUIService {

    constructor(field: IField, configurationKey: string) {
        super(field, configurationKey);
    }

    getMessage(): string {
        return this.getConfiguration().message;
    }

    getMessageType(): FieldMessageType {
        return this.getConfiguration().messageType;
    }

    isDisableOnLoading(): boolean {
        return this.getConfiguration().disableOnLoading;
    }

    isDisabled(): boolean {
        return this.getConfiguration().disabled;
    }

    isHidden(): boolean {
        return this.getConfiguration().hidden;
    }

    isLoading(): boolean {
        return this.getConfiguration().loading;
    }

    isReadonly(): boolean {
        return this.getConfiguration().readonly;
    }

    setDisableOnLoading(disableOnLoading: boolean, afterChange?: () => void): void {
        this.update('disableOnLoading', disableOnLoading, afterChange);
    }

    setDisabled(disabled: boolean, afterChange?: () => void): void {
        this.update('disabled', disabled, afterChange)
    }

    setHidden(hidden: boolean, afterChange?: () => void): void {
        this.update('hidden', hidden, afterChange);
    }

    setLoading(loading: boolean, afterChange?: () => void): void {
        this.update('loading', loading, afterChange)
    }

    setMessage(message: string, afterChange?: () => void): void {
        this.update('message', message, afterChange)
    }

    setMessageType(type: FieldMessageType, afterChange?: () => void): void {
        this.update('messageType', type, afterChange);
    }

    setReadonly(readonly: boolean, afterChange?: () => void): void {
        this.update('readonly', readonly, afterChange);
    }

    isDisableOnFormLoading(): boolean {
        return this.config("disableOnFormLoading");
    }

    setDisableOnFormLoading(disableOnFormLoading: boolean): void {
        return this.update('disableOnFormLoading', disableOnFormLoading);
    }

    shouldDisable(): boolean {
        return (
                this.getField().getForm().uiService().isLoading() && this.isDisableOnFormLoading()
            ) ||
            this.isDisabled() || (
                this.isLoading() && this.isDisableOnLoading()
            );
    }

}