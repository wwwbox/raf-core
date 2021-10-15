import * as React from "react";
import {
    FieldCollectingConfiguration,
    getDefaultFieldCollectingConfiguration
} from "../../Field/Configuration/FieldCollectingConfiguration";
import {DefaultFieldCollector} from "../../Field/Service/FieldCollector";
import {FieldValueService} from "../../Field/Service/FieldValueService";
import {mock} from "jest-mock-extended";
import {FieldConfigurationTestUtils} from "../../TestingUtils/FieldConfigurationTestUtils";


describe('FieldCollecting', () => {

    const testUtils = new FieldConfigurationTestUtils<FieldCollectingConfiguration, DefaultFieldCollector>("collecting",
        field => new DefaultFieldCollector(field, "collecting")
    );


    it('should set/get isQuery', function () {
        testUtils.testGet("asQuery", true, c => c.isAsQuery());
        testUtils.testSet("asQuery", false, c => c.setAsQuery(false));
    });

    it('should set/get isReady', function () {
        testUtils.testGet("ready", false, c => c.isReady());
        testUtils.testSet("ready", true, c => c.setReady(true));
    });

    it('should set/get skipCollecting', function () {
        testUtils.testGet("skipCollecting", true, c => c.shouldSkip());
        testUtils.testSet("skipCollecting", false, c => c.setSkip(false));
    });


    it('should collect', function () {
        const collecting = testUtils.getInstance({collect: () => "test"});
        const collected = collecting.collect();
        expect(collected).toEqual("test");
    });

    it('should not able to update collect', function () {
        testUtils.testUnupdatableConfiguration("collect");
    });


});


describe('FieldCollectingDefaults', () => {


    it('should return defaults', function () {
        const {collect, ...defaults} = getDefaultFieldCollectingConfiguration();
        expect(defaults).toEqual({
            asQuery: false,
            ready: true,
            skipCollecting: false,
        });
        const valueMock = mock<FieldValueService>({
            get(): any {
                return "test";
            }
        });

        const mockField: any = {valueService: () => valueMock};
        const value = collect(mockField);
        expect(value).toEqual("test");
    });
})