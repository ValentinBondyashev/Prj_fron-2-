import React, { Component } from 'react';

import User from './User/User';
import './MatchedUsers.css';

export class MatchedUsers extends Component {
  
  render() {
    const { matchedUsers, selectedUser } = this.props;
    
    if (matchedUsers.length === 0) {
      return null 
    }

    return (
      <div className='matched-users'>
        {
          matchedUsers.map((user, idx) => {
            if( selectedUser && user.name === selectedUser.name){
              return null
            } else return (
              <User key={idx} user={user}/>
            )
          })
        }
      </div>
    )

  }
}