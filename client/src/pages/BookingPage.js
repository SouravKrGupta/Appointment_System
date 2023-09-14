import { DatePicker, TimePicker, Input, Select, message  } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
import "./../styles/LayoutStyles.css";
const { Option } = Select;
const BookingPage = () => {
  const { user } = useSelector((state) => state.user);
  const params = useParams();
  const [doctors, setDoctors] = useState([]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [isAvailable, setIsAvailable] = useState();
  const [userAge, setUserAge] = useState("");
  const [userDescription, setUserDescription] = useState("");
  const [userBloodGroup, setUserBloodGroup] = useState("");
  const [userWeight, setUserWeight] = useState("");
  const [userHeight, setUserHeight] = useState("");
  const dispatch = useDispatch();
  // login user data
  const getUserData = async () => {
    try {
      const res = await axios.post(
        "/api/doctor/getDoctorById",
        { doctorId: params.doctorId },
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

  // handleAvailability function
const handleAvailability = async () => {
  try {
    dispatch(showLoading());
    const res = await axios.post(
      "/api/user/booking-availbility",
      {
        doctorId: params.doctorId,
        date,
        time,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    dispatch(hideLoading());
    if (res.data.success) {
      setIsAvailable(true);
      console.log(isAvailable);
      message.success(res.data.message);
    } else {
      message.error(res.data.message);
    }
  } catch (error) {
    dispatch(hideLoading());
    console.log(error);
  }
};

  // =============== booking func
  const handleBooking = async () => {
    try {
      setIsAvailable(true);
      if (!date && !time) {
        return alert("Date & Time Required");
      }
      dispatch(showLoading());

      const res = await axios.post(
        "/api/user/book-appointment",
        {
          doctorId: params.doctorId,
          userId: user._id,
          doctorInfo: doctors,
          userInfo: {
            name: user.name,
            email: user.email,
            age: userAge,
            description: userDescription,
            bloodGroup: userBloodGroup,
            weight: userWeight,
            height: userHeight,
          },
          date: date,
          time: time,
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
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };
  

  useEffect(() => {
    getUserData();
    //eslint-disable-next-line
  }, []);

  return (
    <Layout>
      <div className="container">
        <h3 className="text-center my-4">Book an Appointment</h3>
        {doctors && (
          <div className="card mx-auto mb-4" style={{ maxWidth: "350px" }}>
            <div className="card-body">
              <h5 className="card-title text-center">
                Dr. {doctors.firstName} {doctors.lastName}
              </h5>
              <h6 className="card-subtitle mb-2 text-muted text-center">
                Fees: {doctors.feesPerConsultation}
              </h6>
              <h6 className="card-subtitle mb-2 text-muted text-center">
                Timings: {doctors.starttime} - {doctors.endtime}
              </h6>
              <div className="appoint-card-body">
                <div className="d-flex flex-column w-50 mx-auto">
                  <DatePicker
                    className="m-2 date-picker"
                    format="DD-MM-YYYY"
                    onChange={(value) => {
                      const selectedDate = value
                        ? value.format("DD-MM-YYYY")
                        : "";
                      setDate(selectedDate);
                    }}
                  />
                  <TimePicker
                    format="HH:mm"
                    className="m-2 time-picker"
                    onChange={(time) => setTime(time && time.format("HH:mm"))}
                  />
                   <Input
                    className="m-2"
                    placeholder="Age"
                    value={userAge}
                    onChange={(e) => setUserAge(e.target.value)}
                  />
                  <Input
                    className="m-2"
                    placeholder="Description"
                    value={userDescription}
                    onChange={(e) => setUserDescription(e.target.value)}
                  />
                  <Select
                    className="m-2"
                    placeholder="Blood Group"
                    value={userBloodGroup}
                    onChange={(value) => setUserBloodGroup(value)}
                  >
                    <Option value="A+">A+</Option>
                    <Option value="A-">A-</Option>
                    <Option value="B+">B+</Option>
                    <Option value="B-">B-</Option>
                    <Option value="O+">O+</Option>
                    <Option value="O-">O-</Option>
                    <Option value="AB+">AB+</Option>
                    <Option value="AB-">AB-</Option>
                  </Select>
                  <Input
                    className="m-2"
                    placeholder="Weight"
                    value={userWeight}
                    onChange={(e) => setUserWeight(e.target.value)}
                  />
                  <Input
                    className="m-2"
                    placeholder="Height"
                    value={userHeight}
                    onChange={(e) => setUserHeight(e.target.value)}
                  />
                  <div className="d-flex justify-content-center">
                    <button
                      className="btn btn-primary mt-2 w-100"
                      onClick={handleAvailability}
                    >
                      Check Availability
                    </button>
                  </div>
                  <div className="d-flex justify-content-center">
                    <button
                      className="btn btn-dark mt-2 w-100"
                      onClick={handleBooking}
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default BookingPage;
