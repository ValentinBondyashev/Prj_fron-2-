import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {DataTable} from 'primereact/components/datatable/DataTable';
import {Dialog} from 'primereact/components/dialog/Dialog';
import {Button} from 'primereact/components/button/Button';
import {Column} from 'primereact/components/column/Column';
import {InputText} from 'primereact/components/inputtext/InputText';
import {InputTextarea} from 'primereact/components/inputtextarea/InputTextarea';
// import {Dropdown} from 'primereact/components/dropdown/Dropdown';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

import { getSkillsAction, createSkillsAction, getIdCategoriesAction, createSkillsAdminAction } from '../../actions/skill'; 
import { editSkillsAction } from '../../actions/compare'; 
import Bubble from '../Bubble/Bubble';

import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/omega/theme.css';
import 'font-awesome/css/font-awesome.css';


class Dashboard extends Component{
    constructor() {
        super();
        this.state = {
            skill: {
                skillTitle:'',
                mark: '',
                disposition: '',
                comment: ''
            },
            displayDialog: false,
            idSkill : 1,
            oldValue: '',
            brands: null
        };
    }

    componentWillMount() {
        this.props.getSkillsFunction(this.props.MyID); 
        this.props.getIdCategoriesFunction();
    }
    
    onEditorValueChange(props, value) {
        let updatedCars = [...props.value];
        if(props.field === 'mark' || props.field === "disposition"){
            updatedCars.forEach(element => {
                if(element.id === props['rowData']['id']){
                    if(value < 10 || value >= 0 ){
                        if(value > 10 || value.length == 3){
                            element[props.field] = 10
                        }else{
                            element[props.field] = value
                        }
                    }
                }
            });
        }else{
            updatedCars.forEach(element => {
                if(element.id === props['rowData']['id']) {
                    element[props.field] = value;
                }
            });
        }            
        this.setState({cars: updatedCars});
    }

    footerTemplate = (data, index) => {
        return (
            []
        );
    }

    inputTextEditor(props, mark) {
        return  (
            <InputText ref={(input) => { this.textInput = input; }} onKeyDown = {(e) => this.onEnter(props, e.target, e.keyCode)} 
                onBlur = {(e) =>  this.onRowUnselect(props, e.target.value, mark)} 
                onChange = {(e) => this.onEditorValueChange(props, e.target.value)}
                type="text" value = {props.rowData[props.field]}
            />
        );
    }   
    
    editor = (props) => {
        const mark = props.rowData.mark
        return this.inputTextEditor(props, mark);
    }
    
    headerTemplate = (data) => {
        return data.skill.skillsCategory.description;
    }

    onRowUnselect = (props, value, mark) => {   
        this.props.editSkillsFunction(props.rowData.userId,props.rowData.skillId, Number(props.rowData.mark)) 
    } 
    
    onEnter = (props, value, key) => {
        value.parentElement.parentElement.parentElement.style.background = "#A0DDA0";
        if(key === 13) {
            this.props.editSkillsFunction(props.rowData.userId,props.rowData.skillId, Number(props.rowData.mark)) 
        }
    }

    save = () => {
        let data = {
            "categoryId":this.state.idSkill,
            "skillTitle": this.state.skill.skillTitle,
            "mark" : this.state.skill.mark,
            "disposition":this.state.skill.disposition,
            "comment":this.state.skill.comment
        }
        this.props.createSkillsAction(data);
             
        this.setState({displayDialog: false});
    }

    updateProperty = (property, value) => {
        let skill = this.state.skill;
        skill[property] = value;
        this.setState({skill: skill});
    }

    updatePropertyMark = (property, value) => {
        let skill = this.state.skill;
        skill[property] = value;
        
        if(property === 'mark' || 'disposition'){
            if(skill[property] <= 10 || skill[property] >= 0 ){
                if(skill[property] > 10 || skill[property].length == 3){
                    skill[property] = 10;
                }
                this.setState({skill: skill});
            }
        }
    }

    addNew = () => {
        this.setState({ 
            skill: {
                skillTitle:'',
                mark: '',
                disposition: '',
                comment: ''
            },
            displayDialog: true });
    }

    handleChange = (e, index, value) => {
        this.setState({idSkill:value})
    }

