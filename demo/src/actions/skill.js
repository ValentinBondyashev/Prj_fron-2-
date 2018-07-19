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

export const getSkillsAction = (id) => dispatch => {
  axios.get(`http://localhost:3010/skills/${localStorage.id}`, {})
  .then(function (response) {
    dispatch({ type: 'SUCCES_GET_SKILLS', payload: response.data });
  })
  .catch(function (error) {  
  });
}

export const getIdCategoriesAction = () => dispatch => {
  axios.get('http://localhost:3010/skills/categories', {})
  .then(function (response) {
    dispatch({ type: 'GET_ID_SKILLS', payload: response.data });
  })
  .catch(function (error) {  
  });
}

export const createSkillsAdminAction = (skill, id) => dispatch => {
  axios.post(`http://localhost:3010/skills?user_id=${id}`, skill)
  .then(function (response) {
    axios.get(`http://localhost:3010/skills?user_id=${id}`, {})
    .then(function (response) {
      dispatch({ type: 'SUCCES_GET_SKILLS', payload: response['data'] });
    })
  })
  .catch(function (error) {
  });
}

export const editSkillsAction = (userID, skillID, mark) => dispatch => {
  axios.put('http://localhost:3010/skills', {userID, skillID, mark})
  .then(function (response) {
  })
  .catch(function (error) {
  });
}

export const createSkillsAction = (skill) => dispatch => {
  axios.post('http://localhost:3010/skills', skill)
  .then(function (response) {
    axios.get(`http://localhost:3010/skills${localStorage.id}`, {})
    .then(function (response) {
      dispatch({ type: 'SUCCES_GET_SKILLS', payload: response['data'] });
    })
  })
  .catch(function (error) {
  });
}