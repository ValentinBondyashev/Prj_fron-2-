import axios from 'axios';

export const getSkillsCategories = () => dispatch => {
  
  axios.get(`http://localhost:3010/skills/categories`, {})
  .then(function (response) {
    dispatch({ type: 'SUCCES_GET_SKILLS_CATEGORIES', payload: response.data });
  })
  .catch(function (error) {  
  });
}