import SimpleFormRenderer from "../../lib/DefaultElement/SimpleFormRenderer";
import React from "react";
import SimpleFieldRenderer from "../../lib/DefaultElement/SimpleFieldRenderer";
import DummyField from "../../lib/TestingUtils/DummyField";
import FieldConfig from "../../lib/Field/FieldConfig";

describe('simple renderer', () => {

    it('should render form', function () {
        const form: any = {
            submit: () => undefined
        };
        const content = <h1>TEST</h1>;
        const renderer = new SimpleFormRenderer(form);
        const actual = renderer.render(content);
        expect(actual.type).toEqual("div");
        expect(renderer.getForm()).toBe(form);
    });

    it('should render field', function () {
        const config: FieldConfig = {
            as: DummyField, name: 'test'
        };
        const form: any = {getRenderConfig: () => [config], getValidator: () => undefined};
        const fieldRenderer = new SimpleFieldRenderer(form);
        const component = fieldRenderer.render();
        const props = component.props.children[0].props;

        expect(props).toEqual({
            ...config, defaultValidator: undefined, form: form
        });
        expect(component.props.children).toHaveLength(1);
    });

});