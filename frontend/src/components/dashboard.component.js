import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import { Tabs, Tab, Paper, Box, Typography } from '@material-ui/core';
import { AddTalk } from './add-talk.component';
import { Talks } from './talks.component';
import { AddAttendee } from './add-attendee.component';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    justifyContent: 'center'
  },
    root: {
      padding: 20
    },
    box: {
      width: "100%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      marginLeft: 20,
      marginRight: 20
    },
    button: {
      marginRight: 30
    }


}));

export default function Dashboard() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper className={classes.root}>
      <Box>
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="Talks" id="talk" />
          <Tab label="Add Talk" id="add-talk" />
          <Tab label="Add Attendee" id="add-attendee" />
        </Tabs>
      <TabPanel value={value} index={0}>
        <Talks />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <AddTalk />
      </TabPanel>
      <TabPanel value={value} index={2}>
       <AddAttendee />
      </TabPanel>
      </Box>
    </Paper>
  );
}
