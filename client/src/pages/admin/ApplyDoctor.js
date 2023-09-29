import { Col, Form, Input, Row, TimePicker, message } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { hideLoading, showLoading } from "../../redux/features/alertSlice";
import Layout from "../../components/Layout";

const ApplyDoctor = () => {
  const [users, setUsers] = useState([]);
  // console.log(users);

  // store selected user
  const [selectUser, setSelectUser] = useState(null);
  console.log(selectUser);

  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const user1 = users.filter(
  //   (user) => user?.isAdmin === false && user?.isDoctor === false
  // );
  // console.log(user1);

  //get all user
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

  const handleFinish = async (values) => {
    console.log(values);
    try {
      dispatch(showLoading());
      const starttime = values.starttime.format("HH:mm");
      const endtime = values.endtime.format("HH:mm");
      const res = await axios.post(
        "/api/user/apply-doctor",
        {
          ...values,
          userId: selectUser,

          starttime,
          endtime,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
        navigate("/");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Something Went Wrong");
    }
  };

  return (
    <Layout>
      <h3 className="text-center">Apply Doctor</h3>

      {/* dropdown user name list */}
      <div className="my-4 d-flex gap-1 justify-content-center align-items-center">
        <label
          style={{
            backgroundImage: "linear-gradient(to top, #2E3192 , #1BFFFF)",
          }}
          className="fs-5 px-3 pb-1 text-white"
          for=""
        >
          Choose a user :
        </label>

        <select
          onChange={(e) => {
            setSelectUser(e.target.value);
          }}
          className="px-3 py-1 w-25"
          aria-label=""
        >
          <option value=""></option>
          {users
            .filter(
              (user) => user?.isAdmin === false && user?.isDoctor === false
            )
            .map((u) => (
              <option key={u._id} value={u?._id} className="my-5">
                {u?.name}
              </option>
            ))}
        </select>
      </div>

      {/* Doctor Applying from */}
      <Form
        layout="vertical"
        onFinish={handleFinish}
        fields={[
          {
            name: ["firstName"],
            value: users.find((user) => user._id === selectUser)?.name,
          },
          {
            name: ["email"],
            value: users.find((user) => user._id === selectUser)?.email,
          },
        ]}
        className="m-3 px-5"
      >
        <h4 className="">Personal Details : </h4>
        <Row gutter={20}>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="First Name"
              name="firstName"
              required
              rules={[{ required: true, message: "First name is required" }]}
            >
              <Input type="text" placeholder="First Name" readOnly />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Last Name"
              name="lastName"
              required
              rules={[{ required: true, message: "Last name is required" }]}
            >
              <Input type="text" placeholder="Last Name" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Phone"
              name="phone"
              required
              rules={[{ required: true, message: "Phone number is required" }]}
            >
              <Input type="text" placeholder="Phone Number" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Email"
              name="email"
              required
              rules={[{ required: true, message: "Email is required" }]}
            >
              <Input type="email" placeholder="Email" readOnly />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item label="Website" name="website">
              <Input type="text" placeholder="Website" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Address"
              name="address"
              required
              rules={[{ required: true, message: "Address is required" }]}
            >
              <Input type="text" placeholder="Clinic Address" />
            </Form.Item>
          </Col>
        </Row>
        <br />
        <h4>Professional Details :</h4>
        <Row gutter={20}>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Specialization"
              name="specialization"
              required
              rules={[
                { required: true, message: "Specialization is required" },
              ]}
            >
              <Input type="text" placeholder="Specialization" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Experience"
              name="experience"
              required
              rules={[{ required: true, message: "Experience is required" }]}
            >
              <Input type="text" placeholder="Experience" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Fees Per Consultation"
              name="feesPerConsultation"
              required
              rules={[{ required: true, message: "Fee is required" }]}
            >
              <Input type="text" placeholder="Fee" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              name="starttime"
              label="Start Time"
              rules={[{ required: true }]}
            >
              <TimePicker format="HH:mm" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              name="endtime"
              label="End Time"
              rules={[{ required: true }]}
            >
              <TimePicker format="HH:mm" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}></Col>
          <Col xs={24} md={24} lg={8}>
            <br />
            <button className="btn btn-primary form-btn" type="submit">
              Submit
            </button>
          </Col>
        </Row>
      </Form>
    </Layout>
  );
};

export default ApplyDoctor;
