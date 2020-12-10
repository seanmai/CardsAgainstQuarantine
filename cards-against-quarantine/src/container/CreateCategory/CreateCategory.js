import React, { useState } from 'react';
import Modal from 'react-modal'
import axios from 'axios';

const customStyles = {
    content: {
        top: '20%',
        left: '20%',
        bottom: 'auto',
        right: 'auto',
    }
};

Modal.setAppElement('#root');

const CreateCategory = () => {
    const [modalIsOpen, setIsOpen] = useState(false);
    const [categoryName, setCategoryName] = useState('');

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);
    const handleCategoryChange = (e) => setCategoryName(e.target.value);

    function handleSubmit(e) {
        e.preventDefault();
        const category = { name: categoryName }

        axios.post('http://localhost:4000/card-categories/add', category)
            .then(res => console.log(res.data));
        window.location = '/admin'
    }

    return (
        <div>
            <button id="create-category-button" onClick={openModal}>Add Category</button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
            >
                    <form id="create-card-form" onSubmit={handleSubmit}>
                        <h1>New Category</h1>
                        <label htmlFor="category-name">Category Name: </label>
                        <input type="text" value={categoryName} onChange={handleCategoryChange}/>
                        <br/>
                        <input type="button" value="Cancel" onClick={closeModal}/>
                        <input type="submit" value="Add"/>
                    </form>
            </Modal>
        </div>
    );
}

export default CreateCategory;