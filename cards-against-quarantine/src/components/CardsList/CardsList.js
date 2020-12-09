import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './CardsList.css';
import EditCard from '../EditCard/EditCard';

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
    }, []);

    const deleteCard = (delID) => {
        axios.delete(`http://localhost:4000/card-categories/cards/${delID}`)
            .then((res) => {
                console.log(res);
                window.location = '/admin';
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <div id="card-table-container">
            <table id="card-table">
                <thead>
                    <tr>
                        <th>Card Content</th>
                        <th>Card Type</th>
                        <th>Card Category</th>
                    </tr>
                </thead>
                <tbody>
                    {cardList.map((card) => { return (
                        <tr key={card._id} className="card-row">
                            <td className="card-content">{card.content}</td>
                            <td className="card-type">{card.type}</td>
                            <td className="card-category">{card.category}</td>
                            <td className="button-container">
                                <EditCard cardID={card._id}/>
                                <button onClick={() => {deleteCard(card._id)}}>Delete</button>
                            </td>
                        </tr> 
                    )})}
                </tbody>
            </table>
        </div>
    );
}

export default CardsList;