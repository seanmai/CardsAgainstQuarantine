import React from 'react'


const Scoreboard = ({ scores }) => {
    return (
        <div>
            <h1>Scores</h1>
            {scores.map(score => {
                return (
                    <span key={score.name}>{score.name} {score.score}</span>
                )
            })}
        </div>
    )
}

export default Scoreboard