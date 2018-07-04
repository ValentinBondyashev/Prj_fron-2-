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

  sortChangedData(data){
    if(this.props.userId){
      var arr = data.filter(e => e.userId == this.props.userId).sort( (a,b) => {
        return new Date(a.createdAt) - new Date(b.createdAt)
      })
    }else{
      var arr = data.sort( (a,b) => {
        return new Date(a.createdAt) - new Date(b.createdAt)
      })
    }
    let uniqskills = {};
    arr.forEach(skill => {
      if(!uniqskills.hasOwnProperty(skill.skillId)){
        uniqskills[skill['userSkill.skillId']] = {skillId: skill['userSkill.skillId'], mark: skill.skill_old - skill.skill_new};
      }
    });
    return uniqskills;
  }

  sort = (data) => {
    let arrUniqslist = this.sortChangedData(this.props.changedSkills);
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
      let skillCategory = other[key];
      if(skillCategory[0].skill.title){
        obj.children.push({
          "name": skillCategory[0].skill.skillsCategory.description,
          "color": "hsl(235, 89%, 64%)",
          "children": []})
          num++;
        for(var secondKey in skillCategory){
          let skill = skillCategory[secondKey];
         if(arrUniqslist.hasOwnProperty(skill.skill.id)){
              if(arrUniqslist[skill.skill.id].mark < 0){
                obj.children[num].children.push(
                  {"name" :skill.skill.title,  "color": "hsl(113, 67%, 55%)", "loc" : skill.mark }
                )
              }else{
                obj.children[num].children.push(
                  {"name" :skill.skill.title,  "color": "hsl(228, 76%, 41%)", "loc" : skill.mark }
                )
              }
            }else{ obj.children[num].children.push(
              {"name" :skill.skill.title,  "color": "hsl(0, 0%, 89%)", "loc" : skill.mark }
          )}
         }  
      }

               
      }
      return obj
  }

  render(){
    let ar;
    const { SkipRadius } = this.state;
      return (
          <div style={{padding: '0', height: '1000px'}}>   
            <div style={{margin: "20px"}}>
              <input onChange={this.changeSkipRadius.bind(this)} type="range" min="16" max="56" step="3" value={SkipRadius}/> 
            </div>
          <ResponsiveBubble
            root={ this.props.skills ? this.data() : fData }
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