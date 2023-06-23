import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Action from "./pages/Action";
import Login from "./user/Login";
import Signup from "./user/Signup";
import Cart from "./pages/order/Cart";
import Order from "./pages/order/Order";
import OrderManager from "./admin/OrderManager";
import BookManager from "./admin/BookManager";
import OrderSet from "./pages/order/OrderSet";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/" element={<Home />} />
        <Route path="/book/:id" element={<Action />} />
        <Route path="/cart/:id" element={<Cart />} />
        <Route path="/order/:action" element={<Order />} />
        <Route path="/admin/book" element={<BookManager />} />
        <Route path="/admin/order" element={<OrderManager />} />
        <Route path="/order/set" element={<OrderSet />} />
      </Routes>
    </div>
  );
}

export default App;
