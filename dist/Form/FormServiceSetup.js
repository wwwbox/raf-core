var FromServiceSetup = /** @class */ (function () {
    function FromServiceSetup() {
    }
    FromServiceSetup.getDefaultServiceOrPassed = function (form, passed, defaultService) {
        if (passed) {
            return passed(form);
        }
        if (defaultService) {
            return defaultService(form);
        }
        if (defaultService === null) {
            return null;
        }
        throw Error('CANNOT FIND FORM SERVICE');
    };
    return FromServiceSetup;
}());
export default FromServiceSetup;
