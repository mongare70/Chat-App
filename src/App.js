import React, { Fragment, useEffect, useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";
import { TextInput } from "./components/forms/TextInput";

import Modal from "./components/UI/Modal";
import Backdrop from "./components/UI/Backdrop";
import NewUser from "./components/forms/NewUser";
import MessageList from "./components/messages/MessageList";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      width: "80vw",
      height: "80vh",
      maxWidth: "500px",
      maxHeight: "700px",
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      position: "relative",
    },
    paper2: {
      width: "80vw",
      maxWidth: "500px",
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      position: "relative",
    },
    container: {
      width: "100vw",
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    messagesBody: {
      width: "calc( 100% - 20px )",
      margin: 10,
      overflowY: "scroll",
      height: "calc( 100% - 80px )",
    },
  })
);

export default function App() {
  const [intervalCount, setIntervalCount] = useState(0);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    if (!sessionStorage.getItem("user")) {
      setModalIsOpen(true);
    } else {
      setModalIsOpen(false);
    }

    const timeout = setTimeout(() => {
      setIntervalCount((count) => count + 1);
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [intervalCount]);

  const classes = useStyles();
  return (
    <div className={classes.container}>
      {modalIsOpen && (
        <Fragment>
          <Backdrop />
          <Modal>
            <NewUser />
          </Modal>
        </Fragment>
      )}

      <Paper className={classes.paper} zDepth={2}>
        <Paper id="style-1" className={classes.messagesBody}>
          <MessageList />
        </Paper>
        <TextInput />
      </Paper>
    </div>
  );
}
