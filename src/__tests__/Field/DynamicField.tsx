import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import * as React from "react";
import DynamicField from "../../Field/Concrete/DynamicField";
import DefaultDynamicFieldChangeHandler from "../../ChangeHandler/DefaultDynamicFieldChangeHandler";

Enzyme.configure({adapter: new Adapter()});

describe('dynamic field', () => {


    it('should start with array of one empty string when no starting value provided', function () {
        const form: any = {registerField: jest.fn()};
        let props = {name: 'testName', loading: true, form: form};
        let component = mount(<DynamicField  {...props} />);
        let field = component.instance() as DynamicField;

        expect(field.getDynamicValue()).toEqual(['']);
    });

    it('should start with array of one startingValue (non-array)', function () {
        const form: any = {registerField: jest.fn()};
        let props = {name: 'testName', loading: true, form: form, startingValue: 'test'};
        let component = mount(<DynamicField  {...props} />);
        let field = component.instance() as DynamicField;

        expect(field.getDynamicValue()).toEqual(['test']);
    });

    it('should start with array of one startingValue (array)', function () {
        const form: any = {registerField: jest.fn()};
        let props = {name: 'testName', loading: true, form: form, startingValue: ['A', 'B']};
        let component = mount(<DynamicField  {...props} />);
        let field = component.instance() as DynamicField;

        expect(field.getDynamicValue()).toEqual(['A', 'B']);
    });


    it('should add input', function () {
        const form: any = {registerField: jest.fn()};
        let props = {
            name: 'testName',
            loading: true,
            form: form,
            changeHandler: (field: any) => new DefaultDynamicFieldChangeHandler(field)
        };
        let component = mount(<DynamicField  {...props} />);
        let field = component.instance() as DynamicField;

        field.addInput('X');
        expect(field.getDynamicValue()).toEqual(['', 'X']);
        field.addInput();
        expect(field.getDynamicValue()).toEqual(['', 'X', '']);
    });

    it('should remove input', function () {
        const form: any = {registerField: jest.fn()};
        let props = {name: 'testName', loading: true, form: form, startingValue: ['A', 'B', 'C']};
        let component = mount(<DynamicField  {...props} />);
        let field = component.instance() as DynamicField;

        field.removeInput(1);
        expect(field.getDynamicValue()).toEqual(['A', 'C']);
    });

    it('should prevent adding when maxInput exceed', function () {
        const form: any = {registerField: jest.fn()};
        let props = {name: 'testName', maxInputs: 4, loading: true, form: form, startingValue: ['A', 'B', 'C']};
        let component = mount(<DynamicField  {...props} />);
        let field = component.instance() as DynamicField;
        field.addInput('');
        expect(field.getDynamicValue()).toEqual(['A', 'B', 'C', '']);
        field.addInput();
        expect(field.getDynamicValue()).toEqual(['A', 'B', 'C', '']);
    });

    it('should prevent adding when maxInput exceed and call onMaxInputExceeded', function () {
        const form: any = {registerField: jest.fn()};
        let props = {
            name: 'testName', maxInputs: 3, onMaxInputExceeded: (f: any) => {
                expect(f).toBe(field);
            }, loading: true, form: form, startingValue: ['A', 'B', 'C']
        };
        let component = mount(<DynamicField  {...props} />);
        let field = component.instance() as DynamicField;
        field.addInput('');
    });

});