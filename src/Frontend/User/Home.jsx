import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Styles/Home.css";

import homeimg from "../assests/homeimg.png";
import stepimg from "../assests/stepsimage.png";
import { useNavigate } from "react-router-dom";
import { getUserRole } from "../Helper";

const Home = () => {
  const [stations, setStations] = useState([]);
  const navigate = useNavigate();
  const role = getUserRole();

  useEffect(() => {
    if (role === "admin") {
      navigate("/category");
    }
    //to fetch the station details
    axios
      .post("http://localhost:3002/api/v1/auth/getst")
      .then((res) => {
        console.log("Station response:", res.data);
        if (Array.isArray(res.data)) {
          const adminUsers = res.data.filter((user) => user.role === "admin");
          console.log("Admin users:", adminUsers);
          setStations(adminUsers);
        } else {
          console.error("Expected an array but got:", res.data);
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          alert("Your session has expired. Please log in again.");
          localStorage.removeItem("token");
          navigate("/login");
        } else {
          console.error("Error fetching station names:", error);
        }
      });
  }, [role, navigate]);

  //navigate to the service page
  const handlenavi = (station) => {
    localStorage.setItem("stacho", station.stna);
    navigate("/service", { state: { station: station.stna } });
  };

  return (
    <>
      <section
        style={{
          backgroundColor: "#e5e7eb",
          padding: "400px",
          backgroundImage: `url(${homeimg})`,
          backgroundSize: "cover",

          backgroundPosition: "center",
          width: "100%",
        }}
        className="d-flex align-items-center justify-content-center"
      >
        <div className="row">
          <div className="title">
            <h2
              style={{
                fontFamily: "arial,sans-serif,cursive",
                textAlign: "center",
              }}
            ></h2>
          </div>
        </div>
      </section>

      <br />
      <br />

      <div className="container mt-4">
        <h2 style={{ textAlign: "center", paddingBottom: "20px" }}>
          Stations Available
        </h2>
        <hr />
        <br />
        <div className="row">
          {stations.length > 0 ? (
            stations.map((station, index) => (
              <div className="col-md-3 mb-4" key={index}>
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">{station.stna}</h5>
                    <p className="card-text">{station.location}</p>
                    <button
                      type="button"
                      className="form-control view-services-btn"
                      onClick={() => handlenavi(station)}
                    >
                      View Services
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p style={{ textAlign: "center" }}>No stations available.</p>
          )}
        </div>
      </div>

      <br />
      <br />
      <div className="bookingSteps">
        <div className="row">
          <div className="stephead">
            <h2>Quick 3 step booking</h2>
          </div>
          <div className="col-md-8">
            <div className="steps">
              <ol>
                <li>Choose the required service</li>
                <li>Enter your contact details</li>
                <li>Leave the rest to BikeCare service experts</li>
              </ol>
            </div>
          </div>
          <div className="col-md-3">
            <div className="stepimg">
              <img
                src={stepimg}
                alt="Steps to follow"
                style={{ height: "300px", width: "300px" }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
