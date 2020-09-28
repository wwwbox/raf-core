import {FormFieldManager} from "../../Form/FieldManager/FormFieldManager";
import {FormTestUtils} from "../../TestingUtils/FormTestUtils";

describe('FormFieldManagerTest', () => {

    it('should register field / get all registered', function () {
        const fields = new FormFieldManager(FormTestUtils.makeForm());
        fields.register(FormTestUtils.createMockedField('x'));
        expect(fields.getAllRegistered()).toHaveLength(1);
        expect(fields.getAllRegistered()[0].getName()).toEqual("x");
        fields.register(FormTestUtils.createMockedField('y'));
        expect(fields.getAllRegistered()).toHaveLength(2);
        expect(fields.getAllRegistered()[1].getName()).toEqual("y");
    });

    it('should get registered field', function () {
        const fields = new FormFieldManager(FormTestUtils.makeForm());
        fields.register(FormTestUtils.createMockedField('x'));
        fields.register(FormTestUtils.createMockedField('y'));
        expect(fields.getRegistered("x")).not.toBeNull();
        expect(fields.getRegistered("z")).toBeNull();
    });

    it('should return fields options', function () {
        const options = ['x', 'y'];
        const fields = new FormFieldManager(FormTestUtils.makeForm([], {
            getProps: jest.fn().mockReturnValue({fields: options})
        }));
        expect(fields.getFieldsOptions()).toEqual(options)
    });
});