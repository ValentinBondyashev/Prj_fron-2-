import React from 'react';
import { connect } from 'react-redux';

import { AutoCompleteSkillFilter } from './containers/AutoCompleteSkillFilter';
import AutoCompleteUser from './containers/AutocopleteUser';
import { MatchedUsers } from './containers/MatchedUsers/MatchedUsers';
import { getAllSkillsAction, getSkillList } from '../../actions/compare';
import { getMatchedUsers } from '../../actions/getMatchedUsers';

import './Match.css';

import 'primereact/resources/themes/omega/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import SelectedUser from './containers/SelectedUser/SelectedUser';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      filters: null,
      selectedUser: null
    }
  }

  selectUser = (user) => {
    this.setState({
      selectedUser: user
    })
  }

  changeStateFilter = (filters) => {
    const filterId = filters.map(item => {
      return item.id
    });
    this.setState({
      filters: filterId.length !== 0 ? filterId : null
    });

    this.props.getMatchedUsers(filterId);
  }
  
  componentWillMount() {
    this.props.getAllSkillsAction();
    this.props.getSkillList();
  }

  render() {
    const { skillList, listUsers, matchedUsers } = this.props;
    const { filters, selectedUser } = this.state;

    return(
      <div className='compare-desk'>
        <AutoCompleteUser users={listUsers} filters={filters} selectUser={(user) => {this.selectUser(user)}}/>
        <hr/>
        <AutoCompleteSkillFilter skillList={skillList} changeStateFilter={this.changeStateFilter}/>
        <hr/>
        <MatchedUsers matchedUsers={matchedUsers} selectedUser={selectedUser}/>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return{
    listUsers: state.skill.listUsers,
    skillList: state.getSkillsList,
    matchedUsers: state.getMatchedUsers
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getAllSkillsAction: function () {
      dispatch(getAllSkillsAction());
    },
    getSkillList: function () {
      dispatch(getSkillList())
    },
    getMatchedUsers: function (filterId) {
      dispatch(getMatchedUsers(filterId))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)