import React, { Component } from 'react';
import axios from 'axios';

export default class CreateCard extends Component {
    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            // Temp, depending on schema of card model
            description: '',
            type: ''
        }
    }

    onSubmit(e) {
        e.preventDefault();
        const card = {
            description: this.state.description,
            type: this.state.type
        }

        axios.post('http://localhost:4000/cards/add', card)
            .then(res => console.log(res.data));

        window.location = '/cards'
    }

    render() {
        return (
            <div>Create card</div>
        );
    }
}