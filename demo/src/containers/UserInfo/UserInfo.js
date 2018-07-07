import React, { Component } from 'react'
import { connect } from 'react-redux'  

class UserInfo extends Component {
  constructor(props) {
    super(props);
    this.state = { 

    }; 
  }
  generalProgress = (data) => {
    var arrNew = [];
    var arrOld = [];
    data.map(e => {
        arrNew.push(e.skill_new);
        arrOld.push(e.skill_old);
    })
    return arrNew.reduce((total, num) => {
        return total + num
    }) - arrOld.reduce((total, num) => {
        return total + num
    }) 
  }

  uniqProgress = (data) => {
      /*Need add name idCategory*/
    return this.generalProgress(data.filter(e => e['userSkill.skillId']  == 31));
  }
  
  render(){
    
      return (
          <div>   
            <h2>Name</h2>
            <p>Общий прогресс: <span>{this.props.changedSkills.length > 0 ? this.generalProgress(this.props.changedSkills) : '0'}</span>
               {
                    this.props.changedSkills.length > 0 && this.generalProgress(this.props.changedSkills) > 0 ? 
                   <i className="fa fa-sort-up" style={{color:'green'}}></i> :
                   <i className="fa fa-caret-down" style={{color:'red'}}></i>
               } 
            </p>
            <p>Отстающие скиллы :</p>
            <ul>
                <li>JavaScript : <span>{this.props.changedSkills.length > 0 ? this.uniqProgress(this.props.changedSkills) : '0'}</span> 
                    {
                        this.props.changedSkills.length > 0 && this.uniqProgress(this.props.changedSkills) > 0 ? 
                        <i className="fa fa-sort-up" style={{color:'green'}}></i> :
                        <i className="fa fa-caret-down" style={{color:'red'}}></i>
                    } 
                </li>
                <li>CSS</li>
                <li>HTML</li>
            </ul>
          </div>             
      )
  }
}

function mapStateToProps(state) {
    return { 
        changedSkills: state.skill.changedSkills
    };
}

function mapDispathToProps(dispatch) {
    return {
    };
}
  
export default connect(mapStateToProps,mapDispathToProps)(UserInfo);