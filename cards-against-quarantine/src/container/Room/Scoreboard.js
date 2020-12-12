import React from 'react'
import './Scoreboard.css'


const Scoreboard = ({ scores }) => {
    return (
        <div id="scoreboard-container">
            <h1 id="scoreboard-title">Scores</h1>
            <table id="scoreboard-table">
                <tbody>
                    {scores.sort((a, b) => b.score - a.score).map(score => {
                        return (
                            <tr key={score.name}>
                                <td className="scoreboard-name">{score.name} </td>
                                <td>{score.score}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default Scoreboard