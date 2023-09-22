import { Table, message } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Layout from "./../../components/Layout";
import ConfirmModal from "../../Share/confirmModal/ConfirmModal";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  // console.log(doctors);

  const [showModal, setShowModal] = useState(false);

  //single doctor store
  const [doctor, setDoctor] = useState(null);
  // console.log(doctor);


  //modal popup 
  const showModalHandle = (record) => {
    setShowModal(true);
    setDoctor(record);
  };

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

  //delete doctor
  const handleDoctorDelete = async (record) => {
    console.log(record);
    try {
      setDoctors(doctors.filter((p) => p._id !== record._id));
      const res = await axios.delete(`/api/admin/deleteDoctor/${record._id}`, {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setShowModal(false);

      if (res.data.data.deletedCount > 0 && res.data.success) {
        message.success(
          `Doctor ${record?.firstName} ${record?.lastName} Deleted Successfully`
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  // handle account
  const handleAccountStatus = async (record, status) => {
    try {
      const res = await axios.post(
        "/api/admin/changeAccountStatus",
        { doctorId: record._id, userId: record.userId, status: status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        message.success(res.data.message);
        window.location.reload();
      }
    } catch (error) {
      message.error("Something Went Wrong");
    }
  };

  useEffect(() => {
    getDoctors();
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text, record) => (
        <span>
          {record.firstName} {record.lastName}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          {record.status === "pending" ? (
            <button
              className="m-1 btn btn-success"
              onClick={() => handleAccountStatus(record, "approved")}
            >
              Approve
            </button>
          ) : (
            <button
              onClick={() => showModalHandle(record)}
              className="m-1 btn btn-danger"
            >
              Delete
            </button>
          )}
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <h3 className="text-center">All Doctors</h3>
      <Table columns={columns} dataSource={doctors} />

      {showModal && (
        <ConfirmModal
          title={`Are you sure want to delete ?`}
          message={`If you delete Dr. ${doctor?.firstName} ${doctor?.lastName}, It cannot be recoverable.`}
          handleDelete={handleDoctorDelete}
          deleteOne={doctor}
          setShowModal={setShowModal}
        ></ConfirmModal>
      )}
    </Layout>
  );
};

export default Doctors;
