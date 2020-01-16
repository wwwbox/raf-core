import CollectedData from "../../lib/Utils/CollectedData";

describe('collected data', () => {

    it('should append', function () {
        const collectedData = new CollectedData();
        collectedData.append('test', 'value');
        expect(collectedData.getData()).toEqual({test: 'value'});
        collectedData.append('other', 'value');
        expect(collectedData.getData()).toEqual({test: 'value', 'other': 'value'});
    });

    it('should append query', function () {
        const collectedData = new CollectedData();
        collectedData.appendQuery('test', 'value');
        expect(collectedData.getQuery()).toEqual({test: 'value'});
        collectedData.appendQuery('other', 'value');
        expect(collectedData.getQuery()).toEqual({test: 'value', 'other': 'value'});
    });

    it('should append file', function () {
        const collectedData = new CollectedData();
        collectedData.appendFile('someFile', {} as any);
        expect(collectedData.getFiles()).toEqual({someFile: {}});
        collectedData.appendFile('otherFile', {} as any);
        expect(collectedData.getFiles()).toEqual({someFile: {}, otherFile: {}});
    });

    it('should append data', function () {
        const collectedData = new CollectedData();
        collectedData.appendData({test: 'value', other: 'value'});
        expect(collectedData.getData()).toEqual({test: 'value', other: 'value'});
    });

    it('should append queries', function () {
        const collectedData = new CollectedData();
        collectedData.appendQueries({test: 'value', other: 'value'});
        expect(collectedData.getQuery()).toEqual({test: 'value', other: 'value'});
    });

    it('should append files', function () {
        const collectedData = new CollectedData();
        collectedData.appendFiles({test: {} as any, other: {} as any});
        expect(collectedData.getFiles()).toEqual({test: {}, other: {}});
    });

    it('should merge to other collectedData', function () {
        const collectedData = new CollectedData();
        collectedData.appendData({test: 'value'});
        collectedData.appendFiles({file: {} as any});
        collectedData.appendQueries({query: 'value'});


        const otherCollectedData = new CollectedData();
        otherCollectedData.appendData({other: 'value'});
        otherCollectedData.appendFiles({otherFile: {} as any});
        collectedData.appendQueries({q2: ''});
        collectedData.merge(otherCollectedData);

        expect(collectedData.getData()).toEqual({test: 'value', other: 'value'});
        expect(collectedData.getFiles()).toEqual({file: {}, otherFile: {}});
        expect(collectedData.getQuery()).toEqual({query: 'value', q2: ''});
    });

    it('should remove data', function () {
        const collectedData = new CollectedData();
        collectedData.append('test', 'value');
        collectedData.append('other', 'value');
        expect(collectedData.getData()).toEqual({test: 'value', other: 'value'});
        collectedData.remove('other');
        expect(collectedData.getData()).toEqual({test: 'value'});
    });

    it('should remove query', function () {
        const collectedData = new CollectedData();
        collectedData.appendQuery('test', 'value');
        collectedData.appendQuery('other', 'value');
        expect(collectedData.getQuery()).toEqual({test: 'value', other: 'value'});
        collectedData.removeQuery('other');
        expect(collectedData.getQuery()).toEqual({test: 'value'});
    });

    it('should remove file', function () {
        const collectedData = new CollectedData();
        collectedData.appendFile('someFile', {} as any);
        collectedData.appendFile('otherFile', {} as any);
        expect(collectedData.getFiles()).toEqual({someFile: {}, otherFile: {}});
        collectedData.removeFile('otherFile');
        expect(collectedData.getFiles()).toEqual({someFile: {}});
    });

});