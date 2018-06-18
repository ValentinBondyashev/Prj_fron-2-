import React, { Component } from 'react';
import './ZoomableLayout.css';
import * as d3 from 'd3';
import flare from './flare.json';
import { connect } from 'react-redux';
import { getSkillsAction } from '../../actions/skill'; 


class ZoomableLayout extends Component {
  constructor(props){
    super(props)
    this.createBarChart = this.createBarChart.bind(this) 
    this.state = {
      evClck: null
    }
  }
  
  componentDidMount() {
    this.props.getSkillsFunction(); 
    this.createBarChart();     
  }
  
  createBarChart() {
    var w = 1200,
    h = 800,
    r = 720,
    x = d3.scale.linear().range([0, r]),
    y = d3.scale.linear().range([0, r]),
    node;

    const input = this.input;

    var pack = d3.layout.pack()
      .size([r, r])
      .value(function(d) { return d.size; })
    var vis = d3.select(input)
      .attr("width", w)
      .attr("height", h)
      .append("svg:g")
      .attr("transform", "translate(" + (w - r) / 2 + "," + (h - r) / 2 + ")");   
    if(this.props.userSkill ){
      var nodes = pack.nodes( this.props.userSkill ? this.createNewArr(this.props.userSkill) : flare);
    }else{
      var nodes = pack.nodes(this.createNewArr(this.props.skills));
    }
    

    vis.selectAll("circle")
      .data(nodes)
      .enter().append("svg:circle")
      .attr("class", function(d) { return d.children ? "parent" : "child"; })
      .attr("cx", function(d) { return d.x; })
      .attr("cy", function(d) { return d.y; })
      .attr("r", function(d) { return d.r; })
      .on("click", function(d) { return zoom(node === d ? (root) : d); });
    
    vis.select("circle")
      .on("click", function(d) { return zoomOut(node === d ? (root) : d); });

    vis.selectAll("circle.child")
      .style("opacity", 0.1)

    vis.selectAll("text")
      .data(nodes)
      .enter().append("svg:text")
      .attr("class", function(d) { return d.children ? "parent" : "child"; })
      .attr("x", function(d) { return d.x; })
      .attr("y", function(d) { return d.y; })
      .attr("dy", ".35em")
      .attr("text-anchor", "middle")
      .style("opacity", function(d) { return d.r > 200 ? 1 : 0; })
      .text(function(d) { return d.name });
      //String(d.name) === 'undefined' ? null : String(d.name).substring(0,10)
    
    vis.selectAll("text.parent")
      .style("opacity", function(d) { return d.r > 10 ? 1 : 0; });

    function zoomOut(d){
      var k = r / d.r / 2;
      x.domain([d.x - d.r, d.x + d.r]);
      y.domain([d.y - d.r, d.y + d.r]);
      var t = vis.transition()
        .duration(700);
    t.selectAll("circle")
      .attr("cx", function(d) { return x(d.x); })
      .attr("cy", function(d) { return y(d.y); })
      .attr("r", function(d) { return k * d.r; })
    
    t.selectAll("circle.child")
      .style("opacity", 0.1)


    t.selectAll("text")
      .attr("x", function(d) { return x(d.x); })
      .attr("y", function(d) { return y(d.y); })
      .style("opacity", function(d) { return d.r > 200 ? 1 : 0; });
        
    t.selectAll("text.parent")
      .style("opacity", function(d) { return d.r > 10 ? 1 : 0; });
      
      node = d;
    
    }

    function zoom(d) {
      var k = r / d.r / 2;
      x.domain([d.x - d.r, d.x + d.r]);
      y.domain([d.y - d.r, d.y + d.r]);
      var t = vis.transition()
        .duration(700);
      t.selectAll("circle.child")
        .style("opacity", 1) 
    
    t.selectAll("circle")
      .attr("cx", function(d) { return x(d.x); })
      .attr("cy", function(d) { return y(d.y); })
      .attr("r", function(d) { return k * d.r ; })
    
    t.select("circle.child")
      .style("opacity", function(d) { return d.r > 20 ? 1 : 0; })

    t.selectAll("text")
      .attr("x", function(d) { return x(d.x); })
      .attr("y", function(d) { return y(d.y); })
      .style("opacity", function(d) { return k * d.r > 20 ? 1 : 0; });
    //hide text parent
    t.selectAll("text.parent")
      .style("opacity", 0 );
      node = d;
    }
  }

  createBar = (e) => {
    this.createBarChart();
    
    if(this.state.evClck !== e.target){
      this.input.children[1].remove();
    }else{
      this.input.children[0].remove();
    }
    this.setState({evClck: e.target});

  }

  createNewArr = (skills) => {
   
    let other = {}, letter; 
    let obj = { "children": []}
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
            {"name" :other[key][secondKey].skillTitle, "size" : other[key][secondKey].mark }
         )}
       }
       return obj;
  }

  render() {
    console.log(this.props.skills)
  return (
    <div style={{display:"flex", justifyContent: "center", background: "#f2f5f9"}}>
      <svg onClick={this.createBar.bind(this)} ref={input => this.input = input}></svg> 
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

export default connect(mapStateToProps,mapDispathToProps)(ZoomableLayout);
