import React, {Component} from 'react';
import { AutoComplete } from 'primereact/components/autocomplete/AutoComplete';

export class AutoCompleteSkillFilter extends Component {

  constructor(props) {
    super(props);
    this.state = {
      skills: null,
      filteredSkill: null
    };
  }

  clearFilter = () => {
    this.props.changeStateFilter([]); 
    this.setState({
      skills: null,
      filteredSkill: null
    })
  }

  filterSkillMultiple = (event) =>  {
    setTimeout(() => {
      let results = [];
        this.props.skillList['data'].filter((skill) => {
          if(!skill) return;
          if(skill.title.toLowerCase().includes(event.query.toLowerCase())){
            results.push({
              id: skill.id,
              name: skill.title
            })
          }
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
            if(!e.value){this.clearFilter()}
            this.setState({skills: e.value});
            this.props.changeStateFilter(e.value);
          }} />
        </span>
        <button onClick={this.clearFilter}>Clear filters</button>
      </div>
    )
  }
}