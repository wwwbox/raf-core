import {FormTestUtils} from "../../TestingUtils/FormTestUtils";
import {FieldEventService} from "../../Field/Service/FieldEventService";
import {mock} from "jest-mock-extended";
import IField from "../../Field/IField";
import {FieldType} from "../../Field/FieldType";
import {FieldValueService} from "../../Field/Service/FieldValueService";
import {FieldUIService} from "../../Field/Service/FieldUIService";
import {FieldValidator} from "../../Field/Service/FieldValidator";
import DefaultDynamicFieldChangeHandler from "../../ChangeHandler/DefaultDynamicFieldChangeHandler";

describe('DefaultDynamicFieldChangeHandler', () => {

    function createField(mockedSet: any, currentValue: any[]): IField {
        return FormTestUtils.createMockedField('X', FieldType.NORMAL, {
            valueService: () => mock<FieldValueService>({
                set: mockedSet,
                extractFromEvent: e => e.value,
                get(): any {
                    return currentValue;
                }
            }),
            uiService: () => mock<FieldUIService>(),
            validator: () => mock<FieldValidator>({
                config(): any {
                    return true
                }
            }),
            event: () => mock<FieldEventService>()
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