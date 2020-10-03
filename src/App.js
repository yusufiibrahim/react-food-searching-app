import React, { useState } from "react";
import Axios from "axios";
import { v4 as uuidv4 } from "uuid";
import "./App.css";
// import Components
import Recipe from "./components/Recipe";
import Alert from "./components/Alert";

const App = () => {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [alert, setAlert] = useState("");
  const APP_ID = "b66792e2";
  const APP_KEY = "efd52497a036bd231a20ee8fcbbb6df3";
  const url = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`;

  const getData = async () => {
    //mengeksekusi query yang tidak empty
    if (query !== "") {
      // fetch data from api
      const result = await Axios.get(url);
      if (!result.data.more) {
        return setAlert("Maaf ya makanan yang kamu cari tidak ada");
      }
      // update value of recipes dengan mengambil data api di property hits
      // disimpan didalam variable result dan diikuti dengan property data dan hits
      setRecipes(result.data.hits);
      console.log(result);
      setAlert("");
      setQuery("");
    } else {
      // mengeksekusi query yang empty
      setAlert("Mohon isi kotak pencarian!");
    }
  };

  const onChange = (e) => {
    setQuery(e.target.value);
  };

  const onSubmit = (e) => {
    // preventDefault digunakan untuk mereload ketika function ini dijalankan
    e.preventDefault();
    // lalu setelah itu menjalankan function getData
    getData();
  };
  return (
    <div className="App">
      <h1>Food Searching App</h1>
      <form className="search-form" onSubmit={onSubmit}>
        {alert !== "" && <Alert alert={alert} />}
        <input
          type="text"
          placeholder="Search Food in Here"
          autoComplete="off"
          onChange={onChange}
          value={query}
        />
        <input type="submit" value="search" />
      </form>
      <div className="recipes">
        {/* untuk conditional statement */}
        {/* jadi nanti dicek jika recipes itu empty atau engga */}
        {/* jika ga empty kita harus menyampaikan data yang kita request*/}
        {recipes !== [] &&
          recipes.map((recipe) => <Recipe key={uuidv4()} recipe={recipe} />)}
      </div>
    </div>
  );
};

export default App;
