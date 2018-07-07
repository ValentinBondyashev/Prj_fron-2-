import React, { Component } from 'react';
import {DataTable} from 'primereact/components/datatable/DataTable';
import {Dialog} from 'primereact/components/dialog/Dialog';
import {Button} from 'primereact/components/button/Button';
import {Column} from 'primereact/components/column/Column';
import {InputText} from 'primereact/components/inputtext/InputText';
import {InputTextarea} from 'primereact/components/inputtextarea/InputTextarea';
import {Dropdown} from 'primereact/components/dropdown/Dropdown';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import { connect } from 'react-redux';
import { getSkillUserAction, editSkillsAction } from '../../actions/compare';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/omega/theme.css';
import 'font-awesome/css/font-awesome.css';


class Dashboard extends Component {
    constructor() {
        super();
        this.state = {
            listUsers: ''
        };
    }
    displaySelection(data) {
        if(!data || data.length === 0) {
            return <div style={{textAlign: 'left'}}>No Selection</div>;
        }
        else {
            this.props.getSkillUserFunction(data.id)
            return <div style={{textAlign: 'left'}}>Selected User: {data.uid + ' - ' + data.email }</div>
        }
    }
    
    render() {
        return (
            <div>
                <div className="content-section implementation">
                    <DataTable value={this.props.listUsers} selectionMode="single" header="All Users" 
                        footer={this.displaySelection(this.state.listUsers)}
                        selection={this.state.listUsers} onSelectionChange={(e) => this.setState({listUsers: e.data})}>
                        <Column field="email"  header="email"/>
                        <Column field="name"  header="name"/>
                        <Column field="id"  header="id"/>
                        <Column field="created_at"  header="Data registration"/>
                    </DataTable>
                </div>
          
            </div>
        );
    }
    }
    
   
function mapStateToProps(state) {
    return { 
        skills: state.skill.skills.data,
    };
}
function mapDispathToProps(dispatch) {
    return {
        getSkillUserFunction: function (id) {
            dispatch(getSkillUserAction(id));
        },
        editSkillsFunction: function (id,skill) {
            dispatch(editSkillsAction(id,skill));
        },
        
    };
}

export default connect(mapStateToProps,mapDispathToProps)(Dashboard);
