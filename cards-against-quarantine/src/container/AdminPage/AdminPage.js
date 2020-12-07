// container for admin page with card list, edit cards, edit categories
import React, {Component} from 'react';
import './AdminPage.css';

import CardsList from '../../components/CardsList/CardsList';
import CreateCard from '../CreateCard/CreateCard';
import CategoryList from '../../components/CategoryList/CategoryList';
import CreateCategory from '../CreateCategory/CreateCategory';

export default class AdminPage extends Component {
    render() {

        return (
            <div id="body-container">
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