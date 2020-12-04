import React from 'react';
import './Card.css'


// This is the basic card template
// TODO style card

const Card = (props) =>(
    <div className={Card}>
        <p>{props.text}</p>
    </div>
);

export default Card