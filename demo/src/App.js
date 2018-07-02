import React, { Component } from 'react';
import { HashRouter, Route, Switch, Redirect, BrowserRouter } from 'react-router-dom';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Login from '../src/containers/Login/Login';
import Register from '../src/containers/Register/Register';
import Full from './containers/MenuApp/MenuApp.js';
import { connect } from 'react-redux';
import loginAction, { checkAuthAction } from '../src/actions/auth'; 
import PrivateRoute from '../src/components/Routes/private-route';
import NoAuthRoute from '../src/components/Routes/no-auth-route';

// Styles
// CoreUI Icons Set
import '@coreui/icons/css/coreui-icons.min.css';
// Import Flag Icons Set
// import 'flag-icon-css/css/flag-icon.min.css';
// Import Font Awesome Icons Set
// import 'font-awesome/css/font-awesome.min.css';
// Import Simple Line Icons Set
// import 'simple-line-icons/css/simple-line-icons.css';
// Import Main styles for this application
import './scss/style.css'
// import '../node_modules/@coreui/styles/scss/_dropdown-menu-right.scss';

// Containers


// import { renderRoutes } from 'react-router-config';

class App extends Component {
  componentDidMount(){
    this.props.checkAuthFunction(this.props.token);
  }

  render() {
    return (
      <BrowserRouter>
      <div className="App">
        <MuiThemeProvider>
          <Switch>
            <NoAuthRoute exact path='/' component={Login}/>
            <NoAuthRoute  path='/register' component={Register}/>
            <PrivateRoute path="/"  component={Full} />
          </Switch>
        </MuiThemeProvider>
        {this.props.children}
      </div>
    </BrowserRouter>
    );
  }
}

function mapStateToProps(state) {
  return { 
    token: state.auth.token,
  };
}
function mapDispathToProps(dispatch) {
  return {
    checkAuthFunction: () => {
      dispatch(checkAuthAction());
    }
  };
}

export default connect(mapStateToProps,mapDispathToProps)(App);
