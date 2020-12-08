import React, { useState } from 'react';
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

const EditCategory = (props) => {
    const [modalIsOpen, setIsOpen] = useState(false);
    const [categoryName, setCategoryName] = useState('');

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);
    const handleCategoryChange = (e) => setCategoryName(e.target.value);

    function handleSubmit(e) {
        e.preventDefault();
        const category = { name: categoryName }

        axios.post(`http://localhost:4000/card-categories/${props.categoryID}`, category)
            .then(res => console.log(res.data));
        window.location = '/admin'
    }

    return (
        <span>
            <button onClick={openModal}>Edit</button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
            >
                    <form id="edit-category-form" onSubmit={handleSubmit}>
                        <h1>Edit Category</h1>
                        <label htmlFor="category-name">Category Name: </label>
                        <input type="text" value={categoryName} onChange={handleCategoryChange}/>
                        <br/>
                        <input type="button" value="Cancel" onClick={closeModal}/>
                        <input type="submit" value="Apply"/>
                    </form>
            </Modal>
        </span>
    );
}

export default EditCategory;