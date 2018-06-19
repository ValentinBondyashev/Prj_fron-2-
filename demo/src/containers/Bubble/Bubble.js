import React, { Component } from 'react'
import { ResponsiveBubble } from '@nivo/circle-packing'
import flare from '../../components/ZoomableLayout/flare.json'
import { connect } from 'react-redux'
import { getSkillsAction } from '../../actions/skill'
import {Button} from 'primereact/components/button/Button'

class Bubble extends Component {
  constructor(props) {

    super(props);
    this.state = { 
      color: "d320",
      SkipRadius: 20,
      clickId : null
    };
  }
    createNewArr = (skills) => {
   
        let other = {}, letter; 
        let obj = {
            "name": "nivo",
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
              "children": []
            })
              num++;
            for( var secondKey in other[key]){
              obj.children[num].children.push(
                {"name" :other[key][secondKey].skillTitle, "loc" : other[key][secondKey].mark }
             )}
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
      this.setState({SkipRadius: e.target.value})  
      console.log(e.target.value);
    }
    
    focus = (e) => {
      this.setState({clickId: e.id})

      if(e.parent === null){
        this.setState({SkipRadius: 50})
      }else{
        this.setState({SkipRadius: 0})
      }
      
    }

    render(){
       
        return (
            <div style={{padding: '0', height: '1000px'}}>   
              <div style={{margin: "20px"}}>
                <Button onClick={this.changeColor.bind(this)} className="ui-button-success" value={"d320c"}>1</Button>
                <Button onClick={this.changeColor.bind(this)} className="ui-button-success" value={"d320b"}>2</Button>
                <Button onClick={this.changeColor.bind(this)} className="ui-button-success" value={"d320"}>3</Button>
                <input onChange={this.changeSkipRadius.bind(this)} type="range" min="0" max="100" step="1" value={this.state.SkipRadius}/> 
              </div>
                   <ResponsiveBubble
        root={ this.data()}
        margin={{
            "top": 20,
            "right": 20,
            "bottom": 20,
            "left": 20
        }}
        identity="name"
        value="loc"
        colors={this.state.color}
        colorBy="name"
        padding={6}
        label="id"
        labelSkipRadius={this.state.SkipRadius}
        onClick={this.focus.bind(this)}
        labelTextColor="inherit:darker(0.8)"
        borderWidth={3}
        defs={[
            {
                "id": "lines",
                "type": "patternLines",
                "background": "none",
                "color": "#6A48D7",
                "rotation": -45,
                "lineWidth": 5,
            }
        ]}
        fill={[
            {
                "match": {
                    "depth": 1
                },
                "id": "lines"
            }
        ]}
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