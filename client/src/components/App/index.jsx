import React, { useEffect } from "react";
import { withRouter, Switch, Route } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";

import history from "../History";

import { Home } from "../../components";

import { Archives } from "../../components";
import { Editor } from "../../components";
import { Submit } from "../../components";
import { Single } from "../../components";
import { NotFound } from "../../components";
import { About } from "../../components";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    // background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    background: "linear-gradient(25deg, #203A43 30%,#0F2027 90%)",
    // background: 'linear-gradient(45deg, #1f4037 30%,#237A57 90%)'
  },
  button: {
    size: "large",
  },
}));

const App = (props) => {
  const classes = useStyles();
  useEffect(() => {
    document.title = "Dalezy Tech Blog";
  }, []);

  return (
    <Box>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Box style={{ flex: 1 }}>
            <Typography variant="h6" onClick={() => history.push("/")}>
              Tech Blog
            </Typography>
          </Box>
          <Box pr={5}>
            <Button
              className={classes.button}
              color="inherit"
              onClick={() => {
                history.push("/");
              }}
            >
              Home
            </Button>
            <Button
              className={classes.button}
              color="inherit"
              onClick={() => {
                history.push("/about");
              }}
            >
              About
            </Button>
            {/* <Button className={classes.button} color="inherit" onClick={() => { history.push('/archives') }}> Archives</Button> */}
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Switch>
        <Route exact path="/" component={Home} />
        {/* <Route exact path="/admin" component={Submit} /> */}
        <Route exact path="/archives" component={Archives} />
        <Route exact path="/about" component={About} />
        <Route
          path="/article/:articleId"
          render={(props) => <Single article={props} />}
        />
        <Route component={NotFound} />
      </Switch>
    </Box>
  );
};

export default withRouter(App);
