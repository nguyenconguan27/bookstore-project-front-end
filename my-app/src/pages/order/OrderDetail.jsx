import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, json } from "react-router-dom";
import "./Order.scss";

export default function OrderDetail(props) {
  const user = JSON.parse(localStorage.getItem("user"));
  const isUser = user.role === "USER";
  const isAdmin = user.role === "ADMIN";
  const orderDetail = props.orderDetail;
  const status = props.status === "view";
  const order = props.order;
  const [isDelete, setIsDelete] = useState(false);

  const handleQuantity = (event) => {
    // console.log(event);
    props.handleQuantity(event, orderDetail);
  };

  const handleDelete = (id) => () => {
    props.handleDelete(id);
    setIsDelete(false);
  };

  const handleDelete1 = (id) => () => {
    setIsDelete(true);
  };
  const handleDelete2 = () => {
    setIsDelete(false);
  };

  return (
    <tr>
      {isAdmin && <td>{orderDetail.bookId}</td>}
      <td>{orderDetail.title}</td>
      {!isAdmin && <td>{orderDetail.author}</td>}
      <td>
        {status || (
          <button onClick={handleQuantity} value="-" className="quantity-btn">
            -
          </button>
        )}
        {orderDetail.quantity}
        {status || (
          <button onClick={handleQuantity} value="+" className="quantity-btn">
            +
          </button>
        )}
      </td>
      <td>{orderDetail.price}.000đ</td>
      {isAdmin && <td>{order.address}</td>}
      {isAdmin && (
        <td>
          Tên: {order.fullname} - SĐT: {order.number}
        </td>
      )}

      {!isAdmin && (
        <td>
          <Link
            className="action-btn btn btn-primary view"
            to={`/book/${orderDetail.bookId}`}
          >
            Xem sách
          </Link>
          {order !== undefined || (
            <button
              className="action-btn btn btn-danger delete"
              onClick={handleDelete1()}
            >
              Xóa
            </button>
          )}
          {isDelete && (
            <div className="message">
              <p>{"Xác nhận xóa đơn hàng"}</p>
              <button
                className="message-btn"
                onClick={handleDelete(Number(orderDetail.id))}
              >
                Xóa
              </button>
              <button className="message-btn" onClick={handleDelete2}>
                Hủy
              </button>
            </div>
          )}
        </td>
      )}
    </tr>
  );
}
