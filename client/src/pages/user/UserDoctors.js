import { Row } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
// import DoctorList from "../components/DoctorList";
// import Layout from "../components/Layout";
import DoctorList from "../../components/DoctorList";
import Layout from "../../components/Layout";

const UserDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  // login user data

  const getUserData = async () => {
    try {
      const res = await axios.get(
        "/api/user/getAllDoctors",

        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);
  
  return (
    <Layout>
      <h3 className="text-center fs-4 mb-4">Doctor's Appointment Are Here</h3>
      <br />
      <Row className="gap-4 m-2">
        {doctors && doctors.map((doctor) => <DoctorList doctor={doctor} />)}
      </Row>
    </Layout>
  );
};

export default UserDoctors;
