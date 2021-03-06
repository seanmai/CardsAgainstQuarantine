// This container is the lobby where we can join or create game

import React, { Component } from 'react';
import './Lobby.css'
import HelpModal from '../HelpModal/HelpModal'
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
// import socketIOClient from "socket.io-client";
import {socket} from "../../socket.js";

// let socket;
class Lobby extends Component {
    constructor(props) {
        super(props);   
        this.state = {
            display_modal: false,
            endpoint: 'http://localhost:4000',
            room_input: null
        }
        
        // socket = socketIOClient(this.state.endpoint);
    }

    showHelpModal = () => {
        this.setState({display_modal: true})
    }

    hideHelpModal = () => {
        this.setState({display_modal: false})
    }

    // Logout function
    logoutHandler = () => {
        this.props.setLogout();
    }

    submitHandler = (event) => {
        event.preventDefault();
        // let roomID = document.getElementById("roomID").value;

        let message = {
            gameId : this.state.room_input,
            username: this.props.currentUser.name,
        }
        socket.on('join-error', error => {
            // TODO: Handle error on Client Side
            console.log(error);
            this.props.setEndGame()
        });

        socket.on('join-success', message => {
            // TODO: Handle error on Client Side)
            this.props.setJoinGame(this.state.room_input);
        });

        socket.emit("join-game", (message));
        

        // Success join handler
        // Todo - Need to update socket response to say join room success
        // this.props.setJoinGame(roomID);


    }

    roomInputHandler = (event) => {
        this.setState({room_input: event.target.value})
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
            <div>
                {redirect}
                {this.props.gameid !== null ? <Redirect to="/wait"/>:null}
                {modal}
                <div className="lobby-container">

                    {/* Need to pass login user through redux store */}
                    <div><label className="loginlbl"><strong>logged in as:</strong> {this.props.currentUser.name}<label style={{color: 'green'}}>{this.props.currentUser.isAdmin ? " (admin)" : null }</label></label></div>
                    <div className="main-title">
                        <h1>Cards Against Quarantine</h1>
                    </div>

                    <div className="lobby-section">
                        <h2><u>Host Game_______</u></h2>
                        <Link to="/createroom" style={{ textDecoration: 'none' }}>
                            <button>Create Game</button>
                        </Link>
                        <h2><u>Join Game_______</u></h2>
                        <div className={"join-container"}>
                            <form onSubmit={this.submitHandler}>
                                <input onChange={this.roomInputHandler} type="text" placeholder="Enter Room Code" id="roomID" />
                                {/* <button>Join Game</button> */}
                            </form>
                        </div>
                        <button onClick={this.showHelpModal}>How To Play</button>
                    </div> 

                    <div className="footerbtn">
                        <button className="logoutbtn" onClick={this.logoutHandler}>Logout</button>
                        {this.props.currentUser.isAdmin ? <Link to="/admin"><button className="admin-page-button" >Admin</button></Link> : null}
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
        auth: state.authenticated,
        gameid: state.gameid
    }
}

function mapDispatchToProps(dispatch){
    return {
        setUser: (userObj) => {
            dispatch({type: "SET_USER", payload:userObj})
        },
        setLogout: (logout) => {
            dispatch({type: "SET_UNAUTH"})
        },
        setGameID: (userObj) => {
            dispatch({type: "SET_GAMEID", payload:userObj})
        },
        setEndGame: (endgame) => {
            dispatch({type: "SET_ENDGAME", payload:endgame})
        },
        setJoinGame: (gameId) => {
            dispatch({type: "SET_JOINED", payload:gameId})
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps) (Lobby);
