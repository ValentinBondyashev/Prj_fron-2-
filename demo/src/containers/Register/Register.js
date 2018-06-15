import React, { Component } from 'react';
import { Card, CardText, CardActions } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { Button } from 'primereact/components/button/Button';
import { registerAction } from '../../actions/register'; 
import { connect } from 'react-redux'; 
import { Link } from 'react-router-dom';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = { 
        email: '',
        password: ''
    };
  }

  componentWillReceiveProps = (nextProps) => {
    if(nextProps.status === 'success'){
        this.props.history.push("/full");
    }
  }

  register = () => {
    this.props.registerFunction(this.state.email, this.state.password);
  }

  onEnter(value, key) {
    if(key === 13) {
        this.register();
        }
    }

  handleChangeEmail = (e) => {
    this.setState({ email: e.target.value });
  }

  handleChangePassword = (e) =>{
    this.setState({ password: e.target.value });
  }

  render() {
    return (
        <div className="general" style={{display: "flex", justifyContent: "center", alignItems: "center",height: "100vh"}}>        
            <Card className="container" style={{display: "flex",
                                                flexDirection: "column",
                                                alignItems: "center",
                                                width: "300px"}}>
                <CardText className="input-container"
                            onKeyDown={(e) => this.onEnter( e.target.value, e.keyCode)} >
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
                    <RaisedButton onClick={this.register} className="register-button" label="Register" primary={true} />
                    <Button><Link className="link_login" to='/'>Sign in</Link></Button>
                </CardActions>
            </Card>
        </div>
    );
  }
}

function mapStateToProps(state) {
    return { 
        status: state.register.status,
    };
}
function mapDispathToProps(dispatch) {
    return {
        registerFunction: function (email, password){
            dispatch(registerAction(email, password));
        }
    };
}

export default connect(mapStateToProps,mapDispathToProps)(Register);

