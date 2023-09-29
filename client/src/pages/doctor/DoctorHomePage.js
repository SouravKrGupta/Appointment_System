import React from "react";
import Layout from "../../components/Layout";
import { Row } from "antd";
import image from "../../Imges/heroimg.jpg";
import "../../styles/doctorHome.css";
const DoctorHomePage = () => {
  return (
    <Layout>
      <Row>
        <div className="hero-content">
          <h1>
            Your Health, <br />
            Our Responsibility
          </h1>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quibusdam
            tenetur doloremque molestias repellat minus asperiores in aperiam
            dolor, quaerat praesentium.
          </p>
        </div>
        <div className="hero-img">
          <img src={image} alt="hero" />
        </div>

        {/* work on this page */}
      </Row>
    </Layout>
  );
};

export default DoctorHomePage;
