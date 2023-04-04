import express from "express";
import {
  cancelBill,
  createBill,
  feedBack,
  getBill,
  getFeedback,
} from "../controller/billController.js";
import {
  availableAuto,
  deleteAuto,
  downloadDocument,
  getAllAuto,
  getAllUser,
  getAutoAdmin,
  getMsg,
  getUser,
  loginUser,
  notifyCustomer,
  signUpAuto,
  signUpUser,
  verifyAuto,
} from "../controller/userController.js";
import { upload } from "../helpers/filehelper.js";
import AuthMiddleWare from "../middleware/authMiddleware.js";

const userRoutes = express.Router();

userRoutes.post("/signup", signUpUser);
userRoutes.post("/signup_auto", upload.single("autodoc"), signUpAuto);

userRoutes.post("/login", loginUser);

userRoutes.post("/createbill", AuthMiddleWare, createBill);
userRoutes.get("/getbill", AuthMiddleWare, getBill);

userRoutes.post("/feedback", AuthMiddleWare, feedBack);
userRoutes.get("/getfeedbacks/:auto_id", AuthMiddleWare, getFeedback);

userRoutes.get("/getuser", AuthMiddleWare, getUser);
userRoutes.get("/getmsgs", AuthMiddleWare, getMsg);
userRoutes.post("/notify_customer", AuthMiddleWare, notifyCustomer);

userRoutes.get("/getalluser", AuthMiddleWare, getAllUser);
userRoutes.get("/getallauto/:place", AuthMiddleWare, getAllAuto);

userRoutes.get("/get_auto_admin", AuthMiddleWare, getAutoAdmin);
userRoutes.post("/verify_auto", AuthMiddleWare, verifyAuto);
userRoutes.delete("/delete_auto/:auto_id", AuthMiddleWare, deleteAuto);
userRoutes.post("/download", AuthMiddleWare, downloadDocument);

userRoutes.delete("/cancelbill/:id", AuthMiddleWare, cancelBill);
userRoutes.post("/available", AuthMiddleWare, availableAuto);

export default userRoutes;
