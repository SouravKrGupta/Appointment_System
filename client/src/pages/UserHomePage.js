import { Row, Input, Button } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import DoctorList from "../components/DoctorList";
import Layout from "./../components/Layout";

const UserHomePage = () => {
  const [doctors, setDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const getUserData = async () => {
    try {
      const res = await axios.get("/api/user/getAllDoctors", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
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

  const handleSearch = () => {
    const filteredDoctors = doctors.filter((doctor) =>
      doctor.address.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(filteredDoctors);
  };

  return (
    <Layout>
      <h3 className="text-center">Home Page</h3>
      <br />
      <Input
        placeholder="Search doctors by address"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Button type="primary" onClick={handleSearch}>
        Search
      </Button>
      <br />
      <br />
      <Row>
        {searchResults.length > 0
          ? searchResults.map((doctor) => (
              <DoctorList key={doctor.id} doctor={doctor} />
            ))
          : doctors.map((doctor) => (
              <DoctorList key={doctor.id} doctor={doctor} />
            ))}
      </Row>
    </Layout>
  );
};

export default UserHomePage;
