import DefaultFieldChangeHandler from "../../lib/ChangeHandler/DefaultFieldChangeHandler";
import IField from "../../lib/Field/IField";

describe('change handler', () => {


    it('should stop changing when field is readonly', function () {
        const isReadonlyMock = jest.fn().mockReturnValue(true);
        const fakeField: any = {
            isReadonly: isReadonlyMock,
            setValue(): void {
                throw Error('THIS SHOULD NOT BE CALLED');
            }
        };

        const handler = new DefaultFieldChangeHandler(fakeField);
        handler.handle('some_value');
        expect(isReadonlyMock).toHaveReturnedWith(true);
    });


    it('should stop changing when isLoading and disable on loading set to true', function () {
        const isReadonlyMock = jest.fn().mockReturnValue(false);
        const isLoadingMock = jest.fn().mockReturnValue(true);
        const isDisableOnLoadingMock = jest.fn().mockReturnValue(true);
        const fakeField: any = {
            isReadonly: isReadonlyMock,
            isLoading: isLoadingMock,
            isDisableOnLoading: isDisableOnLoadingMock,
            getProps(): void {
                throw Error('THIS SHOULD NOT BE CALLED');
            }
        };

        const handler = new DefaultFieldChangeHandler(fakeField);
        handler.handle('some_value');
        expect(isReadonlyMock).toHaveReturnedWith(false);
        expect(isLoadingMock).toHaveReturnedWith(true);
        expect(isDisableOnLoadingMock).toHaveReturnedWith(true);
    });


    it('should use passed onChange prop', function (done) {
        const isReadonlyMock = jest.fn().mockReturnValue(false);
        const isLoadingMock = jest.fn().mockReturnValue(false);
        const isDisableOnLoadingMock = jest.fn().mockReturnValue(false);
        const fakeField: any = {
            isReadonly: isReadonlyMock,
            isLoading: isLoadingMock,
            isDisableOnLoading: isDisableOnLoadingMock,
            getProps: () => {
                return {
                    onChange: (e: any) => {
                        expect(e).toEqual('some_value');
                        done();
                    }
                }
            }
        };

        const handler = new DefaultFieldChangeHandler(fakeField);
        handler.handle('some_value');
    });


    it('should use passed onChange prop', function () {
        const isReadonlyMock = jest.fn().mockReturnValue(false);
        const isLoadingMock = jest.fn().mockReturnValue(false);
        const isDisableOnLoadingMock = jest.fn().mockReturnValue(false);
        const fakeField: any = {
            isReadonly: isReadonlyMock,
            isLoading: isLoadingMock,
            isDisableOnLoading: isDisableOnLoadingMock,
            getProps: () => {
                return {
                    afterChange: (e: any, value: any, field: IField) => {
                        expect(e).toEqual('some_value');
                        expect(value).toEqual('some_value');
                        expect(field).toBe(fakeField);
                    }
                }
            },
            setValue: (value: any, validateAfterChange: boolean, afterChanged: () => void) => {
                expect(value).toEqual('some_value');
                expect(validateAfterChange).toEqual(false);
                afterChanged();
            },
            getForm: () => {
                return {
                    onAnyValueChanged: (key: string, value: any, field: IField) => {
                        expect(key).toEqual('some_name');
                        expect(value).toEqual('some_value');
                        expect(field).toBe(fakeField);
                    }
                }
            },
            getName: () => 'some_name',
            extractValueFromChangeEvent: (e: any) => e,
            isValidateOnChange: () => true,
            shouldValidate: () => false,
        };

        const handler = new DefaultFieldChangeHandler(fakeField);
        handler.handle('some_value');
    });


});