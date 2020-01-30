import React from "react";
import { ThemeProvider, createMuiTheme, makeStyles } from "@material-ui/core/styles";
import { Toolbar, Grid } from "@material-ui/core";
import {
  Root,
  Header,
  Content,
  Footer,
} from "@mui-treasury/layout";
import { Talks } from './components/talks.component';
import Dashboard from './components/dashboard.component'

const useStyles = makeStyles(theme => ({
  header: {
    background: theme.palette.primary.main,
    color: '#f3f3f3'
  }
}));
const baseTheme = createMuiTheme();
const App = () => {
  const classes = useStyles()
  return (
    <Root>
      <Header className={classes.header}>
        <Toolbar>Let's Talk Conference</Toolbar>
      </Header>
      <Content>
        <Grid container className={classes.root} spacing={2}>
          <Grid item xs={12}>
            <Dashboard />
          </Grid>

        </Grid>
      </Content>

      <Footer>Powered by drtob</Footer>
    </Root>
  );
};
export default App;
