import { saveStateToLocalStorage, loadPersistedState} from "../../../../../../app/public/components/Root/redux/store/localStorage";
import { localStorageMock } from "../../../../../__mocks__/localStorage.mock";
import mockUser from '../../../../../__mocks__/user.mock'
import AppInitialState from '../../../../../../app/public/components/Root/redux/store/initialState'
describe('Persisting redux store state to local storage', () => {
  describe('Save state', () => {
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
    it('Should save redux state to local storage', (done) => {
      saveStateToLocalStorage(mockStoreState);
      const savedState = JSON.parse(localStorage.getItem('appState'));
      expect(savedState).toEqual(mockStoreState);
      done();
    });
    it('Should throw error, if cannot serialize state to JSON', (done) => {
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
  describe('Load state', () => {
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
    it('Should return initial state, if there is no state in local storage', (done) => {
      expect(loadPersistedState()).toEqual(AppInitialState);
      done();
    });
    it('Should return parsed state, if here is state in local storage', (done) => {
      saveStateToLocalStorage(mockStoreState);
      expect(loadPersistedState()).toEqual(mockStoreState);
      done();
    });
    it('Should return initial state, if catch any error', (done) => {
      // Simulate situation, when local storage doesn't exist
      delete window.localStorage;
      expect(loadPersistedState()).toEqual(AppInitialState);
      done();
    })
  });
});

