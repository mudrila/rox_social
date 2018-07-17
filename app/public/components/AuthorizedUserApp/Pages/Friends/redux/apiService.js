import { baseGetRequest } from "../../../../Root/redux/middlewares/APIServiceBases";

export const search = function (searchName) {
  return baseGetRequest('user/search', { name: searchName })
};