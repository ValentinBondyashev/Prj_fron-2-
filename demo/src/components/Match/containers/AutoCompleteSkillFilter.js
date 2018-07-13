import React, {Component} from 'react';
import {AutoComplete} from 'primereact/components/autocomplete/AutoComplete';

export class AutoCompleteSkillFilter extends Component {

  constructor(props) {
    super(props);
    this.state = {
      skills: [],
      filteredSkill: null
    };
    this.skillList = this.props.skillList.map(skillData => {
      if(skillData.skill !== null) {
        return {
          id: skillData.skill.id,
          name: skillData.skill.title
        } 
      } else {
        return
      }
    })
  }

  clearFilter = () => {
    this.setState({
      skills: null
    })
  }


  filterSkillMultiple = (event) =>  {
    setTimeout(() => {

      let results = this.skillList.filter((skill) => {
        if(!skill) return;
          return skill.name.toLowerCase().includes(event.query.toLowerCase());
        });
        
      this.setState({ filteredSkill: results });
    }, 250);
  }

  render() {
    return (
      <div className='autocomplete-skill-filter'>
        <h3>Skills</h3>
        <span className="ui-fluid">
          <AutoComplete 
          value={this.state.skills} 
          suggestions={this.state.filteredSkill} 
          completeMethod={this.filterSkillMultiple}
          minLength={1} 
          placeholder="Skills" 
          field="name" 
          multiple={true} 
          onChange={(e) => {
            this.setState({skills: e.value});
            this.props.changeStateFilter(e.value)
          }} />
        </span>
        <button onClick={this.clearFilter}>Clear filters</button>
      </div>
    )
  }
}