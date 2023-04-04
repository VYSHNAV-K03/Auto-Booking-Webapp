import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { serverUri } from "../redux/actions";
import { useLocation } from "react-router-dom";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  .container {
    width: 900px;
    background: white;
    font-family: sans-serif;
    border-radius: 15px;
  }
  .each_msg {
    padding: 10px;
    border-bottom: 2px solid grey;
    display: flex;
    flex-direction: column;
    position: relative;
  }
  .button_notify {
    position: absolute;
    right: 0;
    top: 40px;
    margin: auto 0;
    padding: 8px 10px;
    background: green;
    color: white;
    border-radius: 10px;
    cursor: pointer;
  }
  .msg_title {
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 10px;
  }
  .locations {
    display: flex;
  }
  .start,
  .to {
    margin-right: 15px;
  }
  .sender {
    margin-bottom: 10px;
  }
  .date {
    font-size: 0.7rem;
    font-weight: bold;
    margin-left: auto;
  }
`;

const FeedBack = ({ token }) => {
  const [loading, setloading] = useState(false);

  const location = useLocation();

  console.log("feedback auto id", location.state.id);

  const [feedback, setfeedback] = useState();

  const auto_id = "642bbe1bdafd88aaf213d9cc";

  const getFeedBack = async () => {
    try {
      const res = await axios.get(
        serverUri + "/getfeedbacks" + `/${location.state.id}`,
        {
          headers: {
            token: token,
            "Content-type": "application/json",
          },
        }
      );

      setfeedback(res.data);
    } catch (error) {
      console.log("get feedback error", error);
    }
  };

  useEffect(() => {
    getFeedBack();
  }, []);

  return (
    <Container>
      <div className="container">
        {feedback &&
          feedback
            ?.map((msg) => (
              <div className="each_msg" key={msg._id}>
                <div className="msg_title">{msg?.feedback}</div>
                <div className="sender">From : {msg?.user}</div>
              </div>
            ))
            .reverse()}
      </div>
    </Container>
  );
};

export default FeedBack;
