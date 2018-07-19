import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dropdown } from 'primereact/components/dropdown/Dropdown';


import { getUserById } from '../../../../actions/getUserById';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/omega/theme.css';
import 'font-awesome/css/font-awesome.css';


class SkillList extends Component {
  constructor() {
      super();
      this.state = {
        user: ''
      };
  }
    
  onUserChange = (e) => {
    this.setState({user: e.value});
    this.props.getUserById(e.value.id)
  }
    
  render() {
    const { listUsers } = this.props
    return (
      <Dropdown 
        value={this.state.user} 
        options={listUsers} 
        onChange={this.onUserChange} 
        style={{width:'150px'}} 
        placeholder="Select User" 
        optionLabel="name"
      />
    );
  }
}

function mapStateToProps(state) {
  return { 
    userById: state.getUserById
  };
};

function mapDispathToProps(dispatch) {
  return {
    getUserById: function (id) {
      dispatch(getUserById(id));
    }
  };
}

export default connect(mapStateToProps,mapDispathToProps)(SkillList);
