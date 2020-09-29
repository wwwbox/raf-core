import {FormTestUtils} from "../../TestingUtils/FormTestUtils";
import {IFieldEvent} from "../../Field/FieldEvent/FieldEvent";
import {mock} from "jest-mock-extended";
import IField from "../../Field/IField";
import {FieldType} from "../../Field/Concrete/FieldType";
import {IFieldValue} from "../../Field/Value/FieldValue";
import {IFieldUI} from "../../Field/UI/FieldUI";
import {IFieldValidation} from "../../Field/Validation/FieldValidation";
import DefaultDynamicFieldChangeHandler from "../../ChangeHandler/DefaultDynamicFieldChangeHandler";

describe('DefaultDynamicFieldChangeHandler', () => {

    function createField(mockedSet: any, currentValue: any[]): IField {
        return FormTestUtils.createMockedField('X', FieldType.NORMAL, {
            value: () => mock<IFieldValue>({
                set: mockedSet,
                extractFromEvent: e => e.value,
                get(): any {
                    return currentValue;
                }
            }),
            ui: () => mock<IFieldUI>(),
            validation: () => mock<IFieldValidation>({
                config(): any {
                    return true
                }
            }),
            event: () => mock<IFieldEvent>()
        });
    }


    it('should change value', function () {
        const mockedSet = jest.fn();
        const field = createField(mockedSet, ['ali', 'faris', 'compiler']);
        const changeHandler = new DefaultDynamicFieldChangeHandler(field);
        changeHandler.handle({value: 'TEST', index: 1});
        expect(mockedSet).toBeCalledWith(['ali', 'TEST', 'compiler'], false, expect.any(Function));
    });

});