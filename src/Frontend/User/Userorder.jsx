import React, { useEffect, useState } from "react";
import axios from "axios";
// import {getToken} from "../Helper";
import { ToastContainer, toast } from "react-toastify";
import {
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBContainer,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit";



const Userorder = () => {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("token");
 
  useEffect(() => {
    
    const fetchData = async () => {
      if (!token) {
        toast.error("No token found");
        return;
      }
      try {
        const res = await axios.get(
          "http://localhost:3002/api/v1/user/userorder",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setOrders(res.data.orders || []);
      } catch (e) {
        console.log(e);
        toast.error("Error fetching orders");
      }
    };
    fetchData();
  }, [token]);

  return (
    <MDBContainer>
      <MDBRow>
        <MDBCol size="12">
          <h2 style={{ textAlign: "center" }}>CHECK YOUR BOOKINGS</h2>
          <br></br>
          {orders.length === 0 ? (
            <p style={{ textAlign: "center" }}>No Booking Found</p>
          ) : (
            <MDBTable align="middle" striped bordered>
              <MDBTableHead dark>
                <tr>
                  <td scope="col">Name</td>
                  <td scope="col">Vehicle Number</td>
                  <td scopt="col">Service Centre</td>
                  <td scope="col">Service</td>
                  <td scope="col">Check-in Date</td>
                  <td scope="col">Status</td>
                </tr>
              </MDBTableHead>
              <MDBTableBody>
                {orders.map((order, index) => (
                  <tr key={index}>
                    <td>{order.name}</td>
                    <td>{order.vnum}</td>
                    <td>{order.stna}</td>
                    <td>{order.serv}</td>
                    <td>{new Date(order.date).toLocaleDateString()}</td>
                    <td>{order.status}</td>
                    
                  </tr>
                ))}
              </MDBTableBody>
            </MDBTable>
          )}
        </MDBCol>
      </MDBRow>
      <ToastContainer />
    </MDBContainer>
  );
};

export default Userorder;
