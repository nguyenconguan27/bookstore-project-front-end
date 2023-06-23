import Search from "./Search";
import { Link } from "react-router-dom";
export default function Header(props) {
  const searchText = props.searchText;
  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user && user.role === "ADMIN";
  const isUser = user && user.role === "USER";
  const cartId = user && user.cartId;
  const isLoggedIn = localStorage.getItem("token") !== null;
  const onChange = (event) => {
    props.onChangeSearchText(event);
  };

  return (
    <div className="header">
      <ul className="nav">
        <li className="home-nav">
          <Link to="/">Trang chủ</Link>
        </li>
        {!isLoggedIn && (
          <li>
            <Link to={"/login"}>Đăng nhập</Link>
          </li>
        )}

        {isLoggedIn && (
          <li className="logout-nav">
            <Link to={"/login"}>Đăng xuất</Link>
          </li>
        )}

        {isAdmin && (
          <li className="manager-nav manager-book">
            <Link to={"/admin/book"}>Kho sách</Link>
          </li>
        )}
        {isAdmin && (
          <li className="manager-nav">
            <Link to={`/admin/order`}>Đơn hàng</Link>
          </li>
        )}

        {isUser && (
          <li className="manager-nav manager-book">
            <Link to={`/cart/${cartId}`}>Giỏ hàng</Link>
          </li>
        )}
        {isUser && (
          <li className="manager-nav">
            <Link to={`/order/${"all"}`}>Đơn hàng</Link>
          </li>
        )}
      </ul>

      <ul className="nav"></ul>

      <div className="row">
        <div className="col-4"></div>
        <div className="col-4">
          <Search searchText={searchText} onChangeSearchText={onChange} />
        </div>
      </div>
    </div>
  );
}
