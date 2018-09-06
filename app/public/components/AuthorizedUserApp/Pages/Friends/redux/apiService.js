import {baseGetRequest, basePostRequest} from "../../../../../../shared/baseRequest/index";

export const search = function (searchName) {
  return baseGetRequest('user/search', { name: searchName })
};
export const subscribe = function (userID) {
  return basePostRequest(`user/${userID}/subscribe`, {})
};
