import React, { useEffect, useState } from "react";
import { serverUri } from "../redux/actions";
import axios from "axios";
import styled from "styled-components";

import delete_img from "../assets/delete_icon.png";

const Container = styled.div`
  padding: 20px;
  .carCard {
    position: relative;
  }
  .delete_image {
    position: absolute;
    right: 0;
    top: 5px;
    width: 40px;
    height: 40px;
    transition: all 0.2s ease-in-out;
    :hover {
      transform: scale(1.2);
    }
  }
  .delete_image img {
    width: 100%;
    height: 100%;
  }
`;

const Admin = ({ token, details }) => {
  const [autos, setautos] = useState();

  const getAutoAdmin = async () => {
    try {
      let data = await axios.get(serverUri + `/get_auto_admin`, {
        headers: {
          token: token,
          "Content-type": "application/json",
        },
      });

      setautos(data?.data);
    } catch (error) {
      console.log("get auto admin error", error);
    }
  };

  const verifyAuto = async (_id, verify) => {
    try {
      let data = await axios.post(
        serverUri + `/verify_auto`,
        {
          auto_id: _id,
          verify: !verify,
        },
        {
          headers: {
            token: token,
            "Content-type": "application/json",
          },
        }
      );

      window.location.reload();
    } catch (error) {
      console.log("get auto admin error", error);
    }
  };

  const deleteAuto = async (_id) => {
    try {
      await axios.delete(serverUri + `/delete_auto/${_id}`, {
        headers: {
          token: token,
          "Content-type": "application/json",
        },
      });

      window.location.reload();
    } catch (error) {
      console.log("get auto admin error", error);
    }
  };

  useEffect(() => {
    getAutoAdmin();
  }, []);

  return (
    <Container>
      {autos &&
        autos.map((details) => (
          <div className="carCard">
            <div
              className="delete_image"
              onClick={() => deleteAuto(details._id)}
            >
              <img src={delete_img} alt="" />
            </div>
            <div className="imageContainer">
              <img
                className="carImg"
                src={
                  "https://5.imimg.com/data5/GI/AQ/NU/ANDROID-96578473/product-jpeg-500x500.jpeg"
                }
              />
            </div>
            <div className="details">
              <div>
                <p className="name">3 Seater</p>
                <p className="brand">Auto Number:{details.email}</p>
                <p className="brand">
                  Cab Charges:{" "}
                  <span style={{ fontWeight: 600, fontSize: 15 }}>15</span> /-
                </p>
              </div>
              {/* <div className="tag">
                {details.available ? "available" : "not available"}
              </div> */}
              <div className="tag">
                {details.verify ? "verified" : "not verified"}
              </div>
            </div>
            <button
              className="btn"
              onClick={() => {
                verifyAuto(details._id, details.verify);
              }}
            >
              Change Verification
            </button>
          </div>
        ))}
    </Container>
  );
};

export default Admin;
