import axios from "axios";
import React, { useEffect, useState } from "react";
import OrderDetail from "./OrderDetail";
import Header from "../Header";

export default function Order() {
  const [orders, setOrders] = useState([]);
  const accessToken = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user.role === "ADMIN";
  const isUser = user.role === "USER";

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user.role === "USER") {
          const response2 = await axios.get(
            `http://localhost:8080/order/${user.id}`,
            {
              headers: {
                Authorization: "Bearer " + accessToken,
              },
            }
          );
          let orderList = response2.data;
          orderList.sort((a, b) => {
            if (a.date < b.date) return 1;
            return -1;
          });
          setOrders(orderList);
        } else {
          const response2 = await axios.get(`http://localhost:8080/order/`, {
            headers: {
              Authorization: "Bearer " + accessToken,
            },
          });
          let orderList = response2.data;
          orderList.sort((a, b) => {
            if (a.date < b.date) return 1;
            return -1;
          });
          setOrders(orderList);
        }
      } catch (error) {}
    };
    fetchData();
  }, []);

  const handleConfirm = (id) => () => {
    const removeIndex = orders.findIndex((item) => item.id === id);
    axios({
      method: "put",
      url: `http://localhost:8080/order/confirm/${id}`,
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    }).then((response) => {
      let newArr = [...orders];
      newArr.splice(removeIndex, 1, response.data);
      setOrders(newArr);
    });
  };

  return (
    <div className="container ">
      <div className="row">
        <div className="row">
          <Header />
        </div>
      </div>
      <div className="row ">
        <h1>Đơn hàng đã đặt</h1>
      </div>
      {orders.map((order) => (
        <div key={order.id} className="order-manager">
          <h4 className="order-date">
            {order.date} - Tổng: {order.price}.000đ
          </h4>
          <table className="table table-bordered table-condensed">
            <thead>
              <tr>
                {isAdmin && <th>Id</th>}
                <th>Tiêu đề</th>
                {isUser && <th>Tác giả</th>}
                <th>Số lượng</th>
                <th>Giá tiền</th>
                {isAdmin && <th>Địa chỉ</th>}
                {isAdmin && <th>Liên lạc</th>}
                {isUser && <th className="action-lst">Tuỳ chọn</th>}
              </tr>
            </thead>
            <tbody>
              {order.orderDetailList.map((orderDetail) => (
                <OrderDetail
                  order={order}
                  key={orderDetail.id}
                  orderDetail={orderDetail}
                  status={"view"}
                />
              ))}
            </tbody>
          </table>

          {isAdmin && order.isConfirmed === 0 && (
            <div className="confirm">
              <button
                onClick={handleConfirm(order.id)}
                className="confirm-btn btn btn-primary"
              >
                Xác nhận
              </button>
            </div>
          )}

          {isAdmin && order.isConfirmed === 1 && (
            <div className="confirm">
              <button
                onClick={handleConfirm(order.id)}
                className="btn btn-success"
              >
                Đã xác nhận
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
