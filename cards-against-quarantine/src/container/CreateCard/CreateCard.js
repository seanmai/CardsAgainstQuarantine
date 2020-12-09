import React, { useState, useEffect } from 'react';
import Modal from 'react-modal'
import axios from 'axios';

const customStyles = {
    content: {
        top: '40%',
        left: '40%',
        bottom: 'auto',
        right: 'auto',
    }
};

Modal.setAppElement('#root');

const CreateCard = () => {
    const [modalIsOpen, setIsOpen] = useState(false);
    const [content, setContent] = useState('');
    const [type, setType] = useState('black');
    const [category, setCategory] = useState('');
    const [categoryList, setCategoryList] = useState([]);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);
    const handleContentChange = (e) => setContent(e.target.value);
    const handleTypeChange = (e) => setType(e.target.value);
    const handleCategoryChange = (e) => setCategory(e.target.value);

    function handleSubmit(e) {
        e.preventDefault();
        const card = {
            content: content,
            type: type,
            category: category,
        }

        console.log(card);

        axios.post('http://localhost:4000/card-categories/cards/add', card)
            .then((res) => {
                console.log(res);
                window.location = '/admin';
            })
            .catch(err => console.log(err));
    }

    useEffect(() => {
        axios.get('http://localhost:4000/card-categories')
        .then((res) => {
            setCategoryList(res.data);
        }); 
    }, []);


    return (
        <div>
            <button id="create-card-button" onClick={openModal}>Add Card</button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
            >
                    <form id="create-card-form" onSubmit={handleSubmit}>
                        <h1>New Card</h1>
                        <label htmlFor="category">Card Category: </label>
                        <select value={category} onChange={handleCategoryChange} name="category" id="categories">
                            <option value="">Please Select a Category</option>
                            {categoryList.map((category) => {return <option key={category._id} value={category.name}>{category.name}</option>;})}
                        </select>
                        <br/>
                        <label htmlFor="card-type">Card Type: </label>
                        <input 
                            type="radio" 
                            id="black-card-type" 
                            value="black" 
                            name="card_type" 
                            checked={type === "black"}
                            onChange={handleTypeChange}
                        />
                        <label htmlFor="black-card-type">Black</label>
                        <input 
                            type="radio" 
                            id="white-card-type" 
                            value="white" 
                            name="card-type"
                            checked={type === "white"}
                            onChange={handleTypeChange}
                        />
                        <label htmlFor="black-card-type">White</label>
                        <br/>
                        <label htmlFor="content">Card Content: </label>
                        <input type="text" value={content} onChange={handleContentChange}/>
                        <br/>
                        <input type="button" value="Cancel" onClick={closeModal}/>
                        <input type="submit" value="Add"/>
                    </form>
            </Modal>
        </div>
    );
}

export default CreateCard;