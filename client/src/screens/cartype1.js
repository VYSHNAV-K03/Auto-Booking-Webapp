import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";
import { serverUri } from "../redux/actions";

const Container = styled.div`
  padding: 50px;
  display: flex;
  .carCard {
    width: 500px;
    margin: auto;
  }
  .imageContainer {
    height: 350px;
  }
  .details_1 {
    font-family: sans-serif;
    width: 100%;
    padding: 20px;
  }
  .name_1 {
    font-size: 25px;
    font-weight: bold;
    margin-bottom: 20px;
  }
  .brand_1 {
    font-size: 25px;
    margin-bottom: 20px;
  }
  .num {
    font-weight: bold;
  }
  .tag {
    width: 200px;
  }
  .name_status {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .avail_btn {
    background: ${(props) => (props.avail ? "green" : "red")};
    border: none;
    outline: none;
    padding: 10px;
    border-radius: 8px;
    color: white;
    font-weight: bold;
    font-size: 20px;
    cursor: pointer;
  }
`;

const Cartype1 = ({ number, place, phone, avail, token }) => {
  const [loading, setloading] = useState(false);

  const changeAvail = async () => {
    try {
      setloading(true);
      const msg = await axios.post(
        serverUri + "/available",
        {
          avail: !avail,
        },
        {
          headers: {
            token: token,
            "Content-type": "application/json",
          },
        }
      );
      window.location.reload();

      setloading(false);
    } catch (error) {
      setloading(false);

      console.log(error);
    }
  };

  return (
    <Container avail={avail}>
      <div className="carCard">
        <div className="imageContainer">
          <img
            className="carImg"
            src={
              "https://5.imimg.com/data5/GI/AQ/NU/ANDROID-96578473/product-jpeg-500x500.jpeg"
            }
          />
        </div>
        <div className="details_1">
          <div>
            <div className="name_status">
              <p className="name_1">3 seater</p>
              {loading ? (
                <span>Loading..</span>
              ) : (
                <button onClick={changeAvail} className="avail_btn">
                  {avail ? "Available" : "Not available"}
                </button>
              )}
            </div>
            <p className="brand_1">Ape compact auto</p>
            <p className="brand_1">
              Auto Number: <span className="num">{number}</span>
            </p>
            <p className="brand_1">
              Phone :<span className="num">{phone}</span>
            </p>
            <p className="brand_1">
              Place :<span className="num">{place}</span>
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Cartype1;
