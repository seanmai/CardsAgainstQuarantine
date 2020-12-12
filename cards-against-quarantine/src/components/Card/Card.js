import React from 'react';
import './Card.css'


// This is the basic card template
// TODO style card

const Card = ({ content, onClick, className, ...props }) => {
    return (
        <div className={`card ${className}`} onClick={onClick} data-value={content} readOnly {...props}>{content}</div>
    );
}

export default Card