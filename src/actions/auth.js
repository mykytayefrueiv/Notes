import http from 'axios';
import { notification_show }from './notification';

export const AUTH_REQUEST = 'auth/AUTH_REQUEST';
export const auth_request = (credentials) => {
   return dispatch => {
      dispatch({type: AUTH_REQUEST});
      let base64credentials = new Buffer(`${credentials.email}:${credentials.password}`).toString('base64');
      this.props.auth_request();
      http({
         method: 'get',
         url: 'api/auth/signin',
         headers: {'Authorization': `Basic ${base64credentials}`}
      }).then(response => {
         let {accessToken} = response.data;
         dispatch(auth_receive(accessToken));
      }).catch(err => {
          dispatch(auth_error());
          dispatch(notification_show('ERROR', err.response.data.errorMessage));
      });
   };
};

export const AUTH_RECEIVE = 'auth/AUTH_RECEIVE';
export const auth_receive = (token) => {
   return dispatch => {
      dispatch({
         type: AUTH_RECEIVE,
         payload: token
      });
   }
};

export const AUTH_ERROR = 'auth/AUTH_ERROR';
export const auth_error = (error) => {
    return dispatch => {
        dispatch({
            type: AUTH_ERROR,
            error
        });
    }
};

export const REGISTER_REQUEST = 'auth/REGISTER_REQUEST';
export const register_request = (credentials) => {
   return dispatch => {
      dispatch({type: REGISTER_REQUEST});
       http.post('api/auth/signup', credentials)
         .then(() => dispatch(register_receive()))
          .catch((err) => {
              dispatch(register_error());
              dispatch(notification_show('ERROR', err.response.data.errorMessage));
          });
   };
};

export const REGISTER_RECEIVE = 'auth/REGISTER_RECEIVE';
export const register_receive = () => {
   return dispatch => {
      dispatch({
         type: REGISTER_RECEIVE
      });
   }
};

export const REGISTER_ERROR = 'auth/REGISTER_ERROR';
export const register_error = (error) => {
    return dispatch => {
        dispatch({
            type: REGISTER_ERROR,
            error
        });
    }
};