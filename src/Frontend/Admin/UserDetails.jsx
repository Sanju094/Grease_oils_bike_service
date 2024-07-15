import axios from "axios";
import { MDBTable, MDBTableBody, MDBTableHead } from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserDetails = () => {
  const [deta, setDeta] = useState([]);
  const token = localStorage.getItem("token");
  const role = localStorage.getItem('role');
  const navigate = useNavigate()

  useEffect(() => {
    const fetchuserdetails = async () => {
      if (!token || role !== 'admin') {
        toast.error("Not authorized");
        navigate("/")
        return
      }
      try {
        const res = await axios.get(
          "http://localhost:3002/api/v1/admin/userdetails",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log(res.data);
        setDeta(res.data.det || []);
      } catch (e) {
        console.log(e);
      }
    };
    fetchuserdetails();
  }, [token]);

  return (
    <div className="container mt-5">
      <h1 className="text-center">User Details</h1>
      <br></br>
      <MDBTable striped bordered>
        <MDBTableHead dark>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>phoneno</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {deta.map((user, index) => (
            <tr key={index}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phoneno}</td>
            </tr>
          ))}
        </MDBTableBody>
      </MDBTable>
      <ToastContainer/>
    </div>
  );
};

export default UserDetails;
