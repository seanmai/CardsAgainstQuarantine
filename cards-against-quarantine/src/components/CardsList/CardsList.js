import React from 'react';

const cardlist = [
    {
        type: "black",
        category: "nsfw",
        content: "asd"  
    },
    {
        type: "black",
        category: "french",
        content: "asdf"  
    },
    {
        type: "white",
        category: "french",
        content: "asdfg"  
    },
    {
        type: "white",
        category: "nsfw",
        content: "asdfs"  
    },
    {
        type: "white",
        category: "nsfw",
        content: "asdsf"  
    },
    {
        type: "black",
        category: "nsfw",
        content: "asdaf"  
    },
];

const CardsList = () => {
    const [itemList, setItemList] = React.useState([]);

    const getCardsList = () => {
        const itemList = cardlist.map((card) => {
            return <li key={card.content}>{card.content}</li>;
        });
        return itemList;
    };

    return (
        <div>
            <ul>
                {getCardsList()}
            </ul>
        </div>
    );
}


export default CardsList;