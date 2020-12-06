// container for admin page with card list, edit cards, edit categories
import React, {Component} from 'react';
import './AdminPage.css';

import CardsList from '../../components/cards-list.component';
import CreateCard from '../../components/create-card.component';

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