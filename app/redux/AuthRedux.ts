import { createActions, createReducer } from 'reduxsauce';
import Immutable, { ImmutableObject } from 'seamless-immutable';
import { AuthReduxDataType, AuthStateDataType, RootState } from '../constants';
import { alertMessage } from '../services';

const { Types, Creators } = createActions({
  authRequest: ['payload'],
  authSuccess: ['data'],
  authFailure: ['error'],
});

export const AuthTypes = Types;
export default Creators;

export const INITIAL_STATE: ImmutableObject<AuthStateDataType> = Immutable({
  user: null,
  authenticated: null,
  error: null,
});

export const authDataSelectors = {
  getData: (state: RootState) => state?.authData,
};

const request = (state: ImmutableObject<AuthStateDataType>) => {
  return state;
};

const success = (
  state: ImmutableObject<AuthStateDataType>,
  { data }: AuthReduxDataType,
) => {
  return state.merge({
    user: data,
    authenticated: true,
    error: false,
  });
};

const failure = (
  state: ImmutableObject<AuthStateDataType>,
  { error }: AuthReduxDataType,
) => {
  alertMessage(error);

  return state.merge({
    authenticated: false,
    error: true,
  });
};

export const authReducer = createReducer(INITIAL_STATE, {
  [Types.AUTH_REQUEST]: request,
  [Types.AUTH_SUCCESS]: success,
  [Types.AUTH_FAILURE]: failure,
});
