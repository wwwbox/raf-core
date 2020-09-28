import {FormUI} from "../../Form/FormUI/FormUI";
import {FormTestUtils} from "../../TestingUtils/FormTestUtils";

describe("FormUI", () => {

    it('should return isLoading', function () {
        const ui = new FormUI(FormTestUtils.makeForm([], {
            getInternalState: jest.fn().mockReturnValue({isLoading: true})
        }));
        const isLoading = ui.isLoading();
        expect(isLoading).toEqual(true);
    });

    it('should return isLoading', function () {
        const updateInternalState = jest.fn();
        const ui = new FormUI(FormTestUtils.makeForm([], {
            updateInternalState: updateInternalState
        }));
        ui.startLoading();
        expect(updateInternalState).toBeCalledWith({isLoading: true});
    });

    it('should return isLoading', function () {
        const updateInternalState = jest.fn();
        const ui = new FormUI(FormTestUtils.makeForm([], {
            updateInternalState: updateInternalState
        }));
        ui.stopLoading();
        expect(updateInternalState).toBeCalledWith({isLoading: false});
    });

})