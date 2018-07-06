import axios from 'axios';
import jwt_decode from 'jwt-decode';

const header = {Authorization: "Bearer " + localStorage.token};

export const getCheckAdminAction = () => dispatch => {
  axios.get('http://localhost:3010/skills/check_admin', {},{
    headers: header
  })
  .then(function (response) {
    dispatch({ type: 'CHECK_ADMIN', payload: response.data.isAdmin });
  })
  .catch(function (error) {  
  });
}

export const loginAction = (email, password) => dispatch => {
  axios.post('http://localhost:3010/login', {email, password})
  .then(function (response) {
    localStorage.setItem('token', response.data);
    localStorage.setItem('id', jwt_decode(response.data).id);
    dispatch({ type: 'LOGIN_SUCCESS', payload: {token: response.data, MyID: jwt_decode(response.data).id }});
  })
  .catch(function (error) {  
    dispatch({ type: 'LOGIN_ERROR' });
  });
}


export function checkAuthAction() {
    let token = localStorage.getItem('token');
    return { 
      type: 'CHECK_AUTH', 
      payload: {
        token: token === null ? "" : token
      }
    }  
}