    render() {
        const { userSkill, skills, listTechnologies } = this.props;

        let header = (
            <div style={{'textAlign':'left'}}>
                <i className="fa fa-search" style={{margin:'4px 4px 0 0'}}></i>
                <InputText type="search" onInput={(e) => this.setState({globalFilter: e.target.value})} placeholder="Global Search" size="50"/>
            </div>
        );

        let footer = (
            <div className="ui-helper-clearfix" style={{width:'100%'}}>
                <Button style={{float:'left'}} icon="fa fa-plus" label="Add" onClick={this.addNew}/>
            </div>
        );

        let dialogFooter =  (
            <div className="ui-dialog-buttonpane ui-helper-clearfix">
                <Button label="Save" icon="fa fa-check" onClick={this.save}/>
            </div>
        );

        return (
            <div>
                <div className="content-section implementation" style={{padding: '0', minHeight: '100px'}}>
                    <DataTable
                        header="Технологии"  
                        value={userSkill ? userSkill : skills} 
                        rowGroupMode="subheader"
                        footer={footer} 
                        groupField="skill.skillsCategory.description" 
                        rowGroupFooterTemplate={this.footerTemplate}  
                        rowGroupHeaderTemplate={this.headerTemplate} 
                        globalFilter={this.state.globalFilter}
                        paginator={true} 
                        rows={10} 
                        header={header}
                                                >           
                        <Column field="skill.title"  header="Технология"  />
                        <Column field="mark" header="Скилл от 1 до 10 :" editor={this.editor} />
                        <Column field="disposition" header="Желание от 1 до 10 :" editor={this.editor}/>
                        <Column field="comment" header="Комментарий" editor={this.editor}/>
                    </DataTable>               
                    <Dialog visible={this.state.displayDialog} 
                            header="Add Skill" 
                            modal={true} 
                            footer={dialogFooter} 
                            onHide={() => this.setState({displayDialog: false})}>
                        <div className="ui-grid ui-grid-responsive ui-fluid">
                            <div className="ui-grid-row">
                                <div className="ui-grid-col-4" style={{padding:'4px 10px'}}>
                                    <label htmlFor="skillTitle">Технология</label>
                                </div>
                                <div className="ui-grid-col-8" style={{padding:'4px 10px'}}>
                                    <DropDownMenu value={this.state.idSkill} onChange={this.handleChange}>{
                                        listTechnologies ? listTechnologies.map((el,index) => (
                                            <MenuItem key={index} value={el.id} primaryText={el.title} />
                                        )): null }
                                    </DropDownMenu>
                                </div>
                            </div>
                            <div className="ui-grid-row">
                                <div className="ui-grid-col-4" style={{padding:'4px 10px'}}>
                                    <label htmlFor="skillTitle">Технология</label>
                                </div>
                                <div className="ui-grid-col-8" style={{padding:'4px 10px'}}>
                                    <InputText 
                                        id="skillTitle" 
                                        onChange={(e) => {this.updateProperty('skillTitle', e.target.value)}} 
                                        value={this.state.skill.skillTitle}/>
                                </div>
                            </div>
                            <div className="ui-grid-row">
                                <div className="ui-grid-col-4" style={{padding:'30px 10px'}}>
                                    <label htmlFor="mark">Скилл</label>
                                </div>
                                <div className="ui-grid-col-8" style={{padding:'4px 10px'}}>
                                    <span >От 0 до 10:</span>
                                    <InputText 
                                        id="mark" 
                                        onChange={(e) => {this.updatePropertyMark('mark', e.target.value)}} 
                                        value={this.state.skill.mark}/>
                                </div>
                            </div>
                            <div className="ui-grid-row">
                                <div className="ui-grid-col-4" style={{padding:'25px 10px'}}>
                                    <label htmlFor="disposition">Желание</label>
                                </div>
                                <div className="ui-grid-col-8" style={{padding:'4px 10px'}}>
                                    <span>От 0 до 10:</span>
                                    <InputText 
                                        id="disposition" 
                                        onChange={(e) => {this.updatePropertyMark('disposition', e.target.value)}} 
                                        value={this.state.skill.disposition}/>
                                </div>
                            </div>
                            <div className="ui-grid-row">
                                <div className="ui-grid-col-4" style={{padding:'4px 10px'}}>
                                    <label htmlFor="colcommentor">Комментарий</label>
                                </div>
                                <div className="ui-grid-col-8" style={{padding:'4px 10px'}}>
                                    <InputTextarea 
                                        rows={5} 
                                        cols={30} 
                                        autoResize={true} 
                                        id="comment" 
                                        onChange={(e) => {this.updateProperty('comment', e.target.value)}} 
                                        value={this.state.skill.comment}/>
                                </div>
                            </div>
                        </div>
                    </Dialog>
                </div>
            </div>
        );
    }
}
    
   
function mapStateToProps(state) {
    return { 
        skills: state.skill.skills,
        listTechnologies: state.skill.listTechnologies,
        checkAdmin: state.auth.checkAdmin,
        MyID: state.auth.MyID,
        userId: state.skill.userId
    };
}

function mapDispathToProps(dispatch) {
    return {
        getSkillsFunction: function (id) {
            dispatch(getSkillsAction(id));
        },
        getIdCategoriesFunction: function () {
            dispatch(getIdCategoriesAction());
        }, 
        createSkillsAction: function (skill){
            dispatch(createSkillsAction(skill));
        },
        editSkillsFunction: function (userId,skillId,mark){
            dispatch(editSkillsAction(userId,skillId,mark));
        },
        createSkillsAdminFunction: function(skill, id){
            dispatch(createSkillsAdminAction(skill, id));
        }     
    };
}

export default connect(mapStateToProps,mapDispathToProps)(Dashboard);
