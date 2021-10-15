import {DefaultExtraConfigurationRefresher} from "../../Field/Service/ExtraConfigurationRefresher";
import IField from "../../Field/IField";
import Field from "../../Field/Field";
import {mock} from "jest-mock-extended";

describe('RefreshState', () => {


    function createField(current: any, passed: any): Field {
        const field = mock<IField>({
            getConfiguration<T>(key: string): T {
                return current;
            },
            getProps(): any {
                return {
                    extra: passed
                }
            }
        });
        return field as any;
    }

    let refresher = new DefaultExtraConfigurationRefresher();

    it('should not refresh function,undefined,symbol', function () {
        const func = jest.fn();
        const symbol = Symbol();
        const passed = {
            func: func,
            un: undefined,
            symbol: symbol,
            value: 'x'
        };
        const current = {
            value: 'x',
            func: func,
            un: undefined,
            symbol: symbol
        }

        const changed = refresher.refresh(createField(current, passed));
        expect(changed).toEqual(false);
        expect(current).toEqual({
            value: 'x',
            func: func,
            un: undefined,
            symbol: symbol
        });
    });

    it('should refresh when primitive values changed', function () {
        const passed = {
            a: 'x',
            b: 'y',
            func: jest.fn()
        };
        const current = {
            a: 'x',
            b: 'z',
            func: jest.fn()
        }

        const changed = refresher.refresh(createField(current, passed));
        expect(changed).toEqual(true);
        expect(current).toEqual({a: 'x', b: 'y', func: expect.any(Function)});
    });

    it('should refresh nest objects', function () {
        const passed = {
            a: 'x',
            foo: {
                x: 1,
                y: 2,
                z: {
                    a: 2,
                    b: 2
                }
            }
        };
        const current = {
            a: 'x',
            foo: {
                x: 1,
                y: 1,
                z: {
                    a: 1,
                    b: 2
                }
            }
        }

        const changed = refresher.refresh(createField(current, passed));
        expect(changed).toEqual(true);
        expect(current).toEqual({
            a: 'x',
            foo: {
                x: 1,
                y: 2,
                z: {
                    a: 2,
                    b: 2
                }
            }
        });

    });

    it('should refresh object', function () {
        const current = {
            arr: [1, 2, 3],
            a: 'test'
        };
        const passed = {
            arr: [1, 3],
            a: 'x'
        }
        const changed = refresher.refresh(createField(current, passed));
        expect(changed).toEqual(true);
        expect(current).toEqual({
            arr: [1, 3],
            a: 'x'
        });
    });


})