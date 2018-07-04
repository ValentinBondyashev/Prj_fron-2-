import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllSkillsAction, getSkillUserAction } from '../../actions/compare'; 
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import Bubble from '../Bubble/Bubble';
import Dashboard from '../../containers/Dashboard/Dashboard';
import UserTable from '../../containers/UsersTable/UserTable';


class Compare extends Component {
  constructor(props) {

    super(props);
    this.state = { 
    };
    this.getSkill = this.getSkill.bind(this);
  }

  componentWillMount() {
    this.props.getAllSkillsFunction(); 
  }

  getSkill(id) {
    this.props.getSkillUserFunction(id);
  }

  render() {    
    const {allSkills, userSkill, userId} = this.props;
    return (
        <div className="general" >
            <UserTable allSkills={allSkills}/>   
            {userSkill ? <Dashboard userSkill={userSkill} />: null }
            {userSkill ? <Bubble userSkill={userSkill} userId={userId} /> : null}  
        </div>
    );
  }
}

function mapStateToProps(state) {
    return { 
        allSkills: state.skill.allSkills,
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

export default connect(mapStateToProps,mapDispathToProps)(Compare);

