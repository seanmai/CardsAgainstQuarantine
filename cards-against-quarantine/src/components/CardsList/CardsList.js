import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './CardsList.css'

const CardsList = () => {
    const [cardList, setCardList] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:4000/card-categories/cards')
            .then((res) => {
                setCardList(res['data']);
            })
            .catch((err) => {
                console.log(err);
            });
    });

    const removeCard = (delID) => {
        axios.delete(`http://localhost:4000/card-categories/cards/${delID}`)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    }
    
    return (
        <div id="card-list-container">
            <ul id="card-list">
                {cardList.map((card) => { return (
                    <li key={card._id}>
                        <span className="list-item">{card.content}</span>
                        <button onClick={() => {removeCard(card._id)}}>Delete</button>
                    </li> 
                )})}
            </ul>
        </div>
    );
}

export default CardsList;