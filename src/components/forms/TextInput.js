import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import SendIcon from "@material-ui/icons/Send";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapForm: {
      display: "flex",
      justifyContent: "center",
      width: "95%",
      margin: `${theme.spacing(0)} auto`,
    },
    wrapText: {
      width: "100%",
    },
    button: {
      //margin: theme.spacing(1),
    },
  })
);

export const TextInput = (props) => {
  const [message, setMessage] = useState();
  const classes = useStyles();

  const messageInputChangeHandler = (event) => {
    setMessage(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if (!message) {
      return;
    }

    const messageItem = {
      sender: sessionStorage.getItem("user"),
      message: message,
    };

    if (!localStorage.getItem("messages")) {
      let messages = [messageItem];
      localStorage.setItem("messages", JSON.stringify(messages));
      setMessage("");
    } else {
      let messages = JSON.parse(localStorage.getItem("messages"));
      messages = [...messages, messageItem];
      localStorage.setItem("messages", JSON.stringify(messages));
      setMessage("");
    }
  };
  return (
    <>
      <form
        className={classes.wrapForm}
        noValidate
        autoComplete="off"
        onSubmit={submitHandler}
      >
        <TextField
          id="standard-text"
          label="Enter message"
          className={classes.wrapText}
          value={message}
          onChange={messageInputChangeHandler}
          //margin="normal"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.button}
        >
          <SendIcon />
        </Button>
      </form>
    </>
  );
};
