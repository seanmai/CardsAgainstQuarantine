import React from 'react';
import Modal from 'react-modal'
import axios from 'axios';

const customStyles = {
    content : {
        top: '40%',
        left: '40%',
        bottom: 'auto',
        right: 'auto',
    }
};

Modal.setAppElement('#root');

const CreateCard = () => {
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [content, setContent] = React.useState('');
    const [type, setType] = React.useState('black');
    const [category, setCategory] = React.useState('');

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);
    const handleContentChange = (e) => setContent(e.target.value);
    const handleTypeChange = (e) => setType(e.target.value);
    const handleCategoryChange = (e) => setCategory(e.target.value);

    function handleSubmit(e) {
        e.preventDefault();
        const card = {
            type: type,
            category: category,
            content: content,
        }

        axios.post('http://localhost:4000/card-categories/cards/add', card)
            .then(res => console.log(res.data));

        window.location = '/cards'
    }

    axios.get('http://localhost:4000/card-categories/cards')
        .then((res) => { 
            console.log(res);
        });


    return (
        <div>
            <button onClick={openModal}>Create Card</button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
            >
                    <form id="create_card_form" onSubmit={handleSubmit}>
                        <label htmlFor="category">Card Category: </label>
                        <select value={category} onChange={handleCategoryChange} name="category" id="categories">
                            <option value="nsfw">NSFW</option>
                            <option value="family_friendly">Family Friendly</option>
                            <option value="french">French</option>
                            <option value="christmas">Christmas</option>
                        </select>
                        <br/>
                        <label htmlFor="card_type">Card Type: </label>
                        <input 
                            type="radio" 
                            id="black_card_type" 
                            value="black" 
                            name="card_type" 
                            checked={type === "black"}
                            onChange={handleTypeChange}
                        />
                        <label htmlFor="black_card_type">Black</label>
                        <input 
                            type="radio" 
                            id="white_card_type" 
                            value="white" 
                            name="card_type"
                            checked={type === "white"}
                            onChange={handleTypeChange}
                        />
                        <label htmlFor="black_card_type">White</label>
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