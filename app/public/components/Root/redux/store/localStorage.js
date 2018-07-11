import AppInitialState from './InitialState'
/**
 * @function loadPersistedState - load persisted redux state from local storage
 * @return {Object/undefined} state - redux persisted state or empty state(undefined).
 */
export const loadPersistedState = () => {
  try {
    const serializedState = localStorage.getItem('appState')
    if (serializedState === null) {
      return AppInitialState
    } else {
      return JSON.parse(serializedState)
    }
  } catch (error) {
    // In case of any error - return empty state to let reducers initialize state
    return AppInitialState
  }
}
/**
 * @function saveStateToLocalStorage - persist redux state to local storage
 * @param {Object} state - JSON serializable redux state
 */
export const saveStateToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem('appState', serializedState)
  } catch (error) {
    // Failed to persist state - do nothing
  }
}
