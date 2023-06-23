import React, { Fragment, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Header";
import "./page.scss";
import axios from "axios";
import { Navigate, useParams } from "react-router-dom";
import BookDetail from "./BookDetail";
import Review from "./review/Review";

export default function Action() {
  const [book, setBook] = useState({});
  const [imageURL, setImageURL] = useState("");
  const [categories, setCategories] = useState([]);
  const accessToken = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user && user.role;
  const cartId = user && user.cartId;
  const { id } = useParams();
  const [isEdit, setIsEdit] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/book/${id}`);
        setBook(response.data);
        const response1 = await axios.get("http://localhost:8080/category/");
        setCategories(response1.data);

        var image = response.data.image;
        if (image) {
          const response2 = await axios.get(
            `http://localhost:8080/book/file/${image}`,
            {
              responseType: "arraybuffer",
            }
          );
          const imageBlob = new Blob([response2.data], { type: "image/jpg" });
          const imageUrl1 = URL.createObjectURL(imageBlob);
          setImageURL(imageUrl1);
        }
      } catch (error) {}
    };
    fetchData();
  }, []);

  const handleUpload = (event) => {
    const file = event.target.files[0];
    setImageURL(URL.createObjectURL(file));
    const formData = new FormData();
    formData.append("image", file);
    axios
      .post("http://localhost:8080/book/file/upload", formData, {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      })
      .then((response) => {
        setBook({ ...book, image: response.data });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleBookChange = (event) => {
    const { target } = event;
    let value = target.value;
    const { name } = target;
    if (name === "pages") {
      value = Number(value);
    }
    if (name === "price") {
      value = Number(value.slice(0, -5));
    }
    setBook({ ...book, [name]: value });
  };

  const handleCategoryChange = (event) => {
    let name = event.target.value;
    console.log(event);
    let category;
    axios
      .get(`http://localhost:8080/category/name/${name}`, {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      })
      .then((response) => {
        category = response.data;
        setBook({
          ...book,
          idCategory: category.id,
          nameCategory: category.name,
        });
      })
      .catch((error) => {});
  };

  const method = id === "0" ? "post" : "put";

  const saveBook = () => {
    console.log(book);
    axios({
      method: method,
      url: `http://localhost:8080/book/save/${id}`,
      data: { ...book, sold: 0 },
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    })
      .then(() => {
        alert("đã cập nhập thành công");
      })
      .catch((error) => {
        alert(error.response.data);
      });
  };

  const handleShowBtn = (event) => {
    setIsEdit(1);
  };

  const handleOrder = (quantity) => {
    if (!accessToken) {
      return <Navigate to="/login" />;
    }
    const orderDetail = { id: 0, quantity: quantity, status: 0 };
    axios({
      method: "post",
      url: `http://localhost:8080/cart/add/${cartId}/${id}`,
      data: orderDetail,
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    }).then(() => {
      alert("Đã thêm vào giỏ hàng");
    });
  };
  return (
    <div className="row">
      <div className="col-10 detail-header">
        <Header className="header-padding" />
      </div>
      <div className="container row width-full">
        <BookDetail
          isEdit={isEdit}
          book={book}
          id={id}
          categories={categories}
          imageURL={imageURL}
          onChange1={handleBookChange}
          onChange2={handleCategoryChange}
          onChange3={handleUpload}
          onClick={handleOrder}
        />
        <div className="save-action">
          {role === "ADMIN" && isEdit === 0 && id !== "0" && (
            <button className="btn btn-primary" onClick={handleShowBtn}>
              Sửa
            </button>
          )}

          {role === "ADMIN" && isEdit === 0 && id === "0" && (
            <button className="btn btn-primary" onClick={handleShowBtn}>
              Tạo sách
            </button>
          )}
          {role === "ADMIN" && isEdit === 1 && (
            <button className="btn btn-success" onClick={saveBook}>
              Lưu
            </button>
          )}
        </div>
        <Review id={id} reviews={book.reviewList} />
      </div>
    </div>
  );
}
