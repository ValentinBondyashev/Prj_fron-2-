import React, { Component } from 'react';
import './Menu.scss';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import {List, ListItem} from 'material-ui/List';
import { connect } from 'react-redux';
import { Sidebar, Segment, Button, Menu, Image, Icon, Header } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import Dashboard from '../Dashboard/Dashboard';
import PrivateRoute from '../../components/Routes/private-route';
import { Switch, Route } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Link } from 'react-router-dom';
import Roodmaps from '../Roodmaps/Roodmaps';
import Compare from '../Compare/Compare';


class MenuComponent extends Component {
  constructor(props) {

    super(props);
    this.state = { 
      visible: false,
      open: false
    };

  }

  toggleVisibility = () => this.setState({ visible: !this.state.visible })
  
  handleToggle = () => {
    this.setState({
      open: !this.state.open,
    });
  };

  handleNestedListToggle = (item) => {
    this.setState({
      open: item.state.open,
    });
  };

  render() {
    const { visible } = this.state;
    return (  
          <div className="generalMenu">
           
           <Sidebar.Pushable as={Segment}>
           <Sidebar
             as={Menu}
             animation='push'
             width='thin'
             visible={visible}
             icon='labeled'
             vertical
             inverted
             
           >
           <List className="manu_list">
             <ListItem
               primaryText="DEVELOPERS"
               initiallyOpen={true}
               primaryTogglesNestedList={true}
               nestedItems={[
                 <ListItem
                   key={1}
                   primaryText={<Link to="/menu/dashboard">Skills</Link>}
                 />,
                 <ListItem
                   key={2}
                   primaryText={<Link to="/menu/roodmaps">Roodmaps</Link>}
                 />,
               ]}
             />
              <ListItem
                   primaryText="ANALYSIS"
                   initiallyOpen={true}
                   primaryTogglesNestedList={true}
                   nestedItems={[
                     <ListItem key={1} primaryText={<Link to="/menu/compare">Compare</Link>} />,
                   ]}
                 />
           </List>
           </Sidebar>
            <Sidebar.Pusher>
                <AppBar className="app_bar" onClick={this.toggleVisibility} position="static">  
                </AppBar>
                  <Switch>
                    <PrivateRoute exact path='/menu/dashboard' component={Dashboard}/>
                    <PrivateRoute  path='/menu/roodmaps' component={Roodmaps}/>
                    <PrivateRoute  path='/menu/compare' component={Compare}/>
                  </Switch>
              </Sidebar.Pusher>
            </Sidebar.Pushable>
          </div>  
    );
  }
}



function mapStateToProps(state) {
    return { 
       
    };
}
function mapDispathToProps(dispatch) {
    return {
      
    };
}
export default (MenuComponent);
