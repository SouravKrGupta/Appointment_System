import React, { useEffect, useState } from "react";
import Layout from "./../../components/Layout";
import axios from "axios";
import { message, Table } from "antd";
import moment from "moment";
import { useSelector } from "react-redux";

const DoctorAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  console.log(appointments);
  const { user } = useSelector((state) => state.user);

  console.log(user);



  const getAppointments = async () => {
    try {
      const res = await axios.get("/api/doctor/doctor-appointments", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        setAppointments(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAppointments();
  }, []);

  const handleStatus = async (record, status) => {
    try {
      const res = await axios.post(
        "/api/doctor/update-status",
        { appointmentsId: record._id, status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        message.success(res.data.message);
        getAppointments();
      }
    } catch (error) {
      console.log(error);
      message.error("Something Went Wrong");
    }
  };

  //delete Appointment
  const deleteAppointment = async (record) => {
    try {
      setAppointments(appointments.filter((p) => p._id !== record._id));
      const res = await axios.delete(
        `/api/doctor/doctor-appointments/${record._id}`,
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.data.deletedCount > 0 && res.data.success) {
        message.success(`Deleted Successfully`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
    },
    {
      title: "Date & Time",
      dataIndex: "date",
      render: (text, record) => (
        <span>
          {moment(record.date).format("DD-MM-YYYY")} &nbsp;
          {moment(record.time).format("HH:mm")}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          {record.status === "pending" ? (
            <div className="d-flex">
              <button
                className="m-1 btn btn-success "
                onClick={() => handleStatus(record, "approved")}
              >
                Approve
              </button>
              <button
                className="m-1 btn btn-danger ms-2"
                onClick={() => handleStatus(record, "reject")}
              >
                Reject
              </button>
            </div>
          ) : (
            <div>
              <button
                onClick={() => deleteAppointment(record)}
                className="btn fs-6 btn-sm btn-warning bg-gradient"
              >
                Remove
              </button>
            </div>
          )}
        </div>
      ),
    },
  ];
  return (
    <Layout>
      <h3>Appointments Lists</h3>
      <Table columns={columns} dataSource={appointments} />
    </Layout>
  );
};

export default DoctorAppointments;
