import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { getToken } from "./Helper";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SeriveDescrip from "./User/SeriveDescrip";

const Service = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [serv, setService] = useState("");
  const [phoneno, setPhoneno] = useState("");
  const [categories, setCategories] = useState([]);
  const [date, setDate] = useState("");
  const [vnum, setVnum] = useState("");
  const [stna, setStna] = useState(null);
  const [currentstep, setCurrentStep] = useState(1);
  const [responseData, setResponseData] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { service } = location.state || {};
  const stacho = localStorage.getItem("stacho");

  useEffect(() => {
    const token = getToken();
    console.log({ service });
    if (!token) {
      navigate("/login");
    }
    axios
      .get("http://localhost:8002/category")
      .then((response) => {
        setResponseData(response.data);
        const filteredCategories = response.data.filter(
          (item) => item.stationName === stacho
        );
        const categoryNames = filteredCategories.map((item) => item.cname);
        setCategories(categoryNames);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name.length < 2) {
      return toast.error("Enter Valid Username");
    } else if (email === "") {
      return toast.error("Enter your Email");
    } else if (!/^[6-9]\d{9}$/.test(phoneno)) {
      return toast.error(
        "Enter a valid Phone Number. It should start with 6, 7, 8, or 9 and have exactly 10 digits."
      );
    } else if (vnum === "" || vnum.length < 10) {
      return toast.error("Enter a vehicle Number");
    }

    const token = getToken();
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    try {
      const result = await axios.post(
        "http://localhost:3002/api/v1/user/service",
        {
          name,
          email,
          phoneno,
          serv,
          date,
          vnum,
          service: stacho,
        },
        { headers }
      );

      console.log(result);

      if (result.data.message === "Service Booked Successfully") {
        toast.success("Service Booked Successfully");
      } else {
        toast.error("Enter the fields correctly");
      }
    } catch (e) {
      console.log(e);
      toast.error(
        "An error occurred during submitting the form. Please try again."
      );
    }
    setEmail("");
    setName("");
    setPhoneno("");
    setService("");
    setDate("");
    setVnum("");
    setCurrentStep(1);
  };

  const handlenextstep = () => {
    setCurrentStep((prevstep) => prevstep + 1);
  };

  const handlePreviousStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  return (
    <>
      <div>
        <SeriveDescrip />
      </div>
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="card" style={{ width: "400px", height: "400px" }}>
          <div className="card-body">
            <h5 className="card-title text-center">SERVICES</h5>
            <form onSubmit={handleSubmit}>
              {currentstep === 1 && (
                <>
                  <div className="form-group">
                    <label>Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      className="form-control"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone No</label>
                    <input
                      type="tel"
                      className="form-control"
                      value={phoneno}
                      onChange={(e) => setPhoneno(e.target.value)}
                    />
                  </div>
                  <div className="button">
                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={handlenextstep}
                    >
                      Next
                    </button>
                  </div>
                </>
              )}
              {currentstep === 2 && (
                <>
                  <div className="form-group">
                    <label>Vehicle Number</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="XY 00 X 0000"
                      value={vnum}
                      onChange={(e) => setVnum(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Service</label>
                    <select
                      value={serv}
                      className="form-control"
                      onChange={(e) => setService(e.target.value)}
                    >
                      <option value="">--select--</option>
                      {categories.map((category, index) => (
                        <option key={index} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Check in date</label>
                    <input
                      type="date"
                      className="form-control"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </div>

                  <div className="button">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={handlePreviousStep}
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="form-control"
                      style={{ width: "100px", alignItems: "center" }}
                    >
                      Submit
                    </button>
                  </div>
                </>
              )}
            </form>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default Service;
