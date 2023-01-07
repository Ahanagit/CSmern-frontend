import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import validator from "validator";

const Employee = () => {
  const navigate = useNavigate();

  const [userData, setData] = useState("");
  const callEmployeePage = async () => {
    try {
      const res = await fetch("/employee", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        crederntials: "include",
      });

      const data = await res.json();
      console.log(data);

      setData(data);

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
      navigate("/login");
    }
  };

  //useeffect takes two argument,function and dependency,it allows to perform side effects in components
  useEffect(() => {
    callEmployeePage();
  });

  const [emailError, setEmailError] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    phone: "",
    designation: "",
    gender: "",
    course: "",
  });

  let name, value;

  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value || (e.target.checked && e.target.id);
    setEmployee({ ...employee, [name]: value });
    if (name === "email") {
      if (validator.isEmail(value)) {
        setEmailError("Valid Email :)");
      } else {
        setEmailError("Enter valid Email!");
      }
    }

    if (name === "phone") {
      if (validator.isMobilePhone(value)) {
        setMobileError("valid phone number");
      } else {
        setMobileError("Not a valid phone number");
      }
    }
  };

  const PostData = async (e) => {
    e.preventDefault();

    const { name, email, phone, designation, gender, course, image } = employee;

    const res = await fetch("/employee", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        designation,
        gender,
        course,
        image,
      }),
    });
    const data = await res.json();

    if (res.status === 400 || !data) {
      window.alert("Invalid insertion");
      console.log("Invalid insertion");
    } else {
      window.alert("Insertion successful");
      console.log("Insertion successful");
      navigate("/myemployee");
    }
  };
  return (
    <>
      <div className="employeePage">
        <h1 className="formHeading">
          Hello <span>{userData.name}</span> create the employee list
        </h1>
        <form className="employeeForm" method="POST">
          <div>
            <label>Name</label>
            <input
              type="text"
              placeholder="Enter name"
              name="name"
              value={employee.name}
              onChange={handleInputs}
              required
            />
          </div>

          <div>
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter email"
              name="email"
              value={employee.email}
              onChange={handleInputs}
              required
            />
            <p>{emailError}</p>
          </div>

          <div>
            <label>Mobile No.</label>
            <input
              type="tel"
              placeholder="Enter number"
              name="phone"
              value={employee.phone}
              onChange={handleInputs}
            />
            <p>{mobileError}</p>
          </div>

          <div>
            <label>Designation</label>
            <select
              name="designation"
              value={employee.designation}
              onChange={handleInputs}
            >
              <option id="HR">HR</option>
              <option id="Manager">Manager</option>
              <option id="Sales">Sales</option>
            </select>
          </div>

          <div>
            <label>Gender</label>
            <input
              type="radio"
              name="gender"
              id="Female"
              value={employee.gender}
              onChange={handleInputs}
            />
            Female
            <input
              type="radio"
              name="gender"
              id="Male"
              value={employee.gender}
              onChange={handleInputs}
            />
            Male
          </div>

          <div>
            <label>Course</label>
            <input
              type="checkbox"
              name="course"
              id="MCA"
              value={employee.course}
              onChange={handleInputs}
            />
            MCA
            <input
              type="checkbox"
              name="course"
              id="BCA"
              value={employee.course}
              onChange={handleInputs}
            />
            BCA
            <input
              type="checkbox"
              name="course"
              id="BSC"
              value={employee.course}
              onChange={handleInputs}
            />
            BSC
          </div>
          <div>
            <label htmlFor="image">Image</label>
            <input
              type="file"
              name="image"
              accept=".png, .jpg"
              value={employee.image}
              onChange={handleInputs}
            />
          </div>

          <button className="btn" type="submit" onClick={PostData}>
            Submit
          </button>
        </form>
        <footer>2022 @ahana</footer>
      </div>
    </>
  );
};

export default Employee;
