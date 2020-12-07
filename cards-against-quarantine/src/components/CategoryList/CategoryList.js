import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './CategoryList.css';

const CategoryList = () => {
    const [categoryList, setCategoryList] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:4000/card-categories')
            .then((res) => {
                setCategoryList(res['data']);
            });
    }, []);

    return (
        <div id="category-list-container">
            <ul id="category-list">
                {categoryList.map((category) => { return <li key={category._id}>{category.name}</li> })}
            </ul>
        </div>
    );
}


export default CategoryList;