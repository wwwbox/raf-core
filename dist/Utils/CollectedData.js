var CollectedData = /** @class */ (function () {
    function CollectedData() {
        this.data = {};
        this.files = {};
        this.query = {};
    }
    CollectedData.prototype.append = function (key, value) {
        this.data[key] = value;
    };
    CollectedData.prototype.appendQuery = function (key, value) {
        this.query[key] = value;
    };
    CollectedData.prototype.appendFile = function (key, file) {
        this.files[key] = file;
    };
    CollectedData.prototype.remove = function (key) {
        delete this.data[key];
    };
    CollectedData.prototype.removeFile = function (key) {
        delete this.files[key];
    };
    CollectedData.prototype.removeQuery = function (key) {
        delete this.query[key];
    };
    CollectedData.prototype.getData = function () {
        return this.data;
    };
    CollectedData.prototype.getFiles = function () {
        return this.files;
    };
    CollectedData.prototype.getQuery = function () {
        return this.query;
    };
    CollectedData.prototype.merge = function (collectedData) {
        this.appendData(collectedData.getData());
        this.appendFiles(collectedData.getFiles());
        this.appendQueries(collectedData.getQuery());
    };
    CollectedData.prototype.appendData = function (data) {
        var keysOfData = Object.keys(data);
        for (var _i = 0, keysOfData_1 = keysOfData; _i < keysOfData_1.length; _i++) {
            var key = keysOfData_1[_i];
            this.append(key, data[key]);
        }
    };
    CollectedData.prototype.appendFiles = function (files) {
        var keysOfFiles = Object.keys(files);
        for (var _i = 0, keysOfFiles_1 = keysOfFiles; _i < keysOfFiles_1.length; _i++) {
            var key = keysOfFiles_1[_i];
            this.appendFile(key, files[key]);
        }
    };
    CollectedData.prototype.appendQueries = function (query) {
        var keys = Object.keys(query);
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var key = keys_1[_i];
            this.appendQuery(key, query[key]);
        }
    };
    return CollectedData;
}());
export default CollectedData;
