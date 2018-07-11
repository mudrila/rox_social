/**
 * @function makeActionCreator - create a function, which will create actions
 * @param {String} type - action type
 * @param {...String} keys - arguments keys, passed to action creator
 * @returns {Function} - function, which take passed arguments and returns action object with this arguments
 */
export function makeActionCreator(type, ...keys) {
  if (!type) {
    throw new Error('Error in action creator: action type cannot null/undefined!')
  } else {
    return function (...args) {
      let action = { type };
      keys.forEach((arg, index) => {
        action[keys[index]] = args[index]
      });
      return action
    }
  }
}
