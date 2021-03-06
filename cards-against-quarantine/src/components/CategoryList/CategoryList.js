import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './CategoryList.css';
import EditCategory from '../EditCategory/EditCategory';

const CategoryList = () => {
    const [categoryList, setCategoryList] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:4000/card-categories')
            .then((res) => {
                setCategoryList(res['data']);
            });
    }, []);

    const deleteCategory = (delID) => {
        axios.delete(`http://localhost:4000/card-categories/${delID}`)
            .then((res) => {
                console.log(res);
                window.location = '/admin';
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <div id="category-list-container">
            <ul id="category-list">
                {categoryList.map((category) => { return (
                    <li key={category._id}>
                        <span className="list-item">{category.name}</span>
                        <span className="button-container">
                            <EditCategory categoryID={category._id}/>
                            <button onClick={() => { deleteCategory(category._id) }}>Delete</button>
                        </span>
                    </li> 
                )})}
            </ul>
        </div>
    );
}


export default CategoryList;