import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import "./page.scss";

export default function BookDetail(props) {
  const book = props.book;
  const categories = props.categories;
  const imageURL = props.imageURL;
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user && user.role;
  const [quantity, setQuantity] = useState(1);
  const isEdit = props.isEdit;
  const access = !isEdit ? "none-edit" : "";

  const handleBookChange = (event) => {
    props.onChange1(event);
  };
  const handleCategoryChange = (event) => {
    props.onChange2(event);
  };

  const handleUpload = (event) => {
    props.onChange3(event);
  };

  const handleQuantity = (event) => {
    setQuantity(event.target.value);
  };

  const handleOrder = () => {
    props.onClick(quantity);
  };
  return (
    <Fragment>
      <div className="col-6 detail">
        <div className="card">
          <div className="card-body">
            <div className="row">
              <h5 className="card-title col-5">Tiêu đề</h5>
              <h5 className="card-title card-title-right col-5">Tác giả</h5>
              <input
                name="title"
                onChange={handleBookChange}
                className={`card-title col-4 ${access}`}
                value={book.title}
                readOnly={!isEdit}
              />
              <input
                name="author"
                onChange={handleBookChange}
                className={`card-title col-4 author ${access}`}
                value={book.author}
                readOnly={!isEdit}
              />
              <h5 className={`card-title col-12`}>Mô tả</h5>
              <textarea
                className={`des card-title col-10 ${access}`}
                name="des"
                onChange={handleBookChange}
                value={book.des}
                readOnly={!isEdit}
              />
              <h5 className="card-title col-5">Số trang</h5>
              <h5 className="card-title card-title-right col-5">
                Ngày phát hành
              </h5>
              <input
                name="pages"
                onChange={handleBookChange}
                className={`card-title col-4 ${access}`}
                value={book.pages}
                readOnly={!isEdit}
              />
              <input
                name="releaseDate"
                onChange={handleBookChange}
                type="date"
                className={`card-title col-4 author ${access}`}
                value={book.releaseDate}
                readOnly={!isEdit}
              />
              <h5 className="card-title col-12">Danh mục</h5>
              <select
                name="name"
                className={`card-title col-4 ${access}`}
                value={book.nameCategory}
                onChange={handleCategoryChange}
                disabled={!isEdit}
              >
                {categories.map((element) => (
                  <option key={element.id}>{element.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <h3>
          Giá:
          <input
            type="text"
            name="price"
            onChange={handleBookChange}
            className={`card-title col-4 ${access}`}
            value={`${book.price}.000đ`}
            readOnly={!isEdit}
          />
        </h3>
      </div>
      <div className="col-3 detail">
        {imageURL && (
          <img
            src={imageURL}
            className="fixed-image card-img-top"
            alt="Product Image"
          />
        )}
        {role === "ADMIN" && isEdit !== 0 && (
          <input
            className="file-chosen"
            type="file"
            name="image"
            onChange={handleUpload}
          />
        )}
        {role === "USER" && (
          <div className="row">
            <button
              onClick={handleOrder}
              className="col-6 btn btn-primary add-to-cart-btn-d"
            >
              Thêm vào giỏ
            </button>
            <input
              className="quantity col-4"
              onChange={handleQuantity}
              name="quantity"
              type="number"
              value={quantity}
            />
          </div>
        )}
      </div>
    </Fragment>
  );
}
