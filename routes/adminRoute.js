const express = require("express");
const {
  getAllUsersController,
  deleteUsersController,
  getAllDoctorsController,
  changeAccountStatusController,
  deleteDoctorsController,
} = require("../controllers/adminController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

//GET METHOD || USERS
router.get("/getAllUsers", authMiddleware, getAllUsersController);

//DELETE METHOD || USERS
router.delete("/deleteUser/:id", authMiddleware, deleteUsersController);

//GET METHOD || DOCTORS
router.get("/getAllDoctors", authMiddleware, getAllDoctorsController);

//Delete METHOD || DOCTORS
router.delete("/deleteDoctor/:id", authMiddleware, deleteDoctorsController);

//POST ACCOUNT STATUS
router.post("/changeAccountStatus", authMiddleware, changeAccountStatusController);

module.exports = router;
