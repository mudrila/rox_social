import { makeActionCreator } from "./actionCreator";

describe('Make Action Creator ', () => {
  it('It should throw error, if call it without any parameters', (done) => {
    expect(() => {makeActionCreator()}).toThrow();
    done()
  });
  it('It should create function', (done) => {
    const testActionCreator = makeActionCreator('TEST_ACTION_TYPE', 'testKey1', 'testKey2');
    expect(typeof testActionCreator).toBe('function');
    done();
  });
  it('This function should create action object', (done) => {
    const testActionCreator = makeActionCreator('TEST_ACTION_TYPE', 'testKey1', 'testKey2');
    const testAction = testActionCreator('testValue1', 'testValue2');
    expect(typeof testAction).toBe('object');
    done();
  });
  it(`Created action, should be equal to expected`, (done) => {
    const testActionCreator = makeActionCreator('TEST_ACTION_TYPE', 'testKey1', 'testKey2');
    const testAction = testActionCreator('testValue1', 'testValue2');
    const expectedAction = {
      type: 'TEST_ACTION_TYPE',
      testKey1: 'testValue1',
      testKey2: 'testValue2'
    };
    expect(testAction).toEqual(expectedAction);
    done();
  })
});
