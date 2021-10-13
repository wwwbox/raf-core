import DefaultFieldRenderer from "../../Defaults/Services/DefaultFieldRenderer";
import {FieldOptions} from "../../Field/FieldProps";
import * as React from "react";

describe('DefaultFieldRenderer', () => {
    it('should render fields', function () {
        const fieldsOptions: (FieldOptions | FieldOptions[])[] = [
            {as: 'input', name: 'name', extra: {}},
            [
                {as: 'input', name: 'country'},
                {as: 'input', name: 'city'},
            ],
            {as: 'input', name: 'email'}
        ]
        const form: any = {
            validator: () => ({
                getValidator: () => ({})
            }),
            event: () => ({
                getNameMaker: () => ({})
            }),
            fields: () => ({
                getFieldsOptions: () => fieldsOptions
            })
        };
        const renderer = new DefaultFieldRenderer(form);
        const rendered = renderer.render();

        const props: any = {
            form: form,
            injectedValidator: {},
            injectedEventNameMaker: {}
        }

        expect(rendered.toString()).toEqual(
            (
                <div className={'__raf-fields-wrapper'}>
                    <div className={'__raf-field'} key={'name'}>
                        <input name={'name'} {...{...props, extra: {}}}/>
                    </div>
                    <div className={'__raf-sub-fields'}>
                        <div className={'__raf-field'} key={'country'}>
                            <input name={'country'} {...props}/>
                        </div>
                        <div className={'__raf-field'} key={'city'}>
                            <input name={'city'} {...props}/>
                        </div>
                    </div>
                    <div className={'__raf-field'} key={'email'}>
                        <input name={'email'} {...props}/>
                    </div>
                </div>
            ).toString()
        )
    });
});