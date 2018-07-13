import React, {Component} from 'react';
import { AutoComplete } from 'primereact/components/autocomplete/AutoComplete';


export class AutoCompleteUser extends Component {

  constructor(props) {
      super(props);   
      this.state = {
        user: [],
        filteredUser: null
      };
  }

  componentDidMount() {
    this.users = this.props.users
  }

  componentDidUpdate() {
    this.users = this.props.users
  }

  filterUsers = (event) => {
    setTimeout(() => {
        var result = this.users.filter((user) => {
          if(user.name.toLowerCase().includes(event.query.toLowerCase())){
            return user
          }
        });
        this.setState({ filteredUser: result });
    }, 250);
  }

  render() {
    return (
      <div className='autocomplete-user'>
        <h3>Developer</h3>
        <AutoComplete 
          value={this.state.user} 
          suggestions={this.state.filteredUser} 
          completeMethod={this.filterUsers} 
          field="name"
          size={30} 
          placeholder="Developers" 
          minLength={1} 
          onChange={(e) => {
            this.setState({user: e.value});
            this.props.changeStateUser(e.value);
          }} />
          <br/>
      </div>
    )
  }
}