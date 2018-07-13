import React from 'react';
import { connect } from 'react-redux';

import { AutoCompleteSkillFilter } from './containers/AutoCompleteSkillFilter';
import { AutoCompleteUser } from './containers/AutocopleteUser';
import { getAllSkillsAction } from '../../actions/compare';

import './compare.css';

import 'primereact/resources/themes/omega/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

class App extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      chekedUser: null,
      filters: null,
      response: null
    }
  }

  testSendRequest = () => {
    this.setState({
      response: {
        chekedUser: this.state.chekedUser,
        filters: this.state.filters
      }
    })
  }

  changeStateFilter = (filters) => {
    this.setState({
      filters: filters
    })
  }

  changeStateUser = (user) => {
    this.setState({
      chekedUser: user
    })
  }

  componentWillMount() {
    this.props.getUsersFunction();
  }

  render() {
    const { skills, listUsers } = this.props
    
    return(
      <div className='compare-desk'>
        <AutoCompleteUser users={listUsers} changeStateUser={this.changeStateUser}/>
        <hr/>
        <AutoCompleteSkillFilter skillList={skills} changeStateFilter={this.changeStateFilter}/>
        <hr/>
        <div className='send-request'>
          <button onClick={this.testSendRequest}>
            Найти пару
          </button>
        </div>
        {
          this.state.response && this.state.response.chekedUser && this.state.response.filters ? 
            <div>
              <h3>Sending a request with information: </h3>
              <div>
                User: {this.state.response.chekedUser.name}
              </div>
              <div>
                Filters: {this.state.response.filters.map((filter, index) => {
                  return (
                    <div key={index}>
                      {filter.name}
                    </div>
                    )
                })}
              </div>
            </div> :
            null
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return{
    skills: state.skill.skills,
    listUsers: state.skill.listUsers
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getUsersFunction: function () {
      dispatch(getAllSkillsAction());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)