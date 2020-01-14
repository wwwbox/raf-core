import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Form from "../../lib/Form/Form";
import React from "react";
import DummyField, {DummyFileField} from "../TestingUtils/DummyField";

Enzyme.configure({adapter: new Adapter()});

describe('', () => {


    it('should collect data', function () {
        const imageFile = {};
        const attachments = [{}, {}];
        const wrapper = mount(<Form fields={[
            {name: 'name', as: DummyField, startingValue: 'ali'},
            {name: 'age', as: DummyField},
            {name: 'image', as: DummyFileField, startingValue: imageFile},
            {name: 'attachments', as: DummyFileField, startingValue: attachments}
        ]}/>);

        const form = wrapper.instance() as Form;

        const ageField = form.getRegisteredField('age')!;
        ageField.setValue(18);

        const collectedData = form.collect();

        const data = collectedData.getData();
        expect(data).toEqual({name: 'ali', age: 18});

        const files = collectedData.getFiles();
        expect(files).toEqual({image: imageFile, attachments: attachments});
    });


    it('should collect data with attached data', function () {
        const imageFile = {};
        const wrapper = mount(<Form fields={[
            {name: 'name', as: DummyField, startingValue: 'ali'},
            {name: 'image', as: DummyFileField, startingValue: imageFile},
        ]} attach={{
            data: {date: 'some_date'}
        }}/>);

        const form = wrapper.instance() as Form;
        form.attach('other', 1);
        form.attachFile('someFile', {} as any);

        const collectedData = form.collect();

        let data = collectedData.getData();
        expect(data).toEqual({name: 'ali', age: 18, other: 1, date: 'some_date'});
        let files = collectedData.getFiles();
        expect(files).toEqual({image: imageFile, someFile: {}});

        form.deAttach('other');
        form.deAttachFile('someFile');

        data = collectedData.getData();
        expect(data).toEqual({name: 'ali', age: 18, date: 'some_date'});
        files = collectedData.getFiles();
        expect(files).toEqual({image: imageFile});

    });

});
