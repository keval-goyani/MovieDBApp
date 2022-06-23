import { createActions, createReducer } from 'reduxsauce';
import Immutable, { ImmutableObject } from 'seamless-immutable';
import { AuthReduxDataType, AuthStateDataType, RootState } from '../constants';
import { alertMessage } from '../services';

const { Types, Creators } = createActions({
  authRequest: ['payload'],
  loginRequest: ['payload'],
  authSuccess: ['data'],
  authFailure: ['error'],
  logout: [],
});

export const AuthTypes = Types;
export default Creators;

export const INITIAL_STATE: ImmutableObject<AuthStateDataType> = Immutable({
  user: null,
  authenticated: null,
  error: null,
  loading: null,
});

export const authDataSelectors = {
  getData: (state: RootState) => state?.authData,
};

const request = (state: ImmutableObject<AuthStateDataType>) => {
  return state.merge({ loading: true });
};

const success = (
  state: ImmutableObject<AuthStateDataType>,
  { data }: AuthReduxDataType,
) => {
  return state.merge({
    user: data,
    authenticated: true,
    error: false,
    loading: false,
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
    loading: false,
  });
};

const signOut = (state: ImmutableObject<AuthStateDataType>) => {
  return state.merge({
    user: null,
    authenticated: null,
    error: null,
    loading: null,
  });
};

export const authReducer = createReducer(INITIAL_STATE, {
  [Types.AUTH_REQUEST]: request,
  [Types.AUTH_SUCCESS]: success,
  [Types.AUTH_FAILURE]: failure,
  [Types.LOGOUT]: signOut,
  [Types.LOGIN_REQUEST]: request,
});
