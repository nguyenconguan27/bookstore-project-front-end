import React, { useState } from "react";

import axios from "axios";
import { Navigate } from "react-router-dom";
import "./user.scss";
import { BsAlignBottom } from "react-icons/bs";

export default function Signup() {
  const [isSignup, setIsSignup] = useState(false);
  const [user, setUser] = useState({
    username: "",
    password: "",
    fullname: "",
    number: "",
    address: "",
    email: "",
  });

  const onChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setUser({ ...user, [name]: value });
  };

  const handleSignup = (event) => {
    event.preventDefault();
    if (user.password.length < 8) {
      alert("Mật khẩu phải lớn hơn 8 ký tự");
      return;
    }
    axios({
      method: "post",
      url: "http://localhost:8080/auth/signup",
      data: user,
    })
      .then((response) => {
        alert(response.data);
        setIsSignup(true);
      })
      .catch((error) => {
        alert(error.response.data);
      });
  };

  if (isSignup) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="login row justify-content-center">
      <div className="col-md-6">
        <h2>Đăng ký tài khoản</h2>
        <form onSubmit={handleSignup}>
          <div className="row">
            <div className="col-5">
              <label className="form-label">Tên đăng nhập:</label>
              <input
                type="text"
                className="form-control"
                name="username"
                value={user.username}
                onChange={onChange}
              />
            </div>
            <div className="margin col-5">
              <label className="form-label">Mật khẩu:</label>
              <input
                type="password"
                className="form-control"
                name="password"
                value={user.password}
                onChange={onChange}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-5">
              <label className="form-label">Họ tên:</label>
              <input
                type="text"
                className="form-control"
                name="fullname"
                value={user.fullname}
                onChange={onChange}
              />
            </div>
            <div className="margin col-5">
              <label className="form-label">Số điện thoại:</label>
              <input
                type="text"
                className="form-control"
                name="number"
                value={user.number}
                onChange={onChange}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-5">
              <label className="form-label">Email:</label>
              <input
                type="text"
                className="form-control"
                name="email"
                value={user.email}
                onChange={onChange}
              />
            </div>
            <div className="margin col-5">
              <label className="form-label">Địa chỉ:</label>
              <input
                type="text"
                className="form-control"
                name="address"
                value={user.address}
                onChange={onChange}
              />
            </div>
          </div>
          <div className="row center width-full">
            <button className="signup btn btn-primary">Đăng ký</button>
          </div>
        </form>
      </div>
    </div>
  );
}
