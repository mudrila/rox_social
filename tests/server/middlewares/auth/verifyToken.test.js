const jwt = require('jsonwebtoken');
const httpMocks = require('node-mocks-http');
const config = require('../../../../config/index');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../../../app/server/index');
const baseResponse = require('../../../../app/shared/baseResponse/index');
const verifyToken = require('../../../../app/server/middlewares/auth/verifyToken');
const warningResponse = baseResponse.baseWarningResponse('No access token provided.');
const errorResponse = baseResponse.baseErrorResponse('Failed to authenticate token');
const mockUser = require('../../../__mocks__/user.mock');

chai.use(chaiHttp);

describe('Verify Token middleware', function () {
  it('Should return 403 HTTP code, if here is no token', function (done) {
    chai.request(app).get('/api/user/search').end(function(error, response) {
      expect(response.status).toEqual(403);
      done();
    });
  });
  it('Should have default json in body, if here is no token', function (done) {
    chai.request(app).get('/api/user/search').end(function (error, response) {
      expect(response.body).toEqual(warningResponse)
    });
    done();
  });
  it('Should return 500 HTTP code, if cannot parse token', function (done) {
    chai.request(app).get('/api/user/search').set('Authorization', ' __some_broken_token___')
    .end(function (error, response) {
      expect(response.status).toEqual(500);
      done();
    })
  });
  it('Should contain default json in body, if cannot parse token', function(done) {
    chai.request(app).get('/api/user/search').set('Authorization', '__some_broken_token___')
    .end(function (error, response) {
      expect(response.body).toEqual(errorResponse);
      done();
    })
  });
  it('Should pass user to request object', function (done) {
    const mockToken = jwt.sign({user: mockUser}, config.jwtSecret);
    const request = httpMocks.createRequest({
      headers: {
        'Authorization': mockToken
      }
    });
    const response =  httpMocks.createResponse();
    verifyToken(request, response);
    expect(request.user).toEqual(mockUser);
    done();
  });
  it('Should call next handler', function (done) {
    const mockToken = jwt.sign({user: mockUser}, config.jwtSecret);
    const request = httpMocks.createRequest({
      headers: {
        'Authorization': mockToken
      }
    });
    const response =  httpMocks.createResponse();
    const next = jest.fn();
    verifyToken(request, response, next);
    expect(next).toHaveBeenCalled();
    done();
  })
});
