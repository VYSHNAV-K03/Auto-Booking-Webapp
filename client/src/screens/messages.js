import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";
import { serverUri } from "../redux/actions";

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

const Messages = ({ messages, type, token }) => {
  console.log("user messages", messages);

  const [loading, setloading] = useState(false);

  const notifyCustomer = async (email) => {
    try {
      setloading(true);
      const msg = await axios.post(
        serverUri + "/notify_customer",
        {
          email: email,
        },
        {
          headers: {
            token: token,
            "Content-type": "application/json",
          },
        }
      );
      window.alert("notified successfully");

      setloading(false);
    } catch (error) {
      setloading(false);

      console.log(error);
    }
  };

  return (
    <Container>
      <div className="container">
        {messages &&
          messages
            ?.map((msg) => (
              <div className="each_msg">
                {type == 1 && (
                  <div
                    className="button_notify"
                    onClick={() => notifyCustomer(msg?.sender_email)}
                  >
                    Notify
                  </div>
                )}
                <div className="date">{msg?.datetime?.date}</div>
                <div className="msg_title">{msg?.message}</div>
                <div className="sender">From : {msg?.sender_email}</div>
                {type == 1 && (
                  <div className="locations">
                    <div className="start">{msg?.locations?.start}</div>
                    <div className="to">To</div>
                    <div className="end">{msg?.locations?.end}</div>
                  </div>
                )}
              </div>
            ))
            .reverse()}
      </div>
    </Container>
  );
};

export default Messages;
