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
export const getMatchedUsers = (filterId) => dispatch => {
  let request = [];
  JSON.stringify(filterId.map((item, idx) => {
    request.push(`skills[${idx}]=${item}`)
  }));
  axios.get(`http://localhost:3010/skills/matched?${request.join('&')}`, {})
  .then(function (response) {
    dispatch({ type: 'SUCCES_GET_MATCHED_USERS', payload: response.data });
  })
  .catch(function (error) {  
  });
}