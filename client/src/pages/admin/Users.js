import { Table, message } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Layout from "./../../components/Layout";
import ConfirmModal from "../../Share/confirmModal/ConfirmModal";

const Users = () => {
  const [users, setUsers] = useState([]);
  // console.log(users);

  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState(null);

  //Modal popup
  const showModalHandle = (record) => {
    setShowModal(true);
    setUser(record);
  };

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

  //delete single user
  const handleUserDelete = async (record) => {
    try {
      setUsers(users.filter((p) => p._id !== record._id));
      const res = await axios.delete(`/api/admin/deleteUser/${record._id}`, {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setShowModal(false);
      if (res.data.data.deletedCount > 0 && res.data.success) {
        message.success(`${record?.name} Deleted Successfully`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // antD table col
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Doctor",
      dataIndex: "isDoctor",
      render: (text, record) => (
        // console.log(record._id)
        <span className="bg-info p-2 rounded-1 fw-semibold">
          {record?.isDoctor && record?.isAdmin
            ? "Admin & Doctor"
            : record?.isAdmin
            ? "Admin"
            : record?.isDoctor
            ? "Yes"
            : "No"}
        </span>
      ),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          {!record.isAdmin ? (
            <button
              onClick={() => showModalHandle(record)}
              className="m-1 btn btn-danger"
            >
              Delete
            </button>
          ) : (
            ""
          )}
        </div>
      ),
    },
  ];

  return (
    <Layout className="position-relative">
      <h3 className="text-center">Users List</h3>
      <Table columns={columns} dataSource={users} />

      {showModal && (
        <ConfirmModal
          title={`Are you sure want to delete ?`}
          message={`If you delete ${user.name}, It cannot be recoverable.`}
          handleDelete={handleUserDelete}
          deleteOne={user}
          setShowModal={setShowModal}
        ></ConfirmModal>
      )}
    </Layout>
  );
};

export default Users;
