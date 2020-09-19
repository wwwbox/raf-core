import {FieldConfigurationBase} from "../../Field/Configuration/FieldConfiguration";
import IField from "../../Field/IField";

class DummyConfiguration extends FieldConfigurationBase<any> {

    constructor(field: IField, configurationKey: string) {
        super(field, configurationKey);
    }

    protected unUpdatableKeys(): (keyof any)[] {
        return ["x"];
    }
}

describe('FieldConfigurationBase', () => {

    it('should get configuration', function () {
        const mockedConfiguration = {test: true};
        const configurationKey = "dummy";
        const mockedField: IField = {
            getConfiguration: jest.fn(key => key === configurationKey ? mockedConfiguration : null),
        } as any;
        const test = new DummyConfiguration(mockedField, configurationKey).config('test');
        expect(test).toEqual(true);
    });


    it('should update configuration', function () {
        const mockedConfiguration = {test: true, foo: 'bar'};
        const configurationKey = "dummy";
        const mockedField: IField = {
            getConfiguration: jest.fn(key => key === configurationKey ? mockedConfiguration : null),
            updateConfiguration: jest.fn()
        } as any;
        const afterChange = jest.fn();
        new DummyConfiguration(mockedField, configurationKey).update('test', false, afterChange);

        expect(mockedField.updateConfiguration).toBeCalledWith(configurationKey, {
            test: false,
            foo: 'bar'
        }, afterChange);
    });

    it('should not update configurations that marked as unUpdatable', function () {
        const configurationKey = "dummy";
        const mockedField: IField = {
            getConfiguration: jest.fn(),
            updateConfiguration: jest.fn()
        } as any;
        const configuration = new DummyConfiguration(mockedField, configurationKey);

        expect(() => configuration.update('x', false)).toThrowError('cannot update x');
    });

});