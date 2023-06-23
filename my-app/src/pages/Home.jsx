import React from "react";
import { useState, useEffect } from "react";
import "./page.scss";
import Category from "./Category";
import BookList from "./BookList";
import Header from "./Header";
import Footer from "./Footer";

export default function Home() {
  const [category, setCategory] = useState("");
  const [searchText, setSearchText] = useState("");

  const onChange = (event) => {
    // console.log(event);
    if (event.target.type === "text") {
      setSearchText(event.target.value);
    } else {
      setCategory(event.target.value);
    }
  };

  return (
    <div className="my-app">
      <div className="container">
        <div className="row">
          <Header searchText={searchText} onChangeSearchText={onChange} />
        </div>
        <div className="row">
          <div className="col-2">
            <Category onChangeCategory={onChange} />
          </div>
          <div div className="col-10">
            <BookList category={category} searchText={searchText} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
