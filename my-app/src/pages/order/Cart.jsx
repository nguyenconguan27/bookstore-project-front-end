import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import OrderDetail from "./OrderDetail";
import "./Order.scss";
import Header from "../Header";

export default function Cart() {
  const accessToken = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const isUser = user.role === "USER";
  const [orderDetails, setOrderDetails] = useState([]);

  const a = isUser ? "double-btn" : "";
  if (!user) {
    <Navigate to="/login" />;
  }

  useEffect(() => {
    axios
      .get(`http://localhost:8080/cart/${user.cartId}`, {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      })
      .then((response) => {
        setOrderDetails(response.data);
        console.log(response.data);
      });
  }, []);

  const handleQuantity = (event, orderDetail) => {
    const value = event.target.value;
    const removeIndex = orderDetails.findIndex(
      (item) => item.id === orderDetail.id
    );
    console.log(removeIndex);
    let newOrderDetail;
    if (value === "+") {
      newOrderDetail = { ...orderDetail, quantity: orderDetail.quantity + 1 };
    } else {
      newOrderDetail = { ...orderDetail, quantity: orderDetail.quantity - 1 };
    }
    console.log(orderDetail);
    if (newOrderDetail.quantity === 0) {
      axios
        .delete(`http://localhost:8080/cart/delete/${orderDetail.id}`, {
          headers: {
            Authorization: "Bearer " + accessToken,
          },
        })
        .then(() => {
          let newArr = [...orderDetails];
          newArr.splice(removeIndex, 1);
          setOrderDetails(newArr);
        });
    } else {
      axios({
        method: "put",
        url: `http://localhost:8080/cart/update/${user.cartId}`,
        data: newOrderDetail,
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      }).then((response) => {
        let newArr = [...orderDetails];
        newArr.splice(removeIndex, 1, response.data);
        setOrderDetails(newArr);
      });
    }
  };

  const handleDelete = (id) => {
    const removeIndex = orderDetails.findIndex((item) => item.id === id);
    axios({
      method: "delete",
      url: `http://localhost:8080/cart/delete/${id}`,
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    }).then(() => {
      let newArr = [...orderDetails];
      newArr.slice(removeIndex, 1);
      setOrderDetails(newArr);
    });
  };

  const totalPrice = () => {
    let price = 0;
    for (let i = 0; i < orderDetails.length; i++) {
      price += orderDetails[i].price;
    }
    return price;
  };

  return (
    <div className="container">
      <div>
        <Header />
      </div>
      <div className="row">
        <h1>Giỏ hàng</h1>
      </div>
      {(orderDetails.length > 0 && (
        <div>
          <table className="table table-bordered table-condensed">
            <thead>
              <tr>
                <th>Tiêu đề</th>
                <th>Tác giả</th>
                <th>Số lượng</th>
                <th>Giá tiền</th>
                <th className={`action-lst ${a}`}>Tuỳ chọn</th>
              </tr>
            </thead>
            <tbody>
              {orderDetails.map((orderDetail) => (
                <OrderDetail
                  handleDelete={handleDelete}
                  key={orderDetail.id}
                  handleQuantity={handleQuantity}
                  orderDetail={orderDetail}
                />
              ))}
            </tbody>
          </table>

          <h3>Tổng tiền: {totalPrice()}.000đ</h3>
          <Link className="btn btn-success" to={`/order/set`}>
            Đặt sách
          </Link>
        </div>
      )) || <h3>Trống</h3>}
    </div>
  );
}
