import React from "react";
import Layout from "../../components/Layout";
import img from "../../assets/images/images.png";
import img1 from "../../assets/images/images1.png";
import img2 from "../../assets/images/images2.png";
import img3 from "../../assets/images/194915.png";
import './UserPage.css';
import { Link } from "react-router-dom";

const UserPage = () => {
  return (
    <Layout>
      <section>
        <div>
          <div className="d-flex flex-wrap justify-content-between align-items-center bg-dark bg-gradient pt-3 px-4">
            <div className="d-flex flex-wrap justify-content-center align-items-center gap-4 fs-6">
              <div className="d-flex align-items-center gap-2 text-white">
                <p>
                  <i className="fa-solid fa-clock"></i>
                </p>
                <p>Mon-Fri 9am-5pm</p>
              </div>
              <div className="d-flex align-items-center gap-2 text-white">
                <p>
                  <i className="fa-solid fa-phone "></i>
                </p>
                <p>Call Us: +009100000000</p>
              </div>
              <div className="d-flex align-items-center gap-2 text-white">
                <p>
                  <i className="fa-solid fa-book"></i>
                </p>
                <p>Email: demo@gmail.com</p>
              </div>
            </div>
            <div className="d-flex align-items-center">
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
                </ul>
              </div>
            </div>
          </div>

          <div
            style={{ padding: "80px", backgroundColor: "#d6fbfd" }}
            className="d-flex flex-wrap justify-content-center align-items-center gap-4 px-3"
          >
            <div style={{ width: "350px" }} className="d-flex gap-3 my-3">
              <img
                style={{ width: "", height: "90px" }}
                className="rounded-circle p-2 bg-white"
                src={img}
                alt=""
              />
              <div>
                <h4>Special Service</h4>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
              </div>
            </div>

            <div style={{ width: "350px" }} className="d-flex gap-3 my-3">
              <img
                style={{ width: "", height: "90px" }}
                className="rounded-circle p-2 bg-white"
                src={img1}
                alt=""
              />
              <div>
                <h4>24/7 Advanced Care</h4>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
              </div>
            </div>

            <div style={{ width: "350px" }} className="d-flex gap-3 my-3">
              <img
                style={{ width: "", height: "90px" }}
                className="rounded-circle bg-white p-2"
                src={img2}
                alt=""
              />
              <div>
                <h4>Qualified Doctors</h4>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
              </div>
            </div>
          </div>

          <div
            style={{ backgroundColor: "white", color: "#237aaf" }}
            className="service-part text-center fw-semibold pt-2 pb-5"
          >
            <div style={{ color: "green" }} className="pt-5 pb-4">
              <h4 className="">Our Healthcare Services</h4>
              <h6>We are committed to you provide best treatment</h6>
            </div>
            <div className="row justify-content-center w-100 mx-auto px-4">
              <div className="col-lg-4 col-sm-6">
                <div className="single-services">
                  <span>
                    <i className="fas fa-user-doctor"></i>
                  </span>

                  <h3>Cancer Service</h3>
                </div>
              </div>
              <div className="col-lg-4 col-sm-6">
                <div className="single-services">
                  <span>
                    <i className="fas fa-diagnoses"></i>
                  </span>
                  <h3>Liver Transport</h3>
                </div>
              </div>
              <div className="col-lg-4 col-sm-6">
                <div className="single-services">
                  <span>
                    <i className="fas fa-wheelchair"></i>
                  </span>
                  <h3>Kidney Transport</h3>
                </div>
              </div>
              <div className="col-lg-4 col-sm-6">
                <div className="single-services">
                  <span>
                    <i className="fa fa-heart-pulse"></i>
                  </span>
                  <h3>Cardiac Arrhythmia</h3>
                </div>
              </div>
              <div className="col-lg-4 col-sm-6">
                <div className="single-services">
                  <span>
                    <i className="fas fa-head-side-virus"></i>
                  </span>
                  <h3>Neurology Care</h3>
                </div>
              </div>
              <div className="col-lg-4 col-sm-6">
                <div className="single-services">
                  <span>
                    <i className="fas fa-child-reaching"></i>
                  </span>
                  <h3>Orthopedic Care</h3>
                </div>
              </div>
            </div>
          </div>

          <div className="appoint-poster row justify-content-center align-items-center w-100 mx-auto p-5">
            <div className="col-lg-6 d-flex justify-content-center py-5">
              <img className="w-50" src={img3} alt="" />
            </div>
            <div className="col-lg-6 py-5">
              <h4>Make an appointment Today</h4>
              <p className="">
                Ask for an appointment of the doctor quickly with almost a
                single click. We take care of the rest. Find your doctor easily
                with a minimum of effort. We've kept everything organised for
                you. Visit the doctor, take the service based on your
                appointment. Get back to good health and happiness.
              </p>
              <Link to='/user-doc'>
                <button className="btn btn-success bg-gradient fw-semibold rounded-1 px-4 fs-5">
                  Appointment
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default UserPage;
