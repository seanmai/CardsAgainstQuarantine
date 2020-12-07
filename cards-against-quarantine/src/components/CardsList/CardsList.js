import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './CardsList.css'

const CardsList = () => {
    const [cardList, setCardList] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:4000/card-categories/cards')
            .then((res) => {
                setCardList(res['data']);
            });
    }, []);

    return (
        <div id="card-list-container">
            <ul id="card-list">
                {cardList.map((card) => { return <li key={card._id}>{card.content}</li> })}
            </ul>
        </div>
    );
}

export default CardsList;