import React, { useEffect, useState } from "react";
import {
  Paper,
  List,
  ListItem,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography,
  Snackbar,
  Button,
  Box,
  TextareaAutosize,
  TextField,
  FormControl,
} from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import { REACT_API_URL } from "../../../config/index";

const useStyles = makeStyles(theme => ({

  // base: {
  //   display: "flex",
  //   justifyContent: "center"
  // },

  root: {
    margin: theme.spacing(1),
    minWidth: 200,
    width: '100%',
    // [theme.breakpoints.up('sm')]: {
    //   width: '50%'
    // }
  },
  expansionPanel: {
    width: '100%',
    minWidth: 200,
  },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 100,
      width: '100%',
    },
    details: {
      display: 'flex',
      justifyContent: 'space-between',
    }

}));

export const Talks = props => {
  const classes = useStyles();
  // const { talks } = props;
  const [state, setState] = useState({
    talks: [

    ],
    message: '',
    open: false
  });

  const getTalks = async () => {
    try {
      const response = await fetch(`${REACT_API_URL}/api/talks/getTalks`);
      const res = await response.json();
      if (res.statusCode && res.statusCode === 200) {
        return setState({
          ...state,
          talks: res.data.reverse()
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


  useEffect(() => {

    getTalks();
  }, []);

  const handleClose = () =>{
    setState({
      ...state,
      open:false
    })
  }

  const deleteTalk = (_id) => async (e) => {
    e.preventDefault()
    try {
      const data = JSON.stringify({
        _id: _id
      })
      const response = await fetch(`${REACT_API_URL}/api/talks/deleteTalk`, {
        headers: {
          accept: "application/json, text/plain, */*",
          "Content-Type": "application/json"
        },
        method: "POST",
        body: data
      });
      const res = await response.json();
      if (res.statusCode && res.statusCode === 200) {
        getTalks();
        return setState({
          ...state,
          open: true,
          message: 'talk deleted successfully'
        });
      }
      return setState({
        ...state,
        open: true,
        message: 'unable to delete talk'
      });

    } catch (error) {
      console.log(`unable to fetch data: error: ${error}`);
     return setState({
        ...state,
        open: true,
        message: 'error deleting talk'
      });
    }
  }

  return (
    // <Paper className={classNames(classes.root, classes.base)}>
      <List className={classes.root}>
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
        {state.talks.map(talk => {
          return (
            <ListItem key={talk._id}>
              <ExpansionPanel className={classes.expansionPanel}>
                <ExpansionPanelSummary
                  expandIcon={<ExpandMore />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography className={classes.heading}>
                    {talk.title}
                  </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails className={classes.details}>
                <Typography className={classes.heading}>
                    Desctiption:
                  </Typography>
          <Typography>{talk.description}</Typography>
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            onClick={deleteTalk(talk._id)}
          >
            Delete Talk
          </Button>
                </ExpansionPanelDetails>
              </ExpansionPanel>
            </ListItem>
          );
        })}
      </List>
    // </Paper>
  );
};

// const TalkDetails = (props) => {

//   const { talk } = props
//   return (
//     <Box>
//       <FormControl className={classes.formControl}>
//         <TextField
//           id="title"
//           label="title"
//           defaultValue="Talk Title"
//           variant="outlined"
//         />{" "}
//       </FormControl>

//       <FormControl className={classes.formControl}>
//         <TextField
//           rowsMax={4}
//           aria-label="Description"
//           placeholder="Description"
//           defaultValue="Description"
//         />{" "}
//       </FormControl>

//       <FormControl className={classes.formControl}>
//         <TextField
//           id="host"
//           label="host"
//           defaultValue="Talk host"
//           variant="outlined"
//         />{" "}
//       </FormControl>

//       <FormControl className={classes.formControl}>
//         <TextField
//           id="speakers"
//           label="speakers"
//           defaultValue="Talk speakers"
//           variant="outlined"
//         />{" "}
//       </FormControl>

//       <FormControl className={classes.formControl}>
//         <TextField
//           id="address"
//           label="address"
//           defaultValue="Talk address"
//           variant="outlined"
//         />
//       </FormControl>



//       <FormControl className={classes.formControl}>
//         <TextField
//           id="start time"
//           label="start time"
//           defaultValue="Talk start Time"
//           variant="outlined"
//         />{" "}
//       </FormControl>

//       <FormControl className={classes.formControl}>
//         <TextField
//           id="closing time"
//           label="closing time"
//           defaultValue="Talk closing Time"
//           variant="outlined"
//         />{" "}
//       </FormControl>
//       <FormControl className={classes.formControl}>
//         <TextField
//           id="title"
//           label="attendees"
//           defaultValue="Talk attendees"
//           variant="outlined"
//         />{" "}
//       </FormControl>
//     </Box>
//   );
// }
