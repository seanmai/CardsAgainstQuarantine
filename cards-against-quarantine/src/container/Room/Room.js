// This container is the game room
import React, { useEffect, useState } from 'react';
import socketIO from 'socket.io-client';


import './Room.css'

import Card from '../../components/Card/Card';
import Scoreboard from './Scoreboard'
import Chat from '../../components/Chat/Chat'
import { connect, useSelector } from 'react-redux';

const socket = socketIO('http://localhost:4000');

const Room = (props) => {
    const [cards, setCards] = useState([])
    const [played, setPlayed] = useState([])
    const [black, setBlack] = useState('')
    const [selected, setSelected] = useState('')
    const [czar, setCzar] = useState(false)
    const [scores, setScores] = useState([])
    const [disable, setDisable] = useState(false)
    const username = useSelector(state => state.currentUser.name);
    const gameId = useSelector(state => state.gameid);

    useEffect(() => {
        socket.on('game-state', data => {
            console.log(data);
            setBlack(data.blackCard);
            setCzar(data.czar === username);
            const player_cards = data.players.filter(p => p.name === username)[0].cards;
            setCards(player_cards.map(c => { return { content: c, selected: false } }));

            const curr_played = data.boardCards;
            setPlayed(curr_played.map(c => { return { content: c.card, user: c.user, selected: false } }));
            setScores(data.players);

            if (data.boardCards.length === 0) {
                if (data.czar) {
                    setDisable(true);
                } else {
                    setDisable(false);
                }
            }
        });
        socket.on('game-over', data => {
            console.log('handle end of game');
            console.log(data);
        });
    }, [username]);

    const cardClickHandler = (e) => {
        if (e.target.getAttribute('data-value') !== '') {
            setSelected(e.target.getAttribute('data-value'));
            setCards(cards.map(card => card.content === e.target.getAttribute('data-value')? { ...card, selected: true } : { ...card, selected: false }));
        }
    }

    const cardSubmitHandler = (e) => {
        e.preventDefault();
        const data = {
            username: username,
            card: selected
        };
        socket.emit('submit-card', gameId, data);
        setDisable(true);
    }

    const winSubmitHandler = (e) => {
        e.preventDefault();
        console.log(played);
        const winner = played.find(c => c.content === selected);
        const data = {
            gameId,
            username: winner.user
        };
        socket.emit('round-winner', gameId, data);
    }

    const returnCard = (e) => {
        setCards(cards.map(card => { return { ...card, selected: false } }));
        setSelected('');
    }

    const refreshGame = () => {
        socket.emit('refresh', gameId);
    }

    return (
        <div id="flex-container">
            <button onClick={refreshGame}>Refresh Game</button>
            <div id="game-container">
                <div id="game-area">
                    <h1>{czar ? 'You are the Card Czar' : 'You are a Player'}</h1>
                    <Card
                        disabled
                        className="black-card"
                        content={black} >
                    </Card>
                    {!czar &&
                        <form onSubmit={cardSubmitHandler}>
                            <Card
                                disabled={selected === ""}
                                type="button"
                                content={selected}
                                onClick={returnCard}
                                >
                            </Card>
                            <button className="submit-button" type="submit" disabled={selected === ""}>Submit</button>
                        </form>
                    }
                    {czar &&
                        <form onSubmit={winSubmitHandler}>
                            <div className="played-cards">
                                {played.map(card => {
                                    return (
                                        <Card
                                            key={card.content}
                                            className={card.content === selected ? 'selected' : ''}
                                            type="button"
                                            content={card.selected ? '' : card.content}
                                            onClick={cardClickHandler}>
                                        </Card>
                                    )
                                })}
                            </div>
                        <button className="submit-button" type="submit" disabled={selected === ""}>Submit</button>
                    </form>
                }
                </div>
                <div id="game-hand">
                    <h1>Your Hand</h1>
                    <div className="cardbar">
                        {cards.map(card => {
                            return (
                                <Card
                                    disabled={czar || disable}
                                    key={card.content}
                                    content={card.selected ? '' : card.content}
                                    className={card.content === selected ? 'selected' : ''}
                                    onClick={cardClickHandler}>
                                </Card>
                            )
                        })}
                    </div>
                </div>
            </div>
            <div id="game-extras">
                <Scoreboard scores={scores} />
                <Chat gameId={gameId}/>
            </div>
        </div>
    );
}

function mapStateToProps(state) {
    return {
        currentUser: state.currentUser,
        gameId: state.gameid,
        redirect: state.redirect,
        auth: state.authenticated
    }
}

export default connect(mapStateToProps)(Room);
