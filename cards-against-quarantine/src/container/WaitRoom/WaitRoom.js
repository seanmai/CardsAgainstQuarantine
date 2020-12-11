import React, { Component } from 'react';
import './WaitRoom.css'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import socketIOClient from "socket.io-client";

let socket;
class WaitRoom extends Component {
    constructor(props){
        super(props);   
        this.state = {
            endpoint: 'http://localhost:4000',
            players: ["John", "Jacky", "Jason", "J"],
            redirect: null,
        }
        socket = socketIOClient(this.state.endpoint);
    }

    // Implement creategame logic
    // Todo - Need to handle the start game when HOST clicks on it
    startGameHandler = (event) => {
        event.preventDefault();

        // needs to emit startgame
        // socket.emit("host-game", (message));
        

        this.setState({redirect: "/room"})
    }

    exitRoomHandler = (event) => {
        event.preventDefault();
        this.props.setGameID(null);
        this.setState({redirect: "/"})

    }

    componentDidMount() {

    }


    render() {
        let redirect;
        if (this.state.redirect !== null) {
            redirect = <Redirect to={this.state.redirect}/>;
        }

        

        return (
            // TODO Design Modal, fill up the text description
            <div>
            {redirect}
            <div className="label-container">
                <label><strong>RoomID:</strong> {this.props.gameid}</label>
                <label><strong>User:</strong> {this.props.currentUser.name}</label>
            </div>
            <div className="main-container">
                <label className="title">Waiting for players to join</label>
                <div className="main-box">
                    <div className="content-wrapper">
                        <label className="box-title">Current Players: </label>
                        <div className="player-container">
                            {this.state.players.map(function(name, index){
                                return <label key={index} >{(index+1)+". "+name}</label>
                            })}

                        </div>

                        <div className="button-wrapper">
                            <button onClick={this.exitRoomHandler}>Cancel Game</button>
                            <button onClick={this.startGameHandler} className="start-button">Start Game</button>
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
        gameid: state.gameid
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