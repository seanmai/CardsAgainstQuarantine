// TODO
// Connect to backend and set the category values in categories. 

import React, { Component } from 'react';
import './CreateRoom.css'
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
// import socketIOClient from "socket.io-client";
import {socket} from "../../socket.js";
import axios from 'axios';

// let socket;
class CreateRoom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // TODO fix these fake defaults pls
            category: 'Base',
            win_mode: 'rounds_played',
            win_rounds: 3,
            max_player: 2,
            endpoint: 'http://localhost:4000',
            redirect: false,
            card_categories: []
        }
        // socket = socketIOClient(this.state.endpoint);
    }

    updateCategorySelector = (event) => {
        this.setState({ category: event.target.value })
    }
    updateMaxPlayerSelector = (event) => {
        this.setState({ max_player: event.target.value })
    }

    updateWinConditionSelector = (event) => {
        this.setState({ win_mode: event.target.value })
    }

    updateWinRoundsSelector = (event) => {
        this.setState({ win_rounds: event.target.value })
    }

    // Implement creategame logic
    submitHandler = (event) => {
        event.preventDefault();

        let message = {
            username: this.props.currentUser.name,
            category: this.state.category,
            rounds: this.state.win_rounds,
            max_player: this.state.max_player
        }

        socket.emit("host-game", (message));

        socket.on('game id', id => {
            console.log(id)
            this.props.setGameID(id);
        });

        this.setState({ redirect: true })
    }
    componentDidMount() {
        axios.get('http://localhost:4000/card-categories')
            .then((res) => {
                console.log("jacky",res.data);
                this.setState({
                    card_categories: res.data
                })
            });
    }

    render() {
        let redirect;
        let redirectToReffer = this.state.redirect
        if (redirectToReffer === true) {
            redirect = <Redirect to="/wait" />;
        }
        return (
            // <div>hello world</div>
            // TODO Design Modal, fill up the text description
            <div>
                {redirect}
                <div className="createRoomContainer">
                    <label className="title">Create Game</label>
                    <div className="modelSelectBox">
                        <div className="settings-div">
                            <form onSubmit={this.submitHandler}>
                                <div className="category-div">
                                    <div>
                                        <label>Card Categories: </label>
                                        <select className="selector" onChange={this.updateCategorySelector}>
                                            {this.state.card_categories.map(function(category, index){
                                                return <option key={index} value={category.name}>{category.name}</option>
                                            })}
                                        </select>
                                    </div>
                                </div>

                                <div className="condition-div">
                                    <div>
                                        <label>Win Condition: </label>
                                        <select className="selector" onChange={this.updateWinConditionSelector}>
                                            <option value="rounds_played">Rounds Played</option>
                                            <option value="rounds_won">Rounds Won</option>
                                        </select>
                                        <select className="selector condition-number-selector" onChange={this.updateWinRoundsSelector}>
                                            <option value="3">3</option>
                                            <option value="5">5</option>
                                            <option value="7">7</option>
                                            <option value="10">10</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="player-div">
                                    <div>
                                        <label>Max Players: </label>
                                        <select className="selector" onChange={this.updateMaxPlayerSelector}>
                                            <option value="2">2</option>
                                            <option value="4">4</option>
                                            <option value="6">6</option>
                                            <option value="8">8</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="button-div">
                                    <button className="cancelButton">Cancel</button>

                                    {/* <Link to="/room" style={{ textDecoration: 'none' }}> */}
                                    <button className="createButton">Create Game</button>
                                    {/* </Link> */}
                                </div>
                            </form>
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

function mapDispatchToProps(dispatch) {
    return {
        setGameID: (userObj) => {
            dispatch({ type: "SET_GAMEID", payload: userObj })
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateRoom);