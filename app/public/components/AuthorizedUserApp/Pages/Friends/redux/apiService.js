import {baseGetRequest, basePostRequest} from "../../../../Root/redux/middlewares/APIServiceBases";

export const search = function (searchName) {
  return baseGetRequest('user/search', { name: searchName })
};
export const subscribe = function (userID) {
  return basePostRequest(`user/${userID}/subscribe`, {})
};