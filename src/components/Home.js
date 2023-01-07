import React, { useEffect, useState } from "react";

const Home = () => {
  const [userName, setUserName] = useState("");

  const [show, setShow] = useState(false);

  const userHomePage = async () => {
    try {
      const res = await fetch("/getData", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      console.log(data);
      setUserName(data.name);
      setShow(true);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    userHomePage();
  });
  return (
    <>
      <div className="home">
        <div className="home-div">
          <h2 className="pt-5">
            Welcome <span>{userName}</span>
          </h2>
          <p>
            {show ? "Admin you logged in" : "waiting for you to be logged in"}
          </p>
        </div>
      </div>
    </>
  );
};

export default Home;
