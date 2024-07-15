import React from "react";
import "./Styles/Footer.css";

const Footer = () => {
  return (
    <footer>
      <div className="footer-content hello footer-bottom">
        <div className="container p-4">
          <div className="row display-flex justify-content-center">
            <div className="col-lg-12">
              <h5 className="text-uppercase" style={{ textAlign: "center" }}>
                <b>Contact Us</b>
              </h5>
              <br />
              <div className="row">
                <div
                  className="col-md-4"
                  style={{ borderRight: "1px solid #000" }}
                >
                  <p style={{ textAlign: "center" }}>
                    <strong>Email:</strong> greasenoils@gmail.com
                  </p>
                </div>
                <div
                  className="col-md-4"
                  style={{ borderRight: "1px solid #000" }}
                >
                  <p style={{ textAlign: "center" }}>
                    <strong>Phone:</strong> +91 78433 90786
                  </p>
                </div>
                <div className="col-md-4">
                  <p style={{ textAlign: "center" }}>
                    <strong>Address:</strong> 360, Route avenue, Erode,
                    Tamilnadu
                    <br />
                    PinCode - 648 899
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        © 2024 Grease N' Oils. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
