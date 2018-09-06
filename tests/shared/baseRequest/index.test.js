import { baseGetRequest, basePostRequest, baseFileUploadRequest} from "../../../app/shared/baseRequest/index";
const baseResponse = require('../../../app/shared/baseResponse/index');
const baseSuccessResponse = baseResponse.baseSuccessResponse;
const app = require('../../../app/server/index');
describe('API Requests Bases', () => {
  let server;
  beforeAll((done) => {
    server = app.listen(80);
    done();
  });
  describe('Base GET Request', () => {
    it('Should throw error, if end-point not specified', (done) => {
      expect(function () {
        baseGetRequest(undefined).then(data => data);
      }).toThrow();
      done();
    });
    it('Should make request to end-point', async (done) => {
      const response = await baseGetRequest('test/get').then((response) => {
        return response
      });
      expect(response.success).toBeTruthy();
      done();
    });
    it('Should return data from response', async (done) => {
      const data = await baseGetRequest('test/get').then((response) => {
        return response
      });
      expect(data).toEqual(baseSuccessResponse('Gotcha', {test: 'passed'}));
      done();
    })
  });
  describe('Base POST Request', () => {
    it('Should throw error, if end-point not specified', (done) => {
      expect(function () {
        basePostRequest(undefined).then(data => data);
      }).toThrow();
      done();
    });
    it('Should make request to given end-point', async (done) => {
      const response = await basePostRequest('test/post').then((response) => {
        return response
      });
      expect(response.success).toBeTruthy();
      done();
    });
    it('Should return data from response', async(done) => {
      const data = await basePostRequest('test/post').then((response) => {
        return response
      });
      expect(data).toEqual(baseSuccessResponse('Success in POST', {test: 'passed'}));
      done();
    })
  });
  describe('Base POST file upload Request', () => {
    it('Should throw error, if end-point not specified', (done) => {
      expect(function () {
        baseFileUploadRequest(undefined).then(data => data);
      }).toThrow();
      done();
    });
    it('Should throw error, if file not specified', (done) => {
      expect(function () {
        baseFileUploadRequest('test/post').then(data => data);
      }).toThrow();
      done();
    });
    it('Should make request to given end-point', async (done) => {
      const response = await baseFileUploadRequest('test/post', new FormData()).then((response) => {
        return response
      });
      expect(response.success).toBeTruthy();
      done();
    });
    it('Should return data from response', async (done) => {
      const data = await baseFileUploadRequest('test/post', new FormData()).then((response) => {
        return response
      });
      expect(data).toEqual(baseSuccessResponse('Success in POST', {test: 'passed'}));
      done();
    })
  });
  afterAll((done) => {
    server.close(function () {
      done();
    });
  })
});
