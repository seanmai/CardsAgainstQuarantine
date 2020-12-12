

import React, { Component } from 'react';
import './HelpModal.css'

export default class HelpModal extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            display_role: "Player"
        }
    }

    viewRole = role => {
        this.setState({display_role: role})
    }

    render() {

        let displayModal = this.props.showModal ? "modal display-block" : "modal display-none";
        let role_description = null;

        if (this.state.display_role === "Player"){
            role_description = [
                <h2 key="Role">How to Play (Player): </h2>,
                <label key="RoleDesc">Once the game starts, you are given 5 cards and for each round you are required to present a card in response to the black card.</label>,
                <h2 key="WinCondition">Win Condition (Player):</h2>,
                <label key="WinDesc">Once the cards are presented to the Card Czar, the Card Czar selects their favourite card and if your card is selected, you win the round</label>
            ]
        }else {
            role_description = [
                <h2 key="Role">How to Play (Czar): </h2>,
                <label key="RoleDesc">As a Card Czar, your role is to select your most favourite card presented by each of the players</label>,
            ]
        }

        return (
            // TODO Design Modal, fill up the text description
            <div className={displayModal}>
                <div className="modal-main">
                    <div>
                        <button className="role_button" onClick={() => {this.viewRole("Player")}}>Player</button>
                        <button className="role_button" onClick={() => {this.viewRole("Czar")}}>Card Czar</button>
                    </div>
                    <div className="info-container">
                        {role_description}
                    </div>
                    <div className="closeBox">
                        <button className="close-button" onClick={this.props.closeModal}>Close</button>
                    </div>
                </div>
            </div>

        );
    }
}

