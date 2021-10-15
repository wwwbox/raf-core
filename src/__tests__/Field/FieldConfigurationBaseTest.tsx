import {FieldConfigurationServiceBase} from "../../Field/Configuration/FieldConfigurationService";
import IField from "../../Field/IField";
import {FieldConfigurationTestUtils} from "../../TestingUtils/FieldConfigurationTestUtils";

class DummyConfiguration extends FieldConfigurationServiceBase<any> {

    constructor(field: IField, configurationKey: string) {
        super(field, configurationKey);
    }

    protected unUpdatableKeys(): (keyof any)[] {
        return ["x"];
    }
}

const testUtils = new FieldConfigurationTestUtils<any, DummyConfiguration>("dummy" as any, field => new DummyConfiguration(field, "dummy"));

describe('FieldConfigurationBase', () => {

    it('should get configuration', function () {
        testUtils.testGet("test", true, d => d.config('test'));
    });


    it('should update configuration', function () {
        const afterChangeMock = jest.fn();
        testUtils.testSet("test", false, d => d.update('test', false, afterChangeMock), {
            test: true,
            foo: 'bar'
        }, afterChangeMock);
    });

    it('should not update configurations that marked as unUpdatable', function () {
        testUtils.testUnupdatableConfiguration('x');
    });

});