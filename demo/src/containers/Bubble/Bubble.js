import _ from 'lodash';
import React, { Component, PureComponent } from 'react'
import { ResponsiveBubble } from '@nivo/circle-packing'
import { connect } from 'react-redux'
import { getSkillsAction } from '../../actions/skill'
import { linearGradientDef } from '@nivo/core'


const fData = {
  "name": "nivo",
  "color": "hsl(12, 70%, 50%)",
  "children": [
    {
      "name": "Wait two second",
      "color": "hsl(12, 70%, 50%)",
      "loc": "10"
    }
  ]
}

class Bubble extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      SkipRadius: 20,
      clickId : null,
    };
    
  }
 

  data = () =>{
    if(this.props.userSkill ){
      return this.sort(this.props.userSkill) ;
    }else{
      return this.sort(this.props.skills);
    }
  }
  

  changeSkipRadius = (e) => {
    this.setState({SkipRadius: e.target.value})  
  }
  
  focus = (e) => {
    this.setState({clickId: e.id})
    if(e.parent === null || e.id == this.state.clickId){
      this.setState({SkipRadius: 50})
    }else{
      this.setState({SkipRadius: 0})
    } 
  }


  sort = (data) => {
    let other = {}, letter; 
    let obj = {
      "name": "nivo",
      "color": "hsl(263, 67%, 31%)",
      "children": []}
    data.map(element => {
      letter = element.skill.categoryId;
      if (!(letter in other))
          other[letter] = [];     
      other[letter].push(element);
    })
    var num = -1;
    for(let key in other) {  
      obj.children.push({
        "name": key,
        "color": "hsl(235, 89%, 64%)",
        "children": []})
        num++;
      for(var secondKey in other[key]){
        /*
        for(var i = 0; i < this.props.changedSkills.length; i++){
          console.log('---------', other[key][secondKey].skill.id , this.props.changedSkills[i]['userSkill.skillId'])
          if(other[key][secondKey].skill.id == this.props.changedSkills[i]['userSkill.skillId']){
            obj.children[num].children.push(
              {"name" :other[key][secondKey].skill.title,  "color": "hsl(129, 88%, 51%)", "loc" : other[key][secondKey].mark }
            )
          }
        }
        */
        if(other[key][secondKey].skill.id === this.props.changedSkills[0]['userSkill.skillId']){
          if(other[key][secondKey].mark > this.props.changedSkills[0]['skill_new']){
            obj.children[num].children.push(
              {"name" :other[key][secondKey].skill.title,  "color": "hsl(129, 88%, 51%)", "loc" : other[key][secondKey].mark }
            )
          }else{
            obj.children[num].children.push(
              {"name" :other[key][secondKey].skill.title,  "color": "hsl(249, 100%, 59%)", "loc" : other[key][secondKey].mark }
            )
          }
          }
        else{
            obj.children[num].children.push(
              {"name" :other[key][secondKey].skill.title,  "color": "hsl(0, 0%, 89%)", "loc" : other[key][secondKey].mark }
          )}
        }            
      }
      return obj
  }

  render(){
    let ar;
    const { SkipRadius } = this.state;
    console.log(this.props.userSkill)
      return (
          <div style={{padding: '0', height: '1000px'}}>   
            <div style={{margin: "20px"}}>
              <input onChange={this.changeSkipRadius.bind(this)} type="range" min="16" max="56" step="3" value={SkipRadius}/> 
            </div>
          <ResponsiveBubble
            root={ this.props.skills ? this.data(this.props.skills) : fData }
            margin={{
              "top": 20,
              "right": 20,
              "bottom": 20,
              "left": 20
            }}
            identity="name"
            value="loc"
            colorBy={d => d.color}
            padding={6}
            label="id"
            labelSkipRadius={SkipRadius}
            onClick={this.focus.bind(this)}
            labelTextColor="1"
            borderWidth={0}
            animate={true}
            motionStiffness={90}
            motionDamping={12}
          />
          </div>
              
      )
  }
}

function mapStateToProps(state) {
    return { 
      skills: state.skill.skills,
      editSkill: state.skill.editSkill,
      mark: state.skill.mark,
      changedSkills: state.skill.changedSkills
    };
  }
  function mapDispathToProps(dispatch) {
    return {
        getSkillsFunction: function () {
          dispatch(getSkillsAction());
        }
    };
  }
  
  export default connect(mapStateToProps,mapDispathToProps)(Bubble);