import FieldChangeHandler from "../../lib/protocol/FieldChangeHandler";
import IField from "../../lib/field/IField";
import Enzyme, {mount} from "enzyme";
import * as React from "react";
import Adapter from "enzyme-adapter-react-16";
import FileField from "../../lib/field/FileField";
import DefaultFileFieldChangeHandler from "../../lib/ChangeHandler/DefaultFileFieldChangeHandler";

Enzyme.configure({adapter: new Adapter()});

describe('FileField', () => {

    let handler: FieldChangeHandler = {
        getField(): IField {
            return null as any;
        }, handle: jest.fn()
    };

    it('should return true isFileField', function () {
        const props = {
            name: 'testName', form: null as any, loading: true,
            onValidation: (validationState: any, p: any) => {
                expect(validationState).toEqual('something wrong');
                expect(p).toBe(field);

            },
            changeHandler: () => handler
        };
        const component = mount(<FileField {...props} />);
        const field = component.instance() as FileField;
        expect(field.isFileField()).toEqual(true);
        expect(field.getDefaultChangeHandler()).toBeInstanceOf(DefaultFileFieldChangeHandler);
        expect(field.getDefaultChangeHandler().getField()).toBe(field);
    });


});