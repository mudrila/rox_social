const baseResponses = require('./index');
const baseError = baseResponses.baseErrorResponse;
const baseWarning = baseResponses.baseWarningResponse;
const baseSuccess = baseResponses.baseSuccessResponse;
describe('Base responses', function () {
  describe('Base error response', function () {
    it('Should return object', function (done) {
      expect(typeof baseError('Test')).toEqual('object');
      done();
    });
    it('Should return object with field success = false', function (done) {
      expect(baseError('Test').success).toBeFalsy();
      done()
    });
    it('Should return object with field messageType = error', function (done) {
      expect(baseError('Test').messageType).toEqual('error');
      done();
    });
    it('Should return object with field data equal to null', function (done) {
      expect(baseError('Test').data).toBeNull();
      done();
    });
    it('Should return object with given messageBody', function (done) {
      expect(baseError('Test').messageBody).toEqual('Test');
      done();
    });
    it('Should return object with default messageBody, if messageBody not specified', function (done) {
      expect(baseError().messageBody).toEqual('Some error on server :(');
      done();
    });
  });
  describe('Base warning response', function () {
    it('Should return object',function (done) {
      expect(typeof baseWarning('Test')).toEqual('object');
      done();
    });
    it('Should return object with field success = false', function (done) {
      expect(baseWarning('Test').success).toBeFalsy();
      done();
    });
    it('Should return object with field messageType = warning', function (done) {
      expect(baseWarning('Test').messageType).toEqual('warning');
      done();
    });
    it('Should return object with field data equal to null', function (done) {
      expect(baseWarning('Test').data).toBeNull();
      done();
    });
    it('Should return object with given messageBody', function (done) {
      expect(baseWarning('Test').messageBody).toEqual('Test');
      done();
    });
    it('Should return object with default messageBody, if messageBody not specified', function (done) {
      expect(baseWarning().messageBody).toEqual('Warning message not specified, please, contact our support');
      done();
    })
  });
  describe('Base success response', function () {
    it('Should return object', function (done) {
      expect(typeof baseSuccess('Test', 'Test')).toEqual('object');
      done();
    });
    it('Should throw error, if data not specified', function (done) {
      expect(function() {baseSuccess('Test')}).toThrow();
      done();
    });
    it('Should return object with field success = true', function (done) {
      expect(baseSuccess('Test', 'Test').success).toBeTruthy();
      done();
    });
    it('Should return object with field messageType = success', function (done) {
      expect(baseSuccess('Test', 'Test').messageType).toEqual('success');
      done();
    });
    it('Should return object with given data', function (done) {
      expect(baseSuccess('Test', 'Test').data).toEqual('Test');
      done();
    });
    it('Should return object with given messageBody', function (done) {
      expect(baseSuccess('Test', 'Test').messageBody).toEqual('Test');
      done();
    });
    it('Should return object with default messageBody, if messageBody not specified', function (done) {
      expect(baseSuccess(null, 'Test').messageBody).toEqual('Success!');
      done();
    })
  })
});
