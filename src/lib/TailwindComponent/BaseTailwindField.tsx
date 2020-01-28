import Field from "../Field/Field";
import FieldState from "../Field/FieldState";
import {FieldProps} from "../Field/FieldProps";
import {FieldMessageType} from "../Field/FieldConfig";
import {classNameBuilder} from "./Utils";


export interface BaseTailwindFieldProps extends FieldProps {
    label?: string;
    wrapperClassName?: string;
    labelClassName?: string;
    inputClassName?: string;
    messageClassName?: string;
    horizontalLayout?: boolean;
    fullInputWidth?: boolean;
    errorClassName?: string;

    extractMessageClassName?: (type: FieldMessageType | undefined) => string;
}

export default class BaseTailwindField<P extends BaseTailwindFieldProps, S extends FieldState = FieldState> extends Field<P, S> {

    static defaultProps: Partial<BaseTailwindFieldProps> = {
        fullInputWidth: false,
        extractMessageClassName: (type: FieldMessageType | undefined) => {
            switch (type) {
                case FieldMessageType.ERROR:
                    return 'text-red-500';
                case FieldMessageType.WARNING:
                    return 'text-orange-500';
                case FieldMessageType.SUCCESS :
                    return 'text-green-500';
            }
            return '';
        },
        errorClassName: ''
    };

    protected wrapperClassName = () => {
        let className = !this.props.skipDefaultWrapperClassName ? 'flex flex-1 p-1' : '';

        if (!this.props.skipDefaultWrapperClassName) {
            if (this.props.horizontalLayout)
                className = classNameBuilder(className, "flex-row items-center");
            else
                className = classNameBuilder(className, "flex-col");
        }

        if (this.props.wrapperClassName)
            className = classNameBuilder(className, this.props.wrapperClassName!);
        return className;
    };

    protected getInjectedProps = () => this.props.inputProps ?? ({});

    protected labelClassName = () => {
        let className = !this.props.skipDefaultLabelClassName ? 'text-base p-2 ' : '';
        if (this.props.labelClassName)
            className = classNameBuilder(className, this.props.labelClassName!);
        return className;
    };

    protected inputClassName = () => {
        let className = !this.props.skipDefaultInputClassName ? 'border p-2 rounded ' + this.tailwindFormClassName() : '';
        if (this.getProps().fullInputWidth) {
            className = classNameBuilder(className, 'w-full');
        }
        if (this.props.inputClassName)
            className = classNameBuilder(className, this.props.inputClassName!);

        if (!this.isValid()) {
            className = classNameBuilder(className, `bg-red-500 text-red-200 ${this.props.errorClassName ?? ''}`);
        }

        return className;
    };

    protected messageClassName = () => {
        let className = !this.props.skipDefaultMessageClassName ? 'text-base p-1' : '';
        if (this.props.messageClassName) {
            className = classNameBuilder(className, this.props.messageClassName!);
        }
        if (this.props.extractMessageClassName)
            className = classNameBuilder(className, this.props.extractMessageClassName(this.getMessageType()));
        return className;
    };

    protected tailwindFormClassName = () => ''
}