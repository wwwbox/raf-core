import {FormTestUtils} from "../../TestingUtils/FormTestUtils";
import {mock} from "jest-mock-extended";
import IField from "../../Field/IField";
import {FieldType} from "../../Field/Concrete/FieldType";
import {DefaultCollector} from "../../Form/Services/Collector";
import {IFieldCollecting} from "../../Field/Collecting/FieldCollecting";

describe('DefaultFromCollector', () => {

    function createField(name: string, type: FieldType, collectedValue: any, shouldCollect: boolean = true, asQuery: boolean = false): IField {
        return FormTestUtils.createMockedField(name, type, {
            collecting: () => mock<IFieldCollecting>({
                collect(): any {
                    return collectedValue;
                },
                shouldSkip(): boolean {
                    return !shouldCollect;
                },
                isAsQuery(): boolean {
                    return asQuery;
                }
            })
        })
    }

    it('should return files', function () {
        const form = FormTestUtils.makeForm([
            createField("file_1", FieldType.FILE, {}),
            createField("file_2", FieldType.FILE, 'x'),
            createField("name", FieldType.NORMAL, 'Y'),
        ]);

        const collector = new DefaultCollector(form);
        const files = collector.files();
        expect(files).toEqual({
            file_1: {},
            file_2: 'x'
        })
    });

    it('should return data', function () {
        const form = FormTestUtils.makeForm([
            createField('name', FieldType.NORMAL, 'ali'),
            createField('age', FieldType.NORMAL, 18),
            createField('image', FieldType.FILE, 'image_file'),
        ]);
        const collector = new DefaultCollector(form);
        const data = collector.data();
        expect(data).toEqual({
            name: 'ali',
            age: 18
        });
    });

    it('should return query', function () {
        const form = FormTestUtils.makeForm([
            createField('search', FieldType.NORMAL, 'test', true, true),
            createField('name', FieldType.NORMAL, 'ali', true, false),
            createField('age', FieldType.NORMAL, '20', true, false),
            createField('file', FieldType.FILE, 'some file', true, true),
        ]);
        const query = new DefaultCollector(form).query();
        expect({
            search: 'test'
        });
    });

    it('should check hasFiles', function () {
        const fields = [
            createField('name', FieldType.NORMAL, 'ali')
        ];
        let collector = new DefaultCollector(FormTestUtils.makeForm(fields));
        expect(collector.hasFiles()).toEqual(false);
        fields.push(createField('file', FieldType.FILE, 'file'));
        collector = new DefaultCollector(FormTestUtils.makeForm(fields));
        expect(collector.hasFiles()).toEqual(true);
    });

});