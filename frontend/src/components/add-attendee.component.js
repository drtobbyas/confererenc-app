import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  FormControl,
  TextField,
  Snackbar,
  Button,
  Select,
  MenuItem,
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

export const AddAttendee = () => {
  const classes = useStyles();

  const [state, setState] = useState({
    open: false,
    message: "",
    attendeeData: {
      attending: ''
    },
    talks: []
  });

  useEffect(() => {
    const callApi = async () => {
      try {
        const response = await fetch(`${REACT_API_URL}/api/talks/getTalks`);
        const res = await response.json();
        if (res.statusCode && res.statusCode === 200) {
          return setState({
            ...state,
            talks: res.data
          });
        }
        return setState({
          ...state,
          talks: []
        });

      } catch (error) {
        console.log(`unable to fetch data: error: ${error}`);
       return setState({
          ...state,
          talks: []
        });
      }
    };

    callApi();
  }, []);


  const addAttendee = async e => {
    e.preventDefault();
    try {
      const data = JSON.stringify(state.attendeeData);
      console.log(data);
      const response = await fetch(`${REACT_API_URL}/api/attendees/addAttendee`, {
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
          message: "talk attendee"
        });
      }
      console.log(res);
     return setState({
        ...state,
        open: true,
        message: "error adding attendee"
      });
    } catch (error) {
      console.log(`error adding attendee, error: ${error}`);
      setState({
        ...state,
        open: true,
        message: "unable to add attendee"
      });
    }
  };

  const handleChange = prop => e => {
    e.preventDefault();
    setState({
      ...state,
      attendeeData: {
        ...state.attendeeData,
        [prop]: e.target.value
      }
    });
  };

  const handleSelect = prop => e => {
    e.preventDefault();
    setState({
      ...state,
      attendeeData: {
        ...state.attendeeData,
        attending: [e.target.value]
      }
    });
  }

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
      <form onSubmit={addAttendee}>

        <FormControl className={classes.formControl}>
          <TextField
            id="first-name"
            label="first-name"
            placeholder="First Name"
            variant="outlined"
            onChange={handleChange("firstName")}
            required
          />{" "}
        </FormControl>
        <FormControl className={classes.formControl}>
          <TextField
            id="last-name"
            label="last-name"
            placeholder="Last Name"
            variant="outlined"
            onChange={handleChange("lastName")}
            required
          />{" "}
        </FormControl>
        <FormControl className={classes.formControl}>
          <TextField
            id="email"
            label="email"
            placeholder="Your Email"
            variant="outlined"
            onChange={handleChange("email")}
            required
          />{" "}
        </FormControl>
        <FormControl className={classes.formControl}>
        <Select
            id="attending"
            value={state.attendeeData.attending[0]}
            onChange={handleSelect('attending')}
            defaultValue="select a talk to attend"
          >
            {state.talks.map((talk) => {
return <MenuItem key={talk._id} value={talk._id}>{talk.title}</MenuItem>
            })}

          </Select>
        </FormControl>

        <FormControl className={classes.formControl}>
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            type="submit"
          >
            Add Attendee
          </Button>
        </FormControl>
      </form>
    </Box>
  );
};
