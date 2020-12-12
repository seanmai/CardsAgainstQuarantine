import React from 'react';
import '../HelpModal/HelpModal.css'
import { Link } from 'react-router-dom';


const GameEndModal = ({ showModal, scores, handle }) => {

    const displayModal = showModal ? "modal display-block" : "modal display-none";

    return (
        <div className={displayModal}>
            <div className="modal-main">
                <div className="info-container">
                    <h2 key="Role">Game Over</h2>
                    <table id="scoreboard-table">
                        <tbody>
                            {scores.sort((a, b) => b.score - a.score).map((score, i) => {
                                return (
                                    <tr key={score.name}>
                                        <td>{i + 1}.</td>
                                        <td className="scoreboard-name">{score.name} </td>
                                        <td>{score.score}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
                <Link to="/" style={{ textDecoration: 'none' }}>
                    <button className="close-button">Back To Lobby</button>
                </Link>

            </div>
        </div>

    );
}


export default GameEndModal;

