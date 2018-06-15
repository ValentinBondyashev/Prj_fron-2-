import React, { Component } from 'react';
import { Card, CardText, CardActions } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { Button } from 'primereact/components/button/Button';
import { connect } from 'react-redux';
import { loginAction,loginGoogleAction } from '../../actions/auth'; 
import {Password} from 'primereact/components/password/Password';
import { Link } from 'react-router-dom';

class Login extends Component {
  constructor(props) {

    super(props);
    this.state = { 
        email: '',
        password: ''
    };
    this.login = this.login.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);

  }

  login() {
    this.props.loginFunction(this.state.email, this.state.password);
  }
    
  onEnter(value, key) {
    if(key === 13) {
        this.login();
        }
    }

  handleChangeEmail(e) {
    this.setState({ email: e.target.value });
  }
  handleChangePassword(e) {
    this.setState({ password: e.target.value });
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.status === 'success'){
        this.props.history.push("/full");
    }
  }
  
  render() {
    return (
        <div className="general" style={{display: "flex", justifyContent: "center", alignItems: "center",height: "100vh"}}>        
            <Card className="container" style={{display: "flex",
                                                flexDirection: "column",
                                                alignItems: "center",
                                                width: "300px"}}>
                <CardText className="input-container"
                            onKeyDown={(e) => this.onEnter( e.target.value, e.keyCode)}>
                    <TextField 
                        value={this.state.email}  
                        onChange={this.handleChangeEmail} 
                        floatingLabelText="Login" 
                    />
                    <TextField 
                        value={this.state.password}  
                        onChange={this.handleChangePassword} 
                        floatingLabelText="Password"
                    /> 
                </CardText>
                <CardActions>
                    <RaisedButton onClick={this.login} className="login-button" label="Login" primary={true} />
                    <RaisedButton onClick={this.props.loginGoogleFunction} primary={true}  label="Google"/>
                </CardActions>
            </Card>
        </div>
    );
  }
}

function mapStateToProps(state) {
    return { 
        token: state.auth.token,
        status: state.auth.status
    };
}
function mapDispathToProps(dispatch) {
    return {
        loginFunction: function (email, password) {
            dispatch(loginAction(email, password));
        },
        loginGoogleFunction: function () {
            dispatch(loginGoogleAction());
        }
    };
}

export default connect(mapStateToProps,mapDispathToProps)(Login);

