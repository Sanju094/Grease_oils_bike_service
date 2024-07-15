import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Styles/ServiceDescription.css";
const SeriveDescrip = () => {
  const [services, setServices] = useState([]);
  const stacho = localStorage.getItem("stacho");

  useEffect(() => {
    axios
      .get("http://localhost:8002/category")
      .then((response) => {
        const filteredServices = response.data.filter(
          (item) => item.stationName === stacho
        );
        setServices(filteredServices);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [stacho]);

  return (
    <>
      <div className="service-title">
        <h3>Services at {stacho}</h3>
        <hr></hr>
      </div>
      
      <div className="services-desc">
        {services.map((service) => (
          <div className="card">
            <div key={service.id} className="service-item">
              <div className="card-title">
                <h5><b>Place: </b>{service.location}</h5>
              </div>
              <div className="card-body">
                <h4>{service.cname}</h4>
                <p>{service.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default SeriveDescrip;
