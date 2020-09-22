import {FormEvent} from "../../Form/FormEvent/FormEvent";
import {tfGetForm} from "../../TestingUtils/TestingFormUtils";
import {DefaultEventNameMaker} from "../../Event/IEventNameMaker";

describe('FormEvent', () => {

    it('test addListener,removeListener,hasListener,emit (workflow)', function () {

        const form = tfGetForm([]);
        const event = new FormEvent(form);

        const e1Id1Callback = jest.fn();
        event.addListener('1', 'E_1', e1Id1Callback);

        expect(event.hasListener('1', 'E_1')).toEqual(true);

        const e1Id2Callback = jest.fn();
        event.addListener('2', 'E_1', e1Id2Callback);

        expect(event.hasListener('1', 'E_1')).toEqual(true);
        expect(event.hasListener('2', 'E_1')).toEqual(true);

        const e2id1Callback = jest.fn();
        event.addListener('1', 'E_2', e2id1Callback);

        expect(event.hasListener('1', 'E_1')).toEqual(true);
        expect(event.hasListener('2', 'E_1')).toEqual(true);
        expect(event.hasListener('1', 'E_2')).toEqual(true);


        //EMIT
        event.emit('E_1', {value: true});
        expect(e1Id1Callback).toBeCalledWith(form, {value: true});
        expect(e1Id2Callback).toBeCalledWith(form, {value: true});
        expect(e2id1Callback).not.toBeCalled();

        event.emit('E_2', {value: false});
        expect(e1Id1Callback).toBeCalledTimes(1);
        expect(e1Id2Callback).toBeCalledTimes(1);
        expect(e2id1Callback).toBeCalledWith(form, {value: false});

        //remove listeners
        event.removeListener('1', 'E_1');
        expect(event.hasListener('1', 'E_1')).toEqual(false);
        expect(event.hasListener('2', 'E_1')).toEqual(true);
        expect(event.hasListener('1', 'E_2')).toEqual(true);

        event.emit('E_1', {value: true});
        expect(e1Id1Callback).toBeCalledTimes(1);
        expect(e1Id2Callback).toBeCalledTimes(2);
        expect(e2id1Callback).toBeCalledTimes(1);

        event.removeListener('2', 'E_1');
        expect(event.hasListener('1', 'E_1')).toEqual(false);
        expect(event.hasListener('2', 'E_1')).toEqual(false);
        expect(event.hasListener('1', 'E_2')).toEqual(true);

        event.emit('E_1', {value: true});
        expect(e1Id1Callback).toBeCalledTimes(1);
        expect(e1Id2Callback).toBeCalledTimes(2);
        expect(e2id1Callback).toBeCalledTimes(1);

        event.removeListener('1', 'E_2');
        expect(event.hasListener('1', 'E_1')).toEqual(false);
        expect(event.hasListener('2', 'E_1')).toEqual(false);
        expect(event.hasListener('1', 'E_2')).toEqual(false);

        event.emit('E_2', {value: true});
        expect(e1Id1Callback).toBeCalledTimes(1);
        expect(e1Id2Callback).toBeCalledTimes(2);
        expect(e2id1Callback).toBeCalledTimes(1);


        event.removeListener('1', 'E_1');
        event.removeListener('2', 'E_1');
        event.removeListener('1', 'E_2');


        event.emit('E_2', {value: true});
        event.emit('E_1', {value: true});
        expect(e1Id1Callback).toBeCalledTimes(1);
        expect(e1Id2Callback).toBeCalledTimes(2);
        expect(e2id1Callback).toBeCalledTimes(1);
    });

    it('should return name maker from passed services', function () {
        const nameMaker = {};
        const event = new FormEvent(tfGetForm([], {
            getProps: () => {
                return {
                    services: {
                        eventNameMaker: () => nameMaker
                    }
                }
            }
        }));
        expect(event.getNameMaker()).toEqual(nameMaker);
    });

    it('should return default name maker', function () {
        const event = new FormEvent(tfGetForm([], {
            getProps: () => {
                return {
                    services: {}
                }
            }
        }));
        expect(event.getNameMaker()).toBeInstanceOf(DefaultEventNameMaker);
    });
})