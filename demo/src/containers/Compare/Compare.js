import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllSkillsAction, getSkillUserAction } from '../../actions/compare'; 
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import ZoomableLayout from '../../components/ZoomableLayout/ZoomableLayout';
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

    const {allSkills, userSkill} = this.props;
    return (
        <div className="general" >
                <UserTable allSkills={allSkills}/>   
                {userSkill ? <Dashboard userSkill={userSkill} />: null }
                {userSkill ? <ZoomableLayout userSkill={userSkill}/> : null}  
        </div>
    );
  }
}

function mapStateToProps(state) {
    return { 
        allSkills: state.skill.allSkills,
        userSkill: state.skill.userSkill
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

