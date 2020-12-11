import React, { Component } from 'react';
import './Login.css'
import axios from 'axios';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class Login extends Component {

    state = {
        mode: 'Login',
        credentials : {
            username: '',
            password: '',
            isAdmin: false
        },
        valid: false,
        auth: false,
        error: null
    }

    submitHandler = (event) => {
        event.preventDefault();
        const onSuccessSignup = res => {
            this.setState({auth: res.status})
        }

        const onSuccessLogin = res => {
            this.setState(prevState => ({
                ...prevState,

                credentials: {
                    ...prevState.credentials,
                    isAdmin: res.data.user.isAdmin
                },

                auth: res.status
            }))

        }

        const onFailure = error => {
            this.setState({error: true})
        }

        if (this.state.mode === 'Sign up' && this.state.valid){
            axios.post('http://localhost:4000/users/register', this.state.credentials)
            .then(onSuccessSignup)
            .catch(onFailure);
        }else if (this.state.mode === 'Login'){
            axios.post('http://localhost:4000/users/login', this.state.credentials)
            .then(onSuccessLogin)
            .catch(onFailure);
        }else {
            onFailure();
        }
    }

    createNewUser = () => {
        this.setState({ mode: 'Sign up', 
                        error: false})
    }

    usernameOnChangeHandler = (event) => {
        this.state.error = false;
        this.setState(prevState => ({
            ...prevState,
            credentials: {
                ...prevState.credentials,
                username: event.target.value
            }
        }))
    } 

    passwordOnChangeHandler = (event) => {
        this.state.error = false;
        this.setState(prevState => ({
            ...prevState,
            credentials: {
                ...prevState.credentials,
                password: event.target.value
            }
        }))
    } 


    verifyOnChangeHandler = (event) => {
        this.state.error = false;
        this.setState({valid: event.target.value===this.state.credentials.password});
    } 

    componentDidUpdate(){
        // Authentication steps
        if (this.state.auth){
            this.props.setUser({
                name: this.state.credentials.username,
                isAdmin: this.state.credentials.isAdmin
            })
            this.props.setAuth(this.state.auth);
        }
    }

    render() {
        let confirmPassword = null;
        if(this.state.mode === 'Sign up'){
            confirmPassword = (
                <div className="CredentialField">
                    <label>Confirm Password: </label>
                    <input type="password" onChange={this.verifyOnChangeHandler}></input>     
                </div>
            )
        }

        let error_message = null;
        if (this.state.error){
            if (!this.state.valid && this.state.mode === 'Sign up') {
                error_message = <label className="ErrorMessage">Passwords does not match</label>
            }else{
                error_message = <label className="ErrorMessage"> {this.state.mode === 'Login' ? 'Incorrect username/password':'Username is taken'} </label> 
            }
        }

        let redirect = <Redirect to={this.props.redirect}/>;
        return (
            <div className="Container">
                {redirect}
                <label className="MainTitle">Cards Against Humanity</label>
                <div className="Login">
                    <label className="Title">{this.state.mode}</label>
                    <form className="LoginForm" onSubmit={this.submitHandler}>
                        {error_message}
                        <div className="CredentialField">
                            <label>Username: </label>
                            <input type="text" onChange={this.usernameOnChangeHandler}></input>    
                        </div>

                        <div className="CredentialField">
                            <label>Password: </label>
                            <input type="password" onChange={this.passwordOnChangeHandler}></input>     

                        </div>
                        {confirmPassword}
                        <div className="ButtonContainer">
                            <button className="Button" type="submit">{this.state.mode}</button>
                            {this.state.mode === 'Login' ? <button className="Button" onClick={this.createNewUser}>New User</button> : null}

                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        currentUser: state.currentUser,
        redirect: state.redirect,
        auth: state.authenticated
    }
}

function mapDispatchToProps(dispatch){
    return {
        setUser: (userObj) => {
            dispatch({type: "SET_USER", payload:userObj})
        },
        setRedirect: (path) => {
            dispatch({type: "SET_REDIRECT", payload:path})
        },
        setAuth: (auth) => {
            dispatch({type: "SET_AUTH", payload: auth})
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps) (Login);
