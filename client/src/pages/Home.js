import { React, useEffect } from "react";
import AdminHome from "./AdminHome";
import DoctorHomePage from "./DoctorHomePage";
import UserPage from "./UserPage";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
import { setUser } from "../redux/features/userSlice";
import { Navigate } from "react-router-dom";

const NewHome = () => {
  const userdata = useSelector((state) => state)?.user;

  const dispatch = useDispatch();

  useEffect(() => {
    const getUser = async () => {
      try {
        dispatch(showLoading());
        const { data } = await axios.post(
          "/api/user/getUserData",
          { token: localStorage.getItem("token") },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        dispatch(hideLoading());
        if (data.success) {
          dispatch(setUser(data.data));
        } else {
          localStorage.clear();
          <Navigate to="/login" />;
        }
      } catch (error) {
        localStorage.clear();
        dispatch(hideLoading());
        console.log(error);
      }
    };
    if (userdata?.user == null) {
      getUser();
    }
  }, []);

  if (userdata?.user?.isAdmin && !userdata?.user?.isDoctor) {
    return <AdminHome />;
  }
  if (userdata?.user?.isDoctor && !userdata?.user?.isAdmin) {
    return <DoctorHomePage />;
  }
  return <UserPage />;
};

export default NewHome;
