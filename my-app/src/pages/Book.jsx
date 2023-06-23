import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";

export default function Book(props) {
  const book = props.book;
  const [imageURL, setImageURL] = useState("");
  const accessToken = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    axios
      .get(`http://localhost:8080/book/file/${book.image}`, {
        responseType: "arraybuffer",
      })
      .then((response) => {
        const imageBlob = new Blob([response.data], { type: "image/jpg" });
        const imageURL1 = URL.createObjectURL(imageBlob);
        setImageURL(imageURL1);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  console.log(imageURL);

  const handleOrder = () => {
    if (!accessToken) {
      return <Navigate to="/login" />;
    }
    const orderDetail = { id: 0, quantity: 1, status: 0 };
    axios({
      method: "post",
      url: `http://localhost:8080/cart/add/${user.cartId}/${book.id}`,
      data: orderDetail,
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    }).then(() => {
      alert("Đã thêm vào giỏ hàng");
    });
  };

  return (
    <div className="card book-item">
      <Link to={`/book/${book.id}`}>
        <img src={imageURL} className="card-img-top" alt="Product Image" />
        <div className="card-body">
          <h5 className="card-title">{book.title}</h5>
          <p className="card-text">Tác giả: {book.author}</p>
        </div>
      </Link>
      <button onClick={handleOrder} className="btn btn-primary add-to-cart-btn">
        Thêm vào giỏ
      </button>
    </div>
  );
}
