import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Styles/Profile.css";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newLocation, setNewLocation] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    //to fetch the logged in user details
    const fetchUserProfile = async () => {
      try {
        const res = await axios.post(
          "http://localhost:3002/api/v1/auth/getuser",
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setUser(res.data.user);
        setNewLocation(res.data.user.location);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

//to update the description of the station in the admin side
  const handleSave = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.put(
        "http://localhost:3002/api/v1/auth/updatelocation",
        { location: newLocation },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (res.data.success) {
        setUser({ ...user, location: newLocation });
        setIsEditing(false);
      } else {
        console.error("Error updating location:", res.data.message);
      }
    } catch (error) {
      console.error("Error updating location:", error);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile">
      <div className="content">
        <h2 className="display-7">PROFILE</h2>
        <p>
          <b>Name:</b> {user.name}
        </p>

        <p>
          <b>Email:</b> {user.email}
        </p>

        <p>
          <b>Phone Number:</b> {user.phoneno}
        </p>

        {user.role === "admin" && (
          <>
            <p>
              <b>Station Name:</b> {user.stna}
            </p>
            <p>
              <b>About:</b>{" "}
              {isEditing ? (
                <input
                  type="text"
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                />
              ) : (
                user.location
              )}
            </p>

            <div className="button-container">
              {isEditing ? (
                <button
                  onClick={handleSave}
                  className="form-control"
                  style={{ width: "100px" }}
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={handleEditToggle}
                  className="form-control"
                  style={{ width: "100px" }}
                >
                  Edit about
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
