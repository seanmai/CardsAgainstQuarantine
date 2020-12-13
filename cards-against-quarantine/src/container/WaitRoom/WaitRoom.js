import React, { Component } from 'react';
import './WaitRoom.css'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
// import socketIOClient from "socket.io-client";
import {socket} from "../../socket.js";


// let socket;
class WaitRoom extends Component {
    constructor(props){
        super(props);   
        this.state = {
            endpoint: 'http://localhost:4000',
            players: [],
            redirect: null,
            broadcast: true
        }
        // socket = socketIOClient(this.state.endpoint);

        socket.on("update-users", (message) => {
            this.setState({players:message})
        });

        socket.on("game-started", (message) => {
            this.setState({redirect: "/room"})
        });
    }

    // Implement creategame logic
    // Todo - Need to handle the start game when HOST clicks on it
    startGameHandler = (event) => {
        event.preventDefault();
        socket.emit("start-game", this.props.gameid);        
    }

    exitRoomHandler = (event) => {
        event.preventDefault();
        this.props.setGameID(null);
        socket.emit("exit-game", {gameId: this.props.gameid, username: this.props.currentUser.name})
        this.setState({redirect: "/"})
    }

    render() {
        let redirect;
        let authredirect = null;
        if (this.props.auth !== true) {
            authredirect = <Redirect to={this.props.redirect}/>;
        }else {
            authredirect = null;
        }

        if (this.state.redirect !== null) {
            redirect = <Redirect to={this.state.redirect}/>;
        }

        if (this.props.gameid && this.state.broadcast){
            this.setState({broadcast: false})
            socket.emit("wait-queue", {gameId: this.props.gameid});
        }

        return (
            // TODO Design Modal, fill up the text description
            <div>
            {authredirect}
            {redirect}
            <div className="label-container">
                <label><strong>RoomID:</strong> {this.props.gameid}</label>
                <label><strong>User:</strong> {this.props.currentUser.name} <label style={{color: 'green'}}>{this.props.currentUser.isAdmin ? " (admin)" : null }</label></label>
            </div>
            <div className="main-container">
                <label className="title">Waiting for more players</label>
                <div className="main-box">
                    <div className="content-wrapper">
                        <label className="box-title">Current Players: </label>
                        <div className="player-container">
                            {this.state.players.map(function(players, index){
                                return <label key={index} >{(index+1)+". "+players.name}</label>
                            })}

                        </div>
                        
                        <div className="button-wrapper">
                            <button onClick={this.exitRoomHandler}>Exit Room</button>
                            {this.props.status.mode === "HOST" ? <button onClick={this.startGameHandler} className="start-button">Start Game</button>: null}
                        </div> 
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
        auth: state.authenticated,
        gameid: state.gameid,
        status: state.status
    }
}

function mapDispatchToProps(dispatch){
    return {
        setGameID: (userObj) => {
            dispatch({type: "SET_GAMEID", payload:userObj})
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (WaitRoom);