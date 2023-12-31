const doctorModel = require("../models/doctorModel");
const userModel = require("../models/userModel");

//get all users
const getAllUsersController = async (req, res) => {
  try {
    const users = await userModel.find({});
    res.status(200).send({
      success: true,
      message: "Users Data List",
      data: users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While Fetching Users",
      error,
    });
  }
};

//delete user
const deleteUsersController = async (req, res) => {
  try {
    const id = req.params.id;

    console.log(id);
    const user = await userModel.deleteOne({ _id: id });
    if (user) {
      res.status(200).send({
        success: true,
        message: "User Deleted",
        data: user,
      });
    } else {
      res.status(404).send({
        success: false,
        message: "Error While Deleting User",
        error,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

//GET ALL DOC
const getAllDoctorsController = async (req, res) => {
  try {
    const doctors = await doctorModel.find({});
    res.status(200).send({
      success: true,
      message: "Doctors Data list",
      data: doctors,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While Getting Doctors Data",
      error,
    });
  }
};

//Delete doctor
const deleteDoctorsController = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const user = await doctorModel.deleteOne({ _id: id });
    if (user) {
      res.status(200).send({
        success: true,
        message: "Doctor Deleted",
        data: user,
      });
    } else {
      res.status(404).send({
        success: false,
        message: "Error While Deleting Doctor",
        error,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

// doctor account status
const changeAccountStatusController = async (req, res) => {
  try {
    const { doctorId, status } = req.body;
    const doctor = await doctorModel.findByIdAndUpdate(doctorId, { status });
    const user = await userModel.findByIdAndUpdate( doctor.userId,{isDoctor:true} );
    const notification = user.notification;
    notification.push({
      type: "doctor-account-request-updated",
      message: `Your Doctor Account Request Has ${status} `,
      onClickPath: "/notification",
    });
    // user.isDoctor = status === "approved";
    // await user.save();
    res.status(201).send({
      success: true,
      message: "Account Status Updated",
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Account Status",
      error,
    });
  }
};

module.exports = {
  getAllDoctorsController,
  getAllUsersController,
  deleteUsersController,
  deleteDoctorsController,
  changeAccountStatusController,
};
