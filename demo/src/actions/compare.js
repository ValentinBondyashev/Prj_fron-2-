import axios from 'axios';

export const getAllSkillsAction = () => dispatch => {

  axios.get('http://localhost:3010/skills/all_users', {})
  .then(function (response) {
    dispatch({ type: 'SUCCES_GET_ALL_SKILLS', payload: response['data'].data.users });
  })
  .catch(function (error) {  
  });
    
}

export const getSkillUserAction = (id) => dispatch => {
    axios.get(`http://localhost:3010/skills/?user_id=${id}`)
    .then(function (response) {
        dispatch({ type: 'SUCCES_GET_USER_SKILL', payload: {data :response['data'].data, id: id} });
    })
    .catch(function (error) {  
    });
}

export const editAdminSkillsAction = (id,skill) => dispatch => {
  axios.put(`http://localhost:3010/skills?user_id=${id}`, skill)
  .then(function (response) {
  })
  .catch(function (error) {
  });

}


