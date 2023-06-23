import axios from "axios";
import React, { useState } from "react";
import { Navigate } from "react-router-dom";

export default function OrderSet() {
  const [isOrder, setIsOrder] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const accessToken = localStorage.getItem("token");

  const [order, setOrder] = useState({
    fullname: user.username,
    address: user.address,
    number: user.number,
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    axios({
      method: "post",
      url: `http://localhost:8080/order/add/${user.id}`,
      data: order,
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    });
    setIsOrder(true);
  };

  if (isOrder) {
    return <Navigate to={`/order/${"all"}`} />;
  }

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setOrder({ ...order, [name]: value });
    console.log(order);
  };

  return (
    <div className="container center">
      <h1 className="mt-4">Thông tin giao hàng</h1>
      <form classname="center" onSubmit={handleSubmit}>
        <div className="form-group order-text">
          <label className="order-infor">Nguời nhận:</label>
          <input
            value={order.fullname}
            onChange={handleChange}
            type="text"
            className="form-control order-input"
            name="username"
            required
          />
        </div>

        <div className="form-group order-text">
          <label className="order-infor">Địa chỉ:</label>
          <input
            value={order.address}
            onChange={handleChange}
            type="text"
            className="form-control order-input"
            name="address"
            required
          />
        </div>

        <div className="form-group order-text">
          <label className="order-infor">Số điện thoại:</label>
          <input
            value={order.number}
            onChange={handleChange}
            type="text"
            className="form-control order-input"
            name="number"
            required
          />
        </div>

        <button type="submit" className="order-btn btn btn-primary">
          Mua hàng
        </button>
      </form>
    </div>
  );
}
