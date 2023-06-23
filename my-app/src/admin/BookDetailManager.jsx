import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function BookDetailManager(props) {
  const book = props.book;
  const [isDelete, setIsDelete] = useState(false);

  const handleDelete = (id) => (i) => {
    props.handleDelete(id);
  };

  const handleDelete1 = () => {
    setIsDelete(true);
  };
  const handleDelete2 = () => {
    setIsDelete(false);
  };
  return (
    <tr key={book.id}>
      <td>{book.id}</td>
      <td>{book.title}</td>
      <td>{book.author}</td>
      <td>{book.sold}</td>
      <td>{book.pages}</td>
      <td>{book.nameCategory}</td>
      <td className="action">
        <Link className="btn btn-primary view" to={`/book/${book.id}`}>
          Xem sách
        </Link>
        <button className="btn btn-danger delete" onClick={handleDelete1}>
          Xóa
        </button>
        {isDelete && (
          <div className="message">
            <p>{"Xác nhận xóa sách"}</p>
            <button
              className="message-btn"
              onClick={handleDelete(Number(book.id))}
            >
              Xóa
            </button>
            <button className="message-btn" onClick={handleDelete2}>
              Hủy
            </button>
          </div>
        )}
      </td>
    </tr>
  );
}
