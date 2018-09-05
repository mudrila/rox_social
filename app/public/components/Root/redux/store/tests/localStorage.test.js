import { saveStateToLocalStorage, loadPersistedState} from "../localStorage";
import { localStorageMock } from "../../../../../../../tests/mocks/localStorage.mock";
import mockUser from '../../../../../../../tests/mocks/user.mock'
import AppInitialState from '../initialState'
describe('Save redux store state to local storage', () => {
  let mockStoreState;
  beforeAll((done) => {
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
    });
    mockStoreState = {
      user: mockUser
    };
    localStorage.clear();
    done();
  });
  it('It should save redux state to local storage', (done) => {
    saveStateToLocalStorage(mockStoreState);
    const savedState = JSON.parse(localStorage.getItem('appState'));
    expect(savedState).toEqual(mockStoreState);
    done();
  });
  it('It should throw error, if cannot serialize state to JSON', (done) => {
    expect(function () {
      saveStateToLocalStorage(JSON.stringify(Array))
    }).toThrow();
    done();
  });
  afterAll((done) => {
    localStorage.removeItem('appState');
    done();
  })
});
describe('Get persisted redux store state from local storage', () => {
  let mockStoreState;
  beforeAll((done) => {
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
    });
    mockStoreState = {
      user: mockUser
    };
    localStorage.clear();
    done();
  });
  it('It should return initial state, if there is no state in local storage', (done) => {
    expect(loadPersistedState()).toEqual(AppInitialState);
    done();
  });
  it('It should return parsed state, if here is state in local storage', (done) => {
    saveStateToLocalStorage(mockStoreState);
    expect(loadPersistedState()).toEqual(mockStoreState);
    done();
  });
  it('It should return initial state, if catch any error', (done) => {
    // Simulate situation, when local storage doesn't exist
    delete window.localStorage;
    expect(loadPersistedState()).toEqual(AppInitialState);
    done();
  })
});
