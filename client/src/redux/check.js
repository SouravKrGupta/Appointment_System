import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "./path/to/userSlice"; // Path to your userSlice
import { showLoading, hideLoading } from "./path/to/alertSlice"; 
const check = () => {
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();
  
    const simulateLogin = () => {
      dispatch(showLoading());
  
      // Simulate a login process and fetch user data
      setTimeout(() => {
        const userData = {
          username: "exampleUser",
          isAdmin: false,
        };
        dispatch(setUser(userData));
        dispatch(hideLoading());
      }, 2000);
    };
  return (
    <div>
    {user ? (
      <>
        <h2>Welcome, {user.username}!</h2>
        {user.isAdmin ? <p>You are an admin.</p> : <p>You are a user.</p>}
      </>
    ) : (
      <button onClick={simulateLogin}>Log in</button>
    )}
  </div>
  )
}

export default check