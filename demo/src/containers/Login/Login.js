import React, { Component } from 'react';
import { Card, CardText, CardActions } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { Button } from 'primereact/components/button/Button';
import { connect } from 'react-redux';
import { loginAction } from '../../actions/auth'; 
import {Password} from 'primereact/components/password/Password';
import { Link } from 'react-router-dom';
import './Login.css';

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
    const hideAutoFillColorStyle = {
        WebkitBoxShadow: '0 0 0 1000px white inset',
        WebkitAutofill: "off" 
      };
    return (
        <div className="general" style={{display: "flex", justifyContent: "center", alignItems: "center",height: "100vh"}}>        
            <Card className="container" style={{display: "flex",
                                                flexDirection: "column",
                                                alignItems: "center",
                                                width: "300px"}}>
                <CardText   className="input-container"
                            onKeyDown={(e) => this.onEnter( e.target.value, e.keyCode)}>
                    <TextField 
                        value={this.state.email}  
                        onChange={this.handleChangeEmail} 
                        floatingLabelText="Login" 
                        inputStyle={hideAutoFillColorStyle}
                    />
                    <TextField 
                        type="password"
                        value={this.state.password}  
                        onChange={this.handleChangePassword} 
                        floatingLabelText="Password"
                        inputStyle={hideAutoFillColorStyle}
                        autoComplete="off"
                    /> 
                </CardText>
                <CardActions style={{display: "flex", justifyContent: "space-between"}}>
                    <RaisedButton onClick={this.login} className="login-button" label="Login" primary={true} />
                    <Link className="link_login" style={{ color: '#fff', backgroundColor: "rgb(0, 188, 212)",}} to='/register'>Register</Link>
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
    };
}

export default connect(mapStateToProps,mapDispathToProps)(Login);

