// TODO
// Connect to backend and set the category values in categories. 

import React, { Component } from 'react';
import './CreateRoom.css'
import { connect } from 'react-redux';

class CreateRoom extends Component {
    constructor(props){
        super(props);   
        this.state = {
            category: null,
            win_mode: null,
            win_rounds: null,
            max_player: 2
        }
    }

    updateCategorySelector = (event) => {
        this.setState({category: event.target.value})
    }
    updateMaxPlayerSelector = (event) => {
        this.setState({max_player: event.target.value})
    }

    updateWinConditionSelector = (event) => {
        this.setState({win_mode: event.target.value})
    }

    updateWinRoundsSelector = (event) => {
        this.setState({win_rounds: event.target.value})
    }

    // Implement creategame logic
    submitHandler = (event) => {
        event.preventDefault();

    }

    render() {

        return (
            // TODO Design Modal, fill up the text description
            <div className="createRoomContainer">
                <label className="title">Create Game</label>
                <div className="modelSelectBox">                
                    <div className="settings-div">
                        <form onSubmit={this.submitHandler}>
                            <div className="category-div">
                                <div>
                                    <label>Card Categories: </label>
                                    <select className="selector" onChange={this.updateCategorySelector}>
                                        <option>Test1</option>
                                        <option>Test2</option>
                                        <option>Test3</option>
                                        <option>Test4</option>
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
                                <button className="createButton">Create Game</button>
                            </div>
                        </form>
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


export default connect(mapStateToProps) (CreateRoom);