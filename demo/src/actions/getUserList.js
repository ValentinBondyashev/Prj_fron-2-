import axios from 'axios';


export const getUserList = () => dispatch => {
  axios.get(`http://localhost:3010//skills/all_users`, {})
  .then(function (response) {
    dispatch({ type: 'SUCCES_GET_USER_LIST', payload: response.data });
  })
  .catch(function (error) {  
  });
}