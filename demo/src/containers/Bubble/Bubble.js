import React, { Component } from 'react'
import { ResponsiveBubble } from '@nivo/circle-packing'
import flare from '../../components/ZoomableLayout/flare.json'
import { connect } from 'react-redux'
import { getSkillsAction } from '../../actions/skill'
import {Button} from 'primereact/components/button/Button'
import { linearGradientDef } from '@nivo/core'

const fData = {
  "name": "nivo",
  "children": [
    {
      "name": "viz",
      "color": "hsl(12, 70%, 50%)",
      "children": [
        {
          "name": "stack",
          "color": "hsl(12, 70%, 50%)",
          "children": [
            {
              "name": "chart",
              "color": "hsl(20, 50%, 50%)",
              "loc": 96876
            },
          ]
        },
        {
          "name": "pie",
          "color": "hsl(65, 70%, 50%)",
          "children": [
            {
              "name": "legends",
              "color": "hsl(25, 70%, 50%)",
              "loc": 182468
            }
          ]
        }
      ]
    }
  ]
}

class Bubble extends Component {
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
            "color": "hsl(1, 70%, 50%)",
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
              "color": "hsl(2, 70%, 50%)",
              "children": []
            })
              num++;
            for( var secondKey in other[key]){
              if(other[key][secondKey].skillTitle == this.props.editSkill){
                console.log(other[key][secondKey].mark , this.props.mark)
                if(other[key][secondKey].mark > this.props.mark){
                  console.log('>');
                  obj.children[num].children.push(
                    {"name" :other[key][secondKey].skillTitle,  "color": "hsl(25, 50%, 50%)", "loc" : other[key][secondKey].mark }
                  )
                }else if(other[key][secondKey].mark < this.props.mark){
                  console.log('<');
                  obj.children[num].children.push(
                    {"name" :other[key][secondKey].skillTitle,  "color": "hsl(28, 50%, 50%)", "loc" : other[key][secondKey].mark }
                  )
                }else{
                  console.log('=');
                  obj.children[num].children.push(
                    {"name" :other[key][secondKey].skillTitle,  "color": "hsl(20, 50%, 50%)", "loc" : other[key][secondKey].mark }
                  )}
                }
              else{
                  obj.children[num].children.push(
                  {"name" :other[key][secondKey].skillTitle,  "color": "hsl(23, 50%, 50%)", "loc" : other[key][secondKey].mark }
                )}
              }            
           }
           return obj;
      }

      data = () =>{
        if(this.props.userSkill ){
          return   this.createNewArr(this.props.userSkill) ;
        }else{
          return this.createNewArr(this.props.skills);
        }
      }
    
    changeColor = (e) => {
      this.setState({color: e.target.value})  
      
    }

    changeSkipRadius = (e) => {
      console.log(e.target.value)
      this.setState({SkipRadius: e.target.value})  
    }
    
    focus = (e) => {
      /*
      let nod = e.children;
      nod.map(element => {
        element.label = element.id
      })*/
      
      this.setState({clickId: e.id})

      if(e.parent === null || e.id == this.state.clickId){
        this.setState({SkipRadius: 50})
        this.setState({opacityBubble: "rgba(0, 0, 0, 0.1)"});
      }else{
        this.setState({SkipRadius: 0})
        this.setState({opacityBubble: "rgba(194, 194, 194, 1)"});
      }
      
    }

    render(){
      const { opacityBubble } = this.state;
        return (
            <div style={{padding: '0', height: '1000px'}}>   
              <div style={{margin: "20px"}}>
                <Button onClick={this.changeColor.bind(this)} className="ui-button-success" value={"d320c"}>1</Button>
                <Button onClick={this.changeColor.bind(this)} className="ui-button-success" value={"d320b"}>2</Button>
                <Button onClick={this.changeColor.bind(this)} className="ui-button-success" value={"d320"}>3</Button>
                <input onChange={this.changeSkipRadius.bind(this)} type="range" min="16" max="56" step="3" value={this.state.SkipRadius}/> 
              </div>
            <ResponsiveBubble
              root={ this.props.skills ? this.data(): fData}
              margin={{
                  "top": 20,
                  "right": 20,
                  "bottom": 20,
                  "left": 20
              }}
              identity="name"
              value="loc"
              // colors={this.state.color}
              colorBy="color"
              padding={6}
              label="id"
              labelSkipRadius={this.state.SkipRadius}
              onClick={this.focus.bind(this)}
              labelTextColor="1"
              borderWidth={0}
               /*defs={[
                   {
                     "id": "lines",
                      "type": "patternLines",
                      "background": "none",
                      "color": "#6A48D7",
                      "rotation": -45,
                      "lineWidth": 5,
                   },
             

               ]}*/
           
               /*
              fill={[
                   {
                     "match": {
                         "depth": 1
                     },
                     "id": "lines"
                   },

               ]}*/
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