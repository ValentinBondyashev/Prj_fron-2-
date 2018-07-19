import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUserList } from '../../actions/getUserList'; 
import Bubble from './components/Bubble/Bubble';
import UserTable from './components/UserTable/UserTable';
import SkillList from './components/SkillList/SkillList';


class Skills extends Component {

  componentWillMount() {
    this.props.getUserList(); 
  };

  render() {
    const {listUsers} = this.props;
    return (
      <div className="general" >
        <SkillList listUsers={listUsers} />   
        { 
          this.props.userById ? 
            <UserTable user={this.props.userById} /> :
            null 
        
        /*
        заменить userSkill на userById!!!!!!!!!!!!!!!!!!
        {
          userSkill ?
            <Bubble userSkill={userSkill} userId={userId} /> :
            null
        }   */}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { 
    listUsers: state.skill.listUsers,
    userById: state.getUserById
  };
};

function mapDispathToProps(dispatch) {
  return {
    getUserList: function () {
      dispatch(getUserList());
    }
  };
};

export default connect(mapStateToProps,mapDispathToProps)(Skills);

