import {FormFieldManager} from "../../Form/FieldManager/FormFieldManager";
import {tfGetForm} from "./TestingFormUtils";
import {mock} from "jest-mock-extended";
import IField from "../../Field/IField";

describe('FormFieldManagerTest', () => {

    it('should register field / get all registered', function () {
        const fields = new FormFieldManager(tfGetForm([]));
        const field1 = mock<IField>({
            getName(): string {
                return "x"
            }
        });
        fields.register(field1);
        expect(fields.getAllRegistered()).toHaveLength(1);
        expect(fields.getAllRegistered()[0].getName()).toEqual("x");
        const field2 = mock<IField>({
            getName(): string {
                return "y"
            }
        });
        fields.register(field2);
        expect(fields.getAllRegistered()).toHaveLength(2);
        expect(fields.getAllRegistered()[1].getName()).toEqual("y");
    });

    it('should get registered field', function () {
        const fields = new FormFieldManager(tfGetForm([]));
        const field1 = mock<IField>({
            getName(): string {
                return "x"
            }
        });
        fields.register(field1);
        const field2 = mock<IField>({
            getName(): string {
                return "y"
            }
        });
        fields.register(field2);

        expect(fields.getRegistered("x")).not.toBeNull();
        expect(fields.getRegistered("z")).toBeNull();
    });

    it('should return fields options', function () {
        const options = ['x', 'y'];
        const fields = new FormFieldManager(tfGetForm([], {
            getProps: jest.fn().mockReturnValue({fields: options})
        }));
        expect(fields.getFieldsOptions()).toEqual(options)
    });
});