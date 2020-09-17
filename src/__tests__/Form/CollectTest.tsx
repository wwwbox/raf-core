import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Form from "../../Form/Concrate/Form";
import React from "react";
import DummyField, {DummyFileField} from "../../TestingUtils/DummyField";

Enzyme.configure({adapter: new Adapter()});

describe('collect data', () => {


    it('should collect data', function () {
        const imageFile = {};
        const attachments = [{}, {}];
        const wrapper = mount(<Form fields={[
            {name: 'name', as: DummyField, startingValue: 'ali'},
            {name: 'age', as: DummyField, asQuery: true},
            {name: 'skip', as: DummyField, shouldCollect: false},
            {name: 'image', as: DummyFileField, startingValue: imageFile},
            {name: 'attachments', as: DummyFileField, startingValue: attachments}
        ]}/>);

        const form = wrapper.instance() as Form;

        const ageField = form.getRegisteredField('age')!;
        ageField.setValue(18, false);

        const collectedData = form.collect();

        const data = collectedData.getData();
        expect(data).toEqual({name: 'ali'});

        const query = collectedData.getQuery();
        expect(query).toEqual({age: 18});

        const files = collectedData.getFiles();
        expect(files).toEqual({image: imageFile, attachments: attachments});
    });


    it('should collect data with attached data', function () {
        const imageFile = {};
        const wrapper = mount(<Form fields={[
            {name: 'name', as: DummyField, startingValue: 'ali'},
            {name: 'image', as: DummyFileField, startingValue: imageFile},
        ]} attach={{
            data: {date: 'some_date'}, files: {testFile: {} as any}
        }}/>);

        const form = wrapper.instance() as Form;
        form.attach('other', 1);
        form.attachFile('someFile', {} as any);

        let collectedData = form.collect();

        let data = collectedData.getData();
        expect(data).toEqual({name: 'ali', other: 1, date: 'some_date'});
        let files = collectedData.getFiles();
        expect(files).toEqual({image: imageFile, someFile: {}, testFile: {}});

        form.deAttach('other');
        form.deAttachFile('someFile');

        collectedData = form.collect();
        data = collectedData.getData();
        expect(data).toEqual({name: 'ali', date: 'some_date'});
        files = collectedData.getFiles();
        expect(files).toEqual({image: imageFile, testFile: {}});

    });


    it('should throw error when not ready to collect', function () {
        const wrapper = mount(<Form fields={[
            {name: 'name', as: DummyField, startingValue: 'ali'},
        ]}/>);
        const form = wrapper.instance() as Form;
        const field = form.getRegisteredField('name')!;

        expect(field.isReadyToCollect()).toEqual(true);
        field.setReadyToCollect(false);
        expect(field.isReadyToCollect()).toEqual(false);
        expect(() => form.collect()).toThrowError();
    });

});