import {NotEmptyValidator} from "../../Defaults/Services/Validator";

describe("NotEmptyValidator", () => {

    it('should return false when value is null', function () {
        const validator = new NotEmptyValidator();
        const valid = validator.validate(null, {});
        expect(valid).toEqual(false);
    });

    it('should return false when value is undefined', function () {
        const validator = new NotEmptyValidator();
        const valid = validator.validate(undefined, {});
        expect(valid).toEqual(false);
    });

    it('should return false when value is empty string', function () {
        const validator = new NotEmptyValidator();
        const valid = validator.validate('', {});
        expect(valid).toEqual(false);
    });

    it('should return true when valid', function () {
        const validator = new NotEmptyValidator();
        const valid = validator.validate('test', {});
        expect(valid).toEqual(true);
    });

});