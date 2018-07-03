import axios from 'axios';
const ws = new WebSocket('ws://localhost:8800');    

ws.onopen = ((event) => {
});


export const getAllSkillsAction = () => dispatch => {
  axios.get('http://localhost:3010/skills/all_users', {})
  .then(function (response) {
    dispatch({ type: 'SUCCES_GET_ALL_SKILLS', payload: response['data'] });
  })
  .catch(function (error) {  
  });
    
}

export const getSkillUserAction = (id) => dispatch => {
    axios.get(`http://localhost:3010/skills/${id}`)
    .then(function (response) {
        dispatch({ type: 'SUCCES_GET_USER_SKILL', payload: {data :response.data, id: id} });
    })
    .catch(function (error){ 
    });
}

export const editAdminSkillsAction = (userId, skillId, mark) => dispatch => {
  axios.put(`http://localhost:3010/skills`, {userId, skillId, mark},{
    headers: {
      'Content-Type': 'x-www-form-urlencoded',
      'Authorization': "Bearer " + localStorage.token
    }})
  .then(function (response){
    ws.onmessage = ((event) => {
      dispatch({ type: 'GET_CHANGED_SKILLS', payload:  event.data});
    });
    const editSkill = JSON.parse(response.config.data).skillTitle;
    dispatch({ type: 'EDIT_USER_SKILL_ADMIN', payload: {editSkill, mark} });
  })
  .catch(function (error) {
  });

}


