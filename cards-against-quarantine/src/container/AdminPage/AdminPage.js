// container for admin page with card list, edit cards, edit categories
import React, {Component} from 'react';
import './AdminPage.css';

import CardsList from '../../components/CardsList/CardsList';
import CreateCard from '../CreateCard/CreateCard';

export default class AdminPage extends Component {
    render() {

        return (
            <div>
                <CardsList />
                <CreateCard />
            </div>
        );
    }
}