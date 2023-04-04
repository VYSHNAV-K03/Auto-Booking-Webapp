import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import auto_home from "../assets/auto_home_5.jpg";

const Container = styled.div`
  height: 100vh;
  background-image: url(${auto_home});
  background-position: bottom right;
  /* background-size: cover; */
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  .title {
    position: absolute;
    top: 15px;
    left: 30px;
    font-family: "Montserrat";
    font-size: 30px;
    font-weight: 700;
    color: white;
  }
  .home_content {
    width: 70vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .para {
    color: white;
    font-family: "Montserrat";
    font-size: 30px;
    font-weight: 700;
  }
  button {
    padding: 10px 20px;
    font-size: 20px;
    font-weight: bold;
    outline: none;
    border: none;
    background-color: white;
    border-radius: 20px;
    margin-top: 20px;
    cursor: pointer;
    :hover {
      background: black;
      color: white;
    }
  }
`;

const Home = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <p className="title">AyeAuto</p>
      <div className="home_content">
        <p className="para">
          The online cab booking system makes traveling easier in this digital
          age by allowing you to move from one location to another with a single
          tap.
        </p>
        <button onClick={() => navigate("/map")}>Get Start</button>
      </div>
    </Container>
  );
};

export default Home;
