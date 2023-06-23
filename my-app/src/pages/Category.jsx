import React, { useEffect, useState } from "react";
import axios from "axios";

function Category(props) {
  const [categories, setCategories] = useState([]);
  const accessToken = localStorage.getItem("token");
  useEffect(() => {
    axios
      .get("http://localhost:8080/category/", {})
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {});
  }, []);

  const onChangeCate = (event) => {
    props.onChangeCategory(event);
  };

  return (
    <ul className="cate-list">
      <h2>Danh mục</h2>
      <li className="cate">
        <button className="category" value="" onClick={onChangeCate}>
          Tất cả
        </button>
      </li>
      {categories.map((category) => (
        <li className="cate" key={category.id}>
          <button
            key={category.id}
            className="category"
            value={category.id}
            onClick={onChangeCate}
          >
            {category.name}
          </button>
        </li>
      ))}
    </ul>
  );
}

export default Category;
