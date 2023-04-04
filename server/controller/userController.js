import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import download from "download";
import dotenv from "dotenv";
import BillModel from "../models/billModel.js";
import fs from "fs";
import { request } from "express";
dotenv.config();

let WT_SECRET = process.env.WT_SECRET;

export const signUpUser = (req, res) => {
  const { email, password } = req.body;

  userModel.findOne({ email }).then(async (user) => {
    if (user == null) {
      let hash = await bcrypt.hash(password, 10);
      let newUser = new userModel({
        email: email,
        password: hash,
      });
      newUser.save();
      let signed = jwt.sign({ email: email }, WT_SECRET);
      res.status(200).json({
        token: signed,
        msg: "Registration Success",
      });
    } else {
      res.status(400).json({ err: "A user with this email already exists" });
    }
  });
};

export const signUpAuto = (req, res) => {
  console.log(req.file);
  const { autonumber, password, phone, place } = req.body;
  console.log({ autonumber, password, phone, place });
  userModel.findOne({ email: autonumber }).then(async (user) => {
    if (user == null) {
      let hash = await bcrypt.hash(password, 10);
      let newUser = new userModel({
        type: 1,
        email: autonumber,
        phone: phone,
        place: place,
        password: hash,
        document_path: req.file && req.file.path,
      });
      newUser.save();
      let signed = jwt.sign({ email: autonumber }, WT_SECRET);
      res.status(200).json({
        token: signed,
        msg: "Registration Success",
      });
    } else {
      res.status(400).json({ err: "A user with this email already exists" });
    }
  });
};

export const downloadDocument = async (req, res) => {
  try {
    const { autonumber } = req.body;

    const user = await userModel.findOne({ email: autonumber });

    res.status(200).download(user.document_path);
  } catch (error) {
    res.status(400).json({ err: "cannot find the user" });
  }
};

export const loginUser = (req, res) => {
  const { email, password } = req.body;

  userModel.findOne({ email }).then(async (user) => {
    if (user != null) {
      let pass = await bcrypt.compare(password, user.password);
      if (pass) {
        let signed = jwt.sign({ email: email }, WT_SECRET);
        res.status(200).json({
          token: signed,
          msg: "Login Successfull",
        });
      } else {
        res.status(400).json({ err: "Invalid Credintials" });
      }
    } else {
      res.status(404).json({ err: "user doesn't exists try signing up" });
    }
  });
};

export const availableAuto = async (req, res) => {
  try {
    const avail = req.body.avail;
    const email = req.body.token.email;
    console.log("available", email);
    await userModel.findOneAndUpdate(
      { email },
      {
        $set: {
          available: avail,
        },
      }
    );
    const availInterval = setInterval(async () => {
      console.log("avail false");
      await userModel.findOneAndUpdate(
        { email },
        {
          $set: {
            available: false,
          },
        }
      );
      clearInterval(availInterval);
    }, 120 * 60000);

    res.status(200).send("updated successfully");
  } catch (error) {
    res.status(400).json({ err: "cant update availability status" });
  }
};

export const notifyCustomer = async (req, res) => {
  try {
    const email = req.body.email;
    const sender_email = req.body.token.email;

    await userModel.findOneAndUpdate(
      { email: email },
      {
        $push: {
          msg: {
            message: "I Will Come Sooner",
            sender_email: sender_email,
          },
        },
      }
    );

    res.status(200).send("updated successfully");
  } catch (error) {
    res.status(400).json({ err: "cant update availability status" });
  }
};

export const getUser = async (req, res) => {
  const { token } = req.body;
  try {
    const user = await userModel.findOne({ email: token.email });
    res.status(200).send(user);
  } catch (error) {
    res.status(400).json({ msg: error });
  }
};

export const getMsg = async (req, res) => {
  const { token } = req.body;
  try {
    const user = await userModel.findOne({ email: token.email });
    // res.status(200).send(user.msg);
    res.status(200).send(user.msg);
  } catch (error) {
    res.status(400).json({ msg: error });
  }
};

export const getAllUser = async (req, res) => {
  const { token } = req.body;
  try {
    const user = await userModel.find();
    res.status(200).send(user);
  } catch (error) {
    res.status(400).json({ msg: error });
  }
};

export const getAllAuto = async (req, res) => {
  const { token } = req.body;
  const startplace = req.params.place;
  console.log(req.body);
  try {
    const user = await userModel.find({
      type: 1,
      place: startplace,
      available: true,
      verify: true,
    });

    res.status(200).send(user);
  } catch (error) {
    res.status(400).json({ msg: error });
  }
};

export const getAutoAdmin = async (req, res) => {
  const { token } = req.body;
  console.log(req.body);
  try {
    const user = await userModel.find({
      type: 1,
    });

    res.status(200).send(user);
  } catch (error) {
    res.status(400).json({ msg: error });
  }
};

export const verifyAuto = async (req, res) => {
  try {
    const verify = req.body.verify;
    const id = req.body.auto_id;
    await userModel.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          verify: verify,
        },
      }
    );

    res.status(200).send("verified successfully");
  } catch (error) {
    res.status(400).json({ err: "cant update verify status" });
  }
};

export const deleteAuto = async (req, res) => {
  try {
    const id = req.params.auto_id;
    await userModel.deleteOne({ _id: id });

    res.status(200).send("deleted successfully");
  } catch (error) {
    res.status(400).json({ err: "cant delete verify status" });
  }
};
