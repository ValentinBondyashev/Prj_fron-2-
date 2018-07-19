import React, { Component } from 'react';
import { connect } from 'react-redux';


import './UserTable.css'

import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/omega/theme.css';
import 'font-awesome/css/font-awesome.css';


class UserTable extends Component{
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <table className='user-table'>
        <thead className='table-header'>
          <tr className='table-row'>
            <th className='table-row-header'>Технология</th>
            <th className='table-row-header'>Скилл</th>
            <th className='table-row-header'>Желание</th>
            <th className='table-row-header'>Комментарий</th>
          </tr>
        </thead>
        <tbody className='table-body'>
        {/* {this.props.categories.map(category => {return{
          <TableRow category={category} />
        }})} */}
        
          <tr className="table-row">
            <td colSpan='4' className="table-cell technology"><h4>this.props.category.name</h4></td>
            {/* <td colSpan='4' className="table-cell technology">{this.props.category.name}</td> */}

          </tr>
          <tr className="table-row">
            <td className="table-cell name">sa</td>
            <td className="table-cell">s</td>
            <td className="table-cell">d</td>
            <td className="table-cell">f</td>
          </tr>
          <tr className="table-row">
            <td className="table-cell name">s</td>
            <td className="table-cell">s</td>
            <td className="table-cell">w</td>
            <td className="table-cell">q</td>
          </tr>
          <tr className="table-row">
            <td className="table-cell name"></td>
            <td className="table-cell"></td>
            <td className="table-cell"></td>
            <td className="table-cell"></td>
          </tr>
          <tr className="table-row">
            <td className="table-cell name"></td>
            <td className="table-cell"></td>
            <td className="table-cell"></td>
            <td className="table-cell"></td>
          </tr>
        </tbody>
      </table>
    );
  }
}
    
   
function mapStateToProps(state) {
    return { 

    };
}

function mapDispathToProps(dispatch) {
    return {

    }

}

export default connect(mapStateToProps,mapDispathToProps)(UserTable);
