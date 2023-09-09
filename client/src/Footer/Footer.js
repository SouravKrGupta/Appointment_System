import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-dark text-white pt-5">
      <div className="pb-3">
        <div style={{ paddingLeft: "150px" }} className="row w-100 mx-auto">
          <div className="col-md-3 col-lg-3 col-xl-3 text-start mx-auto mt-3">
            <h5 className="text-uppercase mb-4 text-warning">Services</h5>
            <div className="d-flex row gap-3">
              <Link className="text-decoration-none text-info">Branding</Link>
              <Link className="text-decoration-none text-info">Design</Link>
              <Link className="text-decoration-none text-info">
                Advertisement
              </Link>
            </div>
          </div>
          <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 text-warning">Company</h5>
            <div className="d-flex row gap-3">
              <Link className="text-decoration-none text-info">About Us</Link>
              <Link className="text-decoration-none text-info">Contact</Link>
              <Link className="text-decoration-none text-info">Press Kit</Link>
            </div>
          </div>
          <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 text-warning">Legal</h5>
            <div className="d-flex row gap-3">
              <Link className="text-decoration-none text-info">
                Terms of use
              </Link>
              <Link className="text-decoration-none text-info">
                Privacy policy
              </Link>
              <Link className="text-decoration-none text-info">
                Cookie policy
              </Link>
            </div>
          </div>
          <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 text-warning">Contact</h5>
            <div className="text-info">
              <p>
                <i className="fas fa-home"></i> Kailash Colony, New Delhi-110048
              </p>
              <p>
                <i className="fas fa-envelope"></i> demo@gmail.com
              </p>
              <p>
                <i className="fas fa-phone"></i> 01900000000
              </p>
            </div>
          </div>
        </div>
        <div></div>
      </div>
      <hr className="w-100" />

      <div className="d-flex justify-content-between align-items-center p-4 px-5">
        <div>
          <p className="">
            Storeweb IT services and software company | Copyright @ 2023 All
            Rights Reserve
          </p>
        </div>
        <div>
          <ul
            style={{ fontSize: "20px" }}
            className="list-unstyled list-inline gap-1 d-flex"
          >
            <li className="list-inline-item">
              <a href="#" className="btn-sm text-white">
                <i className="fab fa-facebook"></i>
              </a>
            </li>
            <li className="list-inline-item">
              <a href="#" className="btn-sm text-white">
                <i className="fab fa-twitter"></i>
              </a>
            </li>
            <li className="list-inline-item">
              <a href="#" className="btn-sm text-white">
                <i className="fab fa-linkedin"></i>
              </a>
            </li>
            <li className="list-inline-item">
              <a href="#" className="btn-sm text-white">
                <i className="fab fa-youtube"></i>
              </a>
            </li>
            <li className="list-inline-item">
              <a href="#" className="btn-sm text-white">
                <i className="fab fa-google"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
