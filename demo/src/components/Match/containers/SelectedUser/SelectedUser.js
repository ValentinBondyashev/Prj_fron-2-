import React, { Component } from 'react';

export default class SelectedUser extends Component {
  state = {  }
  render() {

    const { userById, filters, skills } = this.props

    return (
      <div>
        {
          filters ? 
          <div className="user-skills">
            {
              userById.userSkills.filter((userSkill, index) => {
                
                filters.filter(filter => {
                  if(userSkill.skill === null){
                    return
                  }

                  if(userSkill.skill.id === filter) {
                    skills.push(<div>{userSkill.skill.title}: {userSkill.mark}</div>)
                  }
                })
              })
            }
            {skills ? skills.map((skill, idx) => {
              return <div key={idx}>{skill}</div>
            }) : null}
          </div> : 
          null
        } 
      </div>
    );
  }
}