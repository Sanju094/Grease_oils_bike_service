import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../Styles/Category.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Category = () => {
  const [cname, setCname] = useState("");
  const [list, setList] = useState([]);
  const [loc, setLoc] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const uid = localStorage.getItem("uid");
  const stna = localStorage.getItem("stna");
  

  useEffect(() => {
    if (role !== "admin") {
      toast.error("Only admins are allowed");
      navigate("/");
      return;
    }
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get("http://localhost:8002/category")
      .then((response) => {
        const filteredCategories = response.data.filter(
          (item) => item.adminUid === uid
        );
        setList(filteredCategories);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  //to add the new category
  const handleAddCategory = () => {
    const categoryExists = list.some(
      (item) => item.cname.toLowerCase() === cname.trim().toLowerCase()
    );
    if (categoryExists) {
      toast.error("Category already exists");
      return;
    }
    if (cname.trim() !== "" && description.trim() !== "" && loc.trim() !== "") {
      const newCategory = {
        id: (list.length + 1).toString(),
        cname: cname.trim(),
        description: description.trim(),
        location: loc.trim(),
        adminUid: uid,
        stationName: stna,
      };

      setList([...list, newCategory]);

      setCname("");
      setDescription("");
      setLoc("");

      axios
        .post("http://localhost:8002/category", newCategory)
        .then((response) => {
          console.log("Category added successfully:", response.data);
        })
        .catch((error) => {
          console.error("Error adding category:", error);
        });
    } else {
      toast.error("Please fill out all fields");
    }
  };

  //to delete the category
  const handledeleteCategory = () => {
    const catdel = list.find((item) => item.cname === cname.trim());
    if (catdel) {
      axios
        .delete(`http://localhost:8002/category/${catdel.id}`)
        .then(() => {
          setList(list.filter((item) => item.id !== catdel.id));
          toast.success("Category Deleted Successfully");
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      toast.error("Enter the correct category name to delete");
    }
  };

  //to edit the category  details
  const handleeditcategory = () => {
    const catedit = list.find((item) => item.cname === cname);
    if (catedit) {
      const newname = prompt("Enter the updated category name");
      const newdescription = prompt("Enter the updated category description");
      const newlocation = prompt("Enter the updated location");

      if (newname && newdescription && newlocation) {
        const editcat = {
          ...catedit,
          cname: newname,
          description: newdescription,
          location: newlocation,
          adminUid: uid,
          stationName: stna,
        };
        setList(list.map((item) => (item.id === catedit.id ? editcat : item)));
        axios
          .put(`http://localhost:8002/category/${catedit.id}`, editcat)
          .then((res) => {
            toast.success("Category updated successfully: ", res.data);
          })
          .catch((e) => console.log(e));
      } else {
        toast.error("Please enter the updated category name, description, and location");
      }
    } else {
      toast.error("Enter the correct category to edit");
    }
  };

  return (
    <>
      <div className="container mt-5" style={{backgroundColor: '#e5e7eb'}}>
        <div className="row">
          <div className="col-md-8">
            <div className="addcat">
              <div className="card" style={{ height: "450px" }}>
                <div className="card-body">
                  <h5 className="card-title text-center">ADD CATEGORY</h5>
                  <form>
                    <div className="form-group">
                      <label>Location</label>
                      <input
                        type="text"
                        className="form-control"
                        value={loc}
                        onChange={(e) => setLoc(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label>Category</label>
                      <input
                        type="text"
                        className="form-control"
                        value={cname}
                        onChange={(e) => setCname(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label>Description</label>
                      <textarea
                        type="text"
                        className="form-control"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </div>
                    <div className="button">
                      <p className="icon" onClick={handleAddCategory}>
                        <div>
                          <i className="fa-solid fa-plus"></i>
                        </div>
                        <div>add</div>
                      </p>
                      <p className="icon" onClick={handleeditcategory}>
                        <i className="fa-regular fa-pen-to-square"></i>
                        <div>edit</div>
                      </p>
                      <p className="icon" onClick={handledeleteCategory}>
                        <i className="fa-solid fa-trash-arrow-up"></i>
                        <div>delete</div>
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="col-3"  >
            <div className="displayCategories">
              <div className="list">
                <br />
                <br />
                <h3>ALL CATEGORIES</h3>
                <ul>
                  {list.map((item) => (
                    <li key={item.id}>{item.cname}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default Category;
