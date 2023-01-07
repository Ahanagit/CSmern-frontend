import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    password: "",
  });

  let name, value;

  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  const PostData = async (e) => {
    e.preventDefault();

    const { name, password } = user;

    const res = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        password,
      }),
    });
    const data = await res.json();

    if (res.status === 400 || !data) {
      window.alert("Invalid registration");
      console.log("Invalid registration");
    } else {
      window.alert("Registration successful");
      console.log("Registration successful");

      navigate("/login");
    }
  };

  return (
    <section class="Form my-4 mx-5">
      <div class="container">
        <div class="row no-gutters">
          <div class="col-lg-5">
            <img src="./pic.jpg" class="img-fluid" alt="" />
          </div>
          <div class="col-lg-7 px-5 pt-5">
            <h1 class="font-weight-bold py-3">CSTech</h1>
            <h4>Sign Up</h4>
            <form method="POST">
              <div class="form-row">
                <div class="col-lg-7">
                  <input
                    type="text"
                    placeholder="Admin Name"
                    className="form-control my-3 p-4"
                    name="name"
                    value={user.name}
                    onChange={handleInputs}
                  />
                </div>
              </div>
              <div class="form-row">
                <div class="col-lg-7">
                  <input
                    type="password"
                    placeholder="******"
                    className="form-control"
                    name="password"
                    value={user.password}
                    onChange={handleInputs}
                  />
                </div>
              </div>
              <div class="form-row">
                <div class="col-lg-7">
                  <button
                    type="submit"
                    class="btn1 mt-3 mb-5"
                    onClick={PostData}
                  >
                    Register
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
