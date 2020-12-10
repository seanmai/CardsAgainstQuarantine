// This container is the lobby where we can join or create game

import React, { Component } from 'react';
import './Lobby.css'
import HelpModal from '../HelpModal/HelpModal'
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import EditCard from '../../components/EditCard/EditCard'
import EditCategory from '../../components/EditCategory/EditCategory'
import socketIOClient from "socket.io-client";

let socket;
class Lobby extends Component {
    constructor(props) {
        super(props);   
        this.state = {
            display_modal: false,
            endpoint: 'http://localhost:4000'
        }
        socket = socketIOClient(this.state.endpoint);
    }

    showHelpModal = () => {
        this.setState({display_modal: true})
    }

    hideHelpModal = () => {
        this.setState({display_modal: false})
    }

    // Logout function
    logoutHandler = () => {
        console.log("Logout button clicked");
        this.props.setLogout();
    }

    submitHandler = (event) => {
        event.preventDefault();
        let roomID = document.getElementById("roomID").value;

        let message = {
            gameID : roomID,
            username: this.props.currentUser,
        }

        socket.emit("join-game", (message));

        socket.on('join-error', error => {
            // TODO: Handle error on Client Side
            console.log(error);
        });
    }

    render() {
        let modal = null;

        if(this.state.display_modal){
            modal = <HelpModal showModal={this.state.display_modal} closeModal={this.hideHelpModal}></HelpModal>
        }

        //Redirect to '/login' if authenticated
        let redirect = null;
        if (!this.props.auth) {
            redirect = <Redirect to={this.props.redirect}/>;
        }else {
            redirect = null;
        }
    
        return (
            // Still need to implement admin user view
            <div>
                {redirect}
                {modal}
                <div className="lobby-container">

                    {/* Need to pass login user through redux store */}
                    <div><label className="loginlbl">logged in as: {this.props.currentUser.name}</label></div>
                    <div className="main-title">
                        <h1>Cards Against Quarantine</h1>
                    </div>

                    <div className="lobby-section">
                        <h2>Host Game _____________. </h2>
                        <Link to="/createroom" style={{ textDecoration: 'none' }}>
                            <button>Create Game</button>
                        </Link>
                        <h2>Join Game _____________. </h2>
                        <form onSubmit={this.submitHandler}>
                            <input type="text" placeholder="Enter Room Code" id="roomID" />
                            <button>Join Game</button>
                        </form>
                        <button onClick={this.showHelpModal}>How To Play</button>

                    </div> 

                    <div className="footerbtn">
                        <button className="logoutbtn" onClick={this.logoutHandler}>Logout</button>
                        <div>
                            <EditCategory></EditCategory>
                            <EditCard></EditCard>
                        </div>
                    </div>
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
        setLogout: (logout) => {
            dispatch({type: "SET_UNAUTH"})
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps) (Lobby);
