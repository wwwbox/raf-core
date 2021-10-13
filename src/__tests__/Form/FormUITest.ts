import {FormUIService} from "../../Form/FormUI/FormUIService";
import {FormTestUtils} from "../../TestingUtils/FormTestUtils";
import {IEventService} from "../../Form/FormEvent/EventService";
import {mock} from "jest-mock-extended";
import {GlobalEvents} from "../../Event/DefaultEvents";

describe("FormUI", () => {

    it('should return isLoading', function () {
        const ui = new FormUIService(FormTestUtils.makeForm([], {
            getInternalState: jest.fn().mockReturnValue({isLoading: true}),
        }));
        const isLoading = ui.isLoading();
        expect(isLoading).toEqual(true);
    });

    it('should start loading', function () {
        const updateInternalState = jest.fn((_: any, callback: any) => callback());
        const mockedEvent = mock<IEventService>();
        const ui = new FormUIService(FormTestUtils.makeForm([], {
            updateInternalState: updateInternalState,
            eventService: () => mockedEvent,
        }));
        ui.startLoading();
        expect(updateInternalState).toBeCalledWith({isLoading: true}, expect.any(Function));
        expect(mockedEvent.emit).toBeCalledWith(GlobalEvents.FORM_START_LOADING, {});
    });

    it('should stop loading', function () {
        const updateInternalState = jest.fn((_: any, callback: any) => callback());
        const mockedEvent = mock<IEventService>();
        const ui = new FormUIService(FormTestUtils.makeForm([], {
            updateInternalState: updateInternalState,
            eventService: () => mockedEvent,
        }));
        ui.stopLoading();
        expect(updateInternalState).toBeCalledWith({isLoading: false}, expect.any(Function));
        expect(mockedEvent.emit).toBeCalledWith(GlobalEvents.FORM_END_LOADING, {});
    });

})