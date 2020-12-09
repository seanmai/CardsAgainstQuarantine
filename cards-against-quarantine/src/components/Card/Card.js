import React from 'react';
import './Card.css'


// This is the basic card template
// TODO style card

const Card = ({ content, onClick, className, ...props }) => {
    return (
        <button className={`card ${className}`} onClick={onClick} value={content} readOnly {...props}>{content}</button>
    );
}

export default Card