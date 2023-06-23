import axios from "axios";
import React, { useEffect, useState } from "react";
import "./review.scss";
import { Navigate } from "react-router-dom";
export default function Review(props) {
  const accessToken = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const [reviews, setReviews] = useState([]);
  const bookId = props.id;
  const [newReview, setNewReview] = useState({
    id: 0,
    rate: 1,
    comment: "",
    user: user && user.username,
  });
  useEffect(() => {
    axios
      .get(`http://localhost:8080/review/${bookId}`, {})
      .then((response) => {
        setReviews(response.data);
      })
      .catch((error) => {});
    setNewReview();
  }, []);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setNewReview({ ...newReview, [name]: value });
  };

  const amountOfEachStar = (i) => {
    var c = 0;
    for (var x = 0; x < reviews.length; x++) {
      if (i === reviews[x].rate) {
        c++;
      }
    }
    return " " + c;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!user) {
      alert("vui lòng đăng nhập tài khoản");
      return <Navigate to="/login" />;
    }
    axios({
      method: "post",
      url: `http://localhost:8080/review/add/${user.id}/${bookId}`,
      headers: {
        Authorization: "Bearer " + accessToken,
      },
      data: newReview,
    }).then((response) => {
      setReviews([response.data, ...reviews]);
    });
  };

  const handleChangeStar = (event) => {
    setNewReview({ ...newReview, rate: Number(event.target.value) });
  };

  useEffect(() => {
    const input = document.getElementById("myInput");
    const button = document.getElementById("myButton");

    button.addEventListener("click", () => {
      input.value = "";
    });
  }, [reviews]);

  const avarage = () => {
    let avarage = 0;
    for (let i = 0; i < reviews.length; i++) {
      avarage += reviews[i].rate;
    }
    return (avarage / reviews.length).toFixed(1);
  };

  const full = <span className="star">&#9733;</span>;
  const none = <span className="star">&#9734;</span>;

  return (
    <div className="review row">
      <div className="col-5">
        <h2>Đánh giá sách: {avarage()}</h2>

        <div className="rating">
          {full}
          {full}
          {full}
          {full}
          {full}
          {amountOfEachStar(5)}
        </div>
        <div className="rating">
          {full}
          {full}
          {full}
          {full}
          {none}
          {amountOfEachStar(4)}
        </div>
        <div className="rating">
          {full}
          {full}
          {full}
          {none}
          {none}
          {amountOfEachStar(3)}
        </div>
        <div className="rating">
          {full}
          {full}
          {none}
          {none}
          {none}
          {amountOfEachStar(2)}
        </div>
        <div className="rating">
          {full}
          {none}
          {none}
          {none}
          {none}
          {amountOfEachStar(1)}
        </div>
      </div>

      <div className="col-7">
        <form onSubmit={handleSubmit}>
          <div className="comment row">
            <div className="col-2">
              <h6 className="">{user && user.username}</h6>
              <div className="rating">
                <input
                  onChange={handleChangeStar}
                  type="radio"
                  id="star5"
                  name="rating"
                  value="5"
                />
                <label htmlFor="star5"></label>
                <input
                  onChange={handleChangeStar}
                  type="radio"
                  id="star4"
                  name="rating"
                  value="4"
                />
                <label htmlFor="star4"></label>
                <input
                  onChange={handleChangeStar}
                  type="radio"
                  id="star3"
                  name="rating"
                  value="3"
                />
                <label htmlFor="star3"></label>
                <input
                  onChange={handleChangeStar}
                  type="radio"
                  id="star2"
                  name="rating"
                  value="2"
                />
                <label htmlFor="star2"></label>
                <input
                  onChange={handleChangeStar}
                  type="radio"
                  id="star1"
                  name="rating"
                  value="1"
                />
                <label htmlFor="star1"></label>
              </div>
            </div>
            <div className="col-9">
              <input
                className="new-comment"
                type="text"
                id="myInput"
                name="comment"
                onChange={handleChange}
                placeholder="thêm đánh giá..."
              />
            </div>
          </div>
          <button type="submit" id="myButton"></button>
        </form>

        {reviews.map((review) => (
          <div className="comment row">
            <div className="col-3">
              <h6 className="">{review.user}</h6>
              <div className="rating">
                {full}
                {(review.rate >= 2 && full) || none}
                {(review.rate >= 3 && full) || none}
                {(review.rate >= 4 && full) || none}
                {(review.rate >= 5 && full) || none}
              </div>
              <p className="">{review.date}</p>
            </div>
            <div className="col-6">
              <p className="odd-comment">{review.comment}</p>
            </div>
            <div className="col-3">
              <p className="">
                {review.rate === 1 && "rất tệ"}
                {review.rate === 2 && "tệ"}
                {review.rate === 3 && "bình thường"}
                {review.rate === 4 && "hay"}
                {review.rate === 5 && "rất hay"}
              </p>
            </div>
          </div>
        ))}
      </div>

      <link
        rel="stylesheet"
        href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
      />
      <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
    </div>
  );
}
