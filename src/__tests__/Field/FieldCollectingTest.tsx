import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Field from "../../Field/Concrete/Field";
import * as React from "react";
import {FieldProps} from "../../Field/FieldProps";
import {
    FieldCollectingConfiguration,
    getDefaultFieldCollectingConfiguration
} from "../../Field/Collecting/FieldCollectingConfiguration";
import {FieldCollecting} from "../../Field/Collecting/FieldCollecting";
import IField from "../../Field/IField";

Enzyme.configure({adapter: new Adapter()});


describe('FieldCollecting', () => {


    const FIELD_NAME = "field";
    const FIELD_AS: any = 'div';

    let field: IField;

    function getFieldCollectingInstance(config: FieldCollectingConfiguration) {
        const props: FieldProps = {
            as: FIELD_AS,
            name: FIELD_NAME,
            injectedEventNameMaker: {} as any,
            injectedValidator: {} as any,
            ...config,
            form: {fields: jest.fn().mockReturnValue({register: jest.fn()})} as any
        };
        const component = mount(<Field  {...props} />);
        field = component.instance() as Field;

        return new FieldCollecting(field, "collecting");
    }

    it('should set/get isQuery', function () {
        const fieldCollecting = getFieldCollectingInstance({
            ...getDefaultFieldCollectingConfiguration(),
            asQuery: true
        });
        expect(fieldCollecting.isAsQuery()).toEqual(true);
        fieldCollecting.setAsQuery(false);
        expect(fieldCollecting.isAsQuery()).toEqual(false);
    });

    it('should set/get isReady', function () {
        const fieldCollecting = getFieldCollectingInstance({
            ...getDefaultFieldCollectingConfiguration(),
            ready: false
        });
        expect(fieldCollecting.isReady()).toEqual(false);
        fieldCollecting.setReady(true);
        expect(fieldCollecting.isReady()).toEqual(true);
    });

    it('should set/get skipCollecting', function () {
        const fieldCollecting = getFieldCollectingInstance({
            ...getDefaultFieldCollectingConfiguration(),
            skipCollecting: true
        });
        expect(fieldCollecting.shouldSkip()).toEqual(true);
        fieldCollecting.setSkip(false);
        expect(fieldCollecting.shouldSkip()).toEqual(false);
    });


    it('should collect', function () {
        const fieldCollecting = getFieldCollectingInstance({
            ...getDefaultFieldCollectingConfiguration(),
            collect: () => "test"
        });
        const collected = fieldCollecting.collect();
        expect(collected).toEqual("test");
    });

    it('should not able to update collect', function () {
        const fieldCollecting = getFieldCollectingInstance(getDefaultFieldCollectingConfiguration());
        expect(() => fieldCollecting.update("collect" , null)).toThrowError();
    });


});