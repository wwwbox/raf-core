import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Field from "../../lib/field/Field";
import * as React from "react";

Enzyme.configure({adapter: new Adapter()});

describe('field', () => {

    it('should change/get value', function () {
        const props = {name: '', form: null as any, loading: true};
        const component = mount(<Field {...props} />);
        const field = component.instance() as Field;
        expect(field.getValue()).toEqual('');
        field.setValue('ali');
        expect(field.getValue()).toEqual('ali');
    });


});