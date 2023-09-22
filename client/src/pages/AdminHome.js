import React, { useEffect, useState } from "react";
import Layout from "./../components/Layout";
import axios from "axios";
import "./AdminHome.css";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

const AdminHome = () => {
  const [users, setUsers] = useState([]);

  console.log(users);

  const [doctors, setDoctors] = useState([]);
  console.log(doctors);

  //getUsers
  const getUsers = async () => {
    try {
      const res = await axios.get("/api/admin/getAllUsers", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        setUsers(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUsers();
  }, []);

  //getDoctors
  const getDoctors = async () => {
    try {
      const res = await axios.get("/api/admin/getAllDoctors", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
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
    getDoctors();
  }, []);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-dark pt-2 px-3 d-flex flex-column gap-0 bg-gradient">
          <p className="text-light">{`Name : ${label}`}</p>
          <p className="text-primary">{`Email : ${payload[0].value}`}</p>
          <p className="text-primary">{`Admin : ${payload[1].value}`}</p>
          <p className="text-primary">{`Doctors : ${payload[2].value}`}</p>
        </div>
      );
    }

    return null;
  };

  return (
    <Layout>
      <div className="d-flex flex-column gap-3 justify-content-center align-content-center">
        <div className="mb-3">
          <div className="text-center d-flex justify-content-center">
            <span
              style={{
                backgroundImage: "linear-gradient(to right, #02AABD, #00CDAC )",
              }}
              className="rounded-1 text-white px-5 mt-2 mb-5 pt-2"
            >
              <h5 className="text-uppercase">Users informations</h5>
              <h6>Number of Users : {users?.length} </h6>
            </span>
          </div>
          <div className="">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart
                width={1000}
                height={300}
                data={users}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="email"
                  barSize={20}
                  stackId="1"
                  stroke="blue"
                  fill="#8884d8"
                />
                <Area
                  type="monotone"
                  dataKey="isAdmin"
                  stackId="1"
                  barSize={20}
                  stroke="green"
                  fill="#237aff"
                />
                <Area
                  type="monotone"
                  dataKey="isDoctor"
                  stackId="1"
                  barSize={20}
                  stroke=""
                  fill="green"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="mx-auto pt-5" style={{ width: "100%" }}>
          
          <div className="text-center d-flex justify-content-center">
            <span
              style={{
                backgroundImage: "linear-gradient(to left, #2E3192 , #1BFFFF)",
              }}
              className="text-light rounded-1 px-5 mb-4 pt-2"
            >
              <h5 className="text-uppercase">Doctors informations</h5>
              <h6>Number of Doctors : {doctors?.length} </h6>
            </span>
          </div>

          <div className="">
            <ResponsiveContainer width="100%" height={320}>
              <BarChart
                // width="100%"
                // height={600}
                data={doctors}
                margin={{
                  top: 20,
                  right: 20,
                  left: 20,
                  bottom: 10,
                }}
              >
                <CartesianGrid stroke="#237aff" strokeDasharray="3 3" />
                <XAxis dataKey="firstName" />
                <YAxis dataKey="feesPerConsultation" />
                <Tooltip className="bg-danger" />
                <Legend />
                <Bar barSize={70} dataKey="name" stackId="1" fill="#8884d0" />
                <Bar barSize={70} dataKey="email" stackId="1" fill="black" />
                <Bar
                  barSize={70}
                  dataKey="specialization"
                  stackId="1"
                  fill="#237aff"
                />
                <Bar
                  barSize={70}
                  dataKey="feesPerConsultation"
                  stackId="1"
                  fill="#C33764"
                />
                <Bar barSize={70} dataKey="phone" stackId="1" fill="#004C99" />
                <Bar
                  barSize={70}
                  dataKey="experience"
                  stackId="1"
                  fill="#800000"
                />
                <Bar
                  barSize={70}
                  dataKey="starttime"
                  stackId="1"
                  fill="green"
                />
                <Bar barSize={70} dataKey="endtime" stackId="1" fill="green" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminHome;
