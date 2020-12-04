import React, { Component } from 'react';
import './Login.css'

export default class Login extends Component {

    state = {
        mode: 'Login',
        credentials : {
            username: '',
            password: ''
        },
        valid: false
    }

    submitHandler = (event) => {
        event.preventDefault();
        if (this.state.mode === 'Sign up' && this.state.valid){
            //Signup logic
            console.log("JACKY");
        }
        console.log("wu");
    }

    createNewUser = () => {
        this.setState({mode: 'Sign up'})
    }



    render() {
        let confirmPassword = null;
        console.log(this.state.credentials);
        if(this.state.mode === 'Sign up'){
            confirmPassword = (
                <div className="CredentialField">
                    {/* <label>Confirm Password: </label> */}
                    <input type="text" onChange={e => this.setState({valid: e.target.value===this.state.credentials.password})}></input>     
                </div>
            )
        }
        return (
            <div className="Container">
                <div className="Login">
                    <label className="Title">{this.state.mode}</label>

                    <form className="LoginForm" onSubmit={this.submitHandler}>

                        <div className="CredentialField">
                            <label>Username: </label>
                            <input type="text" onChange={e => this.setState(prevState => ({
                                ...prevState,
                                credentials: {
                                    ...prevState.credentials,
                                    username: e.target.value
                                }
                            }))}></input>    
                        </div>

                        <div className="CredentialField">
                            <label>Password: </label>
                            <input type="text" onChange={e => this.setState(prevState => ({
                                ...prevState,
                                credentials: {
                                    ...prevState.credentials,
                                    password: e.target.value
                                }
                            }))}></input>     

                        </div>
                        {confirmPassword}
                        <div className="ButtonContainer">
                            <button className="Button" type="submit">{this.state.mode}</button>
                            {this.state.mode == 'Login' ? <button className="Button" onClick={this.createNewUser}>New User</button> : null}

                        </div>
                    </form>
                </div>
            </div>


        
        );
    }
}

