import {DynamicFieldConfiguration, DynamicFieldExtra} from "../../Field/Configuration/DynamicFieldExtra";
import {FieldConfigurationTestUtil} from "../../TestingUtils/FieldConfigurationTestUtil";

describe('DynamicFieldExtra', () => {


    const testUtils = new FieldConfigurationTestUtil<DynamicFieldConfiguration, DynamicFieldExtra>("extra",
        field => new DynamicFieldExtra(field, "extra")
    );

    it('should return max input', function () {
        testUtils.testGet('maxInput', 1, e => e.getMaxInput());
    });


    it('should set max input', function () {
        const mockedConfiguration = {
            maxInput: 1,
            onItemAdded: jest.fn()
        };
        testUtils.testSet('maxInput', 2, e => e.setMaxInput(2), mockedConfiguration);
    });


    it('should get on item added', function () {
        const mockOnItemAdded = jest.fn();
        testUtils.testGet('onItemAdded', mockOnItemAdded, e => e.getOnItemAdded());
    });

    it('should get on input filled', function () {
        const onInputFilledMock = jest.fn();
        testUtils.testGet('onInputFilled', onInputFilledMock, e => e.getOnInputFilled());
    });

    it('should get on item added', function () {
        const onMaxInputExceedMock = jest.fn();
        testUtils.testGet('onMaxInputExceed', onMaxInputExceedMock, e => e.getOnMaxInputExceed());
    });

    it('should get on item added', function () {
        const onItemRemovedMock = jest.fn();
        testUtils.testGet('onItemRemoved', onItemRemovedMock, e => e.getOnItemRemoved());
    });

});