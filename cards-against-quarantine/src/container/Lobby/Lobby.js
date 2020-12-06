// This container is the lobby where we can join or create game

import React, { Component } from 'react';
import './Lobby.css'
import HelpModal from '../HelpModal/HelpModal'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';


class Lobby extends Component {
    state = {
        display_modal: false,
    }

    showHelpModal = () => {
        this.setState({display_modal: true})
    }

    hideHelpModal = () => {
        this.setState({display_modal: false})
    }

    // Logout function
    // TODO implementation
    logoutHandler = () => {
        console.log("Logout button clicked")
    }

    // Edit cards function
    // TODO implementation
    // Should load into
    editCardHandler = () => {
        console.log("edit card button clicked")
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
                {modal}
                {redirect}
                <div className="lobby-container">

                    {/* Need to pass login user through redux store */}
                    <div><label className="loginlbl">logged in as: {this.props.currentUser.name}</label></div>
                    <div>
                        <h1>Cards Against Quarantine</h1>
                    </div>

                    <div className="lobby-section">
                        <h2>Host Game _____________. </h2>
                        <button>Create Game</button>
                        <h2>Join Game _____________. </h2>
                        <input placeholder="Enter Room Code"></input>
                        <button onClick={this.showHelpModal}>How To Play</button>

                    </div> 

                    <div className="footerbtn">
                        <button className="logoutbtn" onClick={this.logoutHandler}>Logout</button>
                        <button className="editbtn" onClick={this.editCardHandler}>Edit Cards</button>
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
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps) (Lobby);
