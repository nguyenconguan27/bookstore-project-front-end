import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Book from "./Book";

export default function BookList(props) {
  const [books, setBooks] = useState([]);
  const accessToken = localStorage.getItem("token");
  useEffect(() => {
    axios
      .get("http://localhost:8080/book/", {})
      .then((response) => {
        setBooks(response.data);
      })
      .catch((error) => {});
  }, []);

  const cateId = props.category;
  const searchText = props.searchText;
  const list = [];
  books.forEach((element) => {
    let n = Number(cateId);
    if (n === 0) {
      list.push(element);
    } else if (n === element.idCategory) {
      list.push(element);
    }
    // console.log(element.category.id);
  });

  const filtered = list.filter((book) => {
    const isNameMatch = book.title
      .toLowerCase()
      .includes(searchText.toLowerCase());
    return isNameMatch;
  });

  //   {cateId === "" && <Book book={book} />}
  //   console.log(cateId);

  return (
    <div className="row">
      {filtered.map((book) => (
        <div key={book.id} className="col-3 book">
          <Book book={book} />
        </div>
      ))}
    </div>
  );
}
