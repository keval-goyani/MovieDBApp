import apisauce from 'apisauce';
import { Alert } from 'react-native';
import { appConstants, strings } from '../constants';
import { ResponseGenerator } from '../sagas/movieSaga';

export const apiConfig = apisauce.create({
  baseURL: appConstants.baseUrl,
});

export async function getError(response: ResponseGenerator) {
  if (response.problem === strings.clientError) {
    return strings.pageErrorMessage;
  }
  if (response?.problem === strings.networkError) {
    return strings.networkErrorMessage;
  }
  if (
    [strings.connectionError, strings.serverError].includes(response?.problem)
  ) {
    return strings.serverErrorMessage;
  }
  return strings.errorMessage;
}

export const alertMessage = (error: string) => {
  Alert.alert(error);
};
