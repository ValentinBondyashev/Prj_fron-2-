import React, {Component} from 'react';
import { AutoComplete } from 'primereact/components/autocomplete/AutoComplete';
import { connect } from 'react-redux';
import { getUserById } from '../../../actions/getUserById';
import SelectedUser from './SelectedUser/SelectedUser';

class AutoCompleteUser extends Component {

  constructor(props) {
      super(props);   
      this.state = {
        user: null,
        filteredUsers: null
      };
  }

  filterUsers = (event) => {
    setTimeout(() => {
        var result = this.props.users.filter((item) => {
          if(item.name.toLowerCase().includes(event.query.toLowerCase())){
            return item
          }
        });
        this.setState({ filteredUsers: result });
    }, 250);
  }

  render() {
    
    const { userById, filters } = this.props;
    const { user, filteredUsers } = this.state;
    let skills =[];
    return (
      <div className='autocomplete-user'>
        <h3>Developer</h3>
        <AutoComplete 
          value={user}
          suggestions={filteredUsers} 
          completeMethod={this.filterUsers} 
          field="name"
          size={50} 
          placeholder="Developers" 
          minLength={1} 
          onChange={
            (e) => {
              this.setState({user: e.value });
              this.props.selectUser(e.value);
              if(e.value.id){
                this.props.getUserById(e.value.id)
              }
            }
          }/>
          <br/>
          {
            (userById && user && userById.id === user.id) ? 
              <SelectedUser userById={userById} filters={filters} skills={skills}/>
              : null
          }
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    userById: state.getUserById
  }
};

function mapDispatchToProps(dispatch){
  return {
    getUserById: function (userId) {
      dispatch(getUserById(userId));
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(AutoCompleteUser)