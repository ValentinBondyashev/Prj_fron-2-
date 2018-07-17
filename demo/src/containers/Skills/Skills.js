import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllSkillsAction, getSkillUserAction } from '../../actions/compare'; 
// import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import Bubble from '../Bubble/Bubble';
import Dashboard from '../../containers/Dashboard/Dashboard';
import SkillList from '../../containers/SkillList/SkillList';


class Skills extends Component {

  componentWillMount() {
    this.props.getAllSkillsFunction(); 
  }

  getSkill = (id) => {
    this.props.getSkillUserFunction(id);
  }

  render() {  
    const {listUsers, userSkill, userId} = this.props;
    return (
        <div className="general" >
            <SkillList listUsers={listUsers}/>   
            {
                userSkill ? 
                    <Dashboard userSkill={userSkill} /> :
                     null 
            }
            {
                userSkill ?
                    <Bubble userSkill={userSkill} userId={userId} /> :
                     null
            }  
        </div>
    );
  }
}

function mapStateToProps(state) {
    return { 
        listUsers: state.skill.listUsers,
        userSkill: state.skill.userSkill,
        userId: state.skill.userId
    };
}

function mapDispathToProps(dispatch) {
    return {
        getAllSkillsFunction: function () {
            dispatch(getAllSkillsAction());
        },
        getSkillUserFunction: function (id) {
            dispatch(getSkillUserAction(id));
        },
    };
}

export default connect(mapStateToProps,mapDispathToProps)(Skills);

