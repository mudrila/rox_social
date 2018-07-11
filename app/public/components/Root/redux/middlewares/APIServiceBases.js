import axios from 'axios'

const APIUrl = '/api/';

/**
 * @function basePostRequest - function, which will make POST request to endpoint with given data and return request data
 * @param {String} endPoint - short endpoint not including full URL
 * @param formData - data, which need to be sent
 * @returns {Promise<AxiosResponse<any>>}
 */
export const basePostRequest = (endPoint, formData) => {
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
