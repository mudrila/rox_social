import { makeActionCreator } from "../../../app/public/utils/actionCreator";

describe('Make Action Creator Factory', () => {
  it('Should throw error, if call it without any parameters', (done) => {
    expect(() => {makeActionCreator()}).toThrow();
    done()
  });
  it('Should create function', (done) => {
    expect(typeof makeActionCreator('TEST_ACTION_TYPE', 'testKey1', 'testKey2')).toBe('function');
    done();
  });
  it('This function should create action object', (done) => {
    expect(typeof makeActionCreator('TEST_ACTION_TYPE', 'testKey1', 'testKey2')('testValue1', 'testValue2')).toBe('object');
    done();
  });
  it(`Created action, should be equal to expected`, (done) => {
    const expectedAction = {
      type: 'TEST_ACTION_TYPE',
      testKey1: 'testValue1',
      testKey2: 'testValue2'
    };
    expect(makeActionCreator('TEST_ACTION_TYPE', 'testKey1', 'testKey2')('testValue1', 'testValue2')).toEqual(expectedAction);
    done();
  })
});
