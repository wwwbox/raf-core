import FieldState from "../Field/FieldState";
import {mock} from "jest-mock-extended";
import IField from "../Field/IField";
import {FieldConfigurationBase} from "../Field/Configuration/FieldConfiguration";

export class FieldConfigurationTestUtils<Configuration, Service extends FieldConfigurationBase<Configuration>> {

    private readonly configurationKey: keyof FieldState;
    private readonly defaultConfigurationForGet: Partial<Configuration>;
    private readonly defaultConfigurationForSet: Partial<Configuration>;
    private readonly createService: (field: IField) => Service;


    constructor(configurationKey: keyof FieldState, createService: (field: IField) => Service, defaultConfiguration?: Partial<Configuration>, defaultMockedConfiguration?: Partial<Configuration>) {
        this.configurationKey = configurationKey;
        this.createService = createService;
        this.defaultConfigurationForGet = defaultConfiguration ?? {};
        this.defaultConfigurationForSet = defaultMockedConfiguration ?? {};
    }

    public getInstance(configuration: Partial<Configuration> = {}, fieldMock: any = {}): Service {
        const field = mock<IField>({
            getConfiguration(): any {
                return configuration;
            },
            ...fieldMock
        });

        return this.createService(field);
    }

    public getInstanceWithField(configuration: Partial<Configuration> = {}, fieldMock: any = {}): {
        field: IField,
        service: Service
    } {
        const field = mock<IField>({
            getConfiguration(): any {
                return configuration;
            },
            ...fieldMock
        });

        return {
            service: this.createService(field),
            field: field
        };
    }

    public testGet(key: keyof Configuration, value: any, get: (service: Service) => any): void {
        const field = this.getFieldForGetTest(key, value);
        const service = this.createService(field);
        expect(get(service)).toEqual(value);
    }

    public testSet(key: keyof Configuration, value: any, set: (service: Service) => void, mockedConfiguration: any = {}, onChangeMock?: any): void {
        const updateConfigurationMock = jest.fn();
        const field = this.getFieldForSet(mockedConfiguration, updateConfigurationMock);
        const service = this.createService(field);
        set(service);
        expect(updateConfigurationMock).toBeCalledWith(this.configurationKey, {
            ...mockedConfiguration,
            [key]: value
        }, onChangeMock);
    }

    public testUnupdatableConfiguration(...keys: (keyof Configuration)[]): void {
        const service = this.getInstance();
        keys.forEach(key => expect(() => service.update(key, null)).toThrowError(`cannot update ${key}`));
    }

    private getFieldForGetTest(key: keyof Configuration, value: any): IField {
        const defaultConfiguration = this.defaultConfigurationForGet;
        return mock<IField>({
            getConfiguration(): any {
                return {
                    ...defaultConfiguration,
                    [key]: value
                }
            }
        });
    }

    private getFieldForSet(mockedConfiguration: any, updateConfigurationMock: any): IField {
        const defaultConfiguration = this.defaultConfigurationForSet;
        return mock<IField>({
            getConfiguration(): any {
                return {
                    ...defaultConfiguration,
                    ...mockedConfiguration
                }
            },
            updateConfiguration: updateConfigurationMock
        });
    }
}