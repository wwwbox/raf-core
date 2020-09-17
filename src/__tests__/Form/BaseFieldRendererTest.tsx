import BaseFieldRenderer from "../../Form/BaseFieldRenderer";
import FieldConfig from "../../Field/FieldConfig";
import React from "react";
import DummyField from "../../TestingUtils/DummyField";


class DummyWrapper extends React.Component {
    render() {
        return <div>{this.props.children}</div>
    }
}

class FakeFieldsRenderer extends BaseFieldRenderer {
    protected renderFieldElement = (config: FieldConfig, inArray: boolean): React.ReactElement => {
        return <DummyField key={config.name as any} form={this.getForm()} {...config} inArray={inArray}/>;
    };

    protected renderWrapper = (fields: any): React.ReactElement => {
        return <DummyWrapper>{fields}</DummyWrapper>
    }

}

describe('', () => {

    it('should return form instance', function () {
        const form: any = {};
        const renderer = new FakeFieldsRenderer(form);
        expect(renderer.getForm()).toBe(form);
    });

    it('should render fields', function () {

        const form: any = {
            getRenderConfig: () => {
                return [
                    {name: 'name', width: 180},
                    {name: 'address'},
                    [
                        {name: 'username'},
                        {name: 'password', type: 'password'}
                    ]
                ]
            }
        };

        const renderer = new FakeFieldsRenderer(form);

        const wrapper: DummyWrapper = renderer.render();
        const children: any = wrapper.props.children;

        expect(children).toHaveLength(3);
        expect(children[0].props.name).toEqual('name');
        expect(children[0].props.form).toBe(form);
        expect(children[0].props.inArray).toBeFalsy();
    });

});