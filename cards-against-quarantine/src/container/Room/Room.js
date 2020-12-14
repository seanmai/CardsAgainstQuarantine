// This container is the game room
import React, { useEffect, useState } from 'react';
// import socketIO from 'socket.io-client';
import { socket } from "../../socket.js";

import './Room.css'

import Card from '../../components/Card/Card';
import Scoreboard from './Scoreboard'
import Chat from '../../components/Chat/Chat'
import GameEndModal from './GameEndModal'
import { connect, useSelector, useDispatch } from 'react-redux';

const Room = (props) => {
    const [cards, setCards] = useState([])
    const [played, setPlayed] = useState([])
    const [black, setBlack] = useState('')
    const [selected, setSelected] = useState('')
    const [czar, setCzar] = useState(false)
    const [scores, setScores] = useState([])

    const [disableForm, setDisable] = useState(false)
    const [enableCzar, setEnableCzar] = useState(false)

    const [gameEnd, setGameEnd] = useState(false)


    const username = useSelector(state => state.currentUser.name);
    const gameId = useSelector(state => state.gameid);
    const dispatch = useDispatch()

    useEffect(() => {
        socket.on('game-state', data => {
            setBlack(data.blackCard);
            setCzar(data.czar === username);
            const player_cards = data.players.filter(p => p.name === username)[0].cards;
            setCards(player_cards.map(c => { return { content: c, selected: false } }));

            const curr_played = data.boardCards;
            setPlayed(curr_played.map(c => { return { content: c.card, user: c.user, selected: false } }));
            setScores(data.players);

            if (data.boardCards.length === data.players.length - 1) {
                setEnableCzar(true)
            }
            if (data.boardCards.length === 0) {
                setSelected("")
                setDisable(false)
                setEnableCzar(false)
            }

        });
        socket.on('game-over', data => {
            setScores(data.players);
            setDisable(true)
            setEnableCzar(false)
            setGameEnd(true)
            dispatch({ type: "SET_ENDGAME", payload: true })
        });
    }, [username, czar]);

    const cardClickHandler = (e) => {
        if (e.target.getAttribute('data-value') !== '') {
            setSelected(e.target.getAttribute('data-value'));
            setCards(cards.map(card => card.content === e.target.getAttribute('data-value') ? { ...card, selected: true } : { ...card, selected: false }));
        }
    }

    const cardSubmitHandler = (e) => {
        e.preventDefault();
        const data = {
            username: username,
            card: selected
        };
        setDisable(true)
        socket.emit('submit-card', gameId, data);
    }

    const winSubmitHandler = (e) => {
        e.preventDefault();
        const winner = played.find(c => c.content === selected);
        const data = {
            gameId,
            username: winner.user
        };
        setSelected("")
        socket.emit('round-winner', gameId, data);
    }

    const returnCard = (e) => {
        setCards(cards.map(card => { return { ...card, selected: false } }));
        setSelected('');
    }

    return (
        <div id="flex-container">
            <GameEndModal showModal={gameEnd} scores={scores} />
            <div id="game-container">
                <div id="game-area">
                    <h1>{
                        czar ? `You are the Card Czar. ${enableCzar ? 'Please pick the winner' : 'Waiting for submissions...'}`
                            : `You are a Player. ${disableForm ? ' Waiting for other players...' : ' Please play a card'}`}
                    </h1>
                    <Card
                        className="black-card"
                        content={black} >
                    </Card>

                    <form onSubmit={winSubmitHandler}>
                        <div className="played-cards">

                            {played.map(card => {
                                const classname = `${card.content === selected ? 'selected' : ''} ${!enableCzar || !czar ? 'disabled' : ''}`
                                return (
                                    <Card
                                        key={card.content}
                                        className={classname}
                                        type="button"
                                        content={card.selected ? '' : card.content}
                                        onClick={cardClickHandler}>
                                    </Card>
                                )
                            })}
                        </div>
                        {czar && <button className="submit-button" type="submit" disabled={!enableCzar || selected === ""}>Submit</button>}

                    </form>
                    {!czar &&
                        <form onSubmit={cardSubmitHandler}>
                            <Card
                                type="button"
                                content={selected}
                                className={selected === "" || disableForm ? 'disabled' : ''}
                                onClick={returnCard}
                            >
                            </Card>
                            <button className="submit-button" type="submit" disabled={selected === "" || disableForm}>Submit</button>
                        </form>
                    }

                </div>
                <div id="game-hand">
                    <h1>Your Hand</h1>
                    <div className="cardbar">
                        {cards.map(card => {
                            const classname = `${card.content === selected ? 'selected' : ''} ${czar || disableForm ? 'disabled' : ''}`
                            return (
                                <Card
                                    key={card.content}
                                    content={card.selected ? '' : card.content}
                                    className={classname}
                                    onClick={cardClickHandler}>
                                </Card>
                            )
                        })}
                    </div>
                </div>
            </div>
            <div id="game-extras">
                <Scoreboard scores={scores} />
                <Chat gameId={gameId} />
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

function mapDispatchToProps(dispatch) {
    return {
        setEndGame: (endgame) => {
            dispatch({ type: "SET_ENDGAME", payload: endgame })
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Room);
