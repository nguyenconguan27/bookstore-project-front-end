import React, { useEffect, useState } from "react";
import "./user.scss";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";
import Header from "../pages/Header";

export default function Login() {
  const [login, setLogin] = useState({});
  const [user, setUser] = useState(null);
  useEffect(() => {
    localStorage.clear();
  }, []);
  const handleLogin = (event) => {
    event.preventDefault();
    axios({
      method: "post",
      url: "http://localhost:8080/auth/login",
      data: login,
    })
      .then((response) => {
        let newUser = response.data;
        localStorage.setItem("token", newUser.accessToken);
        const user = {
          id: newUser.id,
          username: newUser.username,
          number: newUser.number,
          address: newUser.address,
          role: newUser.roles[0].authority,
          cartId: newUser.cartId,
        };
        localStorage.setItem("user", JSON.stringify(user));
        return user;
      })
      .then((data) => {
        setUser(data);
        const user = JSON.parse(localStorage.getItem("user"));
        console.log(user.role);
      })
      .catch((error) => {
        alert("tên đăng nhập hoặc mật khẩu không tồn tại");
      });
  };

  if (user) {
    return <Navigate to="/" />;
  }
  const handleInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setLogin({ ...login, [name]: value });
  };

  return (
    <div className="login row justify-content-center">
      <div className="col-md-6">
        <h2>Đăng nhập</h2>
        <form onSubmit={handleLogin}>
          <label htmlFor="username">Tên đăng nhập</label>
          <input
            type="text"
            className="form-control login-input"
            name="username"
            onChange={handleInputChange}
            placeholder="Tên đăng nhập"
          />

          <label htmlFor="password">Mật khẩu</label>
          <input
            type="password"
            className="form-control login-input"
            name="password"
            onChange={handleInputChange}
            placeholder="Mật khẩu"
          />

          <button type="submit" className="login-btn btn btn-primary">
            Đăng nhập
          </button>
        </form>
        <Link type="button" className="btn btn-link" to={"/signup"}>
          Đăng ký
        </Link>
      </div>
    </div>
  );
}
