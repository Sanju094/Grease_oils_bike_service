import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "react-toastify/dist/ReactToastify.css";
import {
  MDBTable,
  MDBTableBody,
  MDBTableHead,
  MDBTableCell,
  MDBTableRow,
  MDBContainer,
  MDBBadge,
} from "mdb-react-ui-kit";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const stna = localStorage.getItem("stna");

  useEffect(() => {
    if (role !== "admin") {
      toast.error("Not authorized");
      navigate("/");
      return;
    }
    //fetch the orders from the backend
    const fetchOrders = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3002/api/v1/admin/orders",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const orders = res.data.orders;
        setOrders(orders);
        const filtered = orders.filter(order => order.stna === stna);
        setFilteredOrders(filtered);
      } catch (error) {
        console.log(error);
        toast.error("Error fetching orders. Ensure you are logged in as an admin.");
      }
    };

    fetchOrders();
  }, [role, token, navigate, stna]);

  if (!token) {
    toast.error("Not Authorized");
  }

  //update the status of the booking
  const handleStatusChange = async (ordermail, orderid, nstatus) => {
    try {
      const res = await axios.post(
        "http://localhost:3002/api/v1/admin/update-status",
        {
          ordermail,
          orderid,
          status: nstatus,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(res);

      if (res.data.success) {
        setOrders((prev) =>
          prev.map((order) =>
            order._id === orderid ? { ...order, status: nstatus } : order
          )
        );
        setFilteredOrders((prev) =>
          prev.map((order) =>
            order._id === orderid ? { ...order, status: nstatus } : order
          )
        );
        toast.success("Order status updated successfully");
      } else {
        toast.error("Failed to update the status of the order");
      }
    } catch (e) {
      console.log(e);
      toast.error("Error updating order status");
    }
  };

  return (
    <>
      <MDBContainer>
        <h1 className="text-center my-5">All Orders</h1>
        <MDBTable align="middle" striped bordered>
          <MDBTableHead dark>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone Number</th>
              <th scope="col">Vehicle Number</th>
              <th scope="col">Service</th>
              <th scope="col">Check-in Date</th>
              <th scope="col">Status</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {filteredOrders.map((order, index) => (
              <tr key={index}>
                <td>{order.name}</td>
                <td>{order.email}</td>
                <td>{order.phoneno}</td>
                <td>{order.vnum}</td>
                <td>{order.serv}</td>
                <td>{new Date(order.date).toLocaleDateString()}</td>
                <td>
                  <select
                    value={order.status}
                    onChange={(e) =>
                      handleStatusChange(order.email, order._id, e.target.value)
                    }
                    className="form-control"
                  >
                    <option value="received">Received</option>
                    <option value="ready">Ready for Delivery</option>
                    <option value="completed">Completed</option>
                  </select>
                </td>
              </tr>
            ))}
          </MDBTableBody>
        </MDBTable>
      </MDBContainer>
      <ToastContainer />
    </>
  );
};

export default Order;
