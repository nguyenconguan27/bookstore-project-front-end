import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";

import "./admin.scss";
import Header from "../pages/Header";
import BookDetailManager from "./BookDetailManager";

export default function BookManager() {
  const [books, setBooks] = useState([]);
  const accessToken = localStorage.getItem("token");

  const handleDelete = (id) => {
    const removeIndex = books.findIndex((item) => item.id === id);
    axios
      .delete(`http://localhost:8080/book/delete/${id}`, {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      })
      .then(() => {
        let newArr = [...books];
        newArr.splice(removeIndex, 1);
        setBooks(newArr);
        alert("xóa sách thành công");
      })
      .catch((error) => {});
  };

  // console.log(books);
  useEffect(() => {
    axios
      .get(`http://localhost:8080/book/`, {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      })
      .then((response) => {
        setBooks(response.data);
        let newArr = [];
        for (let i = 0; i < response.data.length; i++) {
          newArr.push(false);
        }
      })
      .catch((error) => {});
  }, []);
  return (
    <div className="container">
      <div className="row">
        <Header />
      </div>
      <div>
        <h1>Quản lý sách</h1>
      </div>
      <table className="table table-striped table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Id</th>
            <th>Tiêu đề</th>
            <th>Tác giả</th>
            <th>Số lượng bán</th>
            <th>Số trang</th>
            <th>Danh mục</th>
            <th>Tùy chọn</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <BookDetailManager book={book} handleDelete={handleDelete} />
          ))}
        </tbody>
      </table>
      <Link to={`/book/${0}`} className="add-btn btn btn-success col-lg-12">
        Thêm mới
      </Link>
    </div>
  );
}
