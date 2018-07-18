import React, { Component } from 'react';

export default class User extends Component {
  state = { 
    markSum: 0
  }
  shouldComponentUpdate(nextProps, nextState) {
      let sum = 0;

      nextProps.user.userSkills.map(item => {
        sum += item.mark
      })
      if(sum != this.state.markSum){
        this.setState({
          markSum: sum
        })
        return true;
      } 
      return false;
  }

  componentWillMount() {
    this.setState({
      markSum: this.props.user.userSkills[0].mark
    })
  }

  render() {
    
    const { user } = this.props

    return (
      <div className='matched-user'>
        <div className='matched-user-name'>
          {user.name}
        </div>
        <div>
          Mark sum: {this.state.markSum}
        </div>
        <div className='matched-user-skills'>
          {user.userSkills.map((skill, idx) => {
            return (
              <React.Fragment key={idx}>
                <div className='matched-user-skill'>
                  Skill: {skill.skill.title} mark: {skill.mark}
                </div>
              </React.Fragment>
            )
          })}
        </div>
      </div>
    );
  }
}