import React from "react";
import "./home.css";
import { useEffect, useState } from "react";
const Home = ({ setLogin }) => {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    fetch(
      "https://api.nasa.gov/planetary/apod?api_key=MUoz68b5JpT5D0Kn1vzgjmlg35AhhDoIpLaGKf7b"
    )
      .then((response) => response.json())
      .then((data) => setImageUrl(data.url))
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
            <div className="logoutBtn"  onClick={() => setLogin({})}>
          Logout
        </div>
      <div className="home">

        <img src={imageUrl} alt="" className="img" />
      </div>
     
    </>
  );
};

export default Home;
