import React from 'react';
import { connect } from 'react-redux';

import { AutoCompleteSkillFilter } from './containers/AutoCompleteSkillFilter';
import { AutoCompleteUser } from './containers/AutocopleteUser';
import { getAllSkillsAction, getSkillList } from '../../actions/compare';

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
    }
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
    this.props.getAllSkillsAction();
    this.props.getSkillList();
  }

  render() {
    const { skillList, listUsers } = this.props
    
    return(
      <div className='compare-desk'>
        <AutoCompleteUser users={listUsers} changeStateUser={this.changeStateUser}/>
        <hr/>
        <AutoCompleteSkillFilter skillList={skillList} changeStateFilter={this.changeStateFilter}/>
        <hr/>
        <div className='send-request'>
          <button onClick={this.testSendRequest}>
            Найти пару
          </button>
        </div>
        {
          this.state.chekedUser && this.state.filters ? 
            <div>
              <h3>Sending a request with information: </h3>
              <div>
                User: {this.state.chekedUser.name}
              </div>
              <div>
                Filters: {this.state.filters.map((filter, index) => {
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
    listUsers: state.skill.listUsers,
    skillList: state.getSkillsList
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getAllSkillsAction: function () {
      dispatch(getAllSkillsAction());
    },
    getSkillList: function () {
      dispatch(getSkillList())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)