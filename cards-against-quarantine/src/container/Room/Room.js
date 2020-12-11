// This container is the game room
import React, { useEffect, useState } from 'react';
import socketIO from 'socket.io-client';


import './Room.css'

import Card from '../../components/Card/Card';
import Scoreboard from './Scoreboard'
import { connect, useSelector } from 'react-redux';

const socket = socketIO('http://localhost:4000');

const test_cards = [
    {
        content: "stupid",
        selected: false
    },
    {
        content: "dumb",
        selected: false
    },
    {
        content: "ur mom",
        selected: false
    },
    {
        content: "yes",
        selected: false
    },
    {
        content: "test card",
        selected: false
    },
]

const test_played = [
    {
        content: "hehe",
        selected: false
    },
    {
        content: "haha",
        selected: false
    },
    {
        content: "hey",
        selected: false
    },
    {
        content: "other test card",
        selected: false
    },
]

const Room = (props) => {
    const [cards, setCards] = useState(test_cards)
    const [played, setPlayed] = useState(test_played)
    const [black, setBlack] = useState("")
    const [selected, setSelected] = useState("")
    const [czar, setCzar] = useState(false)
    const [scores, setScores] = useState([])
    const [disable, setDisable] = useState(false)
    const username = useSelector(state => state.currentUser.name);
    const gameId = useSelector(state => state.gameid);

    useEffect(() => {
        socket.on('game-state', data => {
            console.log(data)
            setBlack(data.blackCard)
            setCzar(data.czar === username)
            const player_cards = data.players.filter(p => p.name === username)[0].cards
            setCards(player_cards.map(c => { return { content: c, selected: false } }))

            const curr_played = data.boardCards
            setPlayed(curr_played.map(c => { return { content: c.card, user: c.user, selected: false } }))
            setScores(data.players)

            if (data.boardCards.length === 0) {
                if (czar) {
                    setDisable(true)
                } else {
                    setDisable(false)
                }
            }
        });
        socket.on('game-over', data => {
            console.log('handle end of game')
            console.log(data)
        });
    }, [username]);

    const cardClickHandler = (e) => {
        if (e.target.value !== "") {
            setSelected(e.target.value)
            setCards(cards.map(card => card.content === e.target.value ? { ...card, selected: true } : { ...card, selected: false }))
        }
    }

    const cardSubmitHandler = (e) => {
        e.preventDefault()
        const data = {
            username: username,
            card: selected
        }
        socket.emit('submit-card', gameId, data)
        setDisable(true)
    }

    const winSubmitHandler = (e) => {
        e.preventDefault()
        console.log(played)
        const winner = played.find(c => c.content === selected)
        const data = {
            gameId,
            username: winner.user
        }
        socket.emit('round-winner', gameId, data)
    }
    const returnCard = (e) => {
        setCards(cards.map(card => { return { ...card, selected: false } }))
        setSelected("")
    }

    const createGame = () => {
        socket.emit('start-game', gameId, username)
    }

    return (
        <div className="flex-container">
            <button onClick={createGame}>Start Game</button>
            <div className="game-area">
                {czar && "YOU ARE CZAR"}
                {!czar && "YOU ARE Player"}
                <Card
                    disabled
                    content={black} >
                </Card>
                {!czar &&
                    <form onSubmit={cardSubmitHandler}>
                        <Card
                            disabled={selected === ""}
                            type="button"
                            content={selected}
                            onClick={returnCard} >
                        </Card>
                        <button type="submit" disabled={selected === ""}>Submit</button>
                    </form>
                }
                {czar &&
                    <form onSubmit={winSubmitHandler}>
                        <div className="played-cards">
                            {played.map(card => {
                                return (
                                    <Card
                                        key={card.content}
                                        className={card.content === selected ? "selected" : ""}
                                        type="button"
                                        content={card.selected ? "" : card.content}
                                        onClick={cardClickHandler}>
                                    </Card>
                                )
                            })}
                        </div>
                        <button type="submit" disabled={selected === ""}>Submit</button>
                    </form>
                }
                <h1>Your Hand</h1>
                <div className='cardbar'>
                    {cards.map(card => {
                        return (
                            <Card
                                disabled={czar || disable}
                                key={card.content}
                                content={card.selected ? "" : card.content}
                                onClick={cardClickHandler}>
                            </Card>
                        )
                    })}
                </div>
            </div>
            <div className="game-extras">
                <Scoreboard scores={scores} />
                <div>
                    <h1>
                        Chat
                    </h1>
                </div>
            </div>
        </div>
    )
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
