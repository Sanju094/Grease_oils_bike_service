
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './Styles/Register.css' 


function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneno, setPhoneNo] = useState("");
  const [role, setRole] = useState("user");
  const [location, setLocation] = useState("");
  const [stna, setStname] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/;
    const phoneNoRegex = /^[6-9]{1}[0-9]{9}$/;

    if (!name) {
      return toast.error("Enter your name");
    } else if (!email) {
      return toast.error("Enter your email");
    } else if (!password) {
      return toast.error("Enter your password");
    } else if (!passwordRegex.test(password)) {
      return toast.error("Password must be at least 10 characters long and include alphabets, digits, and special characters");
    } else if (!phoneno || !phoneNoRegex.test(phoneno)) {
      return toast.error("Enter a valid phone number");
    }

    setLoading(true);
    try {
      const result = await axios.post(
        "http://localhost:3002/api/v1/auth/register",
        {
          name,
          email,
          password,
          phoneno,
          role,
          stna,
          location: role === "admin" ? location : undefined,
        }
      );

      if (result.data.message === "Already Registered please Login") {
        toast.error("Already registered");
        setTimeout(() => navigate("/login"), 3000);
      } else {
        toast.success("Registered successfully");
        setTimeout(() => navigate("/login"), 3000);
      }
    } catch (e) {
      console.log(e);
      toast.error("An error occurred during registration. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
    if (e.target.value !== "admin") {
      setLocation("");
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <div className="register-card-body">
          <h5 className="register-card-title">REGISTER</h5>
          <form onSubmit={handleSubmit}>
            <div className="register-form-group">
              <label>Name</label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="register-form-group">
              <label>Phone No:</label>
              <input
                type="tel"
                className="form-control"
                value={phoneno}
                onChange={(e) => setPhoneNo(e.target.value)}
                required
              />
            </div>
            <div className="register-form-group">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="register-form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="register-form-group">
              <label>Role</label>
              <select
                className="form-control"
                value={role}
                onChange={handleRoleChange}
              >
                <option value="user">User</option>
                <option value="admin">Owner</option>
              </select>
            </div>
            {role === "admin" && (
              <>
                <div className="register-form-group">
                  <label>Station Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={stna}
                    onChange={(e) => setStname(e.target.value)}
                  />
                </div>
                <div className="register-form-group">
                  <label>Description</label>
                  <textarea
                    type="text"
                    className="form-control"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  ></textarea>
                </div>
              </>
            )}
            <div className="register-form-group">
              <button className="btn btn-primary register-button" type="submit" disabled={loading}>
                {loading ? "Registering..." : "Register"}
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Register;
