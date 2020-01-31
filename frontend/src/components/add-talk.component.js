import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  FormControl,
  TextField,
  Snackbar,
  Button
} from "@material-ui/core";
import { REACT_API_URL } from "../../../config/index";

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 100,
    width: "100%",
    // [theme.breakpoints.up("sm")]: {
    //   width: "50%"
    // }
  }
}));

export const AddTalk = () => {
  const classes = useStyles();

  const [state, setState] = useState({
    open: false,
    message: "",
    talkData: {}
  });

  const addTalk = async e => {
    e.preventDefault();
    try {
      const data = JSON.stringify(state.talkData);
      console.log(data);
      const response = await fetch(`${REACT_API_URL}/api/talks/addTalk`, {
        headers: {
          accept: "application/json, text/plain, */*",
          "Content-Type": "application/json"
        },
        method: "POST",
        body: data
      });
      const res = await response.json();
      console.log(res)
      if (res.statusCode && res.statusCode === 200) {
        return setState({
          ...state,
          open: true,
          message: "talk added"
        });
      }
      console.log(res);
     return setState({
        ...state,
        open: true,
        message: "error adding talk"
      });
    } catch (error) {
      console.log(`error adding talk, error: ${error}`);
      setState({
        ...state,
        open: true,
        message: "unable to add talk"
      });
    }
  };

  const handleChange = prop => e => {
    e.preventDefault();
    setState({
      ...state,
      talkData: {
        ...state.talkData,
        [prop]: e.target.value
      }
    });
  };

  const handleClose = () =>{
    setState({
      ...state,
      open:false
    })
  }

  return (
    <Box className={classes.root}>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
        open={state.open}
        autoHideDuration={6000}
        message={state.message}
        onClose={handleClose}
      />
      <form onSubmit={addTalk}>
        {" "}
        <FormControl className={classes.formControl}>
          <TextField
            id="title"
            label="title"
            placeholder="Talk Title"
            variant="outlined"
            onChange={handleChange("title")}
            required
          />{" "}
        </FormControl>
        <FormControl className={classes.formControl}>
          <TextField
            rowsMax={4}
            aria-label="Description"
            placeholder="Description"
            onChange={handleChange("description")}
          />
        </FormControl>
        <FormControl className={classes.formControl}>
          <TextField
            id="host"
            label="host"
            placeholder="Talk host"
            variant="outlined"
            onChange={handleChange("host")}
          />{" "}
        </FormControl>
        <FormControl className={classes.formControl}>
          <TextField
            id="address"
            label="address"
            placeholder="location of the Talk"
            variant="outlined"
            onChange={handleChange("address")}
            required
          />
        </FormControl>
        <FormControl className={classes.formControl}>
          <TextField
            id="start time"
            label="start time"
            placeholder="2018-11-28"
            variant="outlined"
            onChange={handleChange("startsAt")}
            required
          />{" "}
        </FormControl>
        <FormControl className={classes.formControl}>
          <TextField
            id="closing time"
            label="closing time"
            placeholder="2018-11-28"
            variant="outlined"
            onChange={handleChange("endsAt")}
            required
          />{" "}
        </FormControl>
        <FormControl className={classes.formControl}>
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            type="submit"
          >
            Create Talk
          </Button>
        </FormControl>
      </form>
    </Box>
  );
};
