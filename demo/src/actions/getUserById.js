import axios from 'axios';

axios.interceptors.request.use((config)=>{  
  const token = localStorage.token;
  config.headers.Authorization = `Bearer ${token}`;
  config.headers["Content-Type"] = `application/json`;
  return config;
});

axios.interceptors.response.use(
  function(response){
    return response
    }, function (error){
      if (401 === error.response.status){  
        localStorage.token;
        window.location.reload();
    }
  } 
);
export const getUserById = (userId) => dispatch => {
  if(userId === null){
    dispatch({ type: 'SUCCES_GET_USER_BY_ID', payload: null})
  }
  
  axios.get(`http://localhost:3010/user/${userId}`, {})
  .then(function (response) {
    dispatch({ type: 'SUCCES_GET_USER_BY_ID', payload: response.data.data });
  })
  .catch(function (error) {  
  });
}