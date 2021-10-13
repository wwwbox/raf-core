import {DefaultSubmitter} from "../../Defaults/Services/DefaultSubmitter";
import {FormTestUtils} from "../../TestingUtils/FormTestUtils";
import {IFormCollector} from "../../Form/FormCollecting/IFormCollector";
import {mock} from "jest-mock-extended";
import {IFormEvent} from "../../Form/FormEvent/FormEvent";
import {FormUIService, IFormUIService} from "../../Form/FormUI/FormUIService";
import {GlobalEvents} from "../../Event/DefaultEvents";

describe("DefaultSubmitter", () => {

    function setupXmlHttpRequest(mockedOpen: any, mockedSend: any, mockedRequestHeader: any, onReadyStatus: any) {
        const xhrMockClass: any = () => ({
            open: mockedOpen,
            send: mockedSend,
            onreadystatechange: onReadyStatus,
            setRequestHeader: mockedRequestHeader,
            DONE: 4,
        });

        (window as any).XMLHttpRequest = jest.fn().mockImplementation(xhrMockClass);
        return xhrMockClass;
    }

    function makeForm(submitOptions: any, mockedEvent: IFormEvent = mock<IFormEvent>(), hasFiles: boolean = false, files: any = {}, data: any = {}, query: any = {}, mockedUi: IFormUIService = mock<IFormUIService>()) {
        return FormTestUtils.makeForm([], {
            getProps: () => ({extra: {submitOptions: submitOptions}}),
            collecting: () => mock<IFormCollector>({
                files(): any {
                    return files;
                },
                data(): any {
                    return data;
                },
                hasFiles(): boolean {
                    return hasFiles;
                },
                query(): any {
                    return query;
                }
            }),
            event: () => mockedEvent,
            uiService: () => mockedUi
        });
    }

    it('should use submit options', function () {
        const mockedOpen = jest.fn();
        setupXmlHttpRequest(mockedOpen, jest.fn(), jest.fn(), jest.fn());

        const form = makeForm({method: "XYZ", url: "http://test.com/"});
        const submitter = new DefaultSubmitter(form);
        submitter.submit();
        expect(mockedOpen).toBeCalledWith("XYZ", "http://test.com/", true);
    });

    it('should use query', function () {
        const mockedOpen = jest.fn();
        setupXmlHttpRequest(mockedOpen, jest.fn(), jest.fn(), jest.fn());

        const form = makeForm({method: "XYZ", url: "http://test.com/"}, mock<IFormEvent>(), false, {}, {}, {
            search: 'test'
        });
        const submitter = new DefaultSubmitter(form);
        submitter.submit();
        expect(mockedOpen).toBeCalledWith("XYZ", "http://test.com/?search=test", true);
    });

    it('should detect content type', function () {
        const mockedSetHeaders = jest.fn();
        setupXmlHttpRequest(jest.fn(), jest.fn(), mockedSetHeaders, jest.fn());
        const form = makeForm({url: "http://test.com/", autoDetectContentType: true}, mock<IFormEvent>(), true, {}, {});
        const submitter = new DefaultSubmitter(form);
        submitter.submit();
        expect(mockedSetHeaders).toBeCalledWith("Content-Type", "multipart/form-data");
    });

    it('should not detect content type when autoDetectContentType set to false', function () {
        const mockedSetHeaders = jest.fn();
        setupXmlHttpRequest(jest.fn(), jest.fn(), mockedSetHeaders, jest.fn());
        const form = makeForm({
            url: "http://test.com/",
            autoDetectContentType: false,
            contentType: "application/json"
        }, mock<IFormEvent>(), true, {}, {});
        const submitter = new DefaultSubmitter(form);
        submitter.submit();
        expect(mockedSetHeaders).toBeCalledWith("Content-Type", "application/json");
    });

    it('should use FromData when has files', function () {
        const mockedSend = jest.fn();
        setupXmlHttpRequest(jest.fn(), mockedSend, jest.fn(), jest.fn());
        const form = makeForm({
            url: "http://test.com/", autoDetectContentType: true
        }, mock<IFormEvent>(), true, {"image": "image_file"}, {name: "test"});
        const submitter = new DefaultSubmitter(form);
        submitter.submit();
        const expectedData = new FormData();
        expectedData.append("image", "image_file");
        expectedData.append("name", "test");
        expect(mockedSend).toBeCalledWith(expect.any(FormData));
    });

    it('should use json when no files', function () {
        const mockedSend = jest.fn();
        setupXmlHttpRequest(jest.fn(), mockedSend, jest.fn(), jest.fn());
        const form = makeForm({
            url: "http://test.com/", autoDetectContentType: true
        }, mock<IFormEvent>(), false, {"image": "image_file"}, {name: "test"});
        const submitter = new DefaultSubmitter(form);
        submitter.submit();
        expect(mockedSend).toBeCalledWith(JSON.stringify({name: 'test'}));
    });

    it('should make form start loading when updateUi option set to true', function () {
        const ui = mock<FormUIService>();
        setupXmlHttpRequest(jest.fn(), jest.fn(), jest.fn(), jest.fn());
        const form = makeForm({url: "http://test.com/", updateUi: true}, mock<IFormEvent>(), false, {}, {}, {}, ui);
        const submitter = new DefaultSubmitter(form);
        submitter.submit();
        expect(ui.startLoading).toBeCalled();
    });

    it('should emit start submitting event', function () {
        setupXmlHttpRequest(jest.fn(), jest.fn(), jest.fn(), jest.fn());
        const mockedEvent = mock<IFormEvent>();
        const form = makeForm({url: "http://test.com/", updateUi: true}, mockedEvent, false, {}, {}, {});
        const submitter = new DefaultSubmitter(form);
        submitter.submit();
        expect(mockedEvent.emit).toBeCalledWith(GlobalEvents.SUBMIT_START, expect.anything());
    });

    it('should stop loading when request done', function () {
        const onReadyStatus = jest.fn();
        setupXmlHttpRequest(jest.fn(), jest.fn(), jest.fn(), onReadyStatus);
        const mockedUi = mock<IFormUIService>();
        const form = makeForm({
            url: "http://test.com/",
            updateUi: true
        }, mock<IFormEvent>(), false, {}, {}, {}, mockedUi);
        const submitter = new DefaultSubmitter(form);
        submitter.submit();
        submitter.onResponse({readyState: XMLHttpRequest.DONE} as any);
        expect(mockedUi.stopLoading).toBeCalled();
    });

    it('should emit submit succeeded/completed', function () {
        setupXmlHttpRequest(jest.fn(), jest.fn(), jest.fn(), jest.fn());
        const mockedEvent = mock<IFormEvent>();
        const form = makeForm({url: "http://test.com/"}, mockedEvent);
        const submitter = new DefaultSubmitter(form);
        submitter.submit();
        submitter.onResponse({readyState: XMLHttpRequest.DONE, status: 200} as any);
        expect(mockedEvent.emit).toHaveBeenCalledWith(GlobalEvents.SUBMIT_SUCCEEDED, expect.anything());
        expect(mockedEvent.emit).not.toHaveBeenCalledWith(GlobalEvents.SUBMIT_FAILED, expect.anything());
        expect(mockedEvent.emit).toHaveBeenCalledWith(GlobalEvents.SUBMIT_COMPLETED, expect.anything());
    });

    it('should emit submit failed/complete', function () {
        setupXmlHttpRequest(jest.fn(), jest.fn(), jest.fn(), jest.fn());
        const mockedEvent = mock<IFormEvent>();
        const form = makeForm({url: "http://test.com/"}, mockedEvent);
        const submitter = new DefaultSubmitter(form);
        submitter.submit();
        submitter.onResponse({readyState: XMLHttpRequest.DONE, status: 400} as any);
        expect(mockedEvent.emit).not.toHaveBeenCalledWith(GlobalEvents.SUBMIT_SUCCEEDED, expect.anything());
        expect(mockedEvent.emit).toHaveBeenCalledWith(GlobalEvents.SUBMIT_FAILED, expect.anything());
        expect(mockedEvent.emit).toHaveBeenCalledWith(GlobalEvents.SUBMIT_COMPLETED, expect.anything());
    });

});