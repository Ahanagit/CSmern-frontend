import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";

const AllEmployee = () => {
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

  useEffect(() => {
    callEmployeePage();
  });

  const [savedEmployees, setSavedEmployees] = useState(null);

  const fetchEmployee = async () => {
    try {
      const res = await fetch("/myemployee", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const result = await res.json();
      if (result.status === 200) {
        setSavedEmployees(result.employees);
      } else {
        console.log(result);
        navigate("/employee");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchEmployee();
  }, []);
  return (
    <div className="employeeClass">
      <h2>
        <span className="adminName">{userData.name}</span> you can see the
        employee details
      </h2>
      <div className="table-responsive">
        <table className="table table-striped table-hover table-bordered">
          <thead>
            <tr className="table-dark">
              <th>name</th>
              <th>email</th>
              <th>number</th>
              <th>designation</th>
              <th>gender</th>
              <th>course</th>
              <th>image</th>
            </tr>
          </thead>
          <tbody>
            {savedEmployees &&
              savedEmployees.map((item) => (
                <tr key={item._id}>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
                  <td>{item.designation}</td>
                  <td>{item.gender}</td>
                  <td>{item.course}</td>
                  <td>{item.image}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllEmployee;
