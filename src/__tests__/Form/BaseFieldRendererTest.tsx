import BaseFieldsRenderer from "../../lib/Form/BaseFieldsRenderer";
import FieldConfig from "../../lib/Field/FieldConfig";
import React from "react";
import Field from "../../lib/Field/Field";


class DummyField extends Field {
    render(): any {
        return <input/>
    }

    public getProps = () => {
        return this.props;
    }
}

class DummyWrapper extends React.Component {
    render() {
        return <div>{this.props.children}</div>
    }
}

class FakeFieldsRenderer extends BaseFieldsRenderer {
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
        expect(children[2]).toHaveLength(2);
        expect(children[2][0].props.inArray).toEqual(true);

    });

});