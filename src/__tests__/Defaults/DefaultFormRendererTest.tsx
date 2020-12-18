import { DefaultFormRenderer } from "../../Defaults/Services/DefaultFormRenderer";
import { FormTestUtils } from "../../TestingUtils/FormTestUtils";
import FieldRenderer from "../../Protocol/FieldRenderer";
import { mock } from "jest-mock-extended";
import * as React from "react";
import { ServiceProvider } from "@autofiy/autofiyable";

describe('DefaultFormRenderer', () => {

    it('should render form', function () {

        const form = FormTestUtils.makeForm([], {
            getProps: () => {
                return {
                    extra: {
                        renderOptions: {
                            buttonText: 'GO'
                        }
                    },
                    services: {
                        fieldRenderer: () => mock<FieldRenderer>({
                            render(): any {
                                return <input />
                            }
                        })
                    }
                }
            }
        });
        const renderer = new DefaultFormRenderer(form);
        const rendered = renderer.render();
        expect(rendered.toString()).toEqual((
            <div className={'__raf'}>
                <input />
                <br />
                <button onClick={jest.fn()}>GO</button>
            </div>
        ).toString())
    });

    it('should call submit when button clicked', function () {
        const form = FormTestUtils.makeForm([], {
            getProps: () => {
                return {
                    services: {
                        fieldRenderer: () => mock<FieldRenderer>({
                            render(): any {
                                return <input />
                            }
                        })
                    }
                }
            }
        });
        const renderer = new DefaultFormRenderer(form);
        const rendered = renderer.render();
        rendered.props.children[2].props.onClick(null as any);
        expect(form.submit).toBeCalled();
    });

});