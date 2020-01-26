import DefaultFieldChangeHandler from "../../lib/ChangeHandler/DefaultFieldChangeHandler";
import DefaultDynamicFieldChangeHandler from "../../lib/ChangeHandler/DefaultDynamicFieldChangeHandler";

describe('change handler', () => {

    it('should use passed onChange prop', function () {
        const isReadonlyMock = jest.fn().mockReturnValue(false);
        const isLoadingMock = jest.fn().mockReturnValue(false);
        const isDisableOnLoadingMock = jest.fn().mockReturnValue(false);
        const fakeField: any = {
            isReadonly: isReadonlyMock,
            isLoading: isLoadingMock,
            isDisableOnLoading: isDisableOnLoadingMock,
            getProps: () => ({}),
            setValue: (value: any) => {
                expect(value).toEqual(['some_value', 'B']);
            },
            getValue: () => {
                return ['A', 'B'];
            },
            getForm: () => {
                return {
                    onAnyValueChanged: () => undefined
                }
            },
            getName: () => 'some_name',
            extractValueFromChangeEvent: (e: any) => e.value,
            isValidateOnChange: () => true,
            shouldValidate: () => false,
        };

        const handler = new DefaultDynamicFieldChangeHandler(fakeField);
        handler.handle({
            index: 0,
            value: 'some_value'
        });
    });


});