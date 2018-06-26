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

class Bubble extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { 
      color: "d320",
      SkipRadius: 20,
      clickId : null,
      opacityBubble: "rgba(0, 0, 0, 0.1)",
    };
  }
    createNewArr = (skills) => {
        let other = {}, letter; 
        let obj = {
            "name": "nivo",
            "color": "hsl(263, 67%, 31%)",
            "children": []}
          skills.forEach(element => {
            letter = element.skillCategoryTitle;
               if (!(letter in other))
                   other[letter] = [];     
               other[letter].push(element);
          });
           var num = -1;
          for(let key in other) {
            obj.children.push({
              "name": key,
              "color": "hsl(235, 89%, 64%)",
              "children": []})
              num++;
            for( var secondKey in other[key]){
              if(other[key][secondKey].skillTitle == this.props.editSkill){
                  obj.children[num].children.push(
                    {"name" :other[key][secondKey].skillTitle,  "color": "hsl(0, 0%, 89%)", "loc" : other[key][secondKey].mark }
                  )
                }
              else{
                  obj.children[num].children.push(
                    {"name" :other[key][secondKey].skillTitle,  "color": "hsl(0, 0%, 89%)", "loc" : other[key][secondKey].mark }
                )}
              }            
           }
           return obj;
      }

    data = () =>{
      if(this.props.userSkill ){
        return this.createNewArr(this.props.userSkill) ;
      }else{
        return this.createNewArr(this.props.skills);
      }
    }
    
    changeColor = (e) => {
      this.setState({color: e.target.value})        
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

    render(){
      const { opacityBubble, SkipRadius } = this.state;
        return (
            <div style={{padding: '0', height: '1000px'}}>   
              <div style={{margin: "20px"}}>
                <input onChange={this.changeSkipRadius.bind(this)} type="range" min="16" max="56" step="3" value={SkipRadius}/> 
              </div>
            <ResponsiveBubble
              root={ this.props.skills ? this.data(): fData }
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
      skills: state.skill.skills.data,
      editSkill: state.skill.editSkill,
      mark: state.skill.mark,
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