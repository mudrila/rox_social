import axios from 'axios'

export const APIUrl = '/api/';

/**
 * @function baseGetRequest - function, which will make POST request to endpoint with given data and return request data
 * @param {String} endPoint - short endpoint not including full URL
 * @param {Object} params - data, which need to be sent
 * @returns {Promise<AxiosResponse<any>>}
 */
export const baseGetRequest = (endPoint, params = {} ) => {
  if (!endPoint) {
    throw new Error('Cannot make request without end-point info')
  }
  let appState = JSON.parse(localStorage.getItem('appState'));
  let accessToken = '';
  if (appState !== null) {
    accessToken = appState.user.accessToken
  }
  return axios({
    url: `${APIUrl}${endPoint}`,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': accessToken
    },
    params: params
  }).then(response => {
    return response.data
  })
};
/**
 * @function basePostRequest - function, which will make POST request to endpoint with given data and return request data
 * @param {String} endPoint - short endpoint not including full URL
 * @param formData - data, which need to be sent
 * @returns {Promise<AxiosResponse<any>>}
 */
export const basePostRequest = (endPoint, formData = {}) => {
  if (!endPoint) {
    throw new Error('Cannot make request without end-point info')
  }
  let appState = JSON.parse(localStorage.getItem('appState'));
  let accessToken = '';
  if (appState !== null) {
    accessToken = appState.user.accessToken
  }
  return axios({
    url: `${APIUrl}${endPoint}`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': accessToken
    },
    data: {...formData}
  }).then(response => {
    return response.data
  })
};

/**
 * @function baseFileUploadRequest
 * @param {String} endPoint - short endpoint not including full URL
 * @param file - file to send
 * @returns {Promise<AxiosResponse<any>>}
 */
export const baseFileUploadRequest = (endPoint, file) => {
  if (!endPoint) {
    throw new Error('Cannot make request without end-point info')
  }
  if (!file) {
    throw new Error('Cannot process request without file')
  }
  let appState = JSON.parse(localStorage.getItem('appState'));
  let accessToken = '';
  if (appState !== null) {
    accessToken = appState.user.accessToken
  }
  return axios({
    url: `${APIUrl}${endPoint}`,
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': accessToken
    },
    data: file
  }).then(response => {
    return response.data
  })
};
