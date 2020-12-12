// container for admin page with card list, edit cards, edit categories
import React, {Component} from 'react';
import './AdminPage.css';

import CardsList from '../../components/CardsList/CardsList';
import CreateCard from '../CreateCard/CreateCard';
import CategoryList from '../../components/CategoryList/CategoryList';
import CreateCategory from '../CreateCategory/CreateCategory';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';


class AdminPage extends Component {
    render() {
        let authredirect = null;
        if (this.props.auth !== true) {
            authredirect = <Redirect to={this.props.redirect}/>;
        }else {
            authredirect = null;
        }

        return (
            <div id="body-container">
                {authredirect}
                <h1 id="categories-title">Edit Categories</h1>
                <CategoryList />
                <CreateCategory />
                <h1 id="cards-title">Edit Cards</h1>
                <CardsList />
                <CreateCard />
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
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps) (AdminPage);