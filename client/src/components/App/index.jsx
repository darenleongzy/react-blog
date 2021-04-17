import React, { useEffect } from "react";
import { withRouter, Switch, Route } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
// import history from "../History";
import { useHistory } from "react-router-dom";
import { Home } from "../../components";
import { Archives } from "../../components";
import { Editor } from "../../components";
import { Submit } from "../../components";
import { Single } from "../../components";
import { NotFound } from "../../components";
import { About } from "../../components";
import { AppBar } from "../../components";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
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
      <AppBar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/admin" component={Submit} />
        <Route exact path="/archives" component={Archives} />
        <Route exact path="/about" component={About} />
        <Route
          path="/article/:urlTitle/:articleId"
          render={(props) => <Single article={props} />}
        />
        <Route component={NotFound} />
      </Switch>
    </Box>
  );
};

export default withRouter(App);
