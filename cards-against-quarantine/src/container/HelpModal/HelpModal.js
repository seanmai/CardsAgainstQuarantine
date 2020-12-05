

import React, { Component } from 'react';
import './HelpModal.css'

export default class HelpModal extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            display_role: "Player"
        }
    }

    viewRole = (role) => {
        this.setState({display_role: role})
    }

    render() {

        let displayModal = this.props.showModal ? "modal display-block" : "modal display-none";
        let role_description = null;

        if (this.state.display_role === "Player"){
            role_description = [
                <h2 key="Role">Player</h2>,
                <h2 key="Desc"></h2>
            ]
        }else {
            role_description = [
                <h2 key="Role">Czar</h2>,
                <h2 key="Desc"></h2>
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
                    {role_description}
                    <div className="closeBox">
                        <button onClick={this.props.closeModal}>Close</button>
                    </div>
                </div>
            </div>

        );
    }
}

