import { $http, API } from '@/common/http';

export const queryPackageList = (param: any) => {
  return $http.get(API.queryPackagesList)
}